const validation = {
	validateEmail(input: string) {
		let validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (
			input.match(validRegex) === null ||
			input.match(validRegex) === undefined
		) {
			return { valid: false, reasons: ["NOT_AN_EMAIL"] };
		} else {
			let valid = input.match(validRegex)!.length > 0;
			return { valid, reasons: valid ? [] : ["NOT_AN_EMAIL"] };
		}
	},
	validatePassword(input: string) {
		let reasons = [];
		if (input.length < 6) reasons.push("TOO_SHORT");
		if (input.length > 20) reasons.push("TOO_LONG");
		if (input.toLowerCase() === input) reasons.push("NO_UPPERCASE");

		return { valid: reasons.length === 0, reasons };
	},
	validateUsername(input: string) {
		let reasons = [];
		if (input.length < 5) reasons.push("TOO_SHORT");
		if (input.length > 20) reasons.push("TOO_LONG");
		return { valid: reasons.length === 0, reasons };
	},
};
export const parseValidationMessages = (messages: string[]) => {
	let response = "";
	console.log("b" + messages);
	messages.forEach((element) => {
		switch (element) {
			case "NOT_AN_EMAIL":
				response += "The email is incorrect!\n";
				break;
			case "TOO_SHORT":
				response += "Provided value is too short!\n";
				break;
			case "TOO_LONG":
				response += "Provided value is too long!\n";
				break;
			case "NO_UPPERCASE":
				response += "Provided value contains no uppercase!\n";
				break;
		}
	});
	return response;
};
export default validation;
