# Chatter
A small chat with profiles.

## Backend

### Sing In/Out/Up

####Passwords
The password should not walk in its pure form on the network. We achieve this with the following algorithm:
* Hash real password in frontend
* Send the hashed password to backend
* Hash and salt hashed password
* Save hashed and salt password to database

Hash and salt with bcrypt, in real projects it is better to use another library for thisю

#### Authorization
Authorization implemented using cookies. Cookies contain the following values:
```
jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjVmMTAzZjcyY2Q2NGMzMGI3ZTU5MzciLCJpYXQiOjE2MDAwNjU2MDIsImV4cCI6MTYwMDA2NTY2Mn0.w3W9cPW0uzYzSxfsgpjDhLCklIPoc9axKTOkYUixSLM; 
HttpOnly; 
Path=/; 
Max-Age=60
```
Method `https://[::]/signin` return new jwt in `response>headers>set-cookie`.

To get access to the method closed by authorization, you need to put the jwt parameter and its value in the header.
