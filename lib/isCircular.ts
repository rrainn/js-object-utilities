import circularKeys = require("./circularKeys");
import {GeneralObject} from "./types";

export = <T>(object: GeneralObject<T>, searchKey?: string): boolean => {
	return circularKeys(object, searchKey).length > 0;
};
