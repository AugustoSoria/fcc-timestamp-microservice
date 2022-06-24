const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../api/index');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('GET /api/:date?', function () {
        test('/', function (done) {
            chai
            .request(server)
            .get('/api/')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.isNumber(res.body.unix, 'res.body.unix should be a number');
                assert.match(res.body.utc, /[a-z]{3},\s\d{1,2}\s[a-z]{3}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT/ig, 'regexp should matches');
                done();
            });
        });
    });
    suite('GET /api/:date?', function () {
        test('/', function (done) {
            chai
            .request(server)
            .get('/api/1451001600000')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.include(res.body, { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
                done();
            });
        });
    });
    suite('GET /api/:date?', function () {
        test('/', function (done) {
            chai
            .request(server)
            .get('/api/invalidDate')
            .end(function (err, res) {
                assert.equal(res.status, 400, 'Response status should be 400');
                assert.include(res.body, {error:"Invalid Date"})
                done();
            });
        });
    });
});