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
var AmazonKindle = 'AmazonKindle';
var OS = 'OS';

var key = 0;

var types = [];
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
          _this.indexUserAgent = new Index();
          _this.indexCategory = new Index();
          nodeIt.apply(_this, [result.useragentswitcher.folder, node, true]);

          var types = _this.getTypes();
          for (var i=0;i<types.length;i++) {
            console.log('\n------------------------------\n'+types[i]+ '\n------------------------------\n');
            var result = _this.queryType(types[i]);
            for (var j=0;j<result.length;j++) {
              console.log(useragents[result[j].key]);
            }
          }
      });
  });

  return this;
};

Agent007.prototype.queryAgent = function(agent) {
  return this.indexUserAgent.query(agent);
};

Agent007.prototype.queryType = function(type) { 
  type = type.replace(/\//g, '');
  return this.indexCategory.query(type);
};

Agent007.prototype.getTypes = function() {
  return types;
};

var nodeIt = function(folders, node, root) {  
  node.children = [];
  if (!folders)
    return;
  for (var i=0;i<folders.length;i++) {
    var folder = folders[i];
    var desc = folder.$.description.replace(/[\(\)\/\- ]|Browsers - /g, '');
    
    if (desc)
    {
      var o = {name: desc};
      o.path = node.path ? node.path + '/' + desc : desc;      
      o.index = node.index ? node.index + desc : desc;      

      types.push(o.path);

      fetchUserAgents.apply(this, [folder.useragent, o]);

      if (root)
        node.push(o);
      else
        node.children.push(o);

      nodeIt.apply(this, [folder.folder, o, false]);
    }
  }

  return this;
};

var fetchUserAgents = function(ua, o) {
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

    this.indexUserAgent.addDocument(key, {
      userAgent: useragent
    });

    this.indexCategory.addDocument(key, {
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