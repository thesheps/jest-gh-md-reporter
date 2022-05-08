const passingResult = {
	ancestorTitles: ["Beans", "On", "Toast"],
	status: "passed",
	title: "my lovely test",
	duration: 146,
};

const passingResults = {
	numTotalTestSuites: 2,
	numTotalTests: 2,
	numPassedTestSuites: 1,
	numPassedTests: 1,
	numFailedTestSuites: 1,
	numFailedTests: 1,
	numPendingTestSuites: 1,
	numPendingTests: 1,
	testResults: [
		{
			perfStats: { runtime: 146 },
			testFilePath: "testFilePath",
			testResults: [passingResult],
		},
	],
};

const failingResult = {
	...passingResult,
	status: "failed",
};

const failingResults = {
	...passingResults,
	testResults: [
		{
			perfStats: { runtime: 146 },
			testFilePath: "testFilePath",
			testResults: [failingResult],
		},
	],
};

const pendingResult = {
	...passingResult,
	status: "pending",
};

const pendingResults = {
	...passingResults,
	testResults: [
		{
			perfStats: { runtime: 146 },
			testFilePath: "testFilePath",
			testResults: [pendingResult],
		},
	],
};

module.exports = { passingResults, failingResults, pendingResults };
