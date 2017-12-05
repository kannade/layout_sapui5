sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/Device",
	"hello/layout/model/formatter",
	"hello/layout/model/type/digits"
], function(Controller, MessageToast, Device, formatter, Digits) {
	"use strict";

	return Controller.extend("hello.layout.controller.Main", {

		formatter: formatter,

		onInit: function() {

			this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(
				"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22moscow%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
			);
			this.getView().setModel(oModel, "weather");

			var oModel_2 = new sap.ui.model.json.JSONModel();
			oModel_2.loadData(
				"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22ekaterinburg%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
			);
			this.getView().setModel(oModel_2, "weather_ekb");

			var oModel_3 = new sap.ui.model.json.JSONModel();
			oModel_3.loadData("https://api.fixer.io/latest?base=USD");
			this.getView().setModel(oModel_3, "cbr");

			var oData = {
				"name": "1234",
				"enabled": true,
				"date": new Date(),
				"price": "12.1"
			};

			var oModel_4 = new sap.ui.model.json.JSONModel();
			oModel_4.setData(oData);

			this.getView().setModel(oModel_4, "odata");

			// var obj = oModel.getData();
			// for (var attr in obj.rates){
			// 	console.log(obj.rates[attr]);
			//}

			// Register the view with the message manager
			sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);

		},

		onTableItemPress: function(evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed" + evt.getSource().getCells()[0].getText());
		},

		onPressSubmit: function() {
				var arr = sap.ui.getCore().getMessageManager().getMessageModel().oData;

				for (var i = 0; i < arr.length; i++) {
					if (arr[i].code == undefined &&
						arr[i].type == sap.ui.core.MessageType.Error) {
						var sTarget = arr[i].getTarget();
						var oElem = sap.ui.getCore().byId(sTarget.substr(0, sTarget.indexOf("/")));
						if (oElem) {
							oElem.focus();
						}
						MessageToast.show(arr[i].message);
						return true;
					}
				}

				MessageToast.show(this.getView().byId("idFormFrag--first").getValue() +
					" " +
					this.getView().getModel("odata").getData().name +
					sap.ui.getCore().byId("__xmlview0--idFormFrag--second").getValue()
				);
			}
			// ,
			// 	onSelection: function(oEvent) {
			// 	var oListItem = oEvent.getParameter("listItem");
			// 	var sPath = oListItem.getBindingContext().getPath();
			// 	var oTable = this.getView().byId("idForecastTable");
			// 	oTable.bindElement(sPath);
			// 		}
	});
});