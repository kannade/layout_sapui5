sap.ui.define(["sap/ui/model/SimpleType", "sap/ui/model/ValidateException"],
	function(SimpleType, ValidateException) {

		return SimpleType.extend("hello.layout.model.type.digits", {

			formatValue: function(sValue, sInternalType) {
				//добавим "-" после каждых двух цифр
				var aDigits = sValue.split("");
				var sOutput = "";

				$.each(aDigits, function(i, iDigit) {
					if ((i > 0) && (i % 2 === 0)) {
						sOutput = sOutput + "-" + iDigit;
					} else {
						sOutput += iDigit;
					}
				});
				return sOutput;
			},

			parseValue: function(sValue) {
				return sValue.replace(/-/g, "");
			},

			validateValue: function(sValue) {
					var aDigits = sValue.split("");
					// var iCheckDigit = parseInt(aDigits.pop(), 10);

					// aDigits.reverse();

					// var iTotal = 0;
					// $.each(aDigits, function(i) {
					// 	if (i % 2 === 0) {
					// 		aDigits[i] = (aDigits[i] * 2);
					// 		if (aDigits[i] > 9) {
					// 			aDigits[i] -= 9;
					// 		}
					// 	}
					// 	iTotal += parseInt(aDigits[i], 10);
					// });

					// if (iTotal % 10 !== iCheckDigit) {
					// 	throw new ValidateException(sValue + " не корректный номер телефона");
					// }
					 if (aDigits.length !== 6) {
					 	throw new ValidateException(sValue + " не корректный номер телефона");
					 }
				}
				//validateValue: function(oValue) {
				//только 4 цифры
				// if (!/^(\d{4})?$/.test(oValue)) {
				// 	throw new ValidateException("Поле должно содержать только 4 цифры!");
				// }
				//	}
		});

	});