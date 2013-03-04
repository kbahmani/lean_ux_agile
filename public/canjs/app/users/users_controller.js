can.Control("Fuzz.App.Users",{},
{
	init: function(element) { 
		this.container = this.element;
		// new Global.App.ContentSectionCtrl(this.element);
		this.element.html(can.view('../app/users/ejs/user.ejs'));
	}	
});