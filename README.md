# AJBL Helper

An unofficial Google Chrome extension providing an easy method to download individual or all assets from the Architect's Journal Building Library.

Download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/ajbl-helper/goboogobmejimdndakiighpigelfbkki)

## Releases

All tagged releases are available at [/releases](https://github.com/StudioLE/AJBL/releases).

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

## Developer Install

Clone the repository

```
git clone https://github.com/StudioLE/AJBL.git AJBL
```

Enter the directory and install the dependencies. For this step you'll need to have [Node.js](https://nodejs.org/) and [bower](http://bower.io/) installed.

```
cd AJBL
npm install
```

Behind the scenes this will also call `bower install`.

Now run the default gulp task to produce an up to date build

```
gulp build
```

## Developer usage

A number of development tasks can be performed via gulp.

Produce a build from the app source
```
gulp build
```
Clean the `build` directory 
```
gulp clean
```
Bump the package version numbers
```
gulp bump
```
