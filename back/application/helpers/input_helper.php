<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function get_post()
{
	return (array) json_decode(file_get_contents("php://input"));
}

/* End of file input_helper.php */
/* Location: ./application/helpers/input_helper.php */