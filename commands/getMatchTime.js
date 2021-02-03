const spacetime = require('spacetime');

function GetMatchTime(time) {
    var d = spacetime.now('America/New_York');
    var s = d.add(7, 'day');

    if (time == 3) {
        if (!s.isDST()) {
            return matchTime = "3pm";
        } else {
            return matchTime = "4pm";
        }
    } else if (time == 8) {
        if (!s.isDST()) {
            return matchTime = "8pm";
        } else {
            return matchTime = "9pm";
        }
    }
}

module.exports = GetMatchTime;