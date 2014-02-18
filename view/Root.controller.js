(function() {
	"use strict";

	jQuery.sap.require("jquery.sap.history");

	sap.ui.controller("sap.ui.demo.view.Root", {
		onInit: function() {
			var bus = sap.ui.getCore().getEventBus();

			var historyDefaultHandler = function(navType) {
				if (navType === jQuery.sap.history.NavType.Back) {
					this.navBack();
				} else {
					this.navTo(null, null, false);
				}
			};

			var historyDetailPageHandler = function(params, navType) {
				if (!params || !params.id) {
					jQuery.sap.log.error("invalid parameter: " + params);
				} else {
					if (navType === jQuery.sap.history.NavType.Back) {
						this.navBack(params.id);
					} else {
						this.navTo(params.id, params, false);
					}
				}
			};

			jQuery.sap.history({
				routes: [{
					path: "detailPage",
					handler: jQuery.proxy(historyDetailPageHandler, this)
				}],
				defaultHandler: jQuery.proxy(historyDefaultHandler, this)
			});

			bus.subscribe("nav", "to", this.navHandler, this);
			bus.subscribe("nav", "back", this.navHandler, this);
			bus.subscribe("nav", "virtual", this.navHandler, this);

			this.app = this.getView().byId("idApp");
		},

		navHandler: function(channelId, eventId, data) {
			if (eventId === "to") {
				this.navTo(data.id, data.data, true);
			} else if (eventId === "back") {
				jQuery.sap.history.back();
			} else if (eventId === "virtual") {
				jQuery.sap.history.addVirtualHistory();
			} else {
				jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
			}
		},

		navTo: function(id, data, writeHistory) {
			if (id === undefined) {
				jQuery.sap.log.error("navTo failed due to missing id");
			} else {
				this.app.to(id);

				// Set the model context on the navigated-to page
				if (data.context) {

					// NOTE: cannot use a binding context object in jQuery.sap.history.addHistory()!
					// addHistory() dies on cyclic references when calling JSON.stringify().
					// So I've switched to just using the context path to pass around instead of the 
					// whole binding context object.

					//this.app.getPage(id).setBindingContext(data.context);
					this.app.getPage(id).bindObject(data.context);
				}

				//write browser history
				if (writeHistory === undefined || writeHistory) {
					var params = {
						id: id,
						//context: data.context.sPath
						context: data.context
					};
					jQuery.sap.history.addHistory("detailPage", params, false);
				}
			}
		},

		navBack: function() {
			this.app.back();
		}

	});

}());