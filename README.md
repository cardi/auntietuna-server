# auntietuna-server

Server-side code for AuntieTuna's known-good sharing site.

[AuntieTuna](https://github.com/cardi/auntietuna): lightweight,
personalized content-based phishing detection for the Chrome browser.

## pre-requisites

This is how I set up the current server for the user site.

1. Install node.js: https://nodejs.org/en/
2. Install express

        $ npm install express

3. Install mysql

        $ npm install mysql

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

TODO (e.g., `node server.js`, then connect to `localhost:3000`?)

On the browser, connect to localhost. In my code, I connect to
localhost:3000. To run the server, open the directory where your server
code lies and run the following command: 

```
node server.js
```

Your browswer should update with your html code. 

# tasks to the minimum viable product (mvp)

_Note_: for now, ignore the "User" column, but that will require adding
an additional column in the database table, user authentication, etc.

1. [ ] user can upload known-good
   - have a downloaded hash that you would want to add to the website
   - import the json file by clicking "Choose File" like in AuntieTuna plug-in
2. [ ] website displays known-good
3. [ ] user can download known-good
