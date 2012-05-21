/**
 * DeviceProximityEvent_tests.js
 * Public Domain Software
 * To the extent possible under law, Marcos Caceres has waived all copyright and
 * related or neighboring rights to DeviceProximityEvent Implementation.
 **/

//inheritance tests
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
    assert_throws(TypeError(), function() {
        new DeviceProximityEvent();
    }, 'First argument is required, so was expecting a TypeError.');
}, 'Missing type argument');

test(function() {
    var event = new DeviceProximityEvent(undefined);
    assert_equals(event.type, 'undefined');
}, 'Event type set to undefined');

test(function() {
    var event = new DeviceProximityEvent(null);
    assert_equals(event.type, 'null');
}, 'type argument is null');

test(function() {
    var event = new DeviceProximityEvent(123);
    assert_equals(event.type, '123');
}, 'type argument is number');

test(function() {
    var event = new DeviceProximityEvent(new Number(123));
    assert_equals(event.type, '123');
}, 'type argument is Number');

test(function() {
    var event = new DeviceProximityEvent([]);
    assert_equals(event.type, '');
}, 'type argument is array');

test(function() {
    var event = new DeviceProximityEvent(new Array());
    assert_equals(event.type, '');
}, 'type argument is instance of Array');

test(function() {
    var event = new DeviceProximityEvent(['t', ['e', ['s', ['t']]]]);
    assert_equals(event.type, 't,e,s,t');
}, 'type argument is nested array');

test(function() {
    var event = new DeviceProximityEvent(Math);
    assert_equals(event.type, '[object Math]');
}, 'type argument is host object');

test(function() {
    var event = new DeviceProximityEvent(true);
    assert_equals(event.type, 'true');
}, 'type argument is boolean (true)');

test(function() {
    var event = new DeviceProximityEvent(new Boolean(true));
    assert_equals(event.type, 'true');
}, 'type argument is instance of boolean');

test(function() {
    var event = new DeviceProximityEvent(false);
    assert_equals(event.type, 'false');
}, 'type argument is boolean (false)');

test(function() {
    var event = new DeviceProximityEvent(new Boolean(false));
    assert_equals(event.type, 'false');
}, '');

test(function() {
    var event = new DeviceProximityEvent('test');
    assert_equals(event.type, 'test');
}, 'type argument is instance of boolean (false)');

test(function() {
    var event = new DeviceProximityEvent(new String('test'));
    assert_equals(event.type, 'test');
}, 'type argument is string');

test(function() {
    var event = new DeviceProximityEvent(function test() {});
    assert_equals(event.type, 'function test() {}');
}, 'type argument is function');

test(function() {
    var event = new DeviceProximityEvent({
        toString: function() {
            return '123';
        }
    });
    assert_equals(event.type, '123');
}, 'type argument is complext object, with toString method');

test(function() {
    assert_throws(TypeError(), function() {
        new DeviceProximityEvent({
            toString: function() {
                return function() {}
            }
        });
    });
}, 'toString is of type function');

//test readonly attribute double value;
test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'value', 'readonly attribute value');
    }
    , 'value attribute is readonly');

//test readonly attribute double min
test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'min', 'readonly attribute min');
    }
    , 'min attribute is readonly');

//readonly attribute double max;
test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'max', 'readonly attribute max');
    }
    , 'max attribute is readonly');

