class VotingList extends Component {

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
                  <Image id={i} src={`https://ipfs.io/ipfs/${candidate[2]}`} style={{maxWidth: '100%',maxHeight:'190px'}}/>
                ),
              extra: (
                  <div>
                    <Icon name='pie graph' size='big' iconPostion='left'/>  
                    {candidate[3].toString()}  
                    <Button id={i} style={{float: 'right'}} onClick={this.vote} primary>Vote!</Button>
                </div>
              ) 
            };
            
        });
        this.setState({item: items}); 
        } catch(err) {
            console.log(err.message);
            alert("Session expired. Redirecting you to login page...");
            Router.pushRoute('/voter_login');
        }
    }
    getElectionDetails = () => {
        const {
            election_name,
            election_description
        } = this.state;
    
        return (
          <div style={{marginLeft: '45%',marginBottom: '2%',marginTop: '2%'}}>
            <Header as="h2">
              <Icon name="address card" />
              <Header.Content>
                {election_name}
                <Header.Subheader>{election_description}</Header.Subheader>
              </Header.Content>
            </Header>
          </div>
        );
      }

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