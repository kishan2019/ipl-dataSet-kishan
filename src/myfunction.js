let fs = require('fs');
let csvToJson = require('convert-csv-to-json');
let matches_data = csvToJson.fieldDelimiter(',').getJsonFromCsv('matches.csv');
let deliveries_data = csvToJson.fieldDelimiter(',').getJsonFromCsv('deliveries.csv');

//first

const getNoOfMatchesPlayed = (data) => {
    let YearlyPlayedMatchsData = {};
    for (let j = 1; j < data.length; j++) {
        YearlyPlayedMatchsData[data[j].season] = YearlyPlayedMatchsData.hasOwnProperty(data[j].season)? ++YearlyPlayedMatchsData[matches_data[j].season] : 1;
    }
 return YearlyPlayedMatchsData;
};

// second
const getNoOfMatchesWonPerTeamPerYear = (data) => {
    let myuniqueArr = [];
for (let i = 0; i < matches_data.length; i++) {
    if (!myuniqueArr.includes(parseInt(matches_data[i].season))) myuniqueArr.push(parseInt(matches_data[i].season));
}
myuniqueArr.sort();
let parent = {};
for (let i = 0; i < myuniqueArr.length; i++) {
    let child = {};
    for (let j = 1; j < matches_data.length; j++) {
        if (myuniqueArr[i] === parseInt(matches_data[j].season)) {
            child[matches_data[j].winner] = child.hasOwnProperty(matches_data[j].winner) ? ++child[matches_data[j].winner] : 1;
        }
    }
  parent[myuniqueArr[i]] = child; 
}
return parent;
};

//third
 const getExtraRunsPerTeamForYear = (matches_data,deliveries_data) => {
    let extrarun = {};
    let matches_id = [];
     for (let i = 1; i < matches_data.length; i++) {
         if (matches_data[i].season === '2016') matches_id.push(matches_data[i].id);  
     }
     for(let i=0;i< deliveries_data.length; i++){
         if(matches_id.includes(deliveries_data[i].match_id)){
             extrarun[deliveries_data[i].bowling_team] = extrarun.hasOwnProperty(deliveries_data[i].bowling_team)? extrarun[deliveries_data[i].bowling_team] + parseInt(deliveries_data[i].extra_runs) : parseInt(deliveries_data[i].extra_runs);
         }
     }
     return extrarun;

};


//fourth

const getEconomicalBowlersForYear = (matches_data, deliveries_data) => {
let totalballs_perbowlers = {};
let totalrun_perbowlers = {};
let higest_Economy_bowler = {};

let matches_id = [];
 for (let i = 1; i < matches_data.length; i++) {
     if (matches_data[i].season === '2015') matches_id.push(matches_data[i].id);  
 }

for (let i = 0; i < deliveries_data.length; i++) {
    if(matches_id.includes(deliveries_data[i].match_id)){

    totalrun_perbowlers[deliveries_data[i].bowler] = totalrun_perbowlers.hasOwnProperty(deliveries_data[i].bowler) ? totalrun_perbowlers[deliveries_data[i].bowler] + parseInt(deliveries_data[i].total_runs) : parseInt(deliveries_data[i].total_runs);
    if (parseInt(deliveries_data[i].wide_runs) === 0 && parseInt(deliveries_data[i].noball_runs) === 0) {
        totalballs_perbowlers[deliveries_data[i].bowler] = totalballs_perbowlers.hasOwnProperty(deliveries_data[i].bowler) ? ++totalballs_perbowlers[deliveries_data[i].bowler] : 1;
    }
}
}
let bowlers = Object.keys(totalballs_perbowlers);
for (let i = 0; i < bowlers.length; i++) {
    higest_Economy_bowler[bowlers[i]] = (totalrun_perbowlers[bowlers[i]]) / (Math.ceil(totalballs_perbowlers[bowlers[i]]) / 6);
}
//sorting only
var sortable = [];
for (var item in higest_Economy_bowler) {
    sortable.push([item, higest_Economy_bowler[item]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});
 higest_Economy_bowler = {}; 
for(let i=0; i<10; i++){
    higest_Economy_bowler[sortable[i][0]] = sortable[i][1].toFixed(2);
}

return higest_Economy_bowler;

};

let jsonObj = {
    "Number of matches played per year for all the years in IPL" : getNoOfMatchesPlayed(matches_data),
    "Number of matches won of per team per year in IPL" : getNoOfMatchesWonPerTeamPerYear(matches_data),
    "Extra runs conceded per team in 2016" : getExtraRunsPerTeamForYear(matches_data,deliveries_data),
    "Top 10 economical bowlers in 2015" : getEconomicalBowlersForYear(matches_data, deliveries_data)
}
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
 
fs.writeFile("../ipl_front/data.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});




