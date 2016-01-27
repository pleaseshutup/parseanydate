# parseAnyDate.js

This function is intended to provide a way to turn any reasonable user input or scraped date and reliably turn it into a javascript date object. It is intended to be minimal in order to be included into a project without bloat.

Currently setup to be bias toward American dates starting with month (m/d/y)
## Usage
```
parseAnyDate(input, allowFail);
# input: whatever attempt at a date string you've got
# allowFail: if true this will return false if it can't seem to figure out a date otherwise it retuns new Date() when it fails

## Example Usage

``` javascript
var userInput = '1/29/2016';
var dateObject = parseAnyDate(userInput, true);
// outputs Fri Jan 29 2016 00:00:00 GMT-0800 (PST)

console.log(dateObject.toISOString());

```

## Example Inputs
```
Aug 10th, 1994
Aug 1994, the 10th
Janurary The 14th, 2005
08/10/1994
8/10/1994
08-10-1994
8-10-1994
08.10.1994
8.10.1994
1994 10 Aug
1994 Aug 10th
1994, August the 10th
1994-08-10
10 Aug, 1994
10 1994, August
The 10th of August, 1994
10, August 1994
```

### Using with Node
#### Install
``` sh
npm install --save parseanydate
```
#### Usage
``` javascript
var parseAnyDate = require('parseanydate');
```

### Using with browsers

#### Option 1: Paste minified code into project
``` javascript
function parseAnyDate(e,a){"use strict";if(!e||"string"!=typeof e)return!d instanceof Date?a?!1:new Date:e;var t=Date.parse(e);if(!isNaN(t))return new Date(t);var r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],n=["th","st","rd","nd"],i=!1,s="",d={h:0,mi:0,s:0};e.split(/[^A-Za-z0-9]/).forEach(function(e,a){if(e||"0"===e){if(isNaN(e)){i=!1;var t=r.indexOf(e.substr(0,3).toLowerCase());if(t>-1)return void(d.m=t+1+"");var s=n.indexOf(e.replace(/[^a-z]/gi,"").toLowerCase());if(e=e.replace(/[^0-9]/g,""),s>-1)return void(d.d=e)}else i=!0;d.y&&d.m&&d.d?d.h?d.mi?d.s||(d.s=e):d.mi=e:d.h=e:(d.d||!d.m&&!d.y||(d.d=e),d.y||(4===e.length&&i?d.y=e:d.m&&d.d&&(d.y=e)),d.m||(d.m=e))}}),s=d.y+"-"+d.m+"-"+d.d+" "+d.h+":"+d.mi+":"+d.s;var t=Date.parse(s);return isNaN(t)?a?!1:new Date:new Date(t)}
```

#### Option 2: Someone educate me on other options
