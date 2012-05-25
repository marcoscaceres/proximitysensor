/**
 * This is an implementation of "Proximity Events":
 * http://dvcs.w3.org/hg/dap/raw-file/tip/proximity/Overview.html
 *
 * Public Domain Software
 * To the extent possible under law, Marcos Caceres has waived all copyright and
 * related or neighboring rights to DeviceProximityEvent Implementation.
 *
 * This program implements the following intefaces:
 *
 * [Constructor(DOMString type,optional DeviceProximityEventInit eventInitDict)]
 * interface DeviceProximityEvent : Event {
 *     readonly attribute double value;
 *     readonly attribute double min;
 *     readonly attribute double max;
 * };
 * dictionary DeviceProximityEventInit : EventInit {
 *     double value;
 *     double min;
 *     double max;
 * };
 **/
FakeDeviceProximitySensor.prototype = {
    fireEvent: function fireEvent() {
        'use strict';
        var e = new window.DeviceProximityEvent('deviceproximity', this.dict);
        window.dispatchEvent(e);
    },
    get dict() {
        'use strict';
        return {
            min: this.min,
            max: this.max,
            value: this.value,
            near: this.near
        };
    },
    get min() {
        'use strict';
        return 0.2;
    },
    get max() {
        'use strict';
        return 5.0;
    },
    value: null,
    refreshValue: function updateValue() {
        'use strict';
        this.value = Math.abs(Math.sin(Date.now() / 1000) * 10);
        return this.value;
    },
    sense: function sense() {
        'use strict';
        var obj = this;
        //first run
        if (this.value === null) {
            this.refreshValue();
            //queue a task to fire event
            setTimeout(this.fireEvent, 4);
        }

        setInterval(function() {
            //new random value
            obj.refreshValue();
            obj.fireEvent();
        }, 16);
        return this;
    },

    registerListener: function registerListener(callback) {
        'use strict';
        window.addEventListener('deviceproximity', callback);
    },

    removeListener: function removeListener(callback) {
        'use strict';
        window.removeEventListener('deviceproximity', callback);
    }
};

function FakeDeviceProximitySensor() {}


(function implementDeviceProximityEvent(globalObject, sensor) {
    'use strict';
    //only polyfill if needed
    if (globalObject.DeviceProximityEvent) {
        return;
    }
    var min, max, value, props, iProtoObj,
    callback = null,
    //interface object + constructor
    iObj = function DeviceProximityEvent(type, eventInitDict) {
            var props, key, event, value, idlValue, converter, converters = Object.create({}),
                dict = {
                    value: sensor.value || +Infinity,
                    max: sensor.max || +Infinity,
                    min: sensor.min || -Infinity,
                    cancelable: false,
                    bubbles: true
                };
            if (arguments.length === 0) {
                throw new TypeError('Not Enough Arguments');
            }
            //WebIDL ECMAScript to double
            function toDouble(value) {
                var x = Number(value);
                if (isNaN(x) || x === Infinity || x === -Infinity) {
                    throw new TypeError('Cannot convert to double.');
                }
                return x;
            }
            //WebIDL ECMAScript to WebIDL boolean
            function toBool(value) {
                return Boolean(value);
            }
            //ECMAScript5 Type(x)
            function Type(x) {
                var type = (x === null) ? 'null' : typeof x;
                if (type === 'function') {
                    type = 'object';
                }
                return type;
            }
            //ECMAScript5 GetOwnProperty
            function getOwnProperty(O, P) {
                if (!O.hasOwnProperty(P)) {
                    return undefined;
                }
                var D = Object.create({}),
                    X = Object.getOwnPropertyDescriptor(O, P);
                if (X.hasOwnProperty('value') || X.hasOwnProperty('writable')) {
                    D.value = X.value;
                    D.writable = X.writable;
                } else {
                    D.get = X.get;
                    D.set = X.set;
                }
                D.enumerable = X.enumerable;
                D.configurable = X.configurable;
                return D;
            }
            //ECMAScript5 GetProperty
            function getProperty(O, P) {
                var prop = getOwnProperty(O, P),
                    proto = Object.getPrototypeOf(O);
                if (prop !== undefined) {
                    return prop;
                }
                if (proto === null) {
                    return undefined;
                }
                return getProperty(proto, P);
            }
            //ECMAScript5 HasProperty
            function hasProperty(O, P) {
                var desc = getProperty(O, P);
                if (desc === undefined) {
                    return false;
                }
                return true;
            }

            //ECMAScript to WebIDL converters
            converters.value = converters.min = converters.max = toDouble;
            converters.cancelable = converters.bubbles = toBool;

            //process eventInitDict if it was passed, overriding 'dict'
            if (arguments.length === 2) {
                eventInitDict = globalObject.Object(eventInitDict);
                for (key in eventInitDict) {
                    if (dict.hasOwnProperty(key)) {
                        converter = converters[key];
                        if (hasProperty(eventInitDict, key)) {
                            value = eventInitDict[key];
                            idlValue = converter(value);
                            dict[key] = idlValue;
                        }
                    }
                }
            }
            //initialize the underlying event
            event = new globalObject.Event(String(type), dict);

            //create the min attribute
            props = {
                value: dict.min,
                writable: false,
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(event, 'min', props);

            //create the max attribute
            props = {
                value: dict.max,
                writable: false,
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(event, 'max', props);

            //create the value attribute
            props = {
                value: dict.value,
                writable: false,
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(event, 'value', props);
            return event;
        };

    //Set up prototype for iterface
    DeviceProximityEvent.prototype = new globalObject.Event('');
    props = {
        writable: true,
        enumerable: false,
        configurable: false
    };
    Object.defineProperty(DeviceProximityEvent, 'prototype', props);

    //Define toString method, as per WebIDL
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function toString() {
            return '[object DeviceProximityEvent]';
        }
    };
    Object.defineProperty(DeviceProximityEvent.prototype, 'toString', props);

    iProtoObj = new DeviceProximityEvent();

    //set up the prototype object's constructor
    iProtoObj.constructor = iObj;
    props = {
        writable: true,
        enumerable: false,
        configurable: true
    };
    Object.defineProperty(DeviceProximityEvent, 'constructor', props);

    //Set up prototype for interface
    iObj.prototype = iProtoObj;
    props = {
        writable: false,
        enumerable: false,
        configurable: false
    };
    Object.defineProperty(iObj, 'prototype', props);

    //Add DeviceProximityEvent to global object (i.e., to Window)
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: iObj
    };
    Object.defineProperty(globalObject, 'DeviceProximityEvent', props);

    //redefine toString() for interface object
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function toString() {
            return 'function DeviceProximityEvent() { [native code] }';
        }
    };
    Object.defineProperty(iObj, 'toString', props);

    //[TreatNonCallableAsNull] attribute Function? ondeviceproximity;
    function treatNonCallableAsNull(arg) {
        if (arg !== callback) {
            if (callback) {
                sensor.removeListener(callback);
                callback = null;
            }
            if (typeof arg === 'function' && arg.call !== undefined && typeof arg.call === 'function') {
                callback = arg;
                sensor.registerListener(callback);
            }
        }
        return arg;
    }
    props = {
        get: function() {
            return callback;
        },
        set: treatNonCallableAsNull,
        enumerable: false,
        configurable: true
    };
    Object.defineProperty(globalObject, 'ondeviceproximity', props);

    //Interface Prototype Object
    function DeviceProximityEvent() {

    }
})(this,
//fake device proximity sensor
new FakeDeviceProximitySensor().sense());
