Agent-007 [![NPM version](https://badge.fury.io/js/agent-007.png)](http://badge.fury.io/js/agent-007) [![Build Status](https://travis-ci.org/darul75/agent-007.png?branch=master)](https://travis-ci.org/darul75/agent-007) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/agent-007/counters/views.png)](https://sourcegraph.com/github.com/darul75/agent-007)
=====================

Agent-007 NodeJS module to find all User-Agent you never expected before, nice for testing.

It uses a small index so you can make natural query for your favorite devices `AppleWebKit` `Firefox` `Chrome`... when searching.


Demo
------------
Coming soon

Installation
------------

Using npm:

```
npm install agent-007
```

Usage
-------------

```javascript
var agent007 = require('agent007');

// FIND ALL AGENTS MATCHING 'AppleWebKit', return empty or string agents array
var agents = agent007.findAgents('AppleWebKit');

// FIND AGENT MATCHING 'AppleWebKit', return empty or agent string
var agent = agent007.findRandomAgent('AppleWebKit');

// FIND ALL AGENTS MATCHING DEVICE TYPE 'Windows', return empty or string agents array
var agents = agent007.findAgentsByType('Windows');

// FIND AGENT MATCHING DEVICE TYPE 'Windows', return empty or agent string
var agent = agent007.findRandomAgentByType('Windows');

// GET TYPE LISTING, return array of string
var types = agent007.getTypes(); // types you can use with findAgentsByType() or findRandomAgentByType() methods
/*
[
  'Windows',
  'Windows/LegacyBrowsers',
  'Mac',
  ...
  'MobileDevices/OS/Android',
  ..
  'MobileDevices/OS/iOS'
]
*/

// GET ALL AGENTS IN TREE BY TYPE HIERARCHY
var tree = agent007.getTree(); 

```    
    
### Build

You can run the tests by running

```
npm install
```
or
```
npm test
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.




