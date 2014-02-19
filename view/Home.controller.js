(function() {
	"use strict";

	sap.ui.controller("sap.ui.demo.view.Home", {

		onInit: function() {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
		},

		handleTileTap: function(evt) {
			var bindingPath = evt.getSource().getBindingContext().sPath;
			this.router.navTo("detail", {data: bindingPath.substring(1)});
		},

		productCount: function(oValue) {
			//return the number of products linked to Category
			if (oValue) {
				var sPath = this.getBindingContext().getPath() + "/Products";
				return this.getModel().bindList(sPath).getContexts().length;
			}
		}
		
	});

}());