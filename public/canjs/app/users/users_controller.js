can.Control("App.Users",{},
{
	init: function(element) { 
		this.container = this.element;
		this.element.html(can.view('../app/users/ejs/user.ejs'));
	}	
});