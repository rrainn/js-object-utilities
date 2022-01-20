const {expect} = require("chai");
const utils = require("../dist/index");

describe("utils.isCircular", () => {
	it("Should be a function", () => {
		expect(utils.isCircular).to.be.a("function");
	});

	const tests = [
		{
			"input": [{"hello": "world"}],
			"output": false
		},
		{
			"input": [{"hello": "world"}, "hello"],
			"output": false
		},
		{
			"input": [{"hello": "world"}, "random"],
			"output": false
		},
		{
			"input": [{"data": {"hello": "world"}}],
			"output": false
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()],
			"output": true
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})(), "random"],
			"output": false
		},
		{
			"input": [(() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})(), "array2"],
			"output": true
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}],
			"output": true
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "random"],
			"output": false
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "array2"],
			"output": false
		},
		{
			"input": [{"data": (() => {
				let object = {};
				object.array = {"first": 1};
				object.array2 = object;
				return object;
			})()}, "data.array2"],
			"output": true
		}
	];

	tests.forEach((test) => {
		it(`Should return ${test.output} for ${test.input}`, () => {
			expect(utils.isCircular(...test.input)).to.eql(test.output);
		});
	});
});
