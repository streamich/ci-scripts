### `cmd` Command



`cmd` command allows you to execute any arbitrary command. It allows you
to construct command arguments and environment variables using variables
provided by [`cross-ci`](https://github.com/streamich/cross-ci). In your
`ci.config.js` create a new command definition, say "release":

```js
module.exports = {
  cmd: {
    release: {
      params: {
        command: 'python',
        args: ({PROJECT_NAME}) => ['./release.py', PROJECT_NAME, 'staging'],
        env: ({PROJECT_NAME, BUILD_VERSION}) => ({
          DEPLOY_PATH: `builds/${PROJECT_NAME}/${BUILD_VERSION}`
        })
      },
    }
  }
};
```

Now you can execute this command.

```
ci cmd release
```

Or only print what will this command do, without executing.

```
ci cmd release --plan
```

### Parameters

- `--command` &mdash; command to execute.
- `--args` &mdash; array of arguments to supply to command.
- `--env` &mdash; a map of environemnt variables to add to the command.
- `--shell` &mdash; boolean, specifying whether to execute command in console.
- `--cwd` &mdash; current working directory, defaults to `process.cwd()`.
