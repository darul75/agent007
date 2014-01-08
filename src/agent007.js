var fs = require('fs');
var Index = require('node-index');
var xml2js = require('xml2js');

/* 
 USER AGENT MAKER
*/

var xml = 'useragentswitcher.xml';

// TYPES
var Bill = 'Windows';
var Steve = 'Mac';
var Lyn = 'Linux';
var Unix = 'Unix';
var Mobile = 'MobileDevices';

// SUB TYPES
var LegacyBrowsers = 'LegacyBrowsers';
var ConsoleBrowsers = 'ConsoleBrowsers';

// MOBILE TYPES
var Browsers = 'Browsers';
var Devices = 'Devices';
var Tablets = 'Tablets';
var TabletsApple = 'AppleiPhoneetc';
var OS = 'OS';

var key = 0;

var useragents = [];
var node = [];

function Agent007() {
  this.init();
}

Agent007.prototype.init = function() {
  var parser = new xml2js.Parser();  

  var _this = this;

  // http://techpatterns.com/downloads/firefox/useragentswitcher.xml
  fs.readFile(xml, function(err, data) {
      parser.parseString(data, function (err, result) {
          
          _this.index = new Index();
          _this.index2 = new Index();
          _this.nodeIt(result.useragentswitcher.folder, node, true);

          var results;

          console.log("-------- mac legacy browsers -----------");
          results = _this.query(Steve + LegacyBrowsers);
        
          for (var i=0;i<results.length;i++) {
            console.log(useragents[results[i].key]);
          }

          console.log("\n-------- Mac -----------\n");
          results = _this.query(Steve);

          for (var i=0;i<results.length;i++) {
            console.log(useragents[results[i].key]);
          }

          console.log("\n-------- Mobile -----------\n");
          results = _this.query(Mobile+Browsers);

          for (var i=0;i<results.length;i++) {
            console.log(useragents[results[i].key]);
          }

          console.log("\n-------- Mobile/Tablets -----------\n");
          results = _this.query(Mobile+Devices+Tablets);

          for (var i=0;i<results.length;i++) {
            console.log(useragents[results[i].key]);
          }

          console.log("\n-------- Mobile/Tablets/Apple -----------\n");
          results = _this.query(Mobile+Devices+TabletsApple);

          for (var i=0;i<results.length;i++) {
            console.log(useragents[results[i].key]);
          }

          

          console.log("loaded");

      });
  });

  return this;
};

Agent007.prototype.queryAgent = function(agent) {
  return this.index.query(type);
};

Agent007.prototype.queryPath = function(type) {  
  return this.index2.query(type);
};

Agent007.prototype.nodeIt = function(folders, node, root) {  
  node.children = [];
  if (!folders)
    return;
  for (var i=0;i<folders.length;i++) {
    var folder = folders[i];
    var description = folder.$.description.replace('Browsers - ', '').replace(' ', '').replace(')', ' ').replace('(', '');
    if (description)
    {
      var o = {name: description};
      o.path = node.path ? node.path + '/' + description : description;
      var compactDesc = description.replace(' ', '');
      o.index = node.index ? node.index + compactDesc : compactDesc;

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
      userAgent: useragent
    });

    this.index2.addDocument(key, {
      path: o.index      
    });

    useragents[key] = useragent;

    key++;
  }

  return this;
};

/**
* Export default singleton.
*/
var agent007 = new Agent007();
module.exports = agent007;