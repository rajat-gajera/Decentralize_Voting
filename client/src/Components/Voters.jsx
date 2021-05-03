import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import "../CSS/candidatecard.css";
import "../CSS/voters.css";
import ResultGraph from "./ResultGraph";
const Voters = (props) => {
  const [voter, setvoter] = useState({
    name: "",
    votingCardNumber: "",
    constituency: "",
  });
  const Updatevals = (event) => {
    event.persist();
    setvoter((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    console.log(voter);
  };
  const addVoter = (event) => {
    event.preventDefault();
    console.log(voter);
    props.requestVoter(voter);
    setvoter({ name: "", votingCardNumber: "", constituency: "" });
  };

  return (
    <>
      <div className="navbar">
        <p className="heading">Voting</p>
        <p className="title">Voter</p>
      </div>
      {props.hasVoted === true ? <h6>you have Already Voted!!</h6> : <></>}
      {props.voterVerified === true ? <h6>verified</h6> : <h4>not Verified</h4>}
      
          {props.resultDeclared ? (
            <div className="result_container">
            <div>
              <ResultGraph className="result_graph" candidateList={props.candidateList}/>

            </div>
      </div>
          ) : (
            <></>
          )}
        
      <div>
        <div className="candidate_container">
          <h2>Candidates</h2>

          <div className="candidate_card_container">
            {props.candidateList.map((curcad) => {
              return (
                <CandidateCard
                  candidate={curcad}
                  voterFlag={true}
                  startStatus={props.start}
                  endStatus={props.end}
                  resultDeclared={props.resultDeclared}
                  voterVerified={props.voterVerified}
                  hasVoted={props.hasVoted}
                  onClick={(candidate) => {
                    props.Vote(candidate);
                  }}
                />
              );
            })}
          </div>
        </div>

        {props.voterRequested ? (
          <></>
        ) : (
          <form onSubmit={addVoter}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={Updatevals}
            />
            <br />
            <input
              type="text"
              name="votingCardNumber"
              id="votingCardNumber"
              placeholder="Voting Card Number"
              onChange={Updatevals}
            />
            <br />
            <input
              type="text"
              name="constituency"
              id="constituency"
              placeholder="Constituency"
              onChange={Updatevals}
            />
            <br />
            <button
              type="submit"
              name="addvoter"
              id="addvoter"
              disabled={
                props.resultDeclared === true ||
                (props.startStatus === true && props.endStatus === false)
              }
            >
              Request Voter
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default Voters;
