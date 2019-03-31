let fs = require('fs');
const csv = require('csvtojson');
csv()
    .fromFile('../jsonfiles/csvfiles/matches.csv')
    .then(matchesData => {
        csv()
            .fromFile('../jsonfiles/csvfiles/deliveries.csv')
            .then(deliveriesData => {
                let jsonObj = {
                    matchesplayedperyear: MatchesPerYear(matchesData),
                    matcheswonofperteam: WonPerTeamPerYear(matchesData),
                    Extrarunsperteamin2016: ExtraRunsPerYear(matchesData, deliveriesData),
                    Top10bowlers: getEconomicalBowlersForYear(matchesData, deliveriesData)
                }
                fs.writeFile("../jsonfiles/data.json", JSON.stringify(jsonObj), 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                    console.log("JSON file has been saved.");
                });
            })
    })

const MatchesPerYear = (arrOfObject) => {
    let YearlyMatchs = {};
    for (let obj of arrOfObject) {
        YearlyMatchs[obj['season']] = YearlyMatchs.hasOwnProperty(obj['season']) ? ++YearlyMatchs[obj['season']] : 1;
    }
    return YearlyMatchs;
};

const WonPerTeamPerYear = (data) => {
    let uniqueArr = [];
    for (let obj of data) {
        if (uniqueArr.includes(parseInt(obj['season'])) === false) {
            uniqueArr.push(parseInt(obj['season']));
        }
    }
    uniqueArr.sort();
    let parent = {};
    for (let elem of uniqueArr) {
        let child = {};
        for (let obj of data) {
            if (elem === parseInt(obj['season'])) {
                child[obj['winner']] = child.hasOwnProperty(obj['winner']) ? ++child[obj['winner']] : 1;
            }
        }
        parent[elem] = child;
    }
    return parent;
};

const ExtraRunsPerYear = (matchesData, deliveriesData) => {
    let extrarun = {};
    let matchesId = [];
    for (let obj of matchesData) {
        if (obj['season'] === '2016') matchesId.push(obj['id']);
    }
    for (let obj of deliveriesData) {
        if (matchesId.includes(obj['match_id'])) {
            extrarun[obj['bowling_team']] = extrarun.hasOwnProperty(obj['bowling_team']) ? extrarun[obj['bowling_team']] + parseInt(obj['extra_runs']) : parseInt(obj['extra_runs']);
        }
    }
    return extrarun;
};

const getEconomicalBowlersForYear = (matchesData, deliveriesData) => {
    let totalBallsPerBowlers = {};
    let totalRunPerBowlers = {};
    let higestEconomyBowler = {};
    let matchesId = [];
    for (let obj of matchesData) {
        if (obj['season'] === '2015') matchesId.push(obj['id']);
    }
    for (let obj of deliveriesData) {
        if (matchesId.includes(obj['match_id'])) {
            totalRunPerBowlers[obj['bowler']] = totalRunPerBowlers.hasOwnProperty(obj['bowler']) ? totalRunPerBowlers[obj['bowler']] + parseInt(obj['total_runs']) : parseInt(obj['total_runs']);
            if (parseInt(obj['wide_runs']) === 0 && parseInt(obj['noball_runs']) === 0) {
                totalBallsPerBowlers[obj['bowler']] = totalBallsPerBowlers.hasOwnProperty(obj['bowler']) ? ++totalBallsPerBowlers[obj['bowler']] : 1;
            }
        }
    }
    let bowlers = Object.keys(totalBallsPerBowlers);
    for (let elem of bowlers) {
        higestEconomyBowler[elem] = (totalRunPerBowlers[elem]) / (Math.ceil(totalBallsPerBowlers[elem]) / 6);
    }
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