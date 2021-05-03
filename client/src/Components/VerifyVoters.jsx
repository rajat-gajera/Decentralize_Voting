import React from 'react';
import Voter from "./Voter"
import "../CSS/voter.css";
const VerifyVoters = (props)=>{
    return (<>
        <div style={ {
    padding: "16px",
    display:"flex",
    flexDirection:"row",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    margin: "8px",
    fontSize: "larger",
    borderRadius: "5px"
      
    
  }}>
          <div className="voter_card_item">Voter Address</div>
          <div className="voter_card_item" style={{textAlign:"center"}}>Name</div>
          <div className="voter_card_item" style={{textAlign:"center"}}>Voting Card Number</div>
          <div className="voter_card_item" style={{textAlign:"center"}}>Verification Status</div>
      </div>
        {props.voterList.map((voter)=>{
            return <Voter key={voter.voterAddress} voter={voter} onClick={(address)=>{props.onClick(address)}}/>
        })}
        
       </>);
}
export default  VerifyVoters;