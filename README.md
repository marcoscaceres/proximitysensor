# Proximity Sensors

This is a reference implementation of the W3C's [Proximity Events](http://dvcs.w3.org/hg/dap/raw-file/tip/proximity/Overview.html) specification. It can also be used as a polyfill. 

## Warning
** This is an unsupported component with an indefinite lifetime. 
This should be used for evaluation purposes only and should not be used for production level applications.**


# Using for testing

Just do this and you are good to go: 

 * window.addEventListener('deviceproximity', function(e) { ... })
 * window.addEventListener('userproximity', function(e) { ... })
 
Alternatively: 
  
 * window.ondeviceproximity = function(e){ ... }
 * window.onuserproximity = function(e){ ... }


Enjoy! 

# Using as polyfill or with Node.js
Depending on what you want to do, you can remove the "FakeSensor" and replace it with a real sensor (so long as you use the same method names). 

