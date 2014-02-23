(function() {
	"use strict";

	jQuery.sap.require("sap.m.MessageBox");
	jQuery.sap.require("sap.m.MessageToast");

	sap.ui.controller("sap.ui.demo.view.Detail", {

		onInit: function() {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		
		_handleRouteMatched: function(evt) {
			if (evt.getParameter("name") === "detail") {
				var path = "/" + evt.getParameter("arguments").data;
				this.getView().bindObject(path);
			}
		},

		handleNavButtonPress: function() {
			// The nav button is a BACK button so use the bworser history as NavTo is forward navigation!
			//this.router.navTo("home");
			window.history.go(-1);
		}
		
	});

}());