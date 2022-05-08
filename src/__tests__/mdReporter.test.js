const { mkdirSync, rmSync, existsSync, writeFileSync } = require("fs");
const { when } = require("jest-when");

const MDReporter = require("../mdReporter");
const MDGenerator = require("../mdGenerator");
const existingPath = "existing path";
const missingPath = "missing path";
const existingFile = "existing file";
const report = "test-output";

jest.mock("fs", () => {
	const fs = jest.requireActual("fs");

	return {
		...fs,
		existsSync: jest.fn(),
		mkdirSync: jest.fn(),
		rmSync: jest.fn(),
		writeFileSync: jest.fn(),
	};
});

MDGenerator.generate = jest.fn().mockResolvedValue(report);

describe("MDReporter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Defaults the public path if not set", () => {
		const reporter = new MDReporter();
		expect(reporter.publicPath).toBe("./");
	});

	it("Defaults the filename if not set", () => {
		const reporter = new MDReporter();
		expect(reporter.filename).toBe("test-results.md");
	});

	it("Creates the report dir if it doesn't already exist", async () => {
		const reporter = new MDReporter("", { publicPath: missingPath });
		await reporter.onRunComplete("", []);

		expect(mkdirSync).toHaveBeenCalledWith(missingPath);
	});

	it("Deletes the report if it already exists", async () => {
		const fullPath = `${existingPath}/${existingFile}`;

		when(existsSync).calledWith(existingPath).mockReturnValue(true);
		when(existsSync).calledWith(fullPath).mockReturnValue(true);

		const reporter = new MDReporter("", {
			filename: existingFile,
			publicPath: existingPath,
		});

		await reporter.onRunComplete("", []);

		expect(rmSync).toHaveBeenCalledWith(fullPath);
	});

	it("Saves the report to the specified output file", async () => {
		const fullPath = `${existingPath}/${existingFile}`;

		when(existsSync).calledWith(existingPath).mockReturnValue(true);
		when(existsSync).calledWith(fullPath).mockReturnValue(true);

		const reporter = new MDReporter("", {
			filename: existingFile,
			publicPath: existingPath,
		});

		await reporter.onRunComplete("", []);

		expect(writeFileSync).toHaveBeenCalledWith(fullPath, report);
	});
});
