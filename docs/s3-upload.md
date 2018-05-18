### `s3-upload` Command



Uploads a folder and all its files recursively to a destination
in a S3 bucket.


- `--accessKeyId` &mdash; optional, AWS access key id.
- `--secretAccessKey` &mdash; optional, AWS secrekt key.
- `--src` &mdash; optional, source folder to upload, defaults to `dist/`.
- `--bucket` &mdash; required, S3 bucket name.
- `--dest` &mdash; optional, S3 destination path, defaults to '""'.
- `--acl` &mdash; optional, access rights to all uploaded objects.
- `--delete` &mdash; optional, whether to delete old files on S3, defaults to `false`.
