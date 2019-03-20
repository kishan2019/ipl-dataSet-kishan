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
    console.log(Object.values(myjson)[1][2008]["Kolkata Knight Riders"]);
    //-----------------------------------------------
    let teams = Object.keys(Object.values(myjson)[1][2008]);
    mykeys = Object.keys(Object.values(myjson)[1]);
    // console.log(mykeys);
    let mytemp = [];
   for (let i = 0; i < teams.length; i++) {
        obj = {};
        temp = [];
        obj["name"] = teams[i];
       for(let j=0;j<mykeys.length;j++) {
        let val = Object.values(myjson)[1][mykeys[j]][teams[i]];
        temp.push(val);
       }
      obj['data'] = temp;
      mytemp.push(obj);
   }
  
   visualize1(mytemp,mykeys);
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
            text: 'Total number of matches played'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total number of matches'
            }
        },
        "series": [{
            "name": "Years",
            "colorByPoint": true,
            "data": data
        }],
    });

}

const visualize1 = (mytemp,mykeys) => {
    Highcharts.chart('container1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: mykeys
        },
        yAxis: {
            min: 1,
            max:16,
            title: {
                text: 'Total fruit consumption'
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
            text: 'Total number of matches played'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total number of matches'
            }
        },
        "series": [{
            "name": "Years",
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
            text: 'Total number of matches played'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total number of matches'
            }
        },
        "series": [{
            "name": "Years",
            "colorByPoint": true,
            "data": data
        }],
    });

}