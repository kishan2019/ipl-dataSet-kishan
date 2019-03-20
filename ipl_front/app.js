fetch("data.json").then(function (data) {
    return data.json();
}).then(function (myjson) {
    let mykeys = Object.keys(Object.values(myjson)[0]);
    let temp = [];
    for (let i = 0; i < mykeys.length; i++) {
        obj = {};
        obj["name"] = mykeys[i];
        obj["y"] = Object.values(myjson)[0][mykeys[i]];
        temp.push(obj);
    }
    visualize(temp);
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