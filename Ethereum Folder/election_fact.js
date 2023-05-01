//electionfact.js

import web3 from './web3';
import ElectionFactory from './Build/ElectFact.json';

const instance = new web3.eth.Contract(
	JSON.parse(ElectionFactory.interface),
    '0xF5d3574DDc21D8Bd8bcB380de232cbbc8161234e'
);

export default instance;