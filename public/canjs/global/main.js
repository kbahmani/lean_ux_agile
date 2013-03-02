steal(
    'global/lib/jquery-1.7.2.min.js'
).then('global/lib/can.jquery-1.0.7.min.js')
.then(
    'global/lib/jquery-ui-1.8.15.min.js',
    'global/lib/jquerypp/jquery.cookie.js',   // load jquery++ cookie
    'global/lib/jquerypp/jquery.form_params.js',
    'global/css/jquery-ui-1.8.15.custom.css'
)
.then(function(){
    // restore the globe states from sessionStorage

    if (!window.sessionStorage ) {
        window.sessionStorage = {}; // make it compatible for non-HTML5 browsers
    }

    // app_state stores the application states so it can be refered globally
    if(!window.app_state){
        var old_state =  window.sessionStorage["app_state"];
        if(!old_state || old_state.length == 0){
            old_state = "{}";
        }

        window.app_state = new can.Observe(JSON.parse(old_state));
        app_state.bind( 'change', function( ev, attr, how, newVal, oldVal ) {
//           console.info(ev)
//           console.info(attr+" / "+how+" / "+newVal+" / "+oldVal);
//           console.info(window.app_state._data.valueOf())
           window.sessionStorage["app_state"] = JSON.stringify(window.app_state._data.valueOf());
        });
    }
    // create a route
    can.route( ':widget/:sub' );

    var Routing = can.Control({
        ':widget route': function(data) {
            this.handle_route(data);
        },
        ':widget/:sub route': function( data ) {
            this.handle_route(data);
        },
        handle_route: function(data){
            var widget = data['widget'];
            var sub = data['sub'];

            var self = this;

            if(widget === 'account') {
                self.cleanElement('contents');
                var Account = new Global.App.AccountCtrl("#contents");
                if(sub === 'load_users') {
                    Account.load_users(widget);
                }
            } else if(widget === 'fuzzProfile') {
                if((app_state.route && app_state.route.widget !== 'fuzzProfile') || !sub){ 
                    self.cleanElement('contents');
                    $("#contents").append("<div id='contents_inner'></div>")
                }
                $("#contents").profile_builder();
                if(sub) {
                    self.cleanElement('contents_inner');
                    $("#contents_inner").tab_builder();
                }
            } else if(widget === 'fuzzPlayer') {
                self.cleanElement('contents');
                var fuzzPlayer = new Fuzz.App.FuzzPlayer("#contents");
            } else if(widget === 'fuzzLibrary') {
                self.cleanElement('contents');
                var Library = new Fuzz.App.FuzzLibrary("#contents");
            }
            app_state.attr('route', {'widget': widget, 'sub': sub});
        },
        cleanElement: function(element_id) {
            var parent = $("#"+element_id).parent();
            $("#"+element_id).remove();
            parent.append('<section id="'+element_id+'"></section>');
        }
    })

    // create routing control
    new Routing( document.body );

})
.then(
	'global/lib/can.fixture.js',
    'global/lib/can.construct.proxy.js',
    'global/lib/can.construct.super.js',
    'global/lib/can.control.plugin.js',
    'global/lib/can.control.view.js',
    'global/lib/can.view.modifiers.js',
	'global/css/global.css',
	'global/app/layout'
)

function enableErrorMessage(flag) {
    if(flag) {
        $("#message").bind("ajaxError", function(e, jqXHR, settings, exception) {
            $(".spinnerbig").hide();
            var error_message = "";
            try {
                error_message = $.parseJSON(jqXHR.responseTest);
            } catch(e) {
                error_message = e;
                error_message["success"] = false;
            }

            new Global.App.Message("#message");
        });
    } else {
        $("#message").unbind("ajaxError");
    }
}