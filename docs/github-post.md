### `github-post` Command



Posts a message to your GitHub PR thread.


To be able to post to GitHub you need to have a GitHub access token,
you can get one [here](https://github.com/settings/tokens).

Once you have obtained your token, you can specify it as a
`GITHUB_TOKEN` environment varialbe.

```
GITHUB_TOKEN=<your_github_token> ci github-post --plan
```

As `--token` param:
```
ci github-post --token=<your_github_token> --plan
```

Or in `ci.config.js`:

```js
{
    'github-post': {
        params: {
            token: '<your_github_token>'
        }
    }
};
```


Use `--text` param to specify a custom message. Default message:

> Build version: __`x.y.z-pr-1.1`__

You can also add extra text arount the default text message using
the `--beforeText` and `--afterText` params.
