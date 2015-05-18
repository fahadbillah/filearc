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

			if ($result[0]['access_status'] == 'account_not_activated') {
				jsonify(array(
				        'success' => false,
				        'message' => array(
				                           'title' => 'Account not activated!', 
				                           'body' => 'Please activate your account from your email.', 
				                           )
				        ));
				exit();
			}

			// jsonify($result);
			// exit();
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

		// jsonify($user_data);
		// exit();

		$this->email_check($user_data['email']);
		$this->academic_id_check($user_data['academic_id']);
		// echo "wow";

		if($this->User_model->add_user($user_data) === true){
			// echo "wow";
			$config = Array(
			                'protocol' => 'smtp',
			                'smtp_host' => 'mail.nsubusinessalumni.org',
			                'smtp_port' => 26,
			                'smtp_timeout' =>'7',
			                'charset' => 'utf-8',
			                'newline' => "\r\n",
			                'smtp_user' => 'no-reply@nsubusinessalumni.org', 
			                'smtp_pass' => '.@ZJRn~yo6TC', 
			                'mailtype' => 'html',
			                'validation' => TRUE,
			                'wordwrap' => TRUE
			                );

			$this->load->library('email',$config);

			$this->email->from('nsuprojects@tarifrr.info', 'NO-REPLY');

			// $config = Array(
			//                 'protocol' => 'smtp',
			//                 'smtp_host' => 'smtp.tarifrr.info',
			//                 'smtp_port' => 26,
			//                 'smtp_timeout' =>'7',
			//                 'charset' => 'utf-8',
			//                 'newline' => "\r\n",
			//                 'smtp_user' => 'nsuprojects@tarifrr.info', 
			//                 'smtp_pass' => 'Test1234', 
			//                 'mailtype' => 'html',
			//                 'validation' => TRUE,
			//                 'wordwrap' => TRUE
			//                 );

			// $this->load->library('email',$config);

			// $this->email->from('nsuprojects@tarifrr.info', 'NO-REPLY');
			// $this->email->cc('another@example.com');
			// $this->email->bcc('and@another.com');



			// $this->email->to('billah22@gmail.com'); 
			$this->email->to($user_data['email']); 

			$this->email->subject('Account activation!');

			$message = '';
			$message .= 'Your registration was successfull. Please activate your account by clicking the link below. <br> <br>';
			$message .= '';
			$message .= '<a href="http://filearc.fahadbillah.com/#/activateuser/'.$user_data['activation_code'].'" title="">Activate</a> <br> <br>';

			$this->email->message($message);

			$result = $this->email->send();

			// echo $this->email->print_debugger();
			// exit();


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
			        'email' => $result
			        ));
		}else{
			jsonify(array(
			        'success' => false,
			        'message' => array(
			                           'title' => 'Registration failed!', 
			                           'body' => 'Please try again.', 
			                           ),
			        'email' => $result
			        ));
		}

		// vd($postdata);
	}

	public function email_check()
	{
		$postdata = get_post();
		// vd($postdata);
		// exit();
		$check = array(
		               'table' => 'users', 
		               'column' => 'email', 
		               'value' => $postdata['email'], 
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
		exit();
		$config = Array(
		                'protocol' => 'smtp',
		                'smtp_host' => 'mail.nsubusinessalumni.org',
		                'smtp_port' => 26,
		                'smtp_timeout' =>'7',
		                'charset' => 'utf-8',
		                'newline' => "\r\n",
		                'smtp_user' => 'no-reply@nsubusinessalumni.org', 
		                'smtp_pass' => '.@ZJRn~yo6TC', 
		                'mailtype' => 'html',
		                'validation' => TRUE,
		                'wordwrap' => TRUE
		                );

		$this->load->library('email',$config);

		$this->email->from('nsuprojects@tarifrr.info', 'NSU Business Alumni');

		// $config = Array(
		//                 'protocol' => 'smtp',
		//                 'smtp_host' => 'smtp.tarifrr.info',
		//                 'smtp_port' => 26,
		//                 'smtp_timeout' =>'7',
		//                 'charset' => 'utf-8',
		//                 'newline' => "\r\n",
		//                 'smtp_user' => 'nsuprojects@tarifrr.info', 
		//                 'smtp_pass' => 'Test1234', 
		//                 'mailtype' => 'html',
		//                 'validation' => TRUE,
		//                 'wordwrap' => TRUE
		//                 );

		// $this->load->library('email',$config);

		// $this->email->from('nsuprojects@tarifrr.info', 'NO-REPLY');
			// $this->email->cc('another@example.com');
			// $this->email->bcc('and@another.com');



		$this->email->to('fahadbillah@yahoo.com'); 

		$this->email->subject('Account activation!');

		$message = '';
		$message .= 'Your registration was successfull. Please activate your account by clicking the link below. <br> <br>';
		$message .= '';
		// $message .= '<a href="http://tarifrr.info/filearc/#/activateuser/'.$user_data['activation_code'].'" title="">Activate</a> <br> <br>' ;

		$this->email->message($message);

		$result = $this->email->send();
		echo "<pre>";
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
			                             'access_status' => 'activated'
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

	public function forget_password()
	{
		$user_data = get_post();

		$data = $this->db->where('email', $user_data['email'])->get('users')->result_array()[0];
		// vd($data);
		// exit();
		if (count($data) > 0) {
			if ($data['access_status'] != 'activated') {

				jsonify(array(
				        'success' => false, 
				        'message' => array(
				                           'title' => 'Your account is not activated!',
				                           'body' => 'Activate it first from your email.', 
				                           )
				        ));
			}

			$update = array(
			                'activation_code' => $this->token(), 
			                );
			$this->db->where('id_users', $data['id_users']);
			$this->db->update('users',$update);
			// exit();

			$config = Array(
			                'protocol' => 'smtp',
			                'smtp_host' => 'mail.nsubusinessalumni.org',
			                'smtp_port' => 26,
			                'smtp_timeout' =>'7',
			                'charset' => 'utf-8',
			                'newline' => "\r\n",
			                'smtp_user' => 'no-reply@nsubusinessalumni.org', 
			                'smtp_pass' => '.@ZJRn~yo6TC', 
			                'mailtype' => 'html',
			                'validation' => TRUE,
			                'wordwrap' => TRUE
			                );

			$this->load->library('email',$config);

			$this->email->from('nsuprojects@tarifrr.info', 'NO-REPLY');

			// $this->email->to('fahadbillah@yahoo.com'); 
			$this->email->to($data['email']); 

			$this->email->subject('Change Password!');

			$message = '';
			$message .= 'Click the link and update your password <br> <br>';
			$message .= '';
			$message .= '<a href="http://filearc.fahadbillah.com/#/updatePassword/'.$update['activation_code'].'" title="">Set New Password</a> <br> <br>' ;

			$this->email->message($message);

			$result = $this->email->send();
		}
		else{

			jsonify(array(
			        'success' => false, 
			        'message' => array(
			                           'title' => 'No user found for this email address',
			                           'body' => '', 
			                           )
			        ));
		}

	}

	public function update_password()
	{
		$data = get_post();
		if(count($this->db->where('activation_code', $data['activation_code'])->get('users')->result_array())>0){




			$update = array(
			                'password' => sha1($data['password']), 
			                'activation_code' => '', 
			                );
			$this->db->where('activation_code', $data['activation_code']);
			if($this->db->update('users', $update)){

				jsonify(array(
				        'success' => true, 
				        'message' => array(
				                           'title' => 'Password Changed!',
				                           'body' => 'Now login with new password.', 
				                           )
				        ));
			}else{

				jsonify(array(
				        'success' => false, 
				        'message' => array(
				                           'title' => 'Password Changed failed!',
				                           'body' => '', 
				                           )
				        ));
			}
		}else{

			jsonify(array(
			        'success' => false, 
			        'message' => array(
			                           'title' => 'Activation code not matched!',
			                           'body' => '', 
			                           )
			        ));
		}
	}

	public function change_password()
	{
		$data = get_post();
		// vd($data);
		// vd($this->session->all_userdata());
		// $this->session->userdata('logged_in');
		// exit();

		if($this->session->userdata('logged_in') === true){
			if ($data['newPassword'] !== $data['rePassword']) {
				jsonify(array(
				        'success' => false, 
				        'message' => array(
				                           'title' => 'Password Mismatch!',
				                           'body' => '', 
				                           )
				        ));
			}

			$this->db->select('*');
			$this->db->from('users');
			$this->db->where('id_users', $this->session->userdata('id_users'));
			$user_data = $this->db->get()->result_array();
			if (count($user_data) == 0 || $user_data[0]['password'] != sha1($data['oldPassword'])) {
				jsonify(array(
				        'success' => false, 
				        'message' => array(
				                           'title' => 'Password not matched!',
				                           'body' => '', 
				                           )
				        ));
			}

			$update = array(
			                'password' => sha1($data['newPassword']), 
			                );
			$this->db->where('id_users', $this->session->userdata('id_users'));
			if($this->db->update('users', $update)){

				jsonify(array(
				        'success' => true, 
				        'message' => array(
				                           'title' => 'Password Changed!',
				                           'body' => 'Now login with new password.', 
				                           )
				        ));
			}else{

				jsonify(array(
				        'success' => false, 
				        'message' => array(
				                           'title' => 'Password Changed failed!',
				                           'body' => '', 
				                           )
				        ));
			}
		}else{

			jsonify(array(
			        'success' => false, 
			        'message' => array(
			                           'title' => 'You are not logged in!',
			                           'body' => 'Please login to change password.', 
			                           )
			        ));
		}
	}

}

/* End of file auth.php */
/* Location: ./application/controllers/auth.php */