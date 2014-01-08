// test/main.js
var agent007 = require('../src/agent007');
var assert = require("assert");

describe('service calls', function() {
    describe('with agent query', function() {
        it('return apple agents', function(done) {            

            setTimeout(function() {
                var agents = agent007.findAgents('AppleWebKit');
                                    
                assert.notEqual(agents.length, 0);

                done();

            },

            3000);

            this.timeout(3000);

        });

        it('return random agent', function(done) {            

            setTimeout(function() {
                var agent = agent007.findRandomAgent('AppleWebKit');                
                    
                assert.notEqual(agent, '');

                done();

            },

            3000);

            this.timeout(3000);

        });

        it('return random agent nothing', function(done) {            

            setTimeout(function() {
                var agent = agent007.findRandomAgent('darul');
                    
                assert.equal(agent, '');

                done();

            },

            3000);

            this.timeout(3000);

        });
    });

    describe('with agent device type query', function() {
        it('return Windows agents', function(done) {            

            setTimeout(function() {
                var agents = agent007.findAgentsByType('Windows');
                                    
                assert.notEqual(agents.length, 0);

                done();

            },

            5000);

            this.timeout(5000);

        });

        it('return Windows agent', function(done) {            

            setTimeout(function() {
                var agent = agent007.findRandomAgentByType('Windows');                
                    
                assert.notEqual(agent, '');

                done();

            },

            5000);

            this.timeout(5000);

        });

        it('return random agent nothing', function(done) {            

            setTimeout(function() {
                var agent = agent007.findRandomAgentByType('darul');                
                    
                assert.equal(agent, '');

                done();

            },

            3000);

            this.timeout(3000);

        });
    });
});