# ci-scripts

Useful scripts to execute from your CI runner. For example,
post to Slack and GitHub when your build completes:


##### Install

```
npm install ci-scripts
```


##### CLI usage


```
ci slack
```


##### Node usage

```js
const {exec} = require('ci-scripts');

exec(['echo'], {message: 'It works'});
```


## Docs


##### Commands

```mmd
return scripts.commandList();
```


##### CLI Params

```mmd
return scripts.help();
```


##### `ci.config.js` File

Optionally, you can add a `ci.config.js` file to your project, see [config file reference](./docs/ci.config.md).
