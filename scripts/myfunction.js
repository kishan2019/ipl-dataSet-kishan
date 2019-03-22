let fs = require('fs');
const csv = require('csvtojson');
csv()
    .fromFile('../jsonfiles/csvfiles/matches.csv')
    .then(matchesData => {
        csv()
            .fromFile('../jsonfiles/csvfiles/deliveries.csv')
            .then(deliveriesData => {
                let jsonObj = {
                    Numberofmatchesplayedperyear: getNoOfMatchesPlayed(matchesData),
                    Numberofmatcheswonofperteam: getNoOfMatchesWonPerTeamPerYear(matchesData),
                    Extrarunsperteamin2016: getExtraRunsPerTeamForYear(matchesData, deliveriesData),
                    Top10bowlers: getEconomicalBowlersForYear(matchesData, deliveriesData)
                }
                fs.writeFile("/../../Music/data.json", JSON.stringify(jsonObj), 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                    console.log("JSON file has been saved.");
                });
         })
    })

//first
const getNoOfMatchesPlayed = (data) => {
    let YearlyPlayedMatchsData = {};
    for (let j = 1; j < data.length; j++) {
        YearlyPlayedMatchsData[data[j].season] = YearlyPlayedMatchsData.hasOwnProperty(data[j].season) ? ++YearlyPlayedMatchsData[data[j].season] : 1;
    }
    return YearlyPlayedMatchsData;
};

// second
const getNoOfMatchesWonPerTeamPerYear = (data) => {
    let myuniqueArr = [];
    for (let i = 0; i < data.length; i++) {
        if (!myuniqueArr.includes(parseInt(data[i].season))) myuniqueArr.push(parseInt(data[i].season));
    }

    myuniqueArr.sort();
    let parent = {};
    for (let i = 0; i < myuniqueArr.length; i++) {
        let child = {};
        for (let j = 1; j < data.length; j++) {
            if (myuniqueArr[i] === parseInt(data[j].season)) {
                child[data[j].winner] = child.hasOwnProperty(data[j].winner) ? ++child[data[j].winner] : 1;
            }
        }
        parent[myuniqueArr[i]] = child;
    }
    return parent;
};

//three
const getExtraRunsPerTeamForYear = (matchesData, deliveriesData) => {
    let extrarun = {};
    let matchesId = [];
    for (let i = 1; i < matchesData.length; i++) {
        if (matchesData[i].season === '2016') matchesId.push(matchesData[i].id);
    }
    for (let i = 0; i < deliveriesData.length; i++) {
        if (matchesId.includes(deliveriesData[i].match_id)) {
            extrarun[deliveriesData[i].bowling_team] = extrarun.hasOwnProperty(deliveriesData[i].bowling_team) ? extrarun[deliveriesData[i].bowling_team] + parseInt(deliveriesData[i].extra_runs) : parseInt(deliveriesData[i].extra_runs);
        }
    }
    return extrarun;
};


//fourth
const getEconomicalBowlersForYear = (matchesData, deliveriesData) => {
    let totalBallsPerBowlers = {};
    let totalRunPerBowlers = {};
    let higestEconomyBowler = {};

    let matchesId = [];
    for (let i = 1; i < matchesData.length; i++) {
        if (matchesData[i].season === '2015') matchesId.push(matchesData[i].id);
    }
    for (let i = 0; i < deliveriesData.length; i++) {
        if (matchesId.includes(deliveriesData[i].match_id)) {

            totalRunPerBowlers[deliveriesData[i].bowler] = totalRunPerBowlers.hasOwnProperty(deliveriesData[i].bowler) ? totalRunPerBowlers[deliveriesData[i].bowler] + parseInt(deliveriesData[i].total_runs) : parseInt(deliveriesData[i].total_runs);
            if (parseInt(deliveriesData[i].wide_runs) === 0 && parseInt(deliveriesData[i].noball_runs) === 0) {
                totalBallsPerBowlers[deliveriesData[i].bowler] = totalBallsPerBowlers.hasOwnProperty(deliveriesData[i].bowler) ? ++totalBallsPerBowlers[deliveriesData[i].bowler] : 1;
            }
        }
    }
    let bowlers = Object.keys(totalBallsPerBowlers);
    for (let i = 0; i < bowlers.length; i++) {
        higestEconomyBowler[bowlers[i]] = (totalRunPerBowlers[bowlers[i]]) / (Math.ceil(totalBallsPerBowlers[bowlers[i]]) / 6);
    }

    //sorting only
    let sortable = [];
    for (var item in higestEconomyBowler) {
        sortable.push([item, higestEconomyBowler[item]]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

    higestEconomyBowler = {};
    for (let i = 0; i < 10; i++) {
        higestEconomyBowler[sortable[i][0]] = parseFloat(sortable[i][1].toFixed(2));
    }
    return higestEconomyBowler;

};
