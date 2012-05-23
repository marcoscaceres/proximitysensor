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
 (function implementDeviceProximityEvent(globalObject, sensor) {
    'use strict';
    //only polyfill if needed
    if (globalObject.DeviceProximityEvent) {
        return;
    }
    var min, max, value, props, iProtoObj,
    //interface object + constructor
    iObj = function DeviceProximityEvent(type, eventInitDict) {
            if (arguments.length === 0) {
                throw new TypeError('Not Enough Arguments');
            }
            var props, event, converters = Object.create({}),
                dict = {
                    value: sensor.value || +Infinity,
                    max: sensor.max || +Infinity,
                    min: sensor.min || -Infinity,
                    cancelable: false,
                    bubbles: true
                };

            //ECMAScript to WebIDL converters
            converters.value = converters.min = converters.max = toDouble;
            converters.cancelable = converters.bubbles = toBool;

            //process eventInitDict if it was passed, overriding 'dict'
            if (arguments.length === 2) {
                eventInitDict = Object(eventInitDict);
                for (var key in eventInitDict) {
                    if (dict.hasOwnProperty(key)) {
                        var value, idlValue, converter = converters[key];

                        if (HasProperty(eventInitDict, key)) {
                            value = eventInitDict[key];
                            idlValue = converter(value);
                            dict[key] = idlValue;
                        }
                    }
                }
            }
            //initialize the underlying event
            event = new Event(String(type), dict);

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
            //ECMAScript5 HasProperty
            function HasProperty(O, P) {
                var desc = GetProperty(O, P);
                if (desc === undefined) {
                    return false;
                }
                return true;
            }
            //ECMAScript5 GetProperty
            function GetProperty(O, P) {
                var prop = GetOwnProperty(O, P),
                    proto = Object.getPrototypeOf(O);
                if (prop !== undefined) {
                    return prop;
                }
                if (proto === null) {
                    return undefined;
                }
                return GetProperty(proto, P);
            }
            //ECMAScript5 GetOwnProperty
            function GetOwnProperty(O, P) {
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
        };

    //Set up prototype for iterface
    DeviceProximityEvent.prototype = new Event('');
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

    //Interface Prototype Object
    function DeviceProximityEvent() {

    }
})(this,
//fake device proximity sensor
{
    fireEvent: function fireEvent() {
        var e = new DeviceProximityEvent('deviceproximity', this.dict);
        window.dispatchEvent(e);
    },
    get dict() {
        return {
                min: this.min,
                max: this.max,
                value: this.value,
                near: this.near
            };
    },
    get min() {
        return 0.2;
    }, get max() {
        return 5.0;
    }, value: null,
    refreshValue: function updateValue() {
        this.value = Math.abs(Math.sin(Date.now() / 1000) * 10);
        return this.value;
    }
    ,
    sense: function sense() {
        var obj = this;
        //first run
        if (this.value === null) {
            this.refreshValue();
            setTimeout(this.fireEvent, 4);
        }

        setInterval(function() {
            //new random value
            obj.refreshValue();
            obj.fireEvent();
        }, 16);
        return this;
    }
}.sense());
