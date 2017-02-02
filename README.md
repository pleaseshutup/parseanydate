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
function parseAnyDate(e,r){"use strict";if(!e||"string"!=typeof e)return!t instanceof Date?!r&&new Date:e;if(8===e.length&&!isNaN(e)){var t=new Date(e.substr(0,4),e.substr(4,2)-1,e.substr(6,2));if(t)return t}var a=Date.parse(e);if(!isNaN(a))return new Date(a);e&&!isNaN(e)&&(e+="");var s=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],i=["th","st","rd","nd"],n=!1,d="",t={h:0,mi:0,s:0},m=function(e,r,a){if(e||"0"===e){if(isNaN(e)){n=!1;var d=s.indexOf(e.substr(0,3).toLowerCase());if(d>-1)return void(t.m=d+1+"");var m=i.indexOf(e.replace(/[^a-z]/gi,"").toLowerCase());if(e=e.replace(/[^0-9]/g,""),m>-1)return void(t.d=e)}else n=!0;if(t.y&&t.m&&t.d)t.h?t.mi?t.s||(t.s=e):t.mi=e:t.h=e;else{if(!t.d&&(t.m||t.y))return void(t.d=e);t.y||(4===e.length&&n?t.y=e:t.m&&t.d&&(t.y=e)),t.m||(t.m=e)}}};e.split(/[^A-Za-z0-9]/).forEach(m),t.d<10&&(t.d="0"+1*t.d),t.m<10&&(t.m="0"+1*t.m),d=t.y+"-"+t.m+"-"+t.d,(t.h||t.mi||t.s)&&(t.h<10&&(t.h="0"+1*t.h),t.mi<10&&(t.mi="0"+1*t.mi),t.s<10&&(t.s="0"+1*t.s),d+="T "+t.h+":"+t.mi+":"+t.s);var a=Date.parse(d);return isNaN(a)?!r&&new Date:new Date(a)};
```

#### Option 2: Someone educate me on other options
