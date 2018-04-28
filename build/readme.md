# ci-scripts


## CLI

Command line params

- `--plan` &mdash; don't execute the actual command, but show what it would have done.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as templat string.


## Scripts

```mmd
return scripts.docsScripts();
```


## Variables

`ci-scripts` pre-generates and normalizes across CI runners commonly used environment variables.
The convetion is to use all upper case letters for global variables.


```mmd
return scripts.docsVars();
```
