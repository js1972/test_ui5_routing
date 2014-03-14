/*
Component details:
	- Main Control: sap.m.TileContainer (wrapped in sap.m.Shell to center app on screen
					and limit width - remove if you want a fullscreen app)
	- Views: XML
	- Navigation: Component Routing

	This Component hands navigation responsibilty to the Router with lazy-loading
	of views.
*/
(function() {
	"use strict";

	jQuery.sap.declare("sap.ui.demo.Component");

	sap.ui.core.UIComponent.extend("sap.ui.demo.Component", {

		metadata: {
			routing: {
				config: {
					viewType: "XML",
					viewPath: "sap.ui.demo.view",
					targetControl: "idApp",
					clearTarget: false,
					transition: "slide"
				},
				routes: [
					{
						pattern: "detail/{data}",
						name: "detail",
						view: "Detail",
						targetAggregation: "pages"
					},
					{
						pattern: "",
						name: "home",
						view: "Home",
						viewType: "JS",
						targetAggregation: "pages"
					}
				]
			}
		},

		init: function() {
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();
		},

		createContent: function() {
			// create root view
			var oView = sap.ui.view({
				id: "idViewRoot",
				viewName: "sap.ui.demo.view.Root",
				type: "XML",
				viewData: {
					component: this
				}
			});

			oView.setModel(new sap.ui.model.json.JSONModel("model/mock.json"));

			// set device model
			var deviceModel = new sap.ui.model.json.JSONModel({
				isPhone: jQuery.device.is.phone,
				listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
				listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive"
			});
			deviceModel.setDefaultBindingMode("OneWay");
			oView.setModel(deviceModel, "device");

			return oView;
		}
	});

}());