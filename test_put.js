const assert = require("assert");

var Requester = require('requester'),
    requester = new Requester({debug: 1});

describe("Test put/events", function() {
    before(function() {
        requester.post("http://127.0.0.1:3000/events", {data: {id: '13', topics: 'funko', thumbnail: '', url: '', overrideURL: '', linkType: '', title: 'Funko', summary: 'Cheap Funko'}}, function (body) {
            assert.equal(this.statusCode, 201);
        });
    });

    it("see that put returns a 200 status code", function(done) {
        requester.put("http://127.0.0.1:3000/events/13", {data: { topics: 'NOTfunko'}}, function (body) {
            assert.equal(this.statusCode, 200);
            done();
        });
    });

    it("see that put works", function(done) {
        requester.get("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.topics, 'NOTfunko');
            done();
        });
    });

    after(function(){
        requester.del("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
        });
    });
});
