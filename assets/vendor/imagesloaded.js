(function(){function e(){}var t=e.prototype,n=this,i=n.EventEmitter;function o(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function r(e){return function(){return this[e].apply(this,arguments)}}t.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e)for(n in t={},i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n]);else t=i[e]||(i[e]=[]);return t},t.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},t.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&((t={})[e]=n),t||n},t.addListener=function(e,t){var n,i=this.getListenersAsObject(e),r="object"==typeof t;for(n in i)i.hasOwnProperty(n)&&-1===o(i[n],t)&&i[n].push(r?t:{listener:t,once:!1});return this},t.on=r("addListener"),t.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},t.once=r("addOnceListener"),t.defineEvent=function(e){return this.getListeners(e),this},t.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},t.removeListener=function(e,t){var n,i,r=this.getListenersAsObject(e);for(i in r)r.hasOwnProperty(i)&&-1!==(n=o(r[i],t))&&r[i].splice(n,1);return this},t.off=r("removeListener"),t.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},t.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},t.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},t.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},t.removeAllListeners=r("removeEvent"),t.emitEvent=function(e,t){var n,i,r,o=this.getListenersAsObject(e);for(r in o)if(o.hasOwnProperty(r))for(i=o[r].length;i--;)!0===(n=o[r][i]).once&&this.removeListener(e,n.listener),n.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},t.trigger=r("emitEvent"),t.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},t.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},t._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},t._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return n.EventEmitter=i,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(n){var e=document.documentElement,t=function(){};function i(e){var t=n.event;return t.target=t.target||t.srcElement||e,t}e.addEventListener?t=function(e,t,n){e.addEventListener(t,n,!1)}:e.attachEvent&&(t=function(t,e,n){t[e+n]=n.handleEvent?function(){var e=i(t);n.handleEvent.call(n,e)}:function(){var e=i(t);n.call(t,e)},t.attachEvent("on"+e,t[e+n])});var r=function(){};e.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:e.detachEvent&&(r=function(t,n,i){t.detachEvent("on"+n,t[n+i]);try{delete t[n+i]}catch(e){t[n+i]=void 0}});var o={bind:t,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):n.eventie=o}(this),function(n,i){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(e,t){return i(n,e,t)}):"object"==typeof exports?module.exports=i(n,require("wolfy87-eventemitter"),require("eventie")):n.imagesLoaded=i(n,n.EventEmitter,n.eventie)}(window,function(e,t,n){var r=e.jQuery,s=e.console,f=void 0!==s;function o(e,t){for(var n in t)e[n]=t[n];return e}var c=Object.prototype.toString;function a(e){var t,n=[];if(t=e,"[object Array]"===c.call(t))n=e;else if("number"==typeof e.length)for(var i=0,r=e.length;i<r;i++)n.push(e[i]);else n.push(e);return n}function h(e,t,n){if(!(this instanceof h))return new h(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=a(e),this.options=o({},this.options),"function"==typeof t?n=t:o(this.options,t),n&&this.on("always",n),this.getImages(),r&&(this.jqDeferred=new r.Deferred);var i=this;setTimeout(function(){i.check()})}function i(e){this.img=e}(h.prototype=new t).options={},h.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;e<t;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;o<s;o++){var f=r[o];this.addImage(f)}}},h.prototype.addImage=function(e){var t=new i(e);this.images.push(t)},h.prototype.check=function(){var n=this,i=0,r=this.images.length;if(this.hasAnyBroken=!1,r)for(var e=0;e<r;e++){var t=this.images[e];t.on("confirm",o),t.check()}else this.complete();function o(e,t){return n.options.debug&&f&&s.log("confirm",e,t),n.progress(e),++i===r&&n.complete(),!0}},h.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},h.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var n=this;setTimeout(function(){if(n.emit(t,n),n.emit("always",n),n.jqDeferred){var e=n.hasAnyBroken?"reject":"resolve";n.jqDeferred[e](n)}})},r&&(r.fn.imagesLoaded=function(e,t){return new h(this,e,t).jqDeferred.promise(r(this))}),(i.prototype=new t).check=function(){var e=u[this.img.src]||new d(this.img.src);if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else if(this.img.complete&&void 0!==this.img.naturalWidth)this.confirm(0!==this.img.naturalWidth,"naturalWidth");else{var n=this;e.on("confirm",function(e,t){return n.confirm(e.isLoaded,t),!0}),e.check()}},i.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var u={};function d(e){this.src=e,u[e]=this}return(d.prototype=new t).check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},d.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},d.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},d.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},d.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},d.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},h});