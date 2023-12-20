const {expect} = require("chai");
const utils = require("../dist/index");

describe("utils.circularKeys", () => {
	it("Should be a function", () => {
		expect(utils.circularKeys).to.be.a("function");
	});

	const tests = [
		{
			"input": [{"hello": "world"}],
			"output": []
		},
		{
			"input": [{"hello": "world"}, "hello"],
			"output": []
		},
		{
			"input": [{"hello": "world"}, "random"],
			"output": []
		},
		{
			"input": [{"data": {"hello": "world"}}],
			"output": []
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()],
			"output": ["array2"]
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})(), "random"],
			"output": []
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})(), "array2"],
			"output": ["array2"]
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}],
			"output": ["data.array2"]
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "random"],
			"output": []
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "array2"],
			"output": []
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "data.array2"],
			"output": ["data.array2"]
		}
	];

	tests.forEach((test) => {
		it(`Should return ${test.output} for ${test.input}`, () => {
			expect(utils.circularKeys(...test.input)).to.eql(test.output);
		});
	});
});
