# auntietuna-server

Server-Side Code for AuntieTuna's User Website.

Download AuntieTuna: https://github.com/cardi/auntietuna

## pre-requisites

-Install node.js: https://nodejs.org/en/

-Install express
```
npm install express
```
-Install mysql
```
$ npm install mysql
```

Installing mysql will automatically give you a root user and password. You want to Reset the root password by running the commands on mysql: 
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
ET PASSWORD FOR 'root'@'localhost' = PASSWORD('MyNewPass');
```


## running the server

TODO (e.g., `node server.js`, then connect to `localhost:3000`?)

# tasks to the minimum viable product (mvp)

_Note_: for now, ignore the "User" column, but that will require adding
an additional column in the database table, user authentication, etc.

1. [ ] user can upload known-good
   - (TODO fill in the missing pieces here)
2. [ ] website displays known-good
3. [ ] user can download known-good
