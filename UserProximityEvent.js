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

 * partial interface Window {
 *   [TreatNonCallableAsNull]
 *     attribute Function? onuserproximity;
 * };
 **/
FakeUserProximitySensor.prototype = {
    fireEvent: function fireEvent() {
        'use strict';
        var userEvent = new window.UserProximityEvent('userproximity', this.dict);
        window.dispatchEvent(userEvent);
        return this;
    },
    get dict() {
        'use strict';
        return {
            near: this.near
        };
    },
    value: null,
    get near() {
        'use strict';
        return Boolean(this.value);
    },
    refreshValue: function refreshValue() {
        'use strict';
        this.value = Math.round(Math.random());
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
            var oldNear = obj.near;
            obj.refreshValue();
            if (oldNear !== obj.near) {
                obj.fireEvent();
            }
        }, 500);
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

function FakeUserProximitySensor() {}


(function implementUserProximityEvent(globalObject, sensor) {
    'use strict';
    //only polyfill if needed
    if (globalObject.UserProximityEvent) {
        return;
    }

    var stringify, props, selfRef = this,
        callback = null,
        //Interface Object, as per WebIDL
        iObj = function UserProximityEvent(type, eventInitDict) {
            var props, converters = Object.create(null),
                converter, value, idlValue, dict = {
                    near: sensor.near,
                    cancelable: false,
                    bubbles: true
                },
                event, key;

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

            if (arguments.length === 0) {
                throw new TypeError('Not Enough Arguments');
            }

            //ECMAScript to WebIDL converters
            converters.cancelable = converters.bubbles = converters.near = toBool;

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

            //initialize the internal Event
            event = new globalObject.Event(String(type), dict);

            //add the near attribute
            props = {
                value: dict.near,
                writable: false,
                enumerable: true,
                configurable: true
            };
            Object.defineProperty(event, 'near', props);
            return event;
        };
    //Inteface Prototype Object
    function UserProximityEvent() {

    }
    //Set up prototype for interface
    UserProximityEvent.prototype = new globalObject.Event('userproximity', {});
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
        value: function toString() {
            return stringify;
        }
    };
    Object.defineProperty(iObj, 'toString', props);

    //[TreatNonCallableAsNull] attribute Function? onuserproximity;
    function treatNonCallableAsNull(arg) {
        if (callback) {
            sensor.removeListener(callback);
        }
        if (typeof arg !== 'function' && !(arg.call) && typeof arg.call !== 'function') {
            callback = null;
        } else {
            callback = arg;
            sensor.registerListener(callback);
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
    Object.defineProperty(globalObject, 'onuserproximity', props);
}(this, new FakeUserProximitySensor().sense()));
