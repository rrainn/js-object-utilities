const {expect} = require("chai");
const utils = require("../dist/index");

describe("utils.keys", () => {
	it("Should be a function", () => {
		expect(utils.keys).to.be.a("function");
	});

	const tests = [
		{
			"input": {"hello": "world"},
			"output": ["hello"]
		},
		{
			"input": {"hello": "world", "test": "data"},
			"output": ["hello", "test"]
		},
		{
			"input": {"name": "Bob", "address": {"country": "world", "zip": 12345}},
			"output": ["name", "address", "address.country", "address.zip"]
		},
		{
			"input": {"name": "Bob", "friends": ["Bob", "Tim"]},
			"output": ["name", "friends", "friends.0", "friends.1"]
		},
		{
			"input": {"id": 1, "friends": [{"name": "Bob", "id": 1}, {"name": "Tim"}]},
			"output": ["id", "friends", "friends.0", "friends.0.name", "friends.0.id", "friends.1", "friends.1.name"]
		},
		{
			"input": {"hello": Buffer.from("world")},
			"output": ["hello"]
		},
		{
			"input": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})(),
			"output": ["array", "array.first", "array2"]
		}
	];

	tests.forEach((test) => {
		it(`Should return ${test.output} for ${test.input}`, () => {
			expect(utils.keys(test.input)).to.eql(test.output);
		});
	});
});
