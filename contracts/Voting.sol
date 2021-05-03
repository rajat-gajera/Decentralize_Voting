// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
contract Voting{

    address public owner;
    uint candidateCount;
    uint voterCount;
    bool start;
    bool end;
    bool resultDeclared;
    constructor() public {
        owner = msg.sender;
        candidateCount = 0;
        voterCount =0;
        start = false;
        end = false;
        resultDeclared = false;
        
    }
    function getOwner() public view returns (address) {
        return owner;
    }
    modifier onlyAdmin(){
        require(msg.sender == owner);
        _;
    }

    struct Candidate{
        string name;
        string party;
        string manifesto;
        string imgHash;
        uint voteCount;
        uint constituency;
        uint candidateId;
    }
    mapping(uint => Candidate) public candidateDetails;
    Candidate[]  public candidateList;
    function addCandidate(string memory _name, string memory  _party, string memory  _manifesto, uint _constituency,string memory _imgHash)  public onlyAdmin {
        Candidate memory newCandidate = Candidate({name:_name, party:_party, manifesto:_manifesto, voteCount:0, constituency:_constituency, candidateId : candidateCount, imgHash:_imgHash});
        candidateDetails[candidateCount] = newCandidate;
        candidateList.push(newCandidate);
        candidateCount+=1;

    }
    function getCandidateNumber() public view  returns(uint){
        return candidateCount;
    }
    function getCandidateList() public view returns(Candidate [] memory){
        return candidateList;
    }

    struct Voter{
        address voterAddress;
        string name;
        string votingCardNumber;
        uint constituency;
        bool hasVoted;
        bool hasVerified;

    }

    address[] public voters;
    mapping(address => Voter) public voterDetails;
    Voter[] public voterList;
    function requestVoter(string memory  _name, string memory  _votingCardNumber, uint  _constituency) public {
    
        address _voterAddress = msg.sender;
        Voter memory newVoter = Voter({voterAddress:_voterAddress, name:_name, votingCardNumber:_votingCardNumber, constituency: _constituency, hasVoted : false, hasVerified: false});
        voterDetails[msg.sender] = newVoter;
        voterList.push(newVoter);
        voters.push(msg.sender);
        voterCount +=1; 
    }
    function getVoterList() public view returns(Voter [] memory){
    return voterList;
      
    }
    function getVoterCount() public view returns(uint) {
        return voterCount;
    } 
    function getvoter(address _address) public view returns(Voter memory){
        
        return voterDetails[_address];
    }
    function verifyVoter(address _address) public onlyAdmin{
        voterDetails[_address].hasVerified = true;
        
        for(uint i = 0 ; i <voterList.length ; i++)
        {
            Voter storage cv = voterList[i];
            if(cv.voterAddress == _address)
            {
                cv.hasVerified= true;
                voterList[i]=cv;
                
            } 
        }
    } 

    function Vote(uint _candidateId) public {
        require(voterDetails[msg.sender].hasVoted == false);
        require(voterDetails[msg.sender].hasVerified == true);
        require(start == true);
        require(end == false);
        candidateDetails[_candidateId].voteCount += 1;
        voterDetails[msg.sender].hasVoted = true;


    }
    function startElection()public onlyAdmin  {
        start =true;
        end  = false;
         
    }
    function endElection() public onlyAdmin {
        start = false;
        end = true;
     }

    function getStart() public view returns(bool){
    return start;
    }
    function getEnd() public view returns(bool){
        return end;
    }

    function getResultDeclared() public view returns(bool){
        return resultDeclared;
    }
    function setResultDeclared() public onlyAdmin {
        resultDeclared = true;
        
    }
 

}