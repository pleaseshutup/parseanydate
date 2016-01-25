# parseAnyDate.js

This function is intended to provide a way to turn any reasonable user input or scraped date and reliably turn it into a javascript date object. It is intended to be minimal in order to be included into a project without bloat.

Currently setup to be bias toward American dates starting with month (m/d/y)

## Example Usage

``` javascript
var userInput = 'm/d/y';
var dateObject = parseAnyDate(userInput);

console.log(dateObject.toISOString());

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

#### Option 2: Someone educate me on other options
