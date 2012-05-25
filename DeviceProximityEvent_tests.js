/**
 * DeviceProximityEvent_tests.js
 * This is the unofficial, unapproved, tell all, test suite for the
 * DeviceProximityEvent API of the W3C Proximity Event specification.
 *
 * Public Domain Software
 * To the extent possible under law, Marcos Caceres has waived all copyright and
 * related or neighboring rights to DeviceProximityEvent Implementation.
 **/
 (function() {
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

    //test the attributes exist
    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_own_property(event, 'value', 'must have attribute value');
    }, 'value attribute exist');

    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_own_property(event, 'min', 'must have attribute min');
    }, 'min attribute exist');

    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_own_property(event, 'max', 'must have attribute max');
    }, 'max attribute exist');

    //test readonly attribute double value;
    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'value', 'readonly attribute value');
    }, 'value attribute is readonly');

    //test readonly attribute double min
    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'min', 'readonly attribute min');
    }, 'min attribute is readonly');

    //readonly attribute double max;
    test(function() {
        var event = new DeviceProximityEvent('test');
        assert_readonly(event, 'max', 'readonly attribute max');
    }, 'max attribute is readonly');


    test(function() {
        var dic = {
            min: 3,
            max: 7,
            value: 13
        },
            event = new DeviceProximityEvent('test', dic),
            props = {
                writable: false,
                enumerable: true,
                configurable: true
            },
            eProps = Object.getOwnPropertyDescriptor(event, 'max'),
            writable = eProps.writable === props.writable,
            enumerable = eProps.enumerable === props.enumerable,
            config = eProps.configurable === props.configurable;
        assert_true(writable && enumerable && config);
    }, 'min props check');

    test(function() {
        //the max attribute
        var dic = {
            min: 3,
            max: 7,
            value: 13
        },
            event = new DeviceProximityEvent('test', dic),
            props = {
                writable: false,
                enumerable: true,
                configurable: true
            },
            eProps = Object.getOwnPropertyDescriptor(event, 'max'),
            writable = eProps.writable === props.writable,
            enumerable = eProps.enumerable === props.enumerable,
            config = eProps.configurable === props.configurable;

        assert_true(writable && enumerable && config);

    }, 'max props check');

    test(function() {
        var dic = {
            min: 3,
            max: 7,
            value: 13
        },
            event = new DeviceProximityEvent('test', dic),
            props = {
                writable: false,
                enumerable: true,
                configurable: true
            },
            eProps = Object.getOwnPropertyDescriptor(event, 'value'),
            writable = eProps.writable === props.writable,
            enumerable = eProps.enumerable === props.enumerable,
            config = eProps.configurable === props.configurable;

        assert_true(writable && enumerable && config);
    }, 'value props check');
    test(function() {
        var desc = 'Expected to find ondeviceproximity attribute on window object';
        assert_own_property(window, 'ondeviceproximity', desc);
    }, 'ondeviceproximity exists');

    test(function() {
        var desc = 'window.ondeviceproximity must be null';
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'ondeviceproximity is null');

    test(function() {
        var desc = 'window.ondeviceproximity did not accept callable object';
        func = function() {}
        window.ondeviceproximity = func;
        assert_equals(window.ondeviceproximity, func, desc);
    }, 'ondeviceproximity is set to function');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = {};
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat object as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = {
            call: 'test'
        };
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat object with non-callable call property as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable as null',
            test = function() {};
        test.call = 'test';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = test;
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat object with non-callable call property as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable (string) as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = 'string';
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat string as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable (number) as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = 123;
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat number as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable (undefined) as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = undefined;
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat undefined as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable (array) as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = [];
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat array as null');

    test(function() {
        var desc = 'window.ondeviceproximity did not treat noncallable host object as null';
        window.ondeviceproximity = function() {};
        window.ondeviceproximity = Node;
        assert_equals(window.ondeviceproximity, null, desc);
    }, 'treat non-callable host object as null');

    //Async tests
    var t = async_test('test if device proximity event recieved');
    window.addEventListener('deviceproximity', function(e) {
        t.step(function() {
            var msg = 'expected instance of DeviceProximityEvent: ';
            assert_true(e instanceof window.DeviceProximityEvent, msg);
        });
        t.done();
    });

    var t2 = async_test('test if user proximity event recieved');
    window.ondeviceproximity = function(e) {
        t2.step(function() {
            var msg = 'expected instance of DeviceProximityEvent: ';
            assert_true(e instanceof window.DeviceProximityEvent, msg);
        });
        t2.done();
    };
})();
