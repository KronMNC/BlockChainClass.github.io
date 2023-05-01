//compiler.js

const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(_dirname, 'Build');
fs.removeSync(buildPath); //The build folder is then deleted

const contrPath = path.resolve(_dirname, 'Contract', 'Elect.sol');
const source = fs.readFileSync(contrPath, 'utf-8');

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); //checks if the path even exists; if doesn't, then one is created

for(let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath,contract.replace(':','') +  '.json'), 
		output[contract]
	);
}