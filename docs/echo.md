### `echo` Command



`echo` script simply prints a message to standard output. Set
message in `--message` param.

```shell
ci echo --message "Hello world!"
```

Using `--eval` parameters get wrapped in template string literals and evaluated.
You can use that to pring useful data.

```shell
ci echo --message "Version: \${PROJECT_VERSION}" --eval
ci echo --message "\${JSON.stringify(ci, null, 4)}" --eval
```
