//https://api.myjson.com/bins/15o3oa

fetch("../jsonfiles/data.json").then(function (data) {
    return data.json();
}).then( myjson => {
    graphmatchesplayedperyear(matchesplayedperyear(myjson));
    graphExtrarunsperteamin2016(Extrarunsperteamin2016(myjson));
    graphTop10bowlers(Top10bowlers(myjson));
    matcheswonofperteam(perTeamwonMatch(myjson), key(myjson));
});

    const perTeamwonMatch = (myjson) => {
        mykeys = Object.keys(Object.values(myjson)[1]);
        let teams = [];
        for (let i = 0; i < mykeys.length; i++) {
            teams.push(Object.keys(Object.values(myjson)[1][mykeys[i]]));
        }
        let myteam = teams.flat();
        let teamsno = [...new Set(myteam)];
        console.log(teamsno);
        let mytemp = [];
        for (let i = 0; i < teamsno.length; i++) {
            obj = {};
            temp = [];
            obj["name"] = teamsno[i];
            for (let j = 0; j < mykeys.length; j++) {
                let val;
                if (!isNaN(Object.values(myjson)[1][mykeys[j]][teamsno[i]])) {
                    val = Object.values(myjson)[1][mykeys[j]][teamsno[i]];
                } else {
                    val = 0;
                }
    
                temp.push(val);
            }
            obj['data'] = temp;
            mytemp.push(obj);
        }
        return mytemp;
    }

    const key = (myjson) => {
        return Object.keys(Object.values(myjson)[1]);
        
    }

const matchesplayedperyear = (myjson) => {
    let mykeys = Object.keys(Object.values(myjson)[0]);
    let temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[0][mykeys[i]];
        temp.push(obj);
    }
    return temp;
}

const Extrarunsperteamin2016 = (myjson) => {
    let mykeys = Object.keys(Object.values(myjson)[2]);
    let temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[2][mykeys[i]];
        temp.push(obj);
    }
    return temp;
}

const Top10bowlers = (myjson) => {
    let mykeys = Object.keys(Object.values(myjson)[3]);
    let temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[3][mykeys[i]];
        temp.push(obj);
    }
    return temp;
}

const graphmatchesplayedperyear = (data) => {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number of matches played per year for all the years in IPL'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Number of matches played per year'
            }
        },
        "series": [{
            "name": "Matches",
            "colorByPoint": true,
            "data": data
        }],
    });
}

const matcheswonofperteam = (mytemp, mykeys) => {
    Highcharts.chart('container1', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Number of matches won of per team per year in IPL'
        },
        xAxis: {
            categories: mykeys
        },
        yAxis: {
            min: 1,
            title: {
                text: 'Number of matches won'
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: mytemp
    });
}

const graphExtrarunsperteamin2016 = (data) => {
    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra runs conceded per team in 2016'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Extra runs conceded per team'
            }
        },
        "series": [{
            "name": "Extra_run",
            "colorByPoint": true,
            "data": data
        }],
    });
}

const graphTop10bowlers = (data) => {
    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 economical bowlers in 2015'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Top 10 economical bowlers'
            }
        },
        "series": [{
            "name": "per_Over",
            "colorByPoint": true,
            "data": data
        }],
    });
}