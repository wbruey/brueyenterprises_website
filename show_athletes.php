<html>
	<body>
		<?php
			
			//LOAD SERVER CONFIGURATION FILE ==========================================
			$ini_array = parse_ini_file("server.ini");
			//print_r($ini_array);
			//=========================================================================
			
			
			//CREATE CONNECTION TO MYSQL SERVER =======================================
			//$con = new mysqli("localhost","ywnlwymy","bAdultWill35!","ywnlwymy_rise");	
			//$con = new mysqli("localhost:3306","root","wAdultWill35!","ywnlwymy_rise");
			$con = new mysqli($ini_array['server_name'],$ini_array['user_name'],$ini_array['password'],"ywnlwymy_rise");

			
			
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


			//DEFINE SQL QUERY ========================================================
			$sql_data="SELECT * FROM athlete";
			$sql_headers="SHOW COLUMNS FROM athlete";
			
			//==========================================================================

			//EXECUTE SQL QUIERY======================================================== 
			if (!$result_data = $con->query($sql_data))
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
			 if (!$result_headers = $con->query($sql_headers))
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
			//==========================================================================
			
			//USE THE QUERY  RESULTS=========================================================
			echo "<table border='1'>";
			while($row = mysqli_fetch_array($result_headers, MYSQLI_NUM)){
				echo "<th>" . $row[0] . "</th>";
			}

			while($row = mysqli_fetch_array($result_data, MYSQLI_ASSOC)){
				echo "<tr>";
				foreach($row as $field){
					echo "<td>" . $field . "</td>";
				}	
				echo "</tr>";
			}
			echo "</table>";
	
			//==========================================================================
			
			// CLOSE CONNECTION 
			$con->close();
		
		?>
		<br>
		<a href="index.php">HOME</a>
	
	</body>
</html>