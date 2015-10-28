<?php

	require 'vendor/autoload.php';
	use Mailgun\Mailgun;

	$mg = new Mailgun("");
	$domain = "mg.acornomedia.com";

	/*
	DONT FORGET TO DELETE THIS SCRIPT WHEN FINISHED!
	*/

	$from = $_REQUEST['requestQuoteEmail'];
	
	$to      = 'admin@acornomedia.com';
	$subject = 'Acorno Media Quotation Request';
	$message = 'Quotation Request from ' . $_REQUEST['requestQuoteEmail'];
	
	$headers = 'From: ' . $from . PHP_EOL 
		 . 'Reply-To: ' . $from . PHP_EOL 
		 . 'X-Mailer: PHP/' . phpversion(); 
	
	// $success = mail( $to, $subject, $message, $headers );
	$mg->sendMessage($domain, array('from'    => $from, 
	                                'to'      => $to, 
	                                'subject' => $subject, 
	                                'text'    => $message));
	
	// if ( isset( $success ) )
	// {	
		echo '<p><span class="highlight">We have received your quotation request and will get back to you shortly.</span></p>';
	// }
	// else
	// {
		// echo '<p><span class="highlight">We could not receive your quotation request. You may want to double check your email address.</span></p>';
	// };
	
?>