if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(r[o])return;let a={};const c=e=>s(e,o),l={module:{uri:o},exports:a,require:c};r[o]=Promise.all(i.map((e=>l[e]||c(e)))).then((e=>(n(...e),a)))}}define(["./workbox-ab3f8db2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"@bervproject/spms-ui"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/SimplePasswordManagerService/css/chunk-vendors.35f1e258.css",revision:null},{url:"/SimplePasswordManagerService/index.html",revision:"ac586e41dd38d5d646e9019731dea73a"},{url:"/SimplePasswordManagerService/js/app.a5e6fe75.js",revision:null},{url:"/SimplePasswordManagerService/js/chunk-vendors.27ac242b.js",revision:null},{url:"/SimplePasswordManagerService/manifest.json",revision:"a708122a96bb4ca065bca02b4b916c8c"},{url:"/SimplePasswordManagerService/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
