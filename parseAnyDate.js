function parseAnyDate(input, allowFail) {
    'use strict'; // version 0.2

    if (!input || typeof input !== 'string') {
        // we should always return a valid date
        if (!d instanceof Date) {
            return allowFail ? false : new Date();
        } else {
            return input; // this is a date object already
        }
    } else {
        if(input.length === 8 && !isNaN(input)){
            var d = new Date(input.substr(0,4), input.substr(4,2)-1, input.substr(6,2));
            if(d){ return d; }
        }
    }

    var secs = Date.parse(input);
    if (!isNaN(secs)) {
        return new Date(secs);
    } else if(input && !isNaN(input)){
        input = input + '';
    }

    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        dayEnds = ['th', 'st', 'rd', 'nd'],
        isNum = false,
        dateString = '',
        d = {
            h: 0,
            mi: 0,
            s: 0
        },
        loopFunc = function(part, p, ar) {
            if (part || part === '0') {

                if (isNaN(part)) {
                    isNum = false;
                    var mi = months.indexOf(part.substr(0, 3).toLowerCase());
                    if (mi > -1) {
                        d.m = (mi + 1) + '';
                        return;
                    } else {
                        var dayEndIndex = dayEnds.indexOf(part.replace(/[^a-z]/gi, '').toLowerCase());
                        part = part.replace(/[^0-9]/g, '');
                        if (dayEndIndex > -1) {
                            d.d = part;
                            return;
                        }
                    }
                } else {
                    isNum = true;
                }

                // date is set, now we look at time
                if (d.y && d.m && d.d) {
                    if (!d.h) {
                        d.h = part;
                    } else if (!d.mi) {
                        d.mi = part;
                    } else if (!d.s) {
                        d.s = part;
                    }
                } else {
                    // if we have the month or year then lets go with day
                    if (!d.d && (d.m || d.y)) {
                        d.d = part;
                        return;
                    }

                    // if we do not have a year
                    if (!d.y) {
                        // if the part is 4 digits long it is a year
                        if (part.length === 4 && isNum) {
                            d.y = part;
                        } else {
                            if (d.m && d.d) {
                                d.y = part;
                            }
                        }
                    }

                    // often the month is first in usa
                    if (!d.m) {
                        d.m = part;
                    }
                }

            }
        };

    input.split(/[^A-Za-z0-9]/).forEach(loopFunc);

    if(d.d < 10){ d.d = ('0' + (d.d*1)); }
    if(d.m < 10){ d.m = ('0' + (d.m*1)); }
    dateString = d.y + '-' + d.m + '-' + d.d;
    if(d.h || d.mi || d.s){
        if(d.h < 10){ d.h = ('0' + (d.h*1)); }
        if(d.mi < 10){ d.mi = ('0' + (d.mi*1)); }
        if(d.s < 10){ d.s = ('0' + (d.s*1)); }
        dateString += 'T'+ ' ' + d.h + ':' + d.mi + ':' + d.s;
    }

    var secs = Date.parse(dateString);
    if (!isNaN(secs)) {
        return new Date(secs);
    } else {
        return allowFail ? false : new Date();
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = parseAnyDate;
}
