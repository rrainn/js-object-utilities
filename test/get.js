const {expect} = require("chai");
const utils = require("../dist/index");

describe("utils.get", () => {
	it("Should be a function", () => {
		expect(utils.get).to.be.a("function");
	});

	const tests = [
		{
			"input": [{"hello": "world"}, "hello"],
			"output": "world"
		},
		{
			"input": [{"test": {"hello": "world"}}, "test.hello"],
			"output": "world"
		},
		{
			"input": [{}, "test.hello"],
			"output": undefined
		},
		{
			"input": [{}, "test.hello.test"],
			"output": undefined
		},
		{
			"input": [{"data": [{"id": "hello world"}]}, "data.0.id"],
			"output": "hello world"
		}
	];

	tests.forEach((test) => {
		it(`Should return ${test.output} for ${test.input}`, () => {
			expect(utils.get(...test.input)).to.eql(test.output);
		});
	});
});
