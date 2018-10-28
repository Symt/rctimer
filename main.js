var going = false;
var time;
var startTime = 0;
var date;
var elapsed = 0;
var formattedTime;
var rowCounter = 1;
var timeArray = [];
var secTimeArray = [];
var the_chart;
var iterm_time = 0;
var stop_time = 0;
$(document).ready(() => {
    console.log("Scramble Algorithm: CUSTOM (WIP)")
    console.log("Current Issues:\n 1. D U D & other repeats as so\n 2. D'2 D & other repeats as so (Explicit fix)\n 3. D' U D & other cancellations")
    plot()    
    date = new Date();
    $(document).keydown((e) => {
        date = new Date();
        interm_time = date.getTime();
        if (!going && e.which == 32 && $("#timer-wrapper").css("display") != 'none' && interm_time-stop_time >= 3000) {
            interm_time = 0;
            $("body").css('background-color', "indianred");
            $("#timer").text("00:00.000");
            going = true;
        } else if (going && elapsed > 0 && $("#timer-wrapper").css("display") != 'none') {
            stop();
        }
    });
    $(document).keyup((e) => {
        if (going && e.which == 32 && $("#timer-wrapper").css("display") != 'none') {
            $("body").css('background-color', "crimson");
            start();
        }
    });
});

function pad(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";
}

function formatTime(time) {
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((seconds / 60) % 60);
    var milliseconds = time % 1000;
    var sS = pad(seconds, 2);
    var mS = pad(minutes, 2);
    var mlS = pad(milliseconds, 3);
    return mS + ":" + sS + "." + mlS;
}

function swapDisplay() {
    if (going) {
        return null;
    }
    $("#timer-wrapper").fadeToggle(250)
    $("#stats").fadeToggle(250)
}

function start() {
    setTimeout(function () {
        if (!going) {
            return;
        }
        date = new Date();
        if (startTime == 0) {
            startTime = date.getTime();
        }
        time = date.getTime();
        elapsed = time - startTime;

        formattedTime = formatTime(elapsed);
        $("#timer").text(formattedTime);

        start();
    }, 50);
}

function stop() {
    date = new Date();
    stop_time = date.getTime();
    var table = document.getElementById("true-table");
    var solverow = table.insertRow($("#true-table").closest("tr").length);
    var trueSolve = solverow.insertCell(0);
    var trueTime = solverow.insertCell(1);
    $(trueSolve).addClass("solve-count");
    $(trueTime).addClass("solve-time");
    $(trueTime).addClass("r" + (rowCounter - 1));
    trueTime.innerHTML = $("#timer").text();
    trueSolve.innerHTML = "<a class='delete-it r" + (rowCounter - 1) +
        "' href='javascript:null' onclick='deleteItClickHandler(this.className.split(\" \")[1])'>" + rowCounter +
        "</a>";
    startTime = 0;
    going = false;
    secTimeArray[rowCounter - 1] = (elapsed / 1000) % 60;
    elapsed = 0;
    timeArray[rowCounter - 1] = $("#timer").text();
    rowCounter++;
    $("#algo-text").text(scramble(20));
    plot();
}

function deleteItClickHandler(correctClass) {
    var rowNum = parseInt(correctClass.substring(1));
    deleteRow(confirm("Are you sure you want to delete this row (" + (rowNum + 1) + ")?"), correctClass)
}

function deleteRow(boolCheck, id) {
    if (!boolCheck) {
        return undefined;
    }
    timeArray.splice(id.substr(1), 1);
    secTimeArray.splice(id.substr(1), 1);
    rowCounter--;
    var table = document.getElementById('true-table');
    var iter = table.children[0].childElementCount;
    for (var i = 0; i < iter; i++) {
        table.deleteRow(0);
    }
    var count = 0;
    var tempArray = timeArray.reverse();
    tempArray.forEach((item, index) => {
        var solverow = table.insertRow(count++);
        var trueSolve = solverow.insertCell(0);
        var trueTime = solverow.insertCell(1);
        $(trueTime).addClass("r" + (rowCounter - 1));
        $(trueSolve).addClass("solve-count");
        $(trueTime).addClass("solve-time");
        trueSolve.innerHTML = "<a class='delete-it r" + (rowCounter - index - 2) +
            "' href='javascript:null' onclick='deleteItClickHandler(this.className.split(\" \")[1])'>" +
            (rowCounter - index - 1) + "</a>";
        trueTime.innerHTML = item;
    });
    plot();
}

function plot() {
    var labels = [];
    for (var i = 1; i <= secTimeArray.length; i++) {
        labels.push(i.toString());
    }
    var lineColor = [244, 223, 66]
    var ctx = document.getElementById("chart").getContext('2d');
    var config = {
        type: 'line',
        data: {
            datasets: [{
                label: "Solve Times",
                data: secTimeArray,
                backgroundColor: 'rgb(' + lineColor[0] + ',' + lineColor[1] + ',' + lineColor[2] + ')',
                borderColor: 'rgb(' + lineColor[0] + ',' + lineColor[1] + ',' + lineColor[2] + ')',
                fill: false,
            }],
            labels: labels
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Progress"
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "#fff"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Solves'
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#FFFFFF"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (s)'
                    },
                }]
            }
        }
    };
    if (the_chart === null || the_chart === undefined) the_chart = new Chart(ctx, config);
    Chart.defaults.global.defaultFontColor = 'white';
    the_chart.data.datasets[0].data = secTimeArray;
    the_chart.data.labels = labels;
    the_chart.update();
}

function remove(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
            break;
        }
    }
    return arr;
}

function scramble(len) {
    var options = ['L', 'R', 'U', 'D', 'B', 'F'];
    var algo = [];
    while (algo.length < len) {
        if (algo.length == 0) {
            algo[0] = options[Math.floor(Math.random() * options.length)];
        } else {
            algo[algo.length] = options[Math.floor(Math.random() * options.length)] + ((Math.floor(Math.random()*2) == 1) ? "'" : "");
            if (algo[algo.length - 1].substr(algo[algo.length - 1].length - 1) == "'" && algo[algo.length - 1].substr(0,algo[algo.length-1].length-1) == algo[algo.length - 2]) {
                algo.pop();
                algo.pop();
            } else if (algo[algo.length - 2].substr(algo[algo.length - 2].length - 1) == "'" && algo[algo.length - 1] == algo[algo.length - 2].substr(0, algo[algo.length - 2].length - 1)) {
                algo.pop();
                algo.pop();
            } else if (algo[algo.length - 1] == algo[algo.length - 2].substr(0, 1) && algo[algo.length - 2].length == 2) {
                algo.pop();
            } else if (algo[algo.length - 1] == algo[algo.length - 2]) {
                algo[algo.length - 2] += "2";
                algo.pop();
            }
            if (algo.length != 0 && algo[algo.length - 1] != algo[algo.length - 1].replace(/[RLUDBF]'2/i)) {
                algo[algo.length - 1] = algo[algo.length-1].substr(0,1) + algo[algo.length-1].substr(2);
            }
        }
    }
    var result = "";
    algo.forEach((item, index) => {
        result += item + " ";
    })
    return result;
}