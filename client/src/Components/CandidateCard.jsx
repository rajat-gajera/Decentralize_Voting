import React from "react";
import "../CSS/candidatecard.css"
const CandidateCard = (props) => {
  
  return <>
   <div className="candidate_card">
        <div >{props.candidate.manifesto}</div>
           <img  alt="" className="candidate_img"   src={`https://ipfs.io/ipfs/${props.candidate.imgHash}`}></img>  
          <div>{props.candidate.name}</div>
          <div>{props.candidate.party}</div>
          { 
          
            (props.voterFlag)?(<div><button disabled={((props.hasVoted===true)||(props.voterVerified===false) ||  (props.resultDeclared===true) || (props.startStatus === false && (props.endStatus === true || props.endStatus===false)))} onClick={()=>{
              props.onClick(props.candidate)
            }}>Vote</button></div>):(<></>)
          }
           
        </div>
</>;
};
export default CandidateCard;
