if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const t=e=>n(e,a),f={module:{uri:a},exports:o,require:t};i[a]=Promise.all(r.map((e=>f[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-ef76851d.css",revision:null},{url:"index.html",revision:"7abf91da13ae7df1e17b5dd7d13f5254"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"EspinaNegra_5060x2154.png",revision:"10eeec185e1ad0e6a0afea88ea481f9e"},{url:"EspinaNegrax192.png",revision:"3bf12c603a2e5ef4ea1d81d09725c775"},{url:"EspinaNegrax128.png",revision:"f38a96b3ae1646469dafaf50189abb81"},{url:"EspinaNegrax512.png",revision:"1441265144663062ae78bcc812599057"},{url:"maskable_512.png",revision:"1441265144663062ae78bcc812599057"},{url:"manifest.webmanifest",revision:"6f8af8495c658f2e2fb1dc73f1fd83e0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
