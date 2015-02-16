<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();



		if ($this->session->userdata('logged_in') !== true) {
			jsonify(array(
				'success' => false,
				'message' => array(
					'title' => 'You are not logged in!', 
					'body' => 'Please login first.', 
					),
				'action' => array(
					'actionName' => 'redirect',
					'url' => '#/auth'
					)
				));
			exit();
		}

		$this->load->model('user_model');
	}

	public function index()
	{
		echo "this is admin page";
	}

	public function get_all_non_faculty()
	{
		$data = $this->user_model->get_all_non_faculty();


		jsonify(array(
			'success' => true, 
			'data' => $data
			));
	}

	public function get_all_faculty()
	{
		$data = $this->user_model->get_all_faculty();


		jsonify(array(
			'success' => true, 
			'data' => $data
			));
	}

	public function make_faculty()
	{
		$rcv = get_post();
		// var_dump($rcv);
		$data = $this->user_model->toggle_faculty($rcv['id_users']);

		if ($data) {
			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'User type changed!', 
					'' => '', 
					),
				));

		} else {
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Cant make this user a faculty!', 
					'' => '', 
					),
				));

		}
	}

}

/* End of file admin.php */
/* Location: ./application/controllers/admin.php */