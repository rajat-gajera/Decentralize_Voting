import React from "react";
import AddCandidateFormComp from "./AddCandidateFormComp";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import VerifyVoters from "./VerifyVoters";
import Election from "./Election";
import "../CSS/admin.css";

const Admin = (props) => {
 
  console.log(props.voterList);

  return (
    <>
      <div className="navbar">
        <p className="heading">Voting </p>
        <div className="links">
          <NavLink
            className="nav-item"
            to="/Election"
            style={{ textDecoration: "none" }}
            activeStyle={{ color: "blue" }}
          >
            Election
          </NavLink>
          <NavLink
            className="nav-item"
            to="/AddCandidate"
            style={{ textDecoration: "none" }}
            activeStyle={{ color: "blue" }}
          >
            Add Candidate
          </NavLink>
          <NavLink
            className="nav-item"
            to="/VerifyVoters"
            style={{ textDecoration: "none" }}
            activeStyle={{ color: "blue" }}
          >
            Verify Voters
          </NavLink>
          <Link
            className="nav-item"
            style={{ textDecoration: "none" }}
            activeStyle={{ color: "blue" }}
          >
            Admin
          </Link>
        </div>
      </div>
 

      <Switch>
        <Route exact path="/AddCandidate">
          <AddCandidateFormComp
            stfl={props.startStatus}
            addCandidate={(candidate) => {
              props.addCandidate(candidate);
            }}
            candidateList={props.candidateList}
          />
        </Route>
        <Route   path="/Election">
          <Election candidateList={props.candidateList} resultDeclared={props.resultDeclared} startStatus={props.startStatus} endStatus={props.endStatus} onEleStartClick={props.onEleStartClick} onEleEndClick={props.onEleEndClick} onDeclareResutClick={ props.onDeclareResutClick}/>
         
        </Route>
        <Route exact path="/VerifyVoters">
          <VerifyVoters
            voterList={props.voterList}
            onClick={(address) =>{ props.verifyVoter(address)}}
          />
        </Route>
      </Switch>
    </>
  );
};
export default Admin;
