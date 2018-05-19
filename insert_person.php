<html>
	<body>
		<?php
			
			//LOAD SERVER CONFIGURATION FILE ==========================================
			$ini_array = parse_ini_file("server.ini");
			//print_r($ini_array);
			//=========================================================================
			
			
			//CREATE CONNECTION TO MYSQL SERVER =======================================
			//$con = new mysqli("localhost","brueyent","bAdultWill36!","brueyent_rise");	
			//$con = new mysqli("localhost:3306","root","wAdultWill35!","brueyent_rise");
			$con = new mysqli($ini_array['server_name'],$ini_array['user_name'],$ini_array['password'],"brueyent_rise");

			
			
			// Oh no! A connect_errno exists so the connection attempt failed!
			if ($con->connect_errno) {
				// The connection failed. What do you want to do? 
				// You could contact yourself (email?), log the error, show a nice page, etc.
				// You do not want to reveal sensitive information

				// Let's try this:
				echo "Sorry, this website is experiencing problems.";

				// Something you should not do on a public site, but this example will show you
				// anyways, is print out MySQL error related information -- you might log this
				echo "Error: Failed to make a MySQL connection, here is why: \n";
				echo "Errno: " . $mysqli->connect_errno . "\n";
				echo "Error: " . $mysqli->connect_error . "\n";
				
				// You might want to show them something nice, but we will simply exit
				exit;
			}
			//==========================================================================


			//DEFINE SQL QUERY =========================================================
			$sql="INSERT INTO person (id,first_name,last_name,address_1,address_2,address_city,address_state,address_zip,address_country,phone_1,phone_2,birthday,email)
			VALUES
			('$_POST[id]','$_POST[first_name]','$_POST[last_name]','$_POST[address_1]','$_POST[address_2]','$_POST[address_city]','$_POST[address_state]','$_POST[address_zip]','$_POST[address_country]','$_POST[phone_1]','$_POST[phone_2]','$_POST[birthday]','$_POST[email]')";
			//==========================================================================

			//EXECUTE SQL QUIERY======================================================== 
			if (!$result = $con->query($sql))
			  {
				// Oh no! The query failed. 
				echo "Sorry, the website is experiencing problems.";

				// Again, do not do this on a public site, but we'll show you how
				// to get the error information
				echo "Error: Our query failed to execute and here is why: \n";
				echo "Query: " . $sql . "\n";
				echo "Errno: " . $mysqli->errno . "\n";
				echo "Error: " . $mysqli->error . "\n";
				exit;
			  } 
				echo "Person Created!";  // <<< SUCCESSFUL RESPONSE =====
			$con->close();
			//==========================================================================
		?>
		<br>
		<a href="index.php">HOME</a>
	
	</body>
</html>