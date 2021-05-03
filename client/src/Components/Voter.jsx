import React from "react";
import "../CSS/voter.css";
const Voter = (props) => {
    
   // console.log("----------->>>>>>"+ props.voter.hasVerified.toString());
   // console.log(props.voter);
  return (
    <>
      <div className="voter_card_container">
        <div className="voter_card_item">{props.voter.voterAddress}</div>
        <div className="voter_card_item" style={{ textAlign: "center" }}>
          {props.voter.name}
        </div>
        <div className="voter_card_item" style={{ textAlign: "center" }}>
          {props.voter.votingCardNumber}
        </div>
        <div className="voter_card_item" style={{ textAlign: "center" }}>
          {props.voter.hasVerified ? <p>verified</p> : <button onClick={()=>{
        props.onClick(props.voter.voterAddress);
    }}>Verify</button>}
          {/* {props.voter.hasVerified.toString()} */}
        </div>
      </div>
    </>
  );
};

export default Voter;
