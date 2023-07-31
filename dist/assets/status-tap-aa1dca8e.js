<<<<<<<< HEAD:dist/assets/status-tap-f384bf78.js
import{r as a,f as i,b as c,w as d,s as l}from"./index-54fc3b7b.js";/*!
========
import{r as a,f as i,b as c,w as d,s as l}from"./index-b9983d60.js";/*!
>>>>>>>> 58430361cb2142f7e73b74d6363092e1bfec5282:dist/assets/status-tap-aa1dca8e.js
 * (C) Ionic http://ionicframework.com - MIT License
 */const m=()=>{const e=window;e.addEventListener("statusTap",()=>{a(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=i(n);t&&new Promise(r=>c(t,r)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{m as startStatusTap};
