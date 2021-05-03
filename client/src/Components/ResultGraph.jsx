import React  from 'react';
// /home/rajat/Documents/blockchain/my/pet-shop/client/node_modules
import CanvasJSReact  from '../canva/canvasjs.react.js';
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ResultGraph = (props)=>{
    var result =[];
    for(var i=0;i<props.candidateList.length;i++)
    {
        //var nameparty= props.candidateList[i].name.toString() +" "+ props.candidateList[i].party.toString();
        result.push({y:props.candidateList[i].voteCount, label:props.candidateList[i].name.toString() +" "+ props.candidateList[i].party.toString()})
    }
    const options = {
        theme: "black",
        animationEnabled: true,
        exportFileName: "Election Result",
        exportEnabled: true,
        title:{
            text: "Election Result"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label} : {y} vote",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints:result
        }]
    }
    return <><CanvasJSChart options = {options}
 /></>;
}
export default ResultGraph;