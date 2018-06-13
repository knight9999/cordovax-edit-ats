# Introduction

This module removes/creates AppTransportSecurity setting in plist file in cordova ios project.

# Install

```
$ npm install cordovax-edit-ats --save-dev
```

on the cordova application directory.


# Usage

Remove ATS setting
```
$ npx cordovax-edit-ats remove
```

Create ATS setting
```
$ npx cordovax-edit-ats create
```


# With Cordova plugin hooks.


For example,

config.xml
```
<hook src="scripts/removeATS.js" type="after_platform_add" />
```

scripts/removeATS.js
```
var editATS = require('cordovax-edit-ats');

module.exports = function(context) {
  if (context.opts.cordova.platforms.includes('ios')) {
    editATS('remove', context.opts.projectRoot);
  }
};
```
