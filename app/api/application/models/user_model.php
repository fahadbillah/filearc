<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	public $variable;

	public function __construct()
	{
		parent::__construct();
		
	}

	public function check_if_exists($data)
	{
		$this->db->select($data['column']);
		$this->db->from($data['table']);
		$this->db->where($data['column'], $data['value']);
		$q = $this->db->get();
		return $q->result_array();
	}

	public function add_user($user_data)
	{
		return $this->db->insert('users', $user_data);
	}


	public function login_check($data)
	{
		// vd($data);
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where('email', $data['login']);
		// $this->db->or_where('academic_id', $data['login']);
		$this->db->where('password', $data['password']);
		$q = $this->db->get();
		// vd($q->result_array());
		return $q->result_array();
	}

	public function activation_code_exists($activation_code)
	{
		$this->db->select('id_users,activation_code');
		$this->db->from('users');
		$this->db->where('activation_code', $activation_code);
		$q = $this->db->get();
		return $q->result_array();
	}

	public function update_activation_code($data,$id_users)
	{
		$this->db->where('id_users', $id_users);
		$this->db->update('users', $data);
	}

	public function get_all_non_faculty()
	{
		$this->db->select('
			id_users,
			first_name,
			last_name,
			email,
			academic_id,
			user_type,
			');
		$this->db->from('users');
		$this->db->where('user_type', null);
		$this->db->or_where('user_type', 'student');
		$q = $this->db->get();
		return $q->result_array();
	}

	public function get_all_faculty()
	{
		$this->db->select('
			id_users,
			first_name,
			last_name,
			email,
			academic_id,
			user_type,
			');
		$this->db->from('users');
		$this->db->or_where('user_type', 'faculty');
		$q = $this->db->get();
		return $q->result_array();
	}

	public function toggle_faculty($id_users)
	{
		$this->db->select('user_type');
		$this->db->from('users');
		$this->db->where('id_users', $id_users);
		$q1 = $this->db->get();

		// var_dump($q1->result_array());
		// return false;
		if ($q1->result_array()[0]['user_type'] != 'faculty') {
			$data = array(
				'user_type' => 'faculty', 
				);
		}else{
			$data = array(
				'user_type' => 'student', 
				);
		}
		$this->db->where('id_users', $id_users);
		return $this->db->update('users', $data);
	}

}

/* End of file user_model.php */
/* Location: ./application/models/user_model.php */