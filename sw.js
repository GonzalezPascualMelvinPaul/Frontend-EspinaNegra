if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const t=e=>n(e,a),c={module:{uri:a},exports:o,require:t};i[a]=Promise.all(s.map((e=>c[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-91efa6c0.js",revision:null},{url:"assets/index-ef76851d.css",revision:null},{url:"index.html",revision:"a90c6e1d51efa0d419e44ef958b032c4"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"EspinaNegra_5060x2154.png",revision:"10eeec185e1ad0e6a0afea88ea481f9e"},{url:"EspinaNegrax192.png",revision:"3bf12c603a2e5ef4ea1d81d09725c775"},{url:"EspinaNegrax128.png",revision:"f38a96b3ae1646469dafaf50189abb81"},{url:"EspinaNegrax512.png",revision:"1441265144663062ae78bcc812599057"},{url:"maskable_512.png",revision:"1441265144663062ae78bcc812599057"},{url:"manifest.webmanifest",revision:"2dd6f4797d7686c7727e6563479c26c3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
