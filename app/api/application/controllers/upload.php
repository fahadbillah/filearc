<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	function index()
	{
		$this->load->view('uploader');
	}

	function do_upload()
	{
		// var_dump($_FILES);
		// $file_ext = explode('.', $this->input->post('name'));
		// $file_ext = $file_ext[count($file_ext)-1];
		// var_dump($this->input->post());
		// var_dump($file_ext);
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png|html';
		$config['max_size']	= '1000';
		$config['max_width']  = '1024';
		$config['max_height']  = '1024';
		$config['encrypt_name']  = true;
		// $config['file_name']  = $this->token(100);
		// $config['file_name']  = $this->token(100).'.'.$file_ext;

		// var_dump($config);

		// var_dump(is_dir('./uploads/'));

		// var_dump($_SERVER['SCRIPT_FILENAME']); 
		// exit();
		// var_dump($this->input->request_headers());
		$this->load->library('upload', $config);


		$this->upload->initialize($config); 
		// var_dump($this->upload->data());
		if ( ! $this->upload->do_upload('upload'))
		{
			$error = array('error' => $this->upload->display_errors());

			$error['error'] = $this->upload->display_errors();
			$error['success'] = false;
			$error['message'] = array(
				'title' => 'File upload failed!', 
				'body' => 'Please try again', 
				);
			

			$this->jsonify($error);
		}
		else
		{
			$data['upload_data'] = $this->upload->data();

			$db = array(
				'id_users' => 1, 
				'file_url' => $data['upload_data']['file_name']
				);

			$data['success'] = $this->db->insert('files', $db);
			if ($data['success'] === true) {
				$data['message'] = array(
					'title' => 'File upload successfull!', 
					'body' => '', 
					);
			}else{
				$data['message'] = array(
					'title' => 'File upload failed!', 
					'body' => 'database error!', 
					);

			}

			$this->jsonify($data);
		}
	}

	public function file_list()
	{
		$this->db->select('*');
		$this->db->from('files');
		$this->db->where('id_users', 1);
		$this->db->order_by('id_files', 'desc');
		$q = $this->db->get();
		// echo '<pre>';
		// print_r($q->result_array());
		// echo '</pre>';
		$this->jsonify($q->result_array());
	}

	public function jsonify($data)
	{
		echo json_encode($data);
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

	public function get_single_file($id_files)
	{
		$this->db->select('*');
		$this->db->from('files');
		$this->db->where('id_files', $id_files);
		$q = $this->db->get();
		$this->jsonify($q->result_array());
	}

	public function delete_file($id_files)
	{
		if($this->db->delete('files', array('id_files' => $id_files))){
			$data['success'] = true;
			$data['message'] = array(
				'body' => '', 
				'title' => 'File deleted successfull!', 
				);
			$this->jsonify($data);
		}else{
			$data['success'] = false;
			$data['message'] = array(
				'body' => '', 
				'title' => 'File delete failed!', 
				);
			$this->jsonify($data);
		}
	}

}

/* End of file upload.php */
/* Location: ./application/controllers/upload.php */