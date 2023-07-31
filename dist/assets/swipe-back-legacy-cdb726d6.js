<<<<<<<< HEAD:dist/assets/swipe-back-legacy-eaca0989.js
System.register(["./index-legacy-61742bb8.js"],(function(t,e){"use strict";var n,r,i;return{setters:[t=>{n=t.i,r=t.c,i=t.a}],execute:function(){
========
System.register(["./index-legacy-a4e78198.js"],(function(t,e){"use strict";var n,r,i;return{setters:[t=>{n=t.i,r=t.c,i=t.a}],execute:function(){
>>>>>>>> 58430361cb2142f7e73b74d6363092e1bfec5282:dist/assets/swipe-back-legacy-cdb726d6.js
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
t("createSwipeBackGesture",((t,e,s,c,o)=>{const a=t.ownerDocument.defaultView;let u=n(t);const l=t=>u?-t.deltaX:t.deltaX;return r({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:r=>(u=n(t),(t=>{const{startX:e}=t;return u?e>=a.innerWidth-50:e<=50})(r)&&e()),onStart:s,onMove:t=>{const e=l(t)/a.innerWidth;c(e)},onEnd:t=>{const e=l(t),n=a.innerWidth,r=e/n,s=(t=>u?-t.velocityX:t.velocityX)(t),c=s>=0&&(s>.2||e>n/2),d=(c?1-r:r)*n;let h=0;if(d>5){const t=d/Math.abs(s);h=Math.min(t,540)}o(c,r<=0?.01:i(0,r,.9999),h)}})}))}}}));
