<<<<<<<< HEAD:dist/assets/status-tap-legacy-86577efc.js
System.register(["./index-legacy-0dcd07af.js"],(function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.r,r=e.f,s=e.a,o=e.w,i=e.s}],execute:function(){
========
System.register(["./index-legacy-f84963fd.js"],(function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.r,r=e.f,s=e.b,o=e.w,i=e.s}],execute:function(){
>>>>>>>> 9ffce132be5c33fa2ac99d96481e87a4c70b1077:dist/assets/status-tap-legacy-0b737381.js
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
e("startStatusTap",(()=>{const e=window;e.addEventListener("statusTap",(()=>{n((()=>{const t=e.innerWidth,n=e.innerHeight,a=document.elementFromPoint(t/2,n/2);if(!a)return;const c=r(a);c&&new Promise((e=>s(c,e))).then((()=>{o((async()=>{c.style.setProperty("--overflow","hidden"),await i(c,300),c.style.removeProperty("--overflow")}))}))}))}))}))}}}));
