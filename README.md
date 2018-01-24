# express-served-page-time

Express middleware that outputs in your view the time used to serve the page.

## Installation

via npm:
```bash
$   npm install --save express-served-page-time
```

## Get started

Initialize it as a middleware after Express.

```js
const express = require('express');
const pageTimer = require('express-served-page-time');

const app = express();
app.use(pageTimer());
```

In your view file use the local variable `timer` to return the value.

```pug
p This page was served in #{timer.getTime()} seconds.
```
The output will be:

```html
<p>This page was served in 0.0215 seconds.</p>
```

### Options

Set time units and decimals. These settings will be forced for all the outputs in the app.

There are `seconds`, `microseconds` and `nanoseconds`. The default settings is `seconds` with 4 decimals.

```js
app.use(pageTimer({ unit: 'microseconds', decimals: 2 }));
```

To change the name of the local variable used in the view initialize with the option `localName`.

```js
app.use(pageTimer({ localName: 'anotherName' }));
```
And use it like this:

```pug
p This page was served in #{anotherName.getTime()} seconds.
```


## License

[MIT](LICENSE) (c) Federico Moretti
