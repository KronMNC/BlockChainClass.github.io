class VotingList extends Component {

     //Defines the initial state of the component
     state = {
        numCand: '', 
        election_address: Cookies.get('address'), //retrieves address from cookie
        election_name: '', //name of election
        election_description: '', 
        candidates: [], 
        cand_name: '', 
        cand_desc: '', 
        buffer: '', //buffer to store data
        ipfsHash: null, //stores the ipfsHash
        loading: false //is it loading
    };

    //we were gonna add a bit more but i do not work for the us government

//checks for MOUNT
async componentDidMount() {
        try {                               
            //retrieves address from cookie
            const add = Cookies.get('address');
            //creates an election contract with the address
            const election = Election(add);
            //retrieves the summary of the election from the contract
            const summary = await election.methods.getElectionDetails().call();
            //updates the state with the election name and description
            this.setState({
                election_name: summary[0],
                election_description: summary[1]
            });            
            //retrieves the number of candidates
            const c = await election.methods.getNumOfCandidates.call();
            
            //creates an empty array 
            let candidates = [];
            //loops through the number of candidates
            for(let i=0 ; i<c; i++) {
                //pushes each candidate into the array
                candidates.push(await election.methods.getCandidate(i).call());
            }
        //counter for for loop
        let i=-1;
        //maps over each candidate
        const items = candidates.map(candidate => {
            //increments the counter
            i++;
            //returns the candidate name, description, and a place holder image
            return {
              header: candidate[0],
              description: candidate[1],
              image: (
                ),
     
    //renders the card list with the candidates
    renderTable = () => {
        return (<Card.Group items={this.state.item}/>)
    } 

//function to vote on a candidate
    vote = async event => {
        //converts the id of the candidate to an integer
        const e = parseInt(event.currentTarget.id,10);
        //gets the current accounts
        const accounts = await web3.eth.getAccounts();
        //retrieves the address from the cookie
        const add = Cookies.get('address');
        //creates a new election contract with the address
        const election = Election(add);
        //calls the vote function with the candidate id and the voter's email
        await election.methods.vote(e,Cookies.get('voter_email')).send({from: accounts[0]});
        //alerts the voter that their vote has gone through
        alert("Voted!")
    }