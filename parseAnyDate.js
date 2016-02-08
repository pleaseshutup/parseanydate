function parseAnyDate(input, allowFail) {
    'use strict'; // version 0.2

    if (!input || typeof input !== 'string') {
        // we should always return a valid date
        if (!d instanceof Date) {
            return allowFail ? false : new Date();
        } else {
            return input; // this is a date object already
        }
    }

    var secs = Date.parse(input);
    if (!isNaN(secs)) {
        return new Date(secs);
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
        loopFunc = function(part, p) {
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

    dateString = d.y + '-' + d.m + '-' + d.d + ' ' + d.h + ':' + d.mi + ':' + d.s;
    //console.log('processded', input, 'as', dateString);

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
