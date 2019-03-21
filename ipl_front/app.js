fetch("data.json").then(function (data) {
    return data.json();
}).then(function (myjson) {
    // console.log(myjson[Object.keys(myjson)[3]]);

    let mykeys = Object.keys(Object.values(myjson)[0]);
    let temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[0][mykeys[i]];
        temp.push(obj);
    }
    visualize(temp);
    //console.log(Object.values(myjson)[1][2008]["Kolkata Knight Riders"]);

    //-----------------------------------------------

     mykeys = Object.keys(Object.values(myjson)[1]);
      // console.log(mykeys);
     let teams = [];
     for (let i = 0; i < mykeys.length; i++) {
         teams.push(Object.keys(Object.values(myjson)[1][mykeys[i]]));
     }
     //console.log(teams);
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
            if(!isNaN(Object.values(myjson)[1][mykeys[j]][teamsno[i]])){
                 val = Object.values(myjson)[1][mykeys[j]][teamsno[i]];
            } else{
                val = 0;
            }
            
            temp.push(val);
        }
        obj['data'] = temp;
        mytemp.push(obj);
    }

    visualize1(mytemp, mykeys);




    //-----------------------------------------------
    mykeys = Object.keys(Object.values(myjson)[2]);
    temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[2][mykeys[i]];
        temp.push(obj);
    }
    visualize2(temp);





    //----------------------------------------------
    mykeys = Object.keys(Object.values(myjson)[3]);
    temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[3][mykeys[i]];
        temp.push(obj);
    }
    visualize3(temp);
});

const visualize = (data) => {
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
            "name": "Years",
            "colorByPoint": true,
            "data": data
        }],
    });

}

const visualize1 = (mytemp, mykeys) => {
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

const visualize2 = (data) => {
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

const visualize3 = (data) => {
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