can.Model("App.User", 
{
	findAll : 'GET /users',
	create  : 'POST /users',
	update  : 'PUT /users/{id}',
	destroy : 'DELETE /users/{id}'
},{});