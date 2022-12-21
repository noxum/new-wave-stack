const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const inquirer = require("inquirer");

const sort = require("sort-package-json");

function escapeRegExp(string) {
	// $& means the whole matched string
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getRandomString(length) {
	return crypto.randomBytes(length).toString("hex");
}

async function main({ rootDirectory }) {
	const README_PATH = path.join(rootDirectory, "README.md");
	const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");

	const REPLACER = "new-wave-stack-template";

	const DIR_NAME = path.basename(rootDirectory);
	const SUFFIX = getRandomString(2);

	const APP_NAME = (DIR_NAME + "-" + SUFFIX)
		// get rid of anything that's not allowed in an app name
		.replace(/[^a-zA-Z0-9-_]/g, "-");

	const [readme, packageJson] = await Promise.all([
		fs.readFile(README_PATH, "utf-8"),
		fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
	]);

	const newReadme = readme.replace(
		new RegExp(escapeRegExp(REPLACER), "g"),
		APP_NAME
	);

	const newPackageJson =
		JSON.stringify(
			sort({ ...JSON.parse(packageJson), name: APP_NAME }),
			null,
			2
		) + "\n";

	await Promise.all([
		fs.writeFile(README_PATH, newReadme),
		fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
		fs.copyFile(
			path.join(rootDirectory, "remix.init", "gitignore"),
			path.join(rootDirectory, ".gitignore")
		),
	]);
	await askSetupQuestions({ rootDirectory });
}

async function askSetupQuestions({ rootDirectory }) {
	const DEFAULT_API_ENDPOINT = "https://delivery.api";
	const USER = "user";
	const PASSWORD = "password";
	const BRANCH = 4;
	const answers = await inquirer.prompt([
		{
			name: "setApi",
			type: "confirm",
			default: false,
			message: "Do you want to set up a Delivery Api endpoint?",
		},
		{
			name: "api",
			type: "input",
			default: DEFAULT_API_ENDPOINT,
			message: "Please provide the Delivery Api endpoint:",
			when(answers) {
				return answers.setApi;
			},
		},
		{
			name: "username",
			type: "input",
			default: USER,
			message: "Enter your api username:",
			when(answers) {
				return answers.setApi;
			},
		},
		{
			name: "password",
			type: "password",
			default: PASSWORD,
			mask: "*",
			message: "Enter your api password",
			when(answers) {
				return answers.setApi;
			},
		},
		{
			name: "branch",
			type: "number",
			default: BRANCH,
			message: "Enter the branch which should be scoped:",
			when(answers) {
				return answers.setApi;
			},
		},
	]);

	const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.template");
	const env = await fs.readFile(EXAMPLE_ENV_PATH, "utf-8");
	const fixEndpoint = (endpoint) => !endpoint.endsWith("/") ? `${endpoint}/` : endpoint;
	const newEnv = (endpoint, authToken, branch) =>
		env
			.replace(/^DELIVERY_API=.*$/m, `DELIVERY_API="${fixEndpoint(endpoint ?? DEFAULT_API_ENDPOINT)}"`)
			.replace(/^BASIC_AUTH_TOKEN=.*$/m, `BASIC_AUTH_TOKEN="${authToken}"`)
			.replace(/^BRANCH=.*$/m, `BRANCH=${branch ?? BRANCH}`);

	const auth = `${answers.username ?? USER}:${answers.password ?? PASSWORD}`;
	const authBuff = Buffer.from(auth, "utf-8");
	const base64Auth = authBuff.toString("base64");

	const MOCK_HANDLER_PATH = path.join(rootDirectory, "./mocks/handlers.ts");
	const handlers = await fs.readFile(MOCK_HANDLER_PATH, "utf-8");
	const newHandlers = (endpoint) => {
		const apiEndpoint = fixEndpoint(endpoint ?? DEFAULT_API_ENDPOINT);
		return handlers.replace(/\[API_ENDPOINT\]/g, apiEndpoint)
	};

	const ENV_PATH = path.join(rootDirectory, ".env");
	await Promise.all([
		fs.writeFile(ENV_PATH, newEnv(answers.api, base64Auth, answers.branch)),
		fs.writeFile(MOCK_HANDLER_PATH, newHandlers(answers.api))
	]);
}

module.exports = main;
