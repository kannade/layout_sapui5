sap.ui.define(["sap/ui/model/SimpleType", "sap/ui/model/ValidateException"],
	function(SimpleType, ValidateException) {

		return SimpleType.extend("hello.layout.model.type.digits", {

			formatValue: function(oValue) {
				return oValue;
			},

			parseValue: function(oValue) {
				return oValue;
			},

			validateValue: function(oValue) {
				if (!/^(\d{4})?$/.test(oValue)) {
					throw new ValidateException("Поле должно содержать только 4 цифры!");
				}
			}
		});

	});