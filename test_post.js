const assert = require("assert");

var Requester = require('requester'),
    requester = new Requester({debug: 1});

describe("Test post/events", function() {
    it("see that post returns a 201 status code", function(done) {
        requester.post("http://127.0.0.1:3000/events", {data: {id: '13', topics: 'funko', thumbnail: '', url: '', overrideURL: '', linkType: '', title: 'Funko', summary: 'Cheap Funko'}}, function (body) {
            assert.equal(this.statusCode, 201);
            done();
        });
    });

    it("see that post works", function(done) {
        requester.get("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.id, 13);
            done();
        });
    });
    
    after(function(){
        requester.del("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
        });
    });
});
