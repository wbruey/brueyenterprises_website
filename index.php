<html>
	<title>RISE DATABASE 1.0</title>
	<head>
		<img src="RiseLogo.jpg" width = 100% />  <!all info is in the img tag "self closing" "/" tag >
		<script>
		  // Initialize Firebase
		  var config = {
			apiKey: "AIzaSyB1Nxa4A1ZISBjMgtTdHczNxrnCF7HZP0s",
			authDomain: "brutest-3228a.firebaseapp.com",
			databaseURL: "https://brutest-3228a.firebaseio.com",
			projectId: "brutest-3228a",
			storageBucket: "brutest-3228a.appspot.com",
			messagingSenderId: "1099500974553"
		  };
		  firebase.initializeApp(config);
		  
		  var bigOne = document.getElementById('bigOne');
		  var dbRef = firebase.database().reg().child('text');
		  dbRef.on('value', snap => bigOne.innerText = snap.val());
		  
		</script>
	<head>
	
	<body>
		<h1>Forms_BRO3</h1>
			<a href="create_athlete.php">Create Athlete</a> <br>
			<a href="create_mentor.php">Create Mentor</a> <br>
			<a href="create_person.php">Create Person</a>
		
		<h1>Reports</h1>
			<a href="show_table.php/?table_name=athlete">All Athletes</a> <br>
			<a href="show_table.php/?table_name=mentor">All Mentors</a> <br>
			<a href="show_table.php/?table_name=person">All Persons</a>
	
		<h1 id="bigOne"></h1>
		
		<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>

	</body>
</html>