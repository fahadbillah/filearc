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
		$this->db->select('*');
		$this->db->from('users');
		$this->db->or_where('email', $data['login']);
		$this->db->or_where('academic_id', $data['login']);
		$this->db->where('password', $data['password']);
		$q = $this->db->get();
		return $q->result_array();
	}

}

/* End of file user_model.php */
/* Location: ./application/models/user_model.php */