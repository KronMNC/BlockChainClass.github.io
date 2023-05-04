+class VotingList extends Component {

     state = {
        numCand: '',
        election_address: Cookies.get('address'),
        election_name: '',
        election_description: '',
        candidates: [],
        cand_name: '',
        cand_desc: '',
        buffer: '',
        ipfsHash: null,
        loading: false
    };


async componentDidMount() {
        try {                               
            const add = Cookies.get('address');
            const election = Election(add);
            const summary = await election.methods.getElectionDetails().call();
            this.setState({
                election_name: summary[0],
                election_description: summary[1]
            });            
            const c = await election.methods.getNumOfCandidates.call();
            
            let candidates = [];
            for(let i=0 ; i<c; i++) {
                candidates.push(await election.methods.getCandidate(i).call());
            }
        let i=-1;
        const items = candidates.map(candidate => {
            i++;
            return {
              header: candidate[0],
              description: candidate[1],
              image: (
                ),
     

    renderTable = () => {
        return (<Card.Group items={this.state.item}/>)
    } 

    vote = async event => {
        const e = parseInt(event.currentTarget.id,10);
        const accounts = await web3.eth.getAccounts();
        const add = Cookies.get('address');
        const election = Election(add);
        await election.methods.vote(e,Cookies.get('voter_email')).send({from: accounts[0]});
        alert("Voted!")
    }