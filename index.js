// npm install cordova-common 2.2.3
var fs = require('fs');
var path = require('path');
var ConfigFile = require('cordova-common').ConfigFile;

function editATS(command, projectPath, logger) {
  if (! logger) {
    logger = console;
  }
  var iosPlatformPath = path.resolve(projectPath, 'platforms', "ios");

  fs.access(iosPlatformPath, fs.constants.R_OK | fs.constants.W_OK, function (err) {
    if (err) {
      throw "There is no platform ios directory.";
    } else {
      var configFile = new ConfigFile(iosPlatformPath,"ios","*-Info.plist");
      if (command === 'create') {
        logger.log("creating NSAppTransportSecurity");
        configFile.graft_child('NSAppTransportSecurity',
          {xml:'<dict><key>NSAllowsArbitraryLoads</key><true/></dict>'}
        );
      } else {
        logger.log("removing NSAppTransportSecurity");
        configFile.prune_child('NSAppTransportSecurity',{});
      }
      logger.log("OK");
      configFile.save();
    }
  });
}

module.exports = editATS;
