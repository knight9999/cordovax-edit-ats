// npm install cordova-common 2.2.3
var fs = require('fs');
var path = require('path');

function editATS(command, projectPath, logger) {
  if (! logger) {
    logger = console;
  }
  var iosPlatformPath = path.resolve(projectPath, 'platforms', 'ios');

  fs.access(iosPlatformPath, fs.constants.R_OK | fs.constants.W_OK, function (err) {
    if (err) {
      throw "There is no platform ios directory.";
    } else {
      var cordovaCommonPath = path.resolve(iosPlatformPath, 'cordova', 'node_modules', 'cordova-common');
      var ConfigFile = require(cordovaCommonPath).ConfigFile;
      // var plistHelper = require(path.resolve(cordovaCommonPath, 'src', 'util', 'plist-helpers'));
      var configFile = new ConfigFile(iosPlatformPath, 'ios', '*-Info.plist');
      if (['create', 'create_true', 'create_false'].includes(command)) {
        var value = ['create', 'create_true'].includes(command) ? 'true' : 'false';
        logger.log('creating NSAppTransportSecurity NSAllowsArbitraryLoads ' + value);
        if (configFile.data['NSAppTransportSecurity']) { // alread exists
          configFile.data['NSAppTransportSecurity']['NSAllowsArbitraryLoads'] = value == 'true';
        } else {
          configFile.graft_child('NSAppTransportSecurity',
            {xml:'<dict><key>NSAllowsArbitraryLoads</key><'+value+'/></dict>'}
          );
        }
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
