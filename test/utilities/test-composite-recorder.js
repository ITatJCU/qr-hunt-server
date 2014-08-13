var CompositeRecorder = require('../../lib/utilities/composite-recorder');
var Recorder = require('../../lib/utilities/recorder');

var cr = new CompositeRecorder();

exports['testConstructor'] = function (test) {
    test.strictEqual(cr.size(), 0);
    test.done();
};

