<?php

	//SMTP server settings	
	$host = "mail2.drdonndds.com";
    $port = "587";
    $username = "contact@drdonndds.com";
    $password = "Snow007!";
	
	
	$messageBody = "";
	
	if($_POST['name']!='false'){
		$messageBody .= '<p>Visitor: ' . $_POST["name"] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['email']!='false'){
		$messageBody .= '<p>Email Address: ' . $_POST['email'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}else{
		$headers = '';
	}
	if($_POST['state']!='false'){		
		$messageBody .= '<p>State: ' . $_POST['state'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['phone']!='false'){		
		$messageBody .= '<p>Phone Number: ' . $_POST['phone'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}	
	if($_POST['fax']!='false'){		
		$messageBody .= '<p>Fax Number: ' . $_POST['fax'] . '</p>' . "\n";
		$messageBody .= '<br>' . "\n";
	}
	if($_POST['message']!='false'){
		$messageBody .= '<p>Message: ' . $_POST['message'] . '</p>' . "\n";
	}
	
	if($_POST["stripHTML"] == 'true'){
		$messageBody = strip_tags($messageBody);
	}
	
	if($host=="" or $username=="" or $password==""){
		$owner_email = $_POST["owner_email"];
		$headers = 'From:' . $_POST["email"] . "\r\n" . 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
		$subject = 'A message from your site visitor ' . $_POST["name"];
		
		try{
			if(!mail($owner_email, $subject, $messageBody, $headers)){
				throw new Exception('mail failed');
				}else{
				echo 'mail sent from mail method';
			}
			}catch(Exception $e){
			echo $e->getMessage() ."\n";
		}
	}else{	
		require_once("C:\Program Files (x86)\Plesk\Additional\PleskPHP5\PEAR\Mail.php'") ;

		$to = $_POST["owner_email"];
		$subject = 'A message from your site visitor ' . $_POST["name"];
		$headers = array (
		'From' => 'contact@drdonndds.com' ,
		'To' => $to,
		'reply_to' => $_POST["email"],
		'Subject' => $subject);
				
		$smtp = Mail::factory(
					'smtp',
					array (
						'host' => $host,
						'port' => $port,
						'auth' => true,
						'username' => $username,
						'password' => $password));

		$mail = $smtp->send($to, $headers, $messageBody);
		
		try{
			if(PEAR::isError($mail)){
				echo $mail->getMessage();
				}else{
				echo 'mail sent';
			}
			}catch(Exception $mail){
			echo $mail->getMessage() ."\n";
		}
	}	
?>