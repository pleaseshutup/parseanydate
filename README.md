# parseAnyDate.js

This function is intended to provide a way to turn any reasonable user input or scraped date and reliably turn it into a javascript date object. It is intended to be minimal in order to be included into a project without bloat.

Currently setup to be bias toward American dates starting with month (m/d/y)

## Example Usage

``` javascript
var userInput = '1/29/2016';
var dateObject = parseAnyDate(userInput);
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
function parseAnyDate(e){"use strict";if(!e||"string"!=typeof e)return!i instanceof Date?new Date:e;var t=Date.parse(e);if(!isNaN(t))return new Date(t);var r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],a=["th","st","rd","nd"],n=!1,i={h:0,mi:0,s:0};return e.split(/[^A-Za-z0-9]/).forEach(function(e,t){if(e||"0"===e){if(isNaN(e)){n=!1;var s=r.indexOf(e.substr(0,3).toLowerCase());if(s>-1)return void(i.m=s+1+"");var d=a.indexOf(e.replace(/[^a-z]/gi,"").toLowerCase());if(e=e.replace(/[^0-9]/g,""),d>-1)return void(i.d=e)}else n=!0;i.y&&i.m&&i.d?i.h?i.mi?i.s||(i.s=e):i.mi=e:i.h=e:(i.d||!i.m&&!i.y||(i.d=e),i.y||(4===e.length&&n?i.y=e:i.m&&i.d&&(i.y=e)),i.m||(i.m=e))}}),new Date(i.y,i.m-1,i.d,i.h,i.mi,i.s)}"undefined"!=typeof module&&"undefined"!=typeof
```

#### Option 2: Someone educate me on other options
