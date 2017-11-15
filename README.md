# auntietuna-server

Server-side code for AuntieTuna's known-good sharing site.

[AuntieTuna](https://github.com/cardi/auntietuna): lightweight,
personalized content-based phishing detection for the Chrome browser.

## pre-requisites
To use the auntietuna-server on your computer, you would need to:

1. Install node.js: https://nodejs.org/en/
2. Install `npm`
3. Using `npm`:
  1. Install express

        $ npm install express

  2. Install mysql

        $ npm install mysql
4. Install `mysql`

### macOS and MacPorts

If you're using MacPorts, the following instructions should work:

```
sudo port install nodejs8 npm5
```

### installing mysql

Installing mysql will automatically give you a root user and password.
You want to Reset the root password by running the commands on mysql:


```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPass');
```
From here, you can create a new user and grant them permissions:
```
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
```

## running the server
On the browser (preferably Chrome), connect to localhost. You can do this by typing `http://localhost:3000/` in the top search bar of the browser. In my code, I have the server connect to localhost:3000.

Currently, the browser doesn't display anything until you run the server. To run the server, open the directory where your server code lies and run the following command on your command-prompt:
```
node server.js
```
Your browser should update with your html code.

## interacting with the website
Now that you have the server running and it displays the user website and its data, you can either download data existing on the site or import your own hashes onto the database.

Let's first disregard the Google Sign-In button at the moment since Username features are not yet implemented.

To download data from the site, you first select the data you want by checking the box the right of the data you want. At the bottom of the table, you would then select the `Download Selected` button. If you had wanted to download all of the data on the table, you could just select the `Download All` button at the bottom of the table. Your downloaded data will be in the format of a JSON file.

Once you have downloaded the data you want, you would import it to your own auntietuna database by clicking the `Choose File` button at the top of your table and select the JSON file containing the data you want to import.

To import your own data onto the user site, you first need to have data you wish to import. This data will need to be in the format of a JSON file and can be attained by downloading data from your personal auntietuna database or the `debug` feature on your auntietuna plug-in (appears on the popup menu). You would then click on `Choose File` on the user site and select the JSON file with data you wish to import.                                                           

# tasks to the minimum viable product (mvp)

_Note_: for now, ignore the "User" column, but that will require adding
an additional column in the database table, user authentication, etc.

1. [ ] user can upload known-good
   - have a downloaded hash that you would want to add to the website
   - import the json file by clicking "Choose File" like in AuntieTuna plug-in
2. [ ] website displays known-good
3. [ ] user can download known-good
