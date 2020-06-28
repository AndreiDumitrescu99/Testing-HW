const assert = require("assert");

var Requester = require('requester'),
    requester = new Requester({debug: 1});

describe('Get on invalid event', function (done) {
    it("should return error: Id not found", function (done) {
        requester.get("http://127.0.0.1:3000/events/14", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.error, 'Id not found');
            done();
        });
    })
});

describe('Put on invalid event', function (done) {
    it("should return status code 404", function (done) {
        requester.put("http://127.0.0.1:3000/events/14", {data: {topics: 'NOTfunko'}}, function (body) {
            assert.equal(this.statusCode, 404);
            done();
        });
    })
});

describe('Post->Get->Delete', function() {
    before(function() {
        requester.post("http://127.0.0.1:3000/events", {data: {id: '13', topics: 'funko', thumbnail: '', url: '', overrideURL: '', linkType: '', title: 'Funko', summary: 'Cheap Funko'}}, function (body) {
            assert.equal(this.statusCode, 201);
        });
    });

    it("test post was created", function(done){
        requester.get("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.id, 13);
            done();
        });
    });

    it("should delete post", function(done) {
        requester.del("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            requester.get("http://127.0.0.1:3000/events/13", function (body) {
                assert.equal(this.statusCode, 200);
                var obj = JSON.parse(body);
                assert.equal(obj.error, 'Id not found');
                done();
            });
        });
    });
});

describe('Post->Put->Get->Delete', function() {
    before(function() {
        requester.post("http://127.0.0.1:3000/events", {data: {id: '13', topics: 'funko', thumbnail: '', url: '', overrideURL: '', linkType: '', title: 'Funko', summary: 'Cheap Funko'}}, function (body) {
            assert.equal(this.statusCode, 201);
        });
        requester.put("http://127.0.0.1:3000/events/13", {data: {topics: 'NOTfunko'}}, function (body) {
            assert.equal(this.statusCode, 200);
        });
    });

    it("test post was created and put worked", function(done){
        requester.get("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            var obj = JSON.parse(body);
            assert.equal(obj.topics, 'NOTfunko');
            done();
        });
    });

    it("should delete post", function(done) {
        requester.del("http://127.0.0.1:3000/events/13", function (body) {
            assert.equal(this.statusCode, 200);
            requester.get("http://127.0.0.1:3000/events/13", function (body) {
                assert.equal(this.statusCode, 200);
                var obj = JSON.parse(body);
                assert.equal(obj.error, 'Id not found');
                done();
            });
        });
    });
});
