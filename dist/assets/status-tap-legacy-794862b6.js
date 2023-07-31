<<<<<<<< HEAD:dist/assets/status-tap-legacy-182c441b.js
System.register(["./index-legacy-61742bb8.js"],(function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.r,r=e.f,s=e.b,o=e.w,i=e.s}],execute:function(){
========
System.register(["./index-legacy-a4e78198.js"],(function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.r,r=e.f,s=e.b,o=e.w,i=e.s}],execute:function(){
>>>>>>>> 58430361cb2142f7e73b74d6363092e1bfec5282:dist/assets/status-tap-legacy-794862b6.js
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
e("startStatusTap",(()=>{const e=window;e.addEventListener("statusTap",(()=>{n((()=>{const t=e.innerWidth,n=e.innerHeight,a=document.elementFromPoint(t/2,n/2);if(!a)return;const c=r(a);c&&new Promise((e=>s(c,e))).then((()=>{o((async()=>{c.style.setProperty("--overflow","hidden"),await i(c,300),c.style.removeProperty("--overflow")}))}))}))}))}))}}}));
