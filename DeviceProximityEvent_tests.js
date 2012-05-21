/**
 * DeviceProximityEvent_tests.js
 * Public Domain Software
 * To the extent possible under law, Marcos Caceres has waived all copyright and
 * related or neighboring rights to DeviceProximityEvent Implementation.
 **/
test(function() {
    assert_throws(TypeError(), function() {
        new DeviceProximityEvent();
    }, 'First argument is required, so was expecting a TypeError.');
}, 'Missing type argument');

test(function() {
    var event = new DeviceProximityEvent('');
    assert_true(event instanceof window.DeviceProximityEvent);
}, 'the event is an instance of DeviceProximityEvent');

test(function() {
    var event = new DeviceProximityEvent('');
    assert_true(event instanceof window.Event);
}, 'the event inherits from Event');

//Type attribute tests
test(function() {
    var event = new DeviceProximityEvent(undefined);
    assert_equals(event.type, 'undefined');
}, 'Event type set to undefined');

test(function() {
    event = new DeviceProximityEvent(null);
    assert_equals(event.type, 'null');
}, '');

test(function() {
    event = new DeviceProximityEvent(123);
    assert_equals(event.type, '123');
}, '');

test(function() {
    event = new DeviceProximityEvent(new Number(123));
    assert_equals(event.type, '123');
}, '');

test(function() {
    event = new DeviceProximityEvent([]);
    assert_equals(event.type, '');
}, '');

test(function() {
    event = new DeviceProximityEvent(new Array());
    assert_equals(event.type, '');
}, '');

test(function() {
    event = new DeviceProximityEvent(['t', ['e', ['s', ['t']]]]);
    assert_equals(event.type, 't,e,s,t');
}, '');

test(function() {
    event = new DeviceProximityEvent(Math);
    assert_equals(event.type, '[object Math]');
}, '');

test(function() {
    event = new DeviceProximityEvent(true);
    assert_equals(event.type, 'true');
}, '');

test(function() {
    event = new DeviceProximityEvent(new Boolean(true));
    assert_equals(event.type, 'true');
}, '');

test(function() {
    event = new DeviceProximityEvent(false);
    assert_equals(event.type, 'false');
}, '');

test(function() {
    event = new DeviceProximityEvent(new Boolean(false));
    assert_equals(event.type, 'false');
}, '');

test(function() {
    event = new DeviceProximityEvent('test');
    assert_equals(event.type, 'test');
}, '');

test(function() {
    event = new DeviceProximityEvent(new String('test'));
    assert_equals(event.type, 'test');
}, '');

test(function() {
    event = new DeviceProximityEvent(function test() {});
    assert_equals(event.type, 'function test() {}');
}, '');

test(function() {
    event = new DeviceProximityEvent({
        toString: function() {
            return '123';
        }
    });
    assert_equals(event.type, '123');
}, '');

test(function() {
    assert_throws(TypeError(), function() {
        new new DeviceProximityEvent({
            toString: function() {
                return function() {}
            }
        });
    });
}, '');
