/**
* Public Domain Software
* To the extent possible under law, Marcos Caceres has waived all copyright and
* related or neighboring rights to DeviceProximityEvent Implementation.
**/

//add_completion_callback(function(tests){console.log(tests)})
//test(assert_equals(function(){}, ));

var event;

try {
    event = new DeviceProximityEvent;
} catch (e) {
    console.log(e instanceof TypeError);
}

try {
    event = new DeviceProximityEvent();
} catch (e) {
    console.log(e instanceof TypeError);
}

//inheritance checks
event = new DeviceProximityEvent("");
console.log(event instanceof window.DeviceProximityEvent); 
console.log(event instanceof window.Event); 

//Type attribute tests
event = new DeviceProximityEvent(undefined);
console.log(event.type === "undefined");

event = new DeviceProximityEvent(null);
console.log(event.type === "null");

event = new DeviceProximityEvent(123);
console.log(event.type === "123");

event = new DeviceProximityEvent(new Number(123));
console.log(event.type === "123");

event = new DeviceProximityEvent([]);
console.log(event.type === "");

event = new DeviceProximityEvent(new Array());
console.log(event.type === "");

event = new DeviceProximityEvent(["t", ["e", ["s", ["t"]]]]);
console.log(event.type === "t,e,s,t");

event = new DeviceProximityEvent(Math);
console.log(event.type === "[object Math]");

event = new DeviceProximityEvent(true);
console.log(event.type === "true");

event = new DeviceProximityEvent(new Boolean(true));
console.log(event.type === "true");

event = new DeviceProximityEvent(false);
console.log(event.type === "false");

event = new DeviceProximityEvent(new Boolean(false));
console.log(event.type === "false");

event = new DeviceProximityEvent("test");
console.log(event.type === "test");

event = new DeviceProximityEvent(new String("test"));
console.log(event.type === "test");

event = new DeviceProximityEvent(function test(){});
console.log(event.type === "function test(){}");

event = new DeviceProximityEvent({toString: function(){return "123"}});
console.log(event.type === "123");

try{
	event = new DeviceProximityEvent({toString: function(){return function(){}}});
	throw new Error(); 
}catch(e){
	console.log(e instanceof TypeError);
}
