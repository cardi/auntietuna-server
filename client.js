console.log("Client is running code...");

//gets the mysql data that server sent to "localhost:3000/data"
var mysql_data = [];
$.ajax({
  url: 'http://localhost:3000/data',
  complete: function(data) {
    mysql_data = JSON.parse(data.responseText);
    console.log(mysql_data);
    for(var i = 0; i < mysql_data.length; i++){
      console.log("LOADING DATA.....");
      loadData(mysql_data[i]);
    }
  }
});



//display mysql data on table:
function loadData(data){
  var table = document.getElementById("myTable");

    var row = table.insertRow(1);
  	var cell1 = row.insertCell(0);
  	var cell2 = row.insertCell(1);
  	var cell3 = row.insertCell(2);
  	var cell4 = row.insertCell(3);
  	var cell5 = row.insertCell(4);
  	var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

  	cell1.innerHTML = '<button class= "check" ></button>';
  	cell2.innerHTML = '<button class= "trash" ></button>';

    cell3.innerHTML = data['user'];
    cell4.innerHTML = data['date'];
	  cell5.innerHTML = data['domain'];
    cell6.innerHTML = '<button class = "getHash">debug</button> <input class="chooseDownload" type="checkbox">';

}


//Google Sign-in
var name = "";
function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();

				name = profile.getName();


        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + name);
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      };

//Google Sign-Out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

/*
Might need to send POST request to server so that server can add data into database.
*/
function importHash(evt){
  var values;
  var f = this.files[0];
	console.log('file received');
  console.log(f);

//there is a file to read
  if (f){
    console.log("reading file...");
    var reader = new FileReader();
    reader.readAsText(f);

    reader.onload = function(e){
      console.log("result is: " + e.target.result);
      var result = JSON.parse(e.target.result);
      values = result;
      // values.import = true;
      console.log(result);
      console.log(values.length + " of the values are: " + values);


		}
	}
}



document.getElementById('signout').addEventListener('click', signOut);
document.getElementById('import').addEventListener('click', importHash);
