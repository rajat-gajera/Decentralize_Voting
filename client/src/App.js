import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.css";
import Admin from "./Components/Admin";
import Voters from "./Components/Voters";

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };

  constructor(props) {
    super(props);
    this.state = {
      VotingInstance: undefined,
      account: null,
      web3: null,
      isOwner: false,
      candidateList: [],
      voterList: [],
      voterequested: false,
      voted: false,
      voterVerified: false,
      resultDeclared: false,
      currentVoter:null
    };
  }

  componentDidMount = async () => {
    // FOR REFRESHING PAGE ONLY ONCE -
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("Acooutn s " + accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      console.log(
        "networkid: " +
          networkId +
          "  deploynetworkid : " +
          deployedNetwork.address
      );
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.sue end falseetState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({
        VotingInstance: instance,
        account: accounts[0],
        web3: web3,
      });
      const owner = await this.state.VotingInstance.methods.getOwner().call();
      if (this.state.account === owner) {
        this.setState({ isOwner: true });
      }
      // this.state.VotingInstance.methods.startElection().send({from:this.state.account});

      let st = await this.state.VotingInstance.methods.getStart().call();
      let en = await this.state.VotingInstance.methods.getEnd().call();
      this.setState({ start: st, end: en });
      this.updateCandidateList();
      this.updateVoterList();
       if(this.state.isOwner === false)
      {
        this.getCurrentVoter();
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  //-----------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------
  getCurrentVoter = ()=>{
    this.state.VotingInstance.methods.voterDetails(this.state.account).call().then((cvoter)=>{
       if(cvoter.hasVerified === true)
      {
        this.setState({voterVerified : true});
      }
      if(cvoter.hasVoted=== true)
      {
      this.setState({voted:true})
      }
    });
  }
  StartElection = (event) => {
    //console.log(this.state.VotingInstance);
    if (event.target.name === "startElection") {
      this.state.VotingInstance.methods
        .startElection()
        .send({ from: this.state.account })
        .then(() => {
          this.setState({ start: true, end: false });
          //console.log("Election Started!!");
        });
    }
  };
  EndElection = (event) => {
    if (event.target.name === "endElection") {
      this.state.VotingInstance.methods
        .endElection()
        .send({ from: this.state.account })
        .then(() => {
          this.setState({ start: false, end: true });
          //console.log("Election Ended!!");
        });
    }
  };
  updateCandidateList = () => {
    this.state.VotingInstance.methods
    .getCandidateNumber()
    .call()
    .then((candidateCount) => {
      var candidatelist = [];
      for (var i = 0; i < candidateCount; i++) {
        this.state.VotingInstance.methods
          .candidateDetails(i)
          .call()
          .then((currentCandidate) => {
            candidatelist.push(currentCandidate);
          });
      }
      this.setState({ candidateList: candidatelist });
      this.state.VotingInstance.methods.getResultDeclared().call().then(
        (rs)=>{
           this.setState({resultDeclared:rs});
      });
    });


    
  };
  AddCandidate = (candidate) => {
    console.log("in APpp ----------");
    console.log(candidate)
   this.state.VotingInstance.methods
      .addCandidate(
        candidate.name,
        candidate.party,
        candidate.manifesto,
        candidate.constituency,
        candidate.imgHash
      )
      .send({ from: this.state.account })
      .then((error,result ) => {
        if(error){
          console.log(error);
          console.log("0---------------------")
        }
        alert("Candidate Added Successfully!");
       });
  

   this.updateCandidateList();

     
  }
 
  requestVoter = (voter) => {
    //console.log("App js ma ");
    //console.log(voter);
    this.state.VotingInstance.methods
      .requestVoter(voter.name, voter.votingCardNumber, voter.constituency)
      .send({ from: this.state.account })
      .then(() => {
        //console.log("Voter Requested");
      });
  };
  updateVoterList = () => {
    this.state.VotingInstance.methods
      .getVoterList()
      .call()
      .then((voters) => {
        //  this.setState({ voterList: voters });
        var i = 0;
        for (i = 0; i < voters.length; i++) {
          const cvv = voters[i];
          //console.log(cvv);
          this.state.VotingInstance.methods
            .voterDetails(cvv.voterAddress)
            .call()
            .then((cv) => {
              //console.log(cv);
              const vtList = [...this.state.voterList];
              vtList.push({
                voterAddress: cv.voterAddress,
                name: cv.name,
                votingCardNumber: cv.votingCardNumber,
                constituency: cv.constituency,
                hasVoted: cv.hasVoted,
                hasVerified: cv.hasVerified,
              });
              this.setState({
                voterList: vtList,
              });
            });
        }
      });
  };
  VerifyVoter = (_address) => {
    this.state.VotingInstance.methods
      .verifyVoter(_address)
      .send({ from: this.state.account })
      .then(() => {
        alert(_address + "Verfied!!");
      });
  };
  Vote = (candidate) => {
    alert(candidate.candidateId);
    this.state.VotingInstance.methods
      .Vote(candidate.candidateId)
      .send({ from: this.state.account })
      .then(() => {
        alert("You Have Voter to " + candidate.name);
      });
  };

  DeclareResult = () => {
    this.state.VotingInstance.methods
      .getCandidateNumber()
      .call()
      .then((candidateCount) => {
        var candidatelist = [];
        for (var i = 0; i < candidateCount; i++) {
          this.state.VotingInstance.methods
            .candidateDetails(i)
            .call()
            .then((currentCandidate) => {
              candidatelist.push(currentCandidate);
            });
        }
        this.setState({ candidateList: candidatelist });
        this.state.VotingInstance.methods
          .setResultDeclared()
          .send({ from: this.state.account })
          .then(() => {
            this.setState({ resultDeclared: true });
            alert("Result Declared!!");
          });
      });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <React.Fragment>
        <div className="App">
          {this.state.isOwner ? (
            <div>
              <Admin
                accountAddress={this.state.account}
                startStatus={this.state.start}
                endStatus={this.state.end}
                onEleStartClick={this.StartElection}
                onEleEndClick={this.EndElection}
                addCandidate={(candidate) => {
                  this.AddCandidate(candidate);
                }}
                candidateList={this.state.candidateList}
                voterList={this.state.voterList}
                verifyVoter={(address) => {
                  this.VerifyVoter(address);
                }}
                onDeclareResutClick={this.DeclareResult}
                resultDeclared={this.state.resultDeclared}
              />

            </div>
          ) : (
            <div>
              <Voters
                voterRequested={this.state.voterequested}
                candidateList={this.state.candidateList}
                requestVoter={(voter) => {
                  this.requestVoter(voter);
                }}
                Vote={(candidate) => {
                  this.Vote(candidate);
                }}
                hasVoted={this.state.voted}
                voterVerified={this.state.voterVerified}
                startStatus={this.state.start}
                endStatus={this.state.end}
                resultDeclared={this.state.resultDeclared}

              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
