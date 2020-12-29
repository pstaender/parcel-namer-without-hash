## Enables parcel v2 to generate assets without content hash

If you want to use parcel as pure asset compiler you don't need a content hash (because you rely on the same filename regardless which generated version you are using).

### Installation

```shell
  $ npm install --save-dev parcel-namer-without-hash
```

Change your `.parcelrc` (see https://v2.parceljs.org/configuration/plugin-configuration/ for more details):

```json
{
  "extends": "@parcel/config-default",
  "namers": ["parcel-namer-without-hash"]
}
```

### Example / Usage

After installation, your serve/build/watch pipeline should work out if the box (to be sure, remove the `.parcel-cache/` folder before).

Before:

```shell
$ npm run build

> yourproject@1.0.0 build /yourproject
> parcel build --no-cache --no-minify src/myproject.html

✨ Built in 3.70s

dist/myproject.html              6.06 KB     65ms
dist/myproject.fc27e217.png     10.55 KB     34ms
dist/myproject.965e22a2.css     17.29 KB     55ms
dist/myproject.c4f85a82.js     118.91 KB    1.03s
```

After:

```sh
$ npm run build

> yourproject@1.0.0 build /yourproject
> parcel build --no-cache --no-minify src/myproject.html

✨ Built in 3.70s

dist/myproject.html              6.06 KB     65ms
dist/myproject.png              10.55 KB     34ms
dist/myproject.css              17.29 KB     55ms
dist/myproject.js              118.91 KB    1.03s
```
### Troubleshooting

If some unexpected behaviour occurs, remove the `.parcel-cache`-folder (`rm -rf .parcel-cache/`) and try again.

### License

MIT