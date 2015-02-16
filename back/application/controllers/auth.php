<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
	}

	public function index()
	{
		if ($this->session->userdata('logged_in') == true) {
			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'Login successfull!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => '#/'
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
		$user_data = array(
			'login' => $postdata['login'], 
			'password' => sha1($postdata['password']), 
			);


		$result = $this->User_model->login_check($user_data);

		if (count($result)>0) {
			$session = array(
				'id_users' => $result[0]['id_users'], 
				'first_name' => $result[0]['first_name'], 
				'last_name' => $result[0]['last_name'], 
				'academic_id' => $result[0]['academic_id'], 
				'logged_in' => true
				);

			$this->session->set_userdata($session);

			jsonify(array(
				'success' => true,
				'message' => array(
					'title' => 'Login successfull!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => '#/'
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
		$user_data = array(
			'first_name' => $postdata['firstName'], 
			'last_name' => $postdata['lastName'], 
			'email' => $postdata['email'], 
			'academic_id' => $postdata['academicId'], 
			'password' => sha1($postdata['password']), 
			'access_status' => 'account_not_activated', 
			'activation_code' => $this->token(), 
			);

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
					)
				));
		}else{
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'Registration failed!', 
					'body' => 'Please try again.', 
					)
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
		else{
			return true;
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
		echo "<pre>";
		print_r($this->session->all_userdata());
		echo "</pre>";
	}

}

/* End of file auth.php */
/* Location: ./application/controllers/auth.php */