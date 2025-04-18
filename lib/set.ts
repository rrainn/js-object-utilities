import {GeneralObject, GeneralObjectOrValue} from "./types";

export = <T>(object: GeneralObject<T>, key: string, value: any): GeneralObject<T> => {
	const keyParts = key.split(".");

	// Protect against prototype pollution
	if (keyParts.includes("__proto__") || keyParts.includes("constructor")) {
		// If the key is __proto__ or constructor, return the object and do nothing since this is a security risk.
		return object;
	}

	let objectRef: GeneralObjectOrValue<T> = object;
	keyParts.forEach((part: string | number, index: number) => {
		if (keyParts.length - 1 === index) {
			return;
		}

		if (!objectRef[part]) {
			objectRef[part] = {};
		}

		objectRef = objectRef[part];
	});

	const finalKey: string = keyParts[keyParts.length - 1];
	objectRef[finalKey] = value;

	return object;
};
