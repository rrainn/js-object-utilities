import {isCircular} from ".";
import {GeneralObjectOrValue} from "./types";

const main = <T>(object: GeneralObjectOrValue<T>, existingKey = ""): [string, GeneralObjectOrValue<T>][] => {
	return Object.entries(object).reduce((accumulator, entry) => {
		const [key, value] = entry;
		const keyWithExisting = `${existingKey ? `${existingKey}.` : ""}${key}`;
		accumulator.push([keyWithExisting, value]);

		if (typeof value === "object" && !(value instanceof Buffer) && !(value instanceof Uint8Array) && value !== null && !isCircular(value, keyWithExisting)) {
			accumulator.push(...main(value, keyWithExisting));
		}

		return accumulator;
	}, []);
};

export = main;
