# express-served-page-timer

Express middleware that outputs in your view the time used to serve the page.

## Installation

via npm:
```bash
$   npm install --save express-served-page-timer
```

## Get started

Initialize it just after Express

```js
const pageTimer = require('express-served-page-timer');

const app = express();
app.use(pageTimer());
```

Your view file (with Pug in this example)

```pug
p This page was served in #{pageTimer.getTime()} seconds.
```
Will render this:

```html
<p>This page was served in 0.0215 seconds.</p>
```

### Options

Set time units and decimals. These settings will be forced for all the outputs in the app.

There are `seconds`, `microseconds` and `nanoseconds`. The default settings is `seconds` with 4 decimals.

```js
app.use(pageTimer({ unit: 'microseconds', decimals: 2 })); // 31.29
```


## License

[MIT](LICENSE)
