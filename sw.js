(()=>{var e,t,n,r=e={};function i(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"==typeof clearTimeout?clearTimeout:c}catch(e){n=c}}();var u,s=[],l=!1,a=-1;function h(){l&&u&&(l=!1,u.length?s=u.concat(s):a=-1,s.length&&f())}function f(){if(!l){var e=o(h);l=!0;for(var t=s.length;t;){for(u=s,s=[];++a<t;)u&&u[a].run();a=-1,t=s.length}u=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===c||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new d(e,t)),1!==s.length||l||o(f)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0};let p=void 0===e?"peegee":"pg",w=["index.html"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(p).then((e=>e.addAll(w))).then(self.skipWaiting()))})),self.addEventListener("activate",(e=>{const t=[p];e.waitUntil(caches.keys().then((e=>e.filter((e=>!t.includes(e))))).then((e=>Promise.all(e.map((e=>caches.delete(e)))))).then((()=>self.clients.claim())))})),self.addEventListener("fetch",(e=>{e.respondWith(fetch((e=>{let t=new Request(e,{cache:"reload"});if("cache"in t)return t;let n=new URL(e,self.location.href);return n.search+=(n.search?"&":"")+"cachebust="+Date.now(),new Request(n)})(e.request.url)).then((t=>(caches.open(p).then((n=>n.put(e.request.url,t.clone()))),t.clone()))).catch((t=>caches.match(e.request.url))))}))})();