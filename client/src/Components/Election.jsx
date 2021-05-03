import React from "react";
import ResultGraph from "./ResultGraph";
const Election = (props) => {
  let ElectionStatus = "---------";

  if(props.resultDeclared===true)
  {    ElectionStatus = <></>;
}
  else if (props.startStatus === true && props.endStatus === false) {
    ElectionStatus = <h1>"Election has been Started!"</h1>;
  } else if (props.startStatus === false && props.endStatus === true) {
    ElectionStatus = <h1>"Election has been ended!"</h1>;
  }
  return (
    <>
      <div >{ElectionStatus}</div>
      {props.resultDeclared ? (
            <div className="result_container">
            <div>
              <ResultGraph className="result_graph" candidateList={props.candidateList}/>

            </div>
      </div>
          
      ) : (
        <></>
      )}
      <button
        onClick={props.onEleStartClick}
        name="startElection"
        disabled={props.startStatus === true || props.resultDeclared === true}
      >
        Start Election
      </button>
      <button
        onClick={props.onEleEndClick}
        name="endElection"
        disabled={
          props.startStatus === false ||
          props.endStatus === true ||
          props.resultDeclared === true
        }
      >
        End Election
      </button>
      {console.log(" Election " + props.startStatus + " " + props.endStatus)}

      <button
        disabled={!(props.startStatus === false && props.endStatus === true) || (props.resultDeclared===true  ) }
        onClick={() => {
          props.onDeclareResutClick();
        }}
      >
        Declare Result
      </button>
    </>
  );
};

export default Election;
