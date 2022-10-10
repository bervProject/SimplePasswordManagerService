(function(){"use strict";var e={6:function(e,t,r){var n=r(582),o=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-app",[t("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[t("div",{staticClass:"d-flex align-center"},[t("v-img",{staticClass:"shrink mr-2",attrs:{alt:"SPMS",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}})],1),t("v-spacer"),t("v-btn",{attrs:{href:"https://github.com/bervProject/spms-ui",target:"_blank",text:""}},[t("span",{staticClass:"mr-2"},[e._v("Latest Release")]),t("v-icon",[e._v("mdi-open-in-new")])],1)],1),t("v-main",[t("router-view")],1)],1)},s=[],i=n["default"].extend({name:"App"}),a=i,l=r(483),c=(0,l.Z)(a,o,s,!1,null,null,null),u=c.exports,d=r(626);(0,d.z)("/SimplePasswordManagerService/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var f=r(859),v=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("v-container",[t("v-card",{attrs:{loading:e.submitting}},[t("v-card-title",[e._v(" Login ")]),t("v-card-text",[t("v-container",[t("v-row",{staticClass:"mx-0",attrs:{align:"center"}},[t("validation-observer",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function({invalid:r}){return[t("form",{on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[t("v-row",[t("validation-provider",{attrs:{name:"Username",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function({errors:r}){return[t("v-text-field",{attrs:{"error-messages":r,label:"Username",disabled:e.submitting,required:"",clearable:"","prepend-icon":"mdi-account"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})]}}],null,!0)})],1),t("v-row",[t("validation-provider",{attrs:{name:"Password",rules:"required"},scopedSlots:e._u([{key:"default",fn:function({errors:r}){return[t("v-text-field",{attrs:{"append-icon":e.showPassword?"mdi-eye":"mdi-eye-off",type:e.showPassword?"text":"password",label:"Password",required:"",disabled:e.submitting,"error-messages":r,"prepend-icon":"mdi-lock"},on:{"click:append":function(t){e.showPassword=!e.showPassword}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})]}}],null,!0)})],1),t("v-btn",{attrs:{loading:e.submitting,type:"submit",disabled:r}},[e._v("Login")])],1)]}}])})],1)],1)],1),t("v-divider"),t("v-card-text",[t("v-row",{attrs:{align:"center",justify:"space-around"}},[t("v-btn",{attrs:{href:e.loginGithub,outlined:""}},[t("v-icon",{attrs:{left:""}},[e._v(" mdi-github-circle ")]),e._v("Login with Github")],1),t("v-btn",{attrs:{href:e.loginGoogle,outlined:""}},[t("v-icon",{attrs:{left:""}},[e._v(" mdi-google ")]),e._v("Login with Google")],1),t("v-btn",{attrs:{href:e.loginTwitter,outlined:""}},[t("v-icon",{attrs:{left:""}},[e._v(" mdi-twitter ")]),e._v("Login with Twitter")],1)],1)],1)],1),t("v-snackbar",{attrs:{color:"red"},scopedSlots:e._u([{key:"action",fn:function({attrs:r}){return[t("v-btn",e._b({attrs:{color:"black",text:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",r,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" "+e._s(e.errorMessage)+" ")])],1)},p=[],g=r(274),h=r(163),b=r(398),m=r(304),w=r(644),_=r.n(w),y=r(940);(0,y.UF)("eager"),(0,y.l7)("required",{...m.C1,message:"{_field_} can not be empty"}),(0,y.l7)("email",{...m.Do,message:"Email must be valid"});let k=class extends b.w3{constructor(...e){super(...e),(0,g.Z)(this,"$refs",void 0),(0,g.Z)(this,"baseURL","https://spms-berv.herokuapp.com"),(0,g.Z)(this,"loginGithub",`${this.baseURL}/oauth/github`),(0,g.Z)(this,"loginGoogle",`${this.baseURL}/oauth/google`),(0,g.Z)(this,"loginTwitter",`${this.baseURL}/oauth/twitter`),(0,g.Z)(this,"loginPassword",`${this.baseURL}/authentication`),(0,g.Z)(this,"showPassword",!1),(0,g.Z)(this,"password",""),(0,g.Z)(this,"username",""),(0,g.Z)(this,"valid",!0),(0,g.Z)(this,"submitting",!1),(0,g.Z)(this,"snackbar",!1),(0,g.Z)(this,"errorMessage","")}submit(){const e=this.$refs.observer.validate();e?(this.submitting=!0,_().post(this.loginPassword,{strategy:"local",email:this.username,password:this.password}).then((e=>{this.submitting=!1,console.log(e.data)})).catch((e=>{this.submitting=!1,console.log(e);const t=e.response.status;if(console.log(t),401===t){const t=e.response.data,r=t.message;console.error(r),this.errorMessage=r}else this.errorMessage="Failed to call server";this.snackbar=!0}))):console.log("Can't login")}};k=(0,h.gn)([(0,b.wA)({components:{ValidationProvider:y.d_,ValidationObserver:y._j}})],k);var P=k,x=P,Z=(0,l.Z)(x,v,p,!1,null,null,null),S=Z.exports;n["default"].use(f.ZP);const j=[{path:"/",name:"Home",component:S}],O=new f.ZP({mode:"history",base:"/SimplePasswordManagerService/",routes:j});var C=O,F=r(586);n["default"].use(F.ZP);var L=new F.ZP.Store({state:{},mutations:{},actions:{},modules:{}}),M=r(442),T=r.n(M);r(736);n["default"].use(T());var U=new(T())({theme:{themes:{light:{primary:"#4e92c6",secondary:"#4ec6be",accent:"#4e56c6",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}});n["default"].config.productionTip=!1,new n["default"]({router:C,store:L,vuetify:U,render:e=>e(u)}).$mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}r.m=e,function(){var e=[];r.O=function(t,n,o,s){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],s=e[u][2];for(var a=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(r.O).every((function(e){return r.O[e](n[l])}))?n.splice(l--,1):(a=!1,s<i&&(i=s));if(a){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,o,s]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,s,i=n[0],a=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(l)var u=l(r)}for(t&&t(n);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(u)},n=self["webpackChunk_bervproject_spms_ui"]=self["webpackChunk_bervproject_spms_ui"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(6)}));n=r.O(n)})();
//# sourceMappingURL=app.344669c3.js.map