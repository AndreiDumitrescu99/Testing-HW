const assert = require("assert");

var Requester = require('requester'),
    requester = new Requester({debug: 1});

describe("Test delete/events", function() {
    it("see that delete returns a 200 status code", function(done) {
        requester.del("http://127.0.0.1:3000/events/2", function (body) {
            assert.equal(this.statusCode, 200);
            done();
        });
    });
    it("see that delete worked", function(done) {
        requester.get("http://127.0.0.1:3000/events/2", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.error, 'Id not found');
            done();
        });
    });
});
