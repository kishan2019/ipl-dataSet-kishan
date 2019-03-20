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