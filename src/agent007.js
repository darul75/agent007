var fs = require('fs');
var Index = require('node-index');
var xml2js = require('xml2js');

/* 
 USER AGENT MAKER
*/

var xml = 'useragentswitcher.xml';
var LegacyBrowsers = 'Legacy Browsers';
var ConsoleBrowsers = 'Console Browsers';
var Browsers = 'Browsers';
var Devices = 'Devices';
var OS = 'OS';
var key = 0;

var node = [];

function Agent007() {
  this.init();
}

Agent007.prototype.init = function() {
  var parser = new xml2js.Parser();
  var useragents = '';

  var _this = this;

  // http://techpatterns.com/downloads/firefox/useragentswitcher.xml
  fs.readFile(xml, function(err, data) {
      parser.parseString(data, function (err, result) {
          //_this.useragents = result;
          _this.index = new Index();
          _this.nodeIt(result.useragentswitcher.folder, node, true);

          var results = _this.query("Firefox");

          console.log("loaded");

      });
  });

  return this;
};

Agent007.prototype.query = function(pattern) {
  return this.index.query(pattern);
};

Agent007.prototype.nodeIt = function(folders, node, root) {  
  node.children = [];
  if (!folders)
    return;
  for (var i=0;i<folders.length;i++) {
    var folder = folders[i];
    var description = folder.$.description;
    if (description)
    {
      var o = {name: description};
      o.path = node.path ? node.path + ' / ' + description : description;

      this.fetchUserAgents(folder.useragent, o);

      if (root) {
        node.push(o);
        this.nodeIt(folder.folder, o, false);
      }              
      else {        
        node.children.push(o);
        this.nodeIt(folder.folder, o, false);
      }
    }
  }

  return this;
};

Agent007.prototype.fetchUserAgents = function(ua, o) {
  if (!ua)
    return;

  o.useragent = [];
  for (var i=0;i<ua.length;i++) {
    var u = ua[i];
    var desc = u.$.description;
    var useragent = u.$.useragent;
    o.useragent.push({
      description: desc,
      value: useragent,
      path: o.path      
    });

    this.index.addDocument(key, {
      path: o.path,
      description: desc,
      userAgent: useragent
    });
    key++;
  }

  return this;
};

/**
* Export default singleton.
*/
var agent007 = new Agent007();
module.exports = agent007;