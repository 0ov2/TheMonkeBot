function GetMatchTime(time) {
    var date = new Date();
    var dstStart = new Date();
    var dstEnd = new Date();

    dstStart.setDate(8);
    dstStart.setMonth(3);

    dstEnd.setDate(1);
    dstEnd.setMonth(11);

    var date1 = date.getTime();
    var date2 = dstStart.getTime();
    var date3 = dstEnd.getTime();

    var matchTime;

    if (time == 3) {
        if (date1 < date2 || date1 > date3) {
            return matchTime = "3pm";
        }else {
            return matchTime = "4pm";
        }
    } else if (time = 8) {
        if (date1 < date2 || date1 > date3) {
            return matchTime = "8pm";
        }else {
            return matchTime = "9pm";
        }
    }
    
}

module.exports = GetMatchTime;