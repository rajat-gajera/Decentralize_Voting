import React, { useState } from "react";
import CandidateCard from "./CandidateCard";
import "../CSS/candidatecard.css";
import ipfs from "../ipfs";
const AddCandidateFormComp = (props) => {
  const [candidate, setcandidate] = useState({
    name: "",
    party: "",
    manifesto: "",
    constituency: "",
    imgBuffer: null,
    imgHash:""
  });

  const updateInfo = (event) => {
    event.persist();
    setcandidate((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const addCandidate = (event) => {
    event.preventDefault();
    //console.log(candidate.imgBuffer);
    props.addCandidate(candidate);
    setcandidate({ name: "", party: "", manifesto: "", constituency: "" });
  };
  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event.target.files[0];

    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    // Convert file to buffer so that it can be uploaded to IPFS
    const imgBuffer =   Buffer (reader.result);
    candidate.imgBuffer =imgBuffer;
   ipfs.files.add( candidate.imgBuffer, ( error,result) => {
     
    var imghash =  result[0].hash.toString();
    console.log(imghash);
     candidate.imgHash = imghash;
   
  })
  
    
  
 
  
  }
   
 

  return (
    <>
      <div>
        <div className="candidate_container">
          <h2>Candidates</h2>
          <div className="candidate_card_container">
            {props.candidateList.map((curcad) => {
              return <CandidateCard candidate={curcad} />;
            })}
          </div>
        </div>
        <h2>Add Candidate</h2>
        <form onSubmit={addCandidate}>
          <input
            type="text"
            name="name"
            id="name"
            value={candidate.name}
            placeholder="Name"
            onChange={updateInfo}
            required
          />
          <br />
          <input
            type="text"
            name="party"
            id="party"
            value={candidate.party}
            placeholder="Party"
            onChange={updateInfo}
            required
          />
          <br />
          <input
            type="text"
            name="manifesto"
            id="manifesto"
            value={candidate.manifesto}
            placeholder="Manifesto"
            onChange={updateInfo}
            required
          />
          <br />
          <input
            type="text"
            name="constituency"
            id="constituency"
            value={candidate.constituency}
            placeholder="Constituency"
            onChange={updateInfo}
            required
          />
          <br />
          Image:
          <input
            type="file"
            onChange={captureFile}
            placeholder="Candidate Image"
          />
          <br />
          <button
            type="submit"
            name="addcandidate"
            id="addcandidate"
            disabled={props.stfl === true}
          >
            Add Candidate
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCandidateFormComp;
