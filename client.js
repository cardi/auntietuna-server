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



/*
@param data - each row that can be found in the AuntieTuna mysql database

display mysql data on table and action buttons as well.
Need to do:
- add functionality to buttons
- organize buttons and "actions" collumn

*/
function loadData(data){
  var table = document.getElementById("myTable");
  //console.log( JSON.parse(data['hash']));

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

    loadButtons();
}

/*
@params googleUser

Signs in user and accesses basic data from user profile
*/

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

  //retrieve hashes from row index to put into JSON file
  function getJSON(){
     var button = this.innerHTML;
     var row = this.parentNode.parentNode;
     var site = row.cells[4].innerHTML;
     var data;
     console.log(site);
     console.log("accessing: "+ site);
     console.log(mysql_data);

    //loop through data to get info
     for(var i = 0; i < mysql_data.length; i++){
       if(mysql_data[i]['domain'] == site){
        data = {
           user: mysql_data[i]['user'],
           date: mysql_data[i]['date'],
           domain: mysql_data[i]['domain'],
           hash: JSON.parse(mysql_data[i]['hash'])
         }

         // data.push(a);
          console.log(data);
       }
     }
        if(button == "debug"){
          console.log("...value retrieved from " + site);
          var w = window.open();
            w.document.open();
            w.document.write(JSON.stringify(data));
            w.document.close();

        } else { //button == "Download Selected"
        var hashes;
        console.log(site + " has been added to download queue...");
        var storedData = localStorage.getItem("hashes");
        if(storedData){
          hashes = JSON.parse(storedData);
        }
        hashes.push(data);
        console.log(hashes);
        localStorage.setItem("hashes", JSON.stringify(hashes));
        }
  }

/*
download files saved onto local storage
*/
function downloadSelected(){
  var hashes = [];
  var storedData = localStorage.getItem("hashes" || "[]");
  if(storedData){
    //console.log(storedData);
    hashes = storedData
    console.log(hashes);
  }
  // hashes = JSON.stringify(hashes);
  // console.log("SAVING: " + hashes);
  var blob = new Blob([hashes], {type: "application/json;charset=utf-8"});
  var url = window.URL.createObjectURL(blob);
  var name = "hashes" + ".json";

  saveAs(blob,name);
}

/*
Download all of the Hashes
*/
function downloadAll(){
  var myJSON = [];

  for(var i = 0; i < mysql_data.length; i++){
    var a = {
      user: mysql_data[i]['user'],
      date: mysql_data[i]['date'],
      domain: mysql_data[i]['domain'],
      hash: JSON.parse(mysql_data[i]['hash'])
    }
    myJSON.push(a);
  }
  console.log(myJSON);
  console.log(JSON.stringify(myJSON));
  myJSON = JSON.stringify(myJSON);
  var blob = new Blob([myJSON], {type: "application/json;charset=utf-8"});
  var url = window.URL.createObjectURL(blob);
  var name = "hashes.allHashes" + ".json";

  saveAs(blob,name);
  console.log("...download completed");
}


/*
Might need to send POST request to server so that server can add data into database. (DONE)
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

function loadButtons(){

  var hashButtons = document.getElementsByClassName("getHash");
  var trashButtons = document.getElementsByClassName("trash");
  var enableButtons = document.getElementsByClassName("check");
  var checkBoxes = document.getElementsByClassName("chooseDownload");
  //console.log("hash buttons #: " + hashButtons.length);
  for(var i = 0; i < hashButtons.length; i++){
      hashButtons[i].addEventListener('click', getJSON);
      // trashButtons[i].addEventListener('click', removeRow);
      // enableButtons[i].addEventListener('click', enableSite);
      checkBoxes[i].addEventListener('click', getJSON);
  }

}
//keep array of data to be exported
localStorage.hashes = "[]";

document.getElementById('signout').addEventListener('click', signOut);
document.getElementById('import').addEventListener('click', importHash);
document.getElementById('all').addEventListener('click', downloadAll);
document.getElementById('selected').addEventListener('click', downloadSelected);
