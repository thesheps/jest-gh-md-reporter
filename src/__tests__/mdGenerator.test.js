const generator = require("../mdGenerator");
const {
	passingResults,
	failingResults,
	pendingResults,
} = require("./testData");

describe("MDGenerator", () => {
	const date = new Date("2022-01-01");

	it("Creates the expected snapshot for passing test", async () => {
		const report = await generator.generate(passingResults, date);
		expect(report).toMatchSnapshot();
	});

	it("Creates the expected snapshot for failing test", async () => {
		const report = await generator.generate(failingResults, date);
		expect(report).toMatchSnapshot();
	});

	it("Creates the expected snapshot for pending test", async () => {
		const report = await generator.generate(pendingResults, date);
		expect(report).toMatchSnapshot();
	});
});
