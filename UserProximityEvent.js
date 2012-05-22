/**
* Implementation of "User Proximity"
* http://dvcs.w3.org/hg/dap/raw-file/tip/proximity/userproximity.html
*
* Public Domain Software
* To the extent possible under law, Marcos Caceres has waived all copyright and
* related or neighboring rights to UserProximityEvent Implementation.
*
* This program implements the following intefaces:
*
* [Constructor (DOMString type, optional UserProximityEventInit eventInitDict)]
* interface UserProximityEvent : Event {
*     readonly attribute boolean near;
* };
* dictionary UserProximityEventInit : EventInit {
*     boolean near;
* };
**/
(function implementUserProximityEvent(globalObject, sensor) {
    var stringify,
        props,
        selfRef = this;
        //Interface Object, as per WebIDL
        iObj = function UserProximityEvent(type, eventInitDict) {
            var props,
                converters = Object.create(null),
                dict = {
                    near: sensor.near,
                    cancelable: false,
                    bubbles: true
                },
                event;
            if (arguments.length === 0) {
                throw new TypeError('Not Enough Arguments');
            }

            //ECMAScript to WebIDL converters
            converters.cancelable =
            converters.bubbles =
            converters.near = toBool;

            //process eventInitDict if it was passed, overriding 'dict'
            if (arguments.length === 2) {
                eventInitDict = Object(eventInitDict);
                for (var key in eventInitDict) {
                    if (dict.hasOwnProperty(key)) {
                        var converter = converters[key],
                            value, idlValue;

                        if (HasProperty(eventInitDict, key)) {
                            value = eventInitDict[key];
                            idlValue = converter(value);
                            dict[key] = idlValue;
                        }
                    }
                }
            }

            //initialize the internal Event
            event = new Event(String(type), dict);

            //add the near attribute
            props = {
                get: function() {
                    return dict.near;
                },
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(event, 'near', props);
            return event;

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
                var prop = GetOwnProperty(O, P);
                if (prop !== undefined) {
                    return prop;
                }
                var proto = Object.getPrototypeOf(O);
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
                var D = Object.create({});
                var X = Object.getOwnPropertyDescriptor(O, P);
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

    //Set up prototype for interface
    UserProximityEvent.prototype = new Event('userproximity', {});
    props = {
        writable: false,
        enumerable: false,
        configurable: false
    };
    Object.defineProperty(UserProximityEvent, 'prototype', props);

    //Define toString method, as per WebIDL
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function toString() {
            return '[object UserProximityEvent]';
        }
    };
    Object.defineProperty(UserProximityEvent.prototype, 'toString', props);

    //set up the prototype object's constructor
    UserProximityEvent.constructor = iObj;
    props = {
        writable: true,
        enumerable: false,
        configurable: true
    };
    Object.defineProperty(UserProximityEvent, 'constructor', props);

    //Add UserProximityEvent to global object (i.e., to Window)
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: iObj
    };
    Object.defineProperty(globalObject, 'UserProximityEvent', props);

    //Set up prototype for interface
    iObj.prototype = new UserProximityEvent();
    props = {
        writable: false,
        enumerable: false,
        configurable: false
    };
    Object.defineProperty(iObj, 'prototype', props);

    //redefine toString() for interface object
    stringify = 'function UserProximityEvent() { [native code] }';
    props = {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function toString() {return stringify}
    };
    Object.defineProperty(iObj, 'toString', props);

    //Inteface Prototype Object
    function UserProximityEvent() {

    }
})(this,
//fake user proximity sensor
{
    get min() {
        return 0.2;
    }, get max() {
        return 5.0;
    }, get value() {
        return Math.round(this.max * Math.random());
    }, get near() {
        return Boolean(this.value);
    },
    sense: function sense() {
        var event,
            dict;
            obj = this;
        setInterval(function() {
            dict = {min: obj.min, max: obj.max, value: obj.value, near: obj.near};
            event = new UserProximityEvent('userproximity', dict);
            window.dispatchEvent(event);
        },Math.round(2000 * Math.random() + 500));
        return this;
    }
}.sense());
