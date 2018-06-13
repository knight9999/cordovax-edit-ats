# Introduction

This module removes/creates AppTransportSecurity setting in plist file in cordova ios project.

# Install

```
$ npm install cordovax-edit-ats --save-dev
```

on the cordova application directory.


# Commandline Usage

Remove ATS setting
```
$ npx cordovax-edit-ats remove
```

Create ATS setting
```
$ npx cordovax-edit-ats create
```

the following ATS is created

```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

Create (or override) ATS with NSAllowsArbitraryLoads true
```
$ npx xordovax-edit-ats create true
```

Create (or override) ATS with NSAllowsArbitraryLoads false
```
$ npx xordovax-edit-ats create false
```

# With Cordova hook.


Example:

config.xml
```
<hook src="scripts/editPlist.js" type="after_platform_add" />
```

scripts/editPlist.js
```
var editATS = require('cordovax-edit-ats');

module.exports = function(context) {
  if (context.opts.cordova.platforms.includes('ios')) {
    editATS('create_false', context.opts.projectRoot);
  }
};
```
