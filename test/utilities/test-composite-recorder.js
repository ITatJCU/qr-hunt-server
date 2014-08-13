var CompositeRecorder = require('../../lib/utilities/composite-recorder');
var Recorder = require('../../lib/utilities/recorder');

var cr = new CompositeRecorder();

exports['testConstructor'] = function (test) {
    test.strictEqual(cr.size(), 0);
    test.done();
};

exports['testAddNonRecorder'] = function (test) {
    cr.add({});
    test.strictEqual(cr.size(), 0);
    cr.add(null);
    test.strictEqual(cr.size(), 0);
    cr.add("");
    test.strictEqual(cr.size(), 0);
    test.done();
};