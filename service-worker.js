if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(r[o])return;let c={};const l=e=>s(e,o),a={module:{uri:o},exports:c,require:l};r[o]=Promise.all(i.map((e=>a[e]||l(e)))).then((e=>(n(...e),c)))}}define(["./workbox-2dda3721"],(function(e){"use strict";e.setCacheNameDetails({prefix:"@bervproject/spms-ui"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/SimplePasswordManagerService/css/chunk-vendors.473bc48d.css",revision:null},{url:"/SimplePasswordManagerService/index.html",revision:"1fffd4e9e3963720cf28bb65331e46d1"},{url:"/SimplePasswordManagerService/js/app.e5c3a734.js",revision:null},{url:"/SimplePasswordManagerService/js/chunk-vendors.eeb12db7.js",revision:null},{url:"/SimplePasswordManagerService/manifest.json",revision:"a708122a96bb4ca065bca02b4b916c8c"},{url:"/SimplePasswordManagerService/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
