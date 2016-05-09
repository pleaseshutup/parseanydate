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
function parseAnyDate(e,t){"use strict";if(!e||"string"!=typeof e)return!d instanceof Date?t?!1:new Date:e;var r=Date.parse(e);if(!isNaN(r))return new Date(r);if(e&&!isNaN(e)&&(e+="",8===e.length))return new Date(e.substr(0,4),e.substr(4,2)-1,e.substr(6,2));var s=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],a=["th","st","rd","nd"],i=!1,n="",d={h:0,mi:0,s:0},m=function(e,t,r){if(e||"0"===e){if(isNaN(e)){i=!1;var n=s.indexOf(e.substr(0,3).toLowerCase());if(n>-1)return void(d.m=n+1+"");var m=a.indexOf(e.replace(/[^a-z]/gi,"").toLowerCase());if(e=e.replace(/[^0-9]/g,""),m>-1)return void(d.d=e)}else i=!0;if(d.y&&d.m&&d.d)d.h?d.mi?d.s||(d.s=e):d.mi=e:d.h=e;else{if(!d.d&&(d.m||d.y))return void(d.d=e);d.y||(4===e.length&&i?d.y=e:d.m&&d.d&&(d.y=e)),d.m||(d.m=e)}}};e.split(/[^A-Za-z0-9]/).forEach(m),d.d<10&&(d.d="0"+1*d.d),d.m<10&&(d.m="0"+1*d.m),n=d.y+"-"+d.m+"-"+d.d,(d.h||d.mi||d.s)&&(d.h<10&&(d.h="0"+1*d.h),d.mi<10&&(d.mi="0"+1*d.mi),d.s<10&&(d.s="0"+1*d.s),n+="T "+d.h+":"+d.mi+":"+d.s);var r=Date.parse(n);return isNaN(r)?t?!1:new Date:new Date(r)}
```

#### Option 2: Someone educate me on other options
