<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class File_model extends CI_Model {

	public $variable;

	public function __construct()
	{
		parent::__construct();
	}

	public function insert_file_info($file)
	{
		$this->db->insert('files', $file);
		return $this->db->insert_id();
	}

	public function get_all_categories()
	{
		$this->db->select('id_categories, category_name');
		$this->db->from('categories');
		$q = $this->db->get();
		return $q->result_array();
	}

	public function get_files_by_user($id_users)
	{
		$this->db->select('*');
		$this->db->from('files');
		$this->db->where('id_users', $id_users);
		$this->db->order_by('id_files', 'desc');
		$q = $this->db->get();
		return $q->result_array();
	}

	public function insert_tags($data,$file_id)
	{
		$this->db->trans_begin();

		$tags = array();
		foreach ($data as $key => $value) {

			$value = (array) $value;

			if (isset($value['$$hashKey']))
				unset($value['$$hashKey']);

			pr($value);

			if ($value['id_tags'] == null) {
				$this->db->insert('tags', array(
					'tag_name' => $value['tag_name']
					));
				$tag_id = $this->db->insert_id();
			}else{
				$tag_id = $value['id_tags'];
			}

			$this->db->insert('file_tags', array(
				'id_files' => $file_id, 
				'id_tags' => $tag_id, 
				));
		}

		if ($this->db->trans_status() === FALSE)
		{
			$this->db->trans_rollback();
			return false;
		}
		else
		{
			$this->db->trans_commit();
			return true;
		}
	}

	public function get_all_tags()
	{
		$q = $this->db->get('tags');
		return $q->result_array();
	}

	public function get_file_tags($id_files)
	{
		$this->db->select('tags.tag_name');
		$this->db->from('tags');
		$this->db->join('file_tags', 'file_tags.id_tags = tags.id_tags', 'left');
		$this->db->where('file_tags.id_files', $id_files);
		$q = $this->db->get();
		return $q->result_array();
	}

	public function get_files($options)
	{
		$this->db->select('
			files.id_files,
			files.file_title,
			files.file_url,
			files.file_details,
			files.file_added,
			users.id_users,
			users.user_type,
			users.first_name,
			users.last_name,
			user_likes.id_users likes,
			user_archives.id_users favorites
			');

		/*
		,
			count( user_likes.id_files ) as total_like,
			files.file_category,
			categories.category_name,
			count( user_archives.id_files ) as total_favorite
		*/
			$this->db->from('files');
			$this->db->join('users', 'users.id_users = files.id_users', 'left');
			// $this->db->join('categories', 'categories.id_categories = files.file_category', 'left');
			$this->db->join('user_likes', 'user_likes.id_files = files.id_files', 'left');
			$this->db->join('user_archives', 'user_archives.id_files = files.id_files', 'left');
		// $this->db->group_by('user_archives.id_files');

			// if (isset($options['offset']) && isset($options['limit'])) {
			// 	$this->db->limit($options['limit'],$options['offset']);
			// }

			if (isset($options['order_by'])) {
				$this->db->order_by($options['order_by'], $options['order_by_type']);
			}

			if (isset($options['filter'])) {
				foreach ($options['filter'] as $key => $value) {
					$this->db->where($value['key'], $value['value']);
				}
			}

			$q = $this->db->get();
			return $q->result_array();
		}

		public function get_file_details($id_files)
		{
			$this->db->select('
				files.id_files,
				files.file_title,
				files.file_url,
				files.file_details,
				files.file_added,
				users.id_users,
				users.first_name,
				users.last_name,
				file_tags.id_files,
				file_tags.id_tags,
				tags.tag_name,
				');
			/*
				files.file_category,
				categories.category_name,
			*/
				$this->db->from('files');
				$this->db->join('users', 'users.id_users = files.id_users', 'left');
			// $this->db->join('categories', 'categories.id_categories = files.file_category', 'left');
				$this->db->join('file_tags', 'file_tags.id_files = files.id_files', 'left');
				$this->db->join('tags', 'file_tags.id_tags = tags.id_tags', 'left');
				$this->db->where('files.id_files', $id_files);
				$q = $this->db->get();
				return $q->result_array();
			}

			public function get_single_file_data($options)
			{
				$this->db->select('*');
				$this->db->from('files');
				$this->db->where($options['column'], $options['key']);
				$q = $this->db->get();
				return $q->result_array();
			}

			public function update_profile_picture($data)
			{
				$this->db->where('id_users', $data['id_users']);
				return $this->db->update('users', $data['profile_picture']);
			}

			public function get_user_info($id_users)
			{
				$this->db->select('
					id_users,
					first_name,
					last_name,
					email,
					profile_picture,
					academic_id
					');
				$this->db->from('users');
				$this->db->where('id_users', $id_users);
				$q = $this->db->get();
				return $q->result_array();
			}

			public function get_user_file_count($id_users)
			{
				$this->db->where('id_users', $id_users);
				return $this->db->count_all_results('files');
			}

			public function like_update($data)
			{
				$this->db->trans_begin();


				$this->db->where('id_users', $data['id_users']);
				$this->db->where('id_files', $data['id_files']);
				$this->db->from('user_likes');
				$archive_result = $this->db->count_all_results();

				if ($archive_result>0) {
					$this->db->where('id_users', $data['id_users']);
					$this->db->where('id_files', $data['id_files']);
					$this->db->delete('user_likes');
					$add = false;
				}else{
					$this->db->insert('user_likes', $data);
					$add = true;
				}


				if ($this->db->trans_status() === FALSE)
				{
					$this->db->trans_rollback();
					return array(
						'success' => false, 
						);
				}
				else
				{
					$this->db->trans_commit();
					return array(
						'success' => true, 
						'add' => $add, 
						);
				}
			}

			public function favorite_status_update($data)
			{
				$this->db->trans_begin();


				$this->db->where('id_users', $data['id_users']);
				$this->db->where('id_files', $data['id_files']);
				$this->db->from('user_archives');
				$archive_result = $this->db->count_all_results();

				if ($archive_result>0) {
					$this->db->where('id_users', $data['id_users']);
					$this->db->where('id_files', $data['id_files']);
					$this->db->delete('user_archives');
					$add = false;
				}else{
					$this->db->insert('user_archives', $data);
					$add = true;
				}


				if ($this->db->trans_status() === FALSE)
				{
					$this->db->trans_rollback();
					return array(
						'success' => false, 
						);
				}
				else
				{
					$this->db->trans_commit();
					return array(
						'success' => true, 
						'add' => $add, 
						);
				}
			}

			public function is_favorite($id_files,$id_users)
			{
				$this->db->where('id_users', $id_users);
				$this->db->where('id_files', $id_files);
				$this->db->from('user_archives');
				if($this->db->count_all_results()>0)
					return true;
				else
					return false;
			}

			public function is_liked($id_files,$id_users)
			{
				$this->db->where('id_users', $id_users);
				$this->db->where('id_files', $id_files);
				$this->db->from('user_likes');
				if($this->db->count_all_results()>0)
					return true;
				else
					return false;
			}

			public function total_like_by_file($id_files)
			{
				$this->db->where('id_files', $id_files);
				$this->db->from('user_likes');
				return $this->db->count_all_results();
			}


			public function total_favorite_by_file($id_files)
			{
				$this->db->where('id_files', $id_files);
				$this->db->from('user_archives');
				return $this->db->count_all_results();
			}

			public function total_liked($id_files)
			{
				$this->db->where('id_files', $id_files);
				$this->db->from('user_likes');
				return $this->db->count_all_results();
			}

			public function total_favorite($id_files)
			{
				$this->db->where('id_files', $id_files);
				$this->db->from('user_archives');
				return $this->db->count_all_results();
			}



			public function delete_file($id_files,$id_users)
			{
				$this->db->where('id_users', $id_users);
				$this->db->where('id_files', $id_files);
				return $this->db->delete('files');
			}

		}

		/* End of file file_model.php */
/* Location: ./application/models/file_model.php */