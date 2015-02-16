<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
	}

	public function index()
	{
		if ($this->session->userdata('logged_in') === true) {

			if ($this->session->userdata('user_type') === 'admin') {
				$url = '#/adminpanel';
			}else{
				$url = '#/';
			}
			
			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'Login successfull!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => $url
					)
				));
		}else{
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Login failed!', 
					'body' => 'Please try again.', 
					)
				));
		}
	}

	private function menu_before_login()
	{
		return array(
			array(
				'url' => '/login', 
				'label' => 'Login/Registration'
				)
			);
	}

	public function login()
	{
		$postdata = get_post();
		$postdata['login'] = trim($postdata['login']);
		$postdata['password'] = trim($postdata['password']);

		if (in_array('', $postdata)) {
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Field empty!', 
					'body' => 'Please fill properly.', 
					)
				));
			exit();
		}

		$user_data = array(
			'login' => $postdata['login'], 
			'password' => sha1($postdata['password']), 
			);

		$result = $this->User_model->login_check($user_data);

		if (count($result)>0) {

			$user_type = ($result[0]['user_type'] != NULL) ? $result[0]['user_type'] : 'student';

			$session = array(
				'id_users' => $result[0]['id_users'], 
				'first_name' => $result[0]['first_name'], 
				'last_name' => $result[0]['last_name'], 
				'academic_id' => $result[0]['academic_id'], 
				'user_type' => $user_type, 
				'logged_in' => true
				);

			$this->session->set_userdata($session);


			if ($this->session->userdata('user_type') === 'admin') {
				$url = '#/adminpanel';
			}else{
				$url = '#/';
			}

			jsonify(array(
				'success' => true,
				'message' => array(
					'title' => 'Login successfull!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => $url
					)
				));
		}else{
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Login failed!', 
					'body' => 'Please try again.', 
					)
				));
		}
	}


	public function registration()
	{
		$postdata = get_post();
		if (in_array('', $postdata) === true) {
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Field empty!', 
					'body' => 'Please fill the form properly.', 
					),
				));
			exit();
		}
		$user_data = array(
			'first_name' => trim($postdata['firstName']), 
			'last_name' => trim($postdata['lastName']), 
			'email' => trim($postdata['email']), 
			'user_type' => 'student', 
			'academic_id' => trim($postdata['academicId']), 
			'password' => sha1($postdata['password']), 
			'access_status' => 'account_not_activated', 
			'activation_code' => $this->token(), 
			);

		// $config = Array(
		// 	'protocol' => 'smtp',
		// 	'smtp_host' => 'mail.maxrailwaytrack.com',
		// 	'smtp_port' => 25,
		// 	'charset' => 'utf-8',
		// 	'newline' => "\r\n",
		// 	'smtp_user' => 'noreply-requisition@maxrailwaytrack.com', 
		// 	'smtp_pass' => 'ZyKAu%g}fS1b', 
		// 	'mailtype' => 'html',
		// 	'validation' => TRUE,
		// 	'wordwrap' => TRUE
		// 	);
		$config = Array(
			'protocol' => 'smtp',
			'smtp_host' => 'smtp.tarifrr.info',
			'smtp_port' => 25,
			'charset' => 'utf-8',
			'newline' => "\r\n",
			'mailtype' => 'html',
			'wordwrap' => TRUE
			);

		$this->load->library('email', $config);

		// echo $this->email->print_debugger();
		$this->email->from('billah22@gmail.com'); 
		// $this->email->to($user_data['email']); 
		$this->email->to('fahadbillah@yahoo.com'); 

		$this->email->subject('Account activation!');

		$message = '';
		$message .= 'Your registration was successfull. Please activate your account by clicking the link below. <br> <br>';
		$message .= '';
		$message .= '<a href="http://tarifrr.info/filearc/#/activateuser/'.$user_data['activation_code'].'" title="">Activate</a>' ;

		$this->email->message($message);	

		$this->email->send();

		$this->email_check($user_data['email']);
		$this->academic_id_check($user_data['academic_id']);

		if($this->User_model->add_user($user_data) === true){

			jsonify(array(
				'success' => true,
				'message' => array(
					'title' => 'Registration successfull!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => '/success/101'
					),
				'email' => $this->email->print_debugger()
				));
		}else{
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Registration failed!', 
					'body' => 'Please try again.', 
					),
				'email' => $this->email->print_debugger()
				));
		}

		// vd($postdata);
	}

	public function email_check($email = '')
	{
		$check = array(
			'table' => 'users', 
			'column' => 'email', 
			'value' => urldecode($email), 
			);
		if (count($this->User_model->check_if_exists($check))>0) {
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Duplicate email', 
					'body' => 'User with this email exists. Please select another email address.', 
					)
				));
			exit();
		}
	}

	public function academic_id_check($academic_id = '')
	{
		$check = array(
			'table' => 'users', 
			'column' => 'academic_id', 
			'value' => urldecode($academic_id), 
			);
		if (count($this->User_model->check_if_exists($check))>0) {
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Duplicate academic ID', 
					'body' => 'User with this academic ID exists.', 
					)
				));
			exit();
		}
		else{
			return true;
		}
	}

	public function token($length = 40)
	{
		$string = '0123456789abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$token = '';
		for ($i=0; $i < $length; $i++) { 
			$token.= $string[rand(0, strlen($string)-1)];
		}
		return $token;
	}

	public function is_logged_in()
	{
		if($this->session->userdata('logged_in') == true){
			jsonify(array(
				'success' => true, 
				'user_type' => $this->session->userdata('user_type')
				));
		}else{
			jsonify(array(
				'success' => false, 
				'message' => 'You are not logged in. Please login first.', 
				'action' => array(
					'actionName' => 'redirect', 
					'url' => '#/auth', 
					)
				));
		}
	}

	public function logout()
	{
		$this->session->sess_destroy();
		jsonify(array(
			'success' => true, 
			'message' => 'Logout successfull. Please login.', 
			'action' => array(
				'actionName' => 'redirect', 
				'url' => '#/auth', 
				)
			));
	}

	public function test()
	{
		$this->load->library('email');
		$config['protocol'] = 'smtp';
		$config['smtp_host'] = 'smtp.tarifrr.info';
		$config['smtp_port'] = 25;
		$config['mailtype'] = 'html';
		$config['wordwrap'] = TRUE;

		$this->load->library('email');
		$this->email->initialize($config);

		
		$this->email->from('billah22@gmail.com', 'Fahad');
		$this->email->to('fahadbillah@yahoo.com');
		
		$this->email->subject('subject');
		$this->email->message('message');
		
		$this->email->send();
		
		echo $this->email->print_debugger();
		echo "<pre>";
		print_r($this->session->all_userdata());
		echo "</pre>";
	}

	public function activate_account($activation_code)
	{
		$this->load->model('User_model');
		$result = $this->User_model->activation_code_exists($activation_code);
		// vd($result);
		// exit();
		if (count($result) > 0) {
			$new_activation_code = array(
				'activation_code' => '',
				'access_status' => 'account_activated'
				);
			$this->User_model->update_activation_code($new_activation_code,$result[0]['id_users']);

			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'Activation successfull',
					'body' => 'You are ready to use your account', 
					)
				));
		}else{
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Activation failed',
					'body' => 'Your activation code didn\'t match.', 
					)
				));
		}
	}

}

/* End of file auth.php */
/* Location: ./application/controllers/auth.php */