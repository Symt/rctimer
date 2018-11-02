var scramblejs = function () {
    this.scramble = function (len) {
        var options = ['L', 'R', 'U', 'D', 'B', 'F'];
        var algo = [];
        while (algo.length < len) {
            if (algo.length == 0) {
                algo[0] = options[Math.floor(Math.random() * options.length)];
            } else {
                algo[algo.length] = options[Math.floor(Math.random() * options.length)] + ((Math.floor(Math.random() * 2) == 1) ? "'" : "");
                if (algo[algo.length - 1].substr(algo[algo.length - 1].length - 1) == "'" && algo[algo.length - 1].substr(0, algo[algo.length - 1].length - 1) == algo[algo.length - 2]) {
                    algo.pop();
                    algo.pop();
                } else if (algo[algo.length - 2].substr(algo[algo.length - 2].length - 1) == "'" && algo[algo.length - 1] == algo[algo.length - 2].substr(0, algo[algo.length - 2].length - 1)) {
                    algo.pop();
                    algo.pop();
                } else if (algo[algo.length - 1].substring(0, 1) == algo[algo.length - 2].substr(0, 1) && algo[algo.length - 2].length == 2) {
                    algo.pop();
                } else if (algo[algo.length - 1] == algo[algo.length - 2]) {
                    algo[algo.length - 2] += "2";
                    algo.pop();
                } else if (algo.length >= 3 && algo[algo.length - 1] == algo[algo.length - 3]) {
                    if (algo[algo.length - 3] == "R" && algo[algo.length - 2].includes("L")) {
                        algo[algo.length - 3] = "R2";
                        algo.pop();
                    } else if (algo[algo.length - 3] == "L" && algo[algo.length - 2].includes("R")) {
                        algo[algo.length - 3] = "L2";
                        algo.pop();
                    } else if (algo[algo.length - 3] == "U" && algo[algo.length - 2].includes("D")) {
                        algo[algo.length - 3] = "U2";
                        algo.pop();
                    } else if (algo[algo.length - 3] == "D" && algo[algo.length - 2].includes("U")) {
                        algo[algo.length - 3] = "D2";
                        algo.pop();
                    } else if (algo[algo.length - 3] == "F" && algo[algo.length - 2].includes("B")) {
                        algo[algo.length - 3] = "F2";
                        algo.pop();
                    } else if (algo[algo.length - 3] == "B" && algo[algo.length - 2].includes("F")) {
                        algo[algo.length - 3] = "B2";
                        algo.pop();
                    }
                } else if (algo.length >= 3 && algo[algo.length - 1] == (algo[algo.length - 3] + "'")) {
                    if ((algo[algo.length - 3] == "R" && algo[algo.length - 2].includes("L")) ||
                        (algo[algo.length - 3] == "L" && algo[algo.length - 2].includes("R")) ||
                        (algo[algo.length - 3] == "U" && algo[algo.length - 2].includes("D")) ||
                        (algo[algo.length - 3] == "D" && algo[algo.length - 2].includes("U")) ||
                        (algo[algo.length - 3] == "F" && algo[algo.length - 2].includes("B")) ||
                        (algo[algo.length - 3] == "B" && algo[algo.length - 2].includes("F"))) {
                        algo.splice(algo.length - 3, 1);
                        algo.pop();
                    }
                } else if (algo.length >= 3 && algo[algo.length - 3] == (algo[algo.length - 1] + "'")) {
                    if ((algo[algo.length - 1] == "R" && algo[algo.length - 2].includes("L")) ||
                        (algo[algo.length - 1] == "L" && algo[algo.length - 2].includes("R")) ||
                        (algo[algo.length - 1] == "U" && algo[algo.length - 2].includes("D")) ||
                        (algo[algo.length - 1] == "D" && algo[algo.length - 2].includes("U")) ||
                        (algo[algo.length - 1] == "F" && algo[algo.length - 2].includes("B")) ||
                        (algo[algo.length - 1] == "B" && algo[algo.length - 2].includes("F"))) {
                        algo.splice(algo.length - 3, 1);
                        algo.pop();
                    }
                }
                if (algo.length != 0 && algo[algo.length - 1] != algo[algo.length - 1].replace(/[RLUDBF]'2/i)) {
                    algo[algo.length - 1] = algo[algo.length - 1].substr(0, 1) + algo[algo.length - 1].substr(2);
                }
            }
        }
        var result = "";
        algo.forEach((item, index) => {
            result += item + " ";
        })
        return result.trim();
    }

    this.startLog = function () {

    }
}