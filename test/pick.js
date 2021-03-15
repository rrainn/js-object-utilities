const {expect} = require("chai");
const utils = require("../dist/index");

describe("utils.pick", () => {
	it("Should be a function", () => {
		expect(utils.pick).to.be.a("function");
	});

	const tests = [
		{
			"input": [{"hello": "world"}, ["hello"]],
			"output": {"hello": "world"}
		},
		{
			"input": [{"hello": "world"}, ["hello", "world"]],
			"output": {"hello": "world"}
		},
		{
			"input": [{"hello": "world", "obj": 1}, ["hello"]],
			"output": {"hello": "world"}
		}
	];

	tests.forEach((test) => {
		it(`Should return ${test.output} for ${test.input}`, () => {
			expect(utils.pick(...test.input)).to.eql(test.output);
		});
	});
});
