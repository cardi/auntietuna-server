console.log("Client is running code...");

//gets the mysql data that server sent to "localhost:3000/data"
var mysql_data = [];
$.ajax({
  url: 'http://localhost:3000/data',
  complete: function(data) {
    mysql_data = JSON.parse(data.responseText);
    console.log(mysql_data);
  }
});


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
