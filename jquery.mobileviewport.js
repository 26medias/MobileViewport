/**
	photofeed
	@version:		1.0.0
	@author:		Julien Loutre <julien.loutre@gmail.com>
*/
(function($){
 	$.fn.extend({
 		mobileViewport: function() {
			var plugin_namespace = "mobileViewport";
			
			
			var pluginClass = function() {};
			
			
			
			pluginClass.prototype.init = function (options) {
				try {
					
					var scope = this;
					
					this.options = $.extend({
						"scalable": 	0,
						"maxscale":		1.0,
						"initscale":	1.0
					},options);					
					
					this.resize();
					
					$(window).resize(function() {
						scope.resize();
					});
					
					this.itv = window.setInterval(function() {
						scope.resize();
					}, 1000); 
					
				} catch (err) {
					this.error(err);
				}
			};
			
			pluginClass.prototype.resize = function () {
				try {
					
					if (window.orientation == 0) {
						$("meta[name=viewport]").attr("content", "width=device-width, initial-scale="+this.options.initscale+", maximum-scale="+this.options.maxscale+", user-scalable="+this.options.scalable+";");
						$(".debug").html("width=device-width, initial-scale="+this.options.initscale+", maximum-scale="+this.options.maxscale+", user-scalable="+this.options.scalable+";");
					} else {
						$("meta[name=viewport]").attr("content", "width=device-height, initial-scale="+this.options.initscale+", maximum-scale="+this.options.maxscale+", user-scalable="+this.options.scalable+";");
						$(".debug").html("width=device-height, initial-scale="+this.options.initscale+", maximum-scale="+this.options.maxscale+", user-scalable="+this.options.scalable+";");
					}
					
					
				} catch (err) {
					this.error(err);
				}
			};
			
			
			
			
			pluginClass.prototype.__init = function (element) {
				try {
					this.element = element;
				} catch (err) {
					this.error(err);
				}
			};
			// centralized error handler
			pluginClass.prototype.error = function (e) {
				if (console && console.info) {
					console.info("error on "+plugin_namespace+":",e);
				}
			};
			// Centralized routing function
			pluginClass.prototype.execute = function (fn, options) {
				try {
					if (typeof(this[fn]) == "function") {
						var output = this[fn].apply(this, [options]);
					} else {
						this.error("'"+fn.toString()+"()' is not a function");
					}
				} catch (err) {
					this.error(err);
				}
			};
			
			// process
			var fn;
			var options;
			if (arguments.length == 0) {
				fn = "init";
				options = {};
			} else if (arguments.length == 1 && typeof(arguments[0]) == 'object') {
				fn = "init";
				options = $.extend({},arguments[0]);
			} else {
				fn = arguments[0];
				options = arguments[1];
			}
			$.each(this, function(idx, item) {
				// if the plugin does not yet exist, let's create it.
				if ($(item).data(plugin_namespace) == null) {
					$(item).data(plugin_namespace, new pluginClass());
					$(item).data(plugin_namespace).__init($(item));
				}
				$(item).data(plugin_namespace).execute(fn, options);
			});
			return this;
    	}
	});
	
})(jQuery);

