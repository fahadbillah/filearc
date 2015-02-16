<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class File extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		// echo '<pre>';
		// var_dump($this->session->all_userdata());
		// echo '</pre>';
		if ($this->session->userdata('logged_in') !== true) {
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Not logged in!', 
					'body' => 'Please login first', 
					),
				'action' => array(
					'actionName' => 'redirect', 
					'url' => '#/auth', 
					)
				));
			exit();
		}
		$this->load->model('File_model');
	}

	public function index()
	{
		// var_dump(is_dir('./uploads/1'));
		// if (!is_dir('./uploads/1')) {
		// 	var_dump(mkdir('./uploads/1', 0755, true));
		// }
		// var_dump(mkdir('./uploads/1', 0755, true));
		var_dump($this->session->userdata('id_users'));
	}

	public function do_upload()
	{
		if (!is_dir('./uploads/'.$this->session->userdata('id_users'))) {
			if(mkdir('./uploads/'.$this->session->userdata('id_users'), 0755, true) !== true){
				jsonify(array(
					'success' => false, 
					'message' => array(
						'title' => 'Cannot create user folder in server!', 
						'body' => '', 
						),
					'action' => array(
						'actionName' => 'server_fail', 
						),
					));
				exit();
			}
		}

		$config['upload_path'] = './uploads/'.$this->session->userdata('id_users');
		$config['allowed_types'] = 'gif|jpg|png|pdf|xlsx|docx|doc|word|xls|text|txt|wav|mp3|zip|tar|csv|psd|mpeg|mpg|mov|avi';
		$config['max_size']	= '1000';
		$config['max_width']  = '1024';
		$config['max_height']  = '1024';
		$config['file_name']  = $this->token(100);
		pr((array) json_decode(implode('', $this->input->post())));
		// exit();
		$this->load->library('upload', $config);
		// pr($this->input->request_headers());
		// vd($this->upload->do_upload('upload'));
		// vd($this->upload->data());
		// exit();

		$form_data = (array) json_decode(implode('', $this->input->post()));

		if ( ! $this->upload->do_upload('upload'))
		{
			$error = array('error' => $this->upload->display_errors());

			// var_dump($error);

			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'File upload failed!', 
					'body' => 'Please try again.', 
					),
				));

			// $this->load->view('upload_form', $error);
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());

			$db = array(
				'id_users' => $this->session->userdata('id_users'),
				'file_title' => $form_data['title'],
				'file_url' => $this->session->userdata('id_users').'/'.$data['upload_data']['file_name'],
				'file_details' => $form_data['details'],
				);

			$file_id = $this->File_model->insert_file_info($db);

			$tags = $form_data['tags'];
			$this->File_model->insert_tags($tags,$file_id);

			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'File upload successful!', 
					'body' => '', 
					),
				'action' => array(
					'actionName' => 'redirect', 
					'url' => '#/success/103', 
					)
				));

			// var_dump($data);
			// $this->load->view('upload_success', $data);
		}
	}


	public function upload_profile_pic()
	{
		if (!is_dir('./uploads/'.$this->session->userdata('id_users'))) {
			if(mkdir('./uploads/'.$this->session->userdata('id_users'), 0755, true) !== true){
				jsonify(array(
					'success' => false, 
					'message' => array(
						'title' => 'Cannot create user folder in server!', 
						'body' => '', 
						),
					'action' => array(
						'actionName' => 'server_fail', 
						),
					));
				exit();
			}
		}

		$config['upload_path'] = './uploads/'.$this->session->userdata('id_users');
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']	= '1000';
		$config['max_width']  = '1024';
		$config['max_height']  = '1024';
		$config['file_name']  = $this->token(100);
		// pr((array) json_decode(implode('', $this->input->post())));
		// exit();
		$this->load->library('upload', $config);
		// pr($this->input->request_headers());
		// vd($this->upload->do_upload('upload'));
		// vd($this->upload->data());
		// exit();

		// $form_data = (array) json_decode(implode('', $this->input->post()));

		if ( ! $this->upload->do_upload('upload'))
		{
			$error = array('error' => $this->upload->display_errors());

			// var_dump($error);

			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Profile picture upload failed!', 
					'body' => 'Please try again.', 
					),
				));

			// $this->load->view('upload_form', $error);
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());

			$db = array(
				'id_users' => $this->session->userdata('id_users'),
				'profile_picture' => array(
					'profile_picture' => $this->session->userdata('id_users').'/'.$data['upload_data']['file_name'],
					)
				
				);

			$profile_picture = $this->File_model->update_profile_picture($db);


			if ($profile_picture === true) {
				jsonify(array(
					'success' => true, 
					'message' => array(
						'title' => 'Profile picture upload successful!', 
						'body' => '', 
						)
					));
			} else {
				jsonify(array(
					'success' => false, 
					'message' => array(
						'title' => 'Profile picture upload failed!', 
						'body' => '', 
						)
					));
			}

			// var_dump($data);
			// $this->load->view('upload_success', $data);
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

	public function get_categories()
	{
		$data = array(
			'success' => true, 
			'data' => $this->File_model->get_all_categories(), 
			);
		jsonify($data);
	}

	public function get_my_files()
	{
		jsonify(array(
			'success' => true, 
			'data' => $this->File_model->get_files_by_user($this->session->userdata('id_users'))
			));
	}

	public function get_favorite_files($limit = 5,$offset = 0)
	{
		$options = array(
			'limit' => $limit, 
			'offset' => $offset, 
			'order_by' => 'file_added', 
			'order_by_type' => 'desc', 
			'filter' => array(
				array(
					'key' => 'user_archives.id_users' , 
					'value' => $this->session->userdata('id_users'), 
					),
				),
			);
		jsonify(array(
			'success' => true, 
			'data' => $this->File_model->get_files($options)
			));
	}

	public function get_recent_files($limit = 5,$offset = 0)
	{
		$options = array(
			// 'limit' => $limit, 			// loading all files data from the history of the mankind
			// 'offset' => $offset, 		
			'order_by' => 'file_added', 
			'order_by_type' => 'desc', 
			);

		$all_files = $this->File_model->get_files($options);

		foreach ($all_files as $key => $value) {
			$all_files[$key]['tags'] = $this->File_model->get_file_tags($value['id_files']);
		}

		jsonify(array(
			'success' => true, 
			'data' => $all_files
			));
	}

	public function add_tag()
	{
		$data = array(
			'tag_name' => $this->input->post('tag')
			);
		$result = $this->File_model->insert_tag($data);
		if ($result === true) {
			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'Tag added successful!', 
					'body' => '', 
					)
				));
		}else{
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Tag add failed!', 
					'body' => '', 
					)
				));

		}
	}

	public function get_all_tags()
	{
		$result = $this->File_model->get_all_tags();
		$success = (count($result)>0) ? true : false;
		jsonify(array(
			'success' => $success, 
			'data' => $result
			));
	}

	public function get_my_profile_info()
	{
		$data['info'] = $this->File_model->get_user_info($this->session->userdata('id_users'));
		$data['file_count'] = $this->File_model->get_user_file_count($this->session->userdata('id_users'));
		jsonify($data);
	}

	public function get_file_details($id_files)
	{
		$file = $this->File_model->get_file_details($id_files);
		$success = (count($file) > 0) ? true : false;

		$is_favorite = $this->File_model->is_favorite($id_files,$this->session->userdata('id_users'));
		
		$is_liked = $this->File_model->is_liked($id_files,$this->session->userdata('id_users'));

		$total_favorite = $this->File_model->total_favorite($id_files);
		
		$total_liked = $this->File_model->total_liked($id_files);

		jsonify(array(
			'success' => $success, 
			'data' => $file, 
			'is_favorite' => $is_favorite, 
			'is_liked' => $is_liked, 
			'total_favorite' => $total_favorite, 
			'total_liked' => $total_liked, 
			));
	}

	public function toggle_favorite($id_files)
	{
		$data = array(
			'id_users' => $this->session->userdata('id_users'), 
			'id_files' => $id_files, 
			);

		$result = $this->File_model->favorite_status_update($data);
		if($result['success'] === true){
			jsonify(array(
				'success' => true, 
				'action' => array(
					'actionName' => 'toggleFavorite', 
					'value' => $result['add'], 
					),
				'message' => array(
					'title' => 'Save successful!', 
					'body' => '', 
					),
				'total_favorite' => $this->File_model->total_favorite($id_files)
				));
		}else{
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Save failed!', 
					'body' => '', 
					)
				));
		}
	}

	public function toggle_like($id_files)
	{
		$data = array(
			'id_users' => $this->session->userdata('id_users'), 
			'id_files' => $id_files, 
			);

		$result = $this->File_model->like_update($data);
		if($result['success'] === true){
			jsonify(array(
				'success' => true, 
				'action' => array(
					'actionName' => 'toggleLike', 
					'value' => $result['add'], 
					),
				'message' => array(
					'title' => 'Liked!', 
					'body' => '', 
					),
				'total_liked' => $this->File_model->total_liked($id_files)
				));
		}else{
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'Unliked!', 
					'body' => '', 
					)
				));
		}
	}

	public function delete_file($id_files)
	{
		if($this->File_model->delete_file($id_files, $this->session->userdata('id_users')) === true){
			
			jsonify(array(
				'success' => true, 
				'message' => array(
					'title' => 'File Deleted!', 
					'body' => '', 
					),
				));
		}else{
			
			jsonify(array(
				'success' => false, 
				'message' => array(
					'title' => 'File Delete Failed!', 
					'body' => '', 
					),
				));
		}

	}

	public function test()
	{
		$options = array(
			// 'limit' => 10, 
			// 'offset' => 0, 
			'order_by' => 'file_added', 
			'order_by_type' => 'desc', 
			);
		pr($this->File_model->get_files($options));
	}

}

/* End of file upload.php */
/* Location: ./application/controllers/upload.php */