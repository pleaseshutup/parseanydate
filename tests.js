var parseAnyDate = require('./parseAnyDate.js'),
    started = new Date().getTime(),
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    success = 0,
    fail = 0,
    errorLog = '',
    // manual tests are key: input and value yyyy-mm-dd assumed output string
    manualTests = {
        'Aug 10th, 1994': '1994-08-10',
        'Aug 1994, the 10th': '1994-08-10',
        'Janurary The 14th, 2005': '2005-01-14',
        '08/10/1994': '1994-08-10',
        '8/10/1994': '1994-08-10',
        '08-10-1994': '1994-08-10',
        '8-10-1994': '1994-08-10',
        '08.10.1994': '1994-08-10',
        '8.10.1994': '1994-08-10',
        '1994 10 Aug': '1994-08-10',
        '1994 Aug 10th': '1994-08-10',
        '1994, August the 10th': '1994-08-10',
        '1994-08-10': '1994-08-10',
        '10 Aug, 1994': '1994-08-10',
        '10 1994, August': '1994-08-10',
        'The 10th of August, 1994': '1994-08-10',
        '10, August 1994': '1994-08-10',
        'Oct 22 12:00:01 2013 GMT': '2013-10-22', // found on ssl certificates
        'Apr 20 12:00:00 2016 GMT': '2016-04-20', // found on ssl certificates
        // non usa day month year these should fail
        '10-08-1994': '1994-08-10',
        '10-8-1994': '1994-08-10',
        '.': new Date().toISOString().substr(0, 10),
        'asdf': new Date().toISOString().substr(0, 10)
    };

// automatic tests on a number of formats for a lot of different styles of input
for (var i = 0; i < 10000; i++) {
    var d = new Date(1999, 0, 1 + i, 0, 0, 0);
    var expect = d.toISOString(),
        tests = [],
        month = (d.getMonth() + 1) + '',
        day = d.getDate() + '',
        year = d.getFullYear() + '',
        get,
        parsed;

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    // iso string
    tests.push(d.toISOString());

    // mm-dd-yy
    tests.push(month + '-' + day + '-' + year.substr(2, 2));

    // mm/dd/yyyy
    tests.push(month + '/' + day + '/' + year);

    // yyyy.mm.dd
    tests.push(month + '.' + day + '.' + (year.substr(2, 2)));

    // month d yy
    tests.push(months[((month * 1) - 1)] + ' ' + (day * 1) + ' ' + year.substr(2, 2));

    // mon d yy
    tests.push(months[((month * 1) - 1)].substr(0, 3).toLowerCase() + ' ' + (day * 1) + ' ' + year);

    // mon d hh:mm:ss yy
    tests.push(months[((month * 1) - 1)].substr(0, 3).toLowerCase() + ' ' + (day * 1) + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + year);

    tests.forEach(function(test) {

        var dt = parseAnyDate(test);
        try {
            parsed = dt.toISOString();
            if (parsed !== expect) {
                fail++;
                errorLog += 'failed match: ' + test + ' result: ' + parsed + ' != ' + expect + '\n';
            } else {
                success++;
            }
        } catch (e) {
            fail++;
            errorLog += 'failed error: ' + test + ' result: ' + parsed + ' != ' + expect + '\n';
        }

    });

    var ended = new Date().getTime();
}

Object.keys(manualTests).forEach(function(input) {
    parsed = parseAnyDate(input);
    try {
        parsed = parsed.toISOString().substr(0, 10);
        if (parsed !== manualTests[input]) {
            fail++;
            errorLog += 'failed match: ' + input + ' result: ' + parsed + ' != ' + manualTests[input] + '\n';
        } else {
            success++;
        }
    } catch (e) {
        fail++;
        errorLog += 'failed error: ' + input + ' result: ' + parsed + ' != ' + manualTests[input] + '\n';
    }

});

console.log(success + ' of ' + (success + fail) + ' successfully processed in ' + ((ended - started)) + ' ms', '\n' + errorLog.substr(0, 600));
