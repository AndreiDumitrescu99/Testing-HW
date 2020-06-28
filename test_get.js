const assert = require("assert");

var Requester = require('requester'),
    requester = new Requester({debug: 1});

describe("Test get/events", function(){
    it("see that get returns a 200 status code", function(done){
        requester.get("http://127.0.0.1:3000/events", function (body) {
            assert.equal(this.statusCode, 200);
            done();
        });
    });


    it("see that get/events/ returns all 12 events", function(done){
        requester.get("http://127.0.0.1:3000/events", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.length, 12);
            done();
        });
    });

    it("see that get/events/:id returns a good id/body", function(done){
        requester.get("http://127.0.0.1:3000/events/1", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.id, 1);
            done();
        });
    });

});
