# Linkfree

## Create your personal portfolio in few minutes

### user route

http://localhost:5000/api/register => [name, email, password, username]
http://localhost:5000/api/login => [username, password] => return token
http://localhost:5000/api/update => [username, password], token
http://localhost:5000/api/delete => token

### profile route

http://localhost:5000/profile/:username => token(optional)
http://localhost:5000/profile/update => token
