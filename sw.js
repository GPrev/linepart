if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),c={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BhvTMc44.js",revision:null},{url:"assets/index-BXu-AjRv.css",revision:null},{url:"assets/PuzzlePage-C0EFjCeT.js",revision:null},{url:"assets/PuzzlePage-D2Uz9WHt.css",revision:null},{url:"index.html",revision:"026ac9c394146e1ee5e4d568f28e59f9"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"pwa-192x192.png",revision:"89dbd85197fffc683286f6c7d3148c45"},{url:"pwa-512x512.png",revision:"5a3c21fc75b605267a999bf5e9afdd52"},{url:"pwa-maskable-192x192.png",revision:"47ed9caa682912987bf9318c0a6c1420"},{url:"pwa-maskable-512x512.png",revision:"cda4c0489d30424f3dc580a378fd1586"},{url:"manifest.webmanifest",revision:"0ffb643d5a623b3f882657d35bf00041"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
