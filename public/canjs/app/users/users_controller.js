can.Control("App.Users",{},
{
	init: function(element) { 
		this.container = this.element;
		this.element.html(can.view('../app/users/ejs/user_layout.ejs'));
		this.init_user_list();
	},
	init_user_list: function(){
		var panel = this.element.find('.user_list');
		var User = App.User;
		User.findAll( {}, function( list ) {
			for(var i=0;i<list.length;i++){
				panel.append(can.view('../app/users/ejs/user.ejs', {data: list[i]}))
			}
		});
	},
	'.add_user click': function(ui, event){
		var self = this;
		var User = App.User;
		var panel = ui.parent();
		var name = panel.find('.first_name input').val();
		var family = panel.find('.last_name input').val();
		var email = panel.find('.email input').val();
		var user = new User( { name: name, family: family, email: email } );
		panel.find('.first_name input').val('');
		panel.find('.last_name input').val('');
		panel.find('.email input').val('');
		user.save(function( user ) {
		  self.element.find('.user_list').append(can.view('../app/users/ejs/user.ejs', {data: user}))
		});
	},
	'.ur_delete click': function(ui, event){
		var user_row = ui.parent();
		var user = user_row.data('model');
		user.destroy(function( user ) {
		   user_row.remove();
		});
	},
	'.eu_delete click': function(ui, event){
		var user_row = ui.parent();
		var user = user_row.data('model');
		user.destroy(function( user ) {
		   user_row.remove();
		});
	},
	'.ur_edit click': function(ui, event){
		var user_row = ui.parent();
		var user = user_row.data('model');
		user_row.after(can.view('../app/users/ejs/user_form.ejs', {data: user}));
		user_row.remove();
	},
	'.eu_save_close click': function(ui, evevnt){
		var user_row = ui.parent();
		var user = user_row.data('model');
		user.name = user_row.find('.first_name input').val();
		user.family = user_row.find('.last_name input').val();
		user.email = user_row.find('.email input').val();
		user._data.name  = user.name;
		user._data.family= user.family;
		user._data.email = user.email;
		user.save(function( user ) {
			user_row.after(can.view('../app/users/ejs/user.ejs', {data: user}));
			user_row.remove();
		});
	}	
});