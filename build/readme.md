# ci-scripts

Useful scripts to execute from your CI runner.

```shell
ci slack --message="Build finished!"
ci github-post
ci s3-upload
```

Install globally or in your project repo to get started.

```shell
npm install -g ci-scripts
```

Test that it works.

```shell
ci echo --message="It works"
```


## Docs

Command line params

- `--plan` &mdash; don't execute the actual command, but show what it would have done.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as templat string.

Scripts

```mmd
return scripts.scriptList();
```

Variables

```mmd
return scripts.variableList();
```


## Scripts

```mmd
return scripts.scripts();
```


## Variables

`ci-scripts` pre-generates and normalizes across CI runners commonly used environment variables.
The convetion is to use all upper case letters for "global" variables.


```mmd
return scripts.variables();
```
