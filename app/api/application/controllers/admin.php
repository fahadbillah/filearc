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

	public function get_all_student()
	{
		$data = $this->user_model->get_all_student();


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

	public function get_all_additional_info()
	{

		$result = $this->user_model->get_all_additional_info();

		if (!!count($result)) {
			jsonify(array(
			        'success' => true, 
			        'data' => $result
			        ));
		} else {
			jsonify(array(
			        'success' => false, 
			        ));
		}
		
	}

	public function insert_additional_info()
	{
		$rcv = get_post();

		if ($rcv['id'] !== '') {
			$data = array(
			              'additional_info_name' => $rcv['name'],
			              'additional_info_value' => $rcv['value'],
			              );

			$this->db->where('id_additional_info', $rcv['id']);
			$result = $this->db->update('additional_infos', $data);
		} else {
			$data = array(
			              'additional_info_name' => $rcv['name'],
			              'additional_info_value' => $rcv['value'],
			              );

			$result = $this->db->insert('additional_infos', $data);
		}

		if ($result) {
			jsonify(array(
			        'success' => true, 
			        'message' => array(
			                           'message' => 'Successfully added!', 
			                           ),
			        ));

		} else {
			jsonify(array(
			        'success' => false, 
			        'message' => array(
			                           'message' => 'Failed!', 
			                           ),
			        ));

		}
	}

	public function search_additional_info($key = '')
	{
		pr($key);



	}

	public function student_completion_certificate()
	{
		$rcv = get_post();


		$additional_info_name = 'application_'.$rcv['student']->academic_id;

		$student = array(
		                 'additional_info_name' => $additional_info_name,
		                 'additional_info_value' => base64_encode(serialize($rcv)),
		                 );
		$result = $this->user_model->insert_student_completion_certificate($student);

		// echo "<pre>";
		// print_r($student);
		// echo $additional_info_name;
		// var_dump($rcv);
		// print_r($result);
		// echo "</pre>";
		jsonify($result);
	}

	public function test()
	{
		echo "<pre>";
		pr($this->user_model->get_all_additional_info());
		echo "</pre>";
	}

	public function get_all_passed_students()
	{
		$data = $this->user_model->get_all_passed_students();
		foreach ($data as $key => $value) {
			$data[$key]['additional_info_value'] = unserialize(base64_decode($value['additional_info_value']));
		}
		$filteredData = array();
		foreach ($data as $key => $value) {
			if ($value['additional_info_value']['facultyID'] == $this->session->userdata('academic_id')) {
				array_push($filteredData, $value);
			}
		}

		$result = array(
		                'success' => true,
		                'data' => $filteredData,
		                );
		jsonify($result);
	}

}

/* End of file admin.php */
/* Location: ./application/controllers/admin.php */