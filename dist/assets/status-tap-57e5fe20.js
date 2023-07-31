<<<<<<<< HEAD:dist/assets/status-tap-57e5fe20.js
import{r as a,f as i,a as c,w as d,s as l}from"./index-fdb21695.js";/*!
========
import{r as a,f as i,b as c,w as d,s as l}from"./index-717bb449.js";/*!
>>>>>>>> 9ffce132be5c33fa2ac99d96481e87a4c70b1077:dist/assets/status-tap-fdd65685.js
 * (C) Ionic http://ionicframework.com - MIT License
 */const m=()=>{const e=window;e.addEventListener("statusTap",()=>{a(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=i(n);t&&new Promise(r=>c(t,r)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{m as startStatusTap};
