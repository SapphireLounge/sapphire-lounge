const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-D-A-FiGt.js","assets/ui-B-Wa4-hK.js","assets/vendor-CCJAzSvv.js","assets/users-BDEPIhyd.js","assets/mail-DObV8sxM.js","assets/star-Dpir5xr3.js","assets/About-BXboItWv.js","assets/Reservations--B0LY1px.js","assets/html2canvas.esm-CnXDWswx.js","assets/check-circle-2-BpOxZb5P.js","assets/phone-B8N3vjJi.js","assets/Reservations-BUbUxQFr.css","assets/Menu-i7clK-Fk.js","assets/chevron-down-Bj0bRGMC.js","assets/Events-BwBbVZXC.js","assets/Loyalty-CD3oVCfU.js","assets/gift-CG7vEEv3.js","assets/Contact-C__IIBHe.js","assets/Contact-Dgihpmma.css","assets/FAQ-BRZExr5t.js","assets/Privacy-BXbAMPji.js","assets/Terms-BaFceVYC.js","assets/NotFound-C3GdWUGB.js","assets/VIPServices-ChtK1og8.js"])))=>i.map(i=>d[i]);
var e,t=Object.defineProperty,r=(e,r,s)=>((e,r,s)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s)(e,"symbol"!=typeof r?r+"":r,s);import{j as s,H as a,a as i}from"./ui-B-Wa4-hK.js";import{a as o,r as n,L as l,N as c,O as d,c as m,b as p}from"./vendor-CCJAzSvv.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var u=o;e=u.createRoot,u.hydrateRoot;let h,x,y,g={data:""},f=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,b=/\/\*[^]*?\*\/|  +/g,v=/\n+/g,j=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?j(o,i):i+"{"+j(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=j(o,t?t.replace(/([^,])+/g,(e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=j.p?j.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},w={},k=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+k(e[r]);return t}return e};function N(e){let t=this||{},r=e.call?e(t.p):e;return((e,t,r,s,a)=>{let i=k(e),o=w[i]||(w[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!w[o]){let t=i!==e?e:(e=>{let t,r,s=[{}];for(;t=f.exec(e.replace(b,""));)t[4]?s.shift():t[3]?(r=t[3].replace(v," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(v," ").trim();return s[0]})(e);w[o]=j(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let n=r&&w.g?w.g:null;return r&&(w.g=w[o]),l=w[o],c=t,d=s,(m=n)?c.data=c.data.replace(m,l):-1===c.data.indexOf(l)&&(c.data=d?l+c.data:c.data+l),o;var l,c,d,m})(r.unshift?r.raw?((e,t,r)=>e.reduce(((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":j(e,""):!1===e?"":e}return e+s+(null==i?"":i)}),""))(r,[].slice.call(arguments,1),t.p):r.reduce(((e,r)=>Object.assign(e,r&&r.call?r(t.p):r)),{}):r,(s=t.target,"object"==typeof window?((s?s.querySelector("#_goober"):window._goober)||Object.assign((s||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:s||g),t.g,t.o,t.k);var s}N.bind({g:1});let E=N.bind({k:1});function _(e,t){let r=this||{};return function(){let t=arguments;return function s(a,i){let o=Object.assign({},a),n=o.className||s.className;r.p=Object.assign({theme:x&&x()},o),r.o=/ *go\d+/.test(n),o.className=N.apply(r,t)+(n?" "+n:"");let l=e;return e[0]&&(l=o.as||e,delete o.as),y&&l[0]&&y(o),h(l,o)}}}var A=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,S=(()=>{let e=0;return()=>(++e).toString()})(),L=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),O=new Map,P=e=>{if(O.has(e))return;let t=setTimeout((()=>{O.delete(e),I({type:4,toastId:e})}),1e3);O.set(e,t)},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&(e=>{let t=O.get(e);t&&clearTimeout(t)})(t.toast.id),{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:r}=t;return e.toasts.find((e=>e.id===r.id))?C(e,{type:1,toast:r}):C(e,{type:0,toast:r});case 3:let{toastId:s}=t;return s?P(s):e.toasts.forEach((e=>{P(e.id)})),{...e,toasts:e.toasts.map((e=>e.id===s||void 0===s?{...e,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+a})))}}},T=[],z={toasts:[],pausedAt:void 0},I=e=>{z=C(z,e),T.forEach((e=>{e(z)}))},R={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=e=>(t,r)=>{let s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||S()}))(t,e,r);return I({type:2,toast:s}),s.id},$=(e,t)=>D("blank")(e,t);$.error=D("error"),$.success=D("success"),$.loading=D("loading"),$.custom=D("custom"),$.dismiss=e=>{I({type:3,toastId:e})},$.remove=e=>I({type:4,toastId:e}),$.promise=(e,t,r)=>{let s=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then((e=>($.success(A(t.success,e),{id:s,...r,...null==r?void 0:r.success}),e))).catch((e=>{$.error(A(t.error,e),{id:s,...r,...null==r?void 0:r.error})})),e};var M,H,V,F,W=(e,t)=>{I({type:1,toast:{id:e,height:t}})},U=()=>{I({type:5,time:Date.now()})},B=e=>{let{toasts:t,pausedAt:r}=((e={})=>{let[t,r]=n.useState(z);n.useEffect((()=>(T.push(r),()=>{let e=T.indexOf(r);e>-1&&T.splice(e,1)})),[t]);let s=t.toasts.map((t=>{var r,s;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||R[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}}));return{...t,toasts:s}})(e);n.useEffect((()=>{if(r)return;let e=Date.now(),s=t.map((t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(r<0))return setTimeout((()=>$.dismiss(t.id)),r);t.visible&&$.dismiss(t.id)}));return()=>{s.forEach((e=>e&&clearTimeout(e)))}}),[t,r]);let s=n.useCallback((()=>{r&&I({type:6,time:Date.now()})}),[r]),a=n.useCallback(((e,r)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=r||{},o=t.filter((t=>(t.position||i)===(e.position||i)&&t.height)),n=o.findIndex((t=>t.id===e.id)),l=o.filter(((e,t)=>t<n&&e.visible)).length;return o.filter((e=>e.visible)).slice(...s?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+a),0)}),[t]);return{toasts:t,handlers:{updateHeight:W,startPause:U,endPause:s,calculateOffset:a}}},Y=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=E`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=E`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=E`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=_("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,K=E`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,X=E`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ee=_("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,te=_("div")`
  position: absolute;
`,re=_("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,se=E`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=_("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${se} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ie=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?n.createElement(ae,null,t):t:"blank"===r?null:n.createElement(re,null,n.createElement(J,{...s}),"loading"!==r&&n.createElement(te,null,"error"===r?n.createElement(Q,{...s}):n.createElement(ee,{...s})))},oe=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,ne=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,le=_("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ce=_("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,de=n.memo((({toast:e,position:t,style:r,children:s})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=L()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[oe(r),ne(r)];return{animation:t?`${E(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${E(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(ie,{toast:e}),o=n.createElement(ce,{...e.ariaProps},A(e.message,e));return n.createElement(le,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof s?s({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))}));M=n.createElement,j.p=H,h=M,x=V,y=F;var me=({id:e,className:t,style:r,onHeightUpdate:s,children:a})=>{let i=n.useCallback((t=>{if(t){let r=()=>{let r=t.getBoundingClientRect().height;s(e,r)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}}),[e,s]);return n.createElement("div",{ref:i,className:t,style:r},a)},pe=N`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ue=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:a,containerStyle:i,containerClassName:o})=>{let{toasts:l,handlers:c}=B(r);return n.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:o,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((r=>{let i=r.position||t,o=((e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:L()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...a}})(i,c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}));return n.createElement(me,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?pe:"",style:o},"custom"===r.type?A(r.message,r):a?a(r):n.createElement(de,{toast:r,position:i}))})))},he=$;class xe extends n.Component{constructor(){super(...arguments),r(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){}render(){return this.state.hasError?this.props.fallback||s.jsxs("div",{className:"min-h-[400px] flex flex-col items-center justify-center p-4 bg-dark-900 text-gray-200",children:[s.jsx("h2",{className:"text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400",children:"Oops! Something went wrong"}),s.jsx("p",{className:"text-gray-400 text-center mb-4",children:"We're sorry for the inconvenience. Please try refreshing the page."}),s.jsx("button",{onClick:()=>window.location.reload(),className:"px-6 py-2 bg-accent-500 hover:bg-accent-600 transition-colors rounded-lg text-white",children:"Refresh Page"})]}):this.props.children}}const ye={},ge=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),r=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));s=Promise.allSettled(t.map((e=>{if((e=function(e){return"/"+e}(e))in ye)return;ye[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":"modulepreload",t||(a.as="script"),a.crossOrigin="",a.href=e,r&&a.setAttribute("nonce",r),document.head.appendChild(a),t?new Promise(((t,r)=>{a.addEventListener("load",t),a.addEventListener("error",(()=>r(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}function a(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return s.then((t=>{for(const e of t||[])"rejected"===e.status&&a(e.reason);return e().catch(a)}))},fe=n.createContext(void 0);function be({children:e}){const[t,r]=n.useState(""),[a,i]=n.useState(""),o=n.useCallback(((e,t="polite")=>{"assertive"===t?(i(""),setTimeout((()=>i(e)),100)):(r(""),setTimeout((()=>r(e)),100))}),[]);return s.jsxs(fe.Provider,{value:{announce:o},children:[e,s.jsx("div",{role:"status","aria-live":"polite","aria-atomic":"true",className:"sr-only",children:t}),s.jsx("div",{role:"alert","aria-live":"assertive","aria-atomic":"true",className:"sr-only",children:a})]})}function ve(){return s.jsx("a",{href:"#main-content",className:"sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary-600 focus:text-white",children:"Skip to main content"})}function je({type:e,data:t}){const r={"@context":"https://schema.org","@type":e,...t};return s.jsx(a,{children:s.jsx("script",{type:"application/ld+json",children:JSON.stringify(r)})})}const we={name:"Sapphire Lounge",image:"/images/sapphire-lounge.jpg",description:"Premier shisha lounge in Swansea offering premium flavors and a sophisticated atmosphere",address:{"@type":"PostalAddress",streetAddress:"Your Street Address",addressLocality:"Swansea",addressRegion:"Wales",postalCode:"Your Postal Code",addressCountry:"GB"},geo:{"@type":"GeoCoordinates",latitude:"YOUR_LATITUDE",longitude:"YOUR_LONGITUDE"},url:"https://sapphirelounge.com",telephone:"YOUR_PHONE",servesCuisine:"Middle Eastern",priceRange:"££",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],opens:"12:00",closes:"23:00"}]};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ke={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=(e,t)=>{const r=n.forwardRef((({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:o="",children:l,...c},d)=>{return n.createElement("svg",{ref:d,...ke,width:s,height:s,stroke:r,strokeWidth:i?24*Number(a)/Number(s):a,className:["lucide",`lucide-${m=e,m.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim()}`,o].join(" "),...c},[...t.map((([e,t])=>n.createElement(e,t))),...Array.isArray(l)?l:[l]]);var m}));return r.displayName=`${e}`,r},Ee=Ne("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]),_e=Ne("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]),Ae=Ne("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),Se=Ne("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function Le(){const[e,t]=n.useState("desktop");return n.useEffect((()=>{const e=()=>{const e=window.innerWidth,r=/iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);t(e<768?"mobile":e<1024||r?"tablet":"desktop")};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),e}const Oe=()=>{const[e,t]=n.useState(!1);n.useEffect((()=>{const e="vibrate"in navigator,r="Haptics"in window;t(e||r)}),[]);return{triggerHaptic:n.useCallback(((t="select")=>{if(e)try{if("Haptics"in window){const e={select:"light",delete:"medium",increment:"light",decrement:"light"}[t];window.Haptics.impact({style:e})}else"vibrate"in navigator&&navigator.vibrate((e=>{switch(e){case"select":default:return[40];case"delete":return[80,40,80];case"increment":return[25];case"decrement":return[35]}})(t))}catch(r){}}),[e]),hasHaptics:e}},Pe=()=>{const[e,t]=n.useState(!1),r=Le(),{triggerHaptic:a}=Oe();n.useEffect((()=>{"desktop"===r&&t(!1)}),[r]);const i="desktop"===r,o="mobile"===r||"tablet"===r,d=()=>{o&&a(),t(!1)};return s.jsx("nav",{className:"fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800/50",children:s.jsxs("div",{className:"container mx-auto px-4",children:[s.jsxs("div",{className:"flex justify-between items-center h-14 md:h-16",children:[s.jsxs(l,{to:"/",className:"flex items-center gap-3",children:[s.jsx("img",{src:"/images/logo/Sapphire Lounge Circle Logo.png",alt:"Sapphire Logo",className:"h-7 w-7 md:h-8 md:w-8"}),s.jsx("span",{className:"text-lg md:text-xl font-semibold text-white",children:"Sapphire Lounge"})]}),s.jsxs("div",{className:`hidden ${i?"lg:flex":""} items-center space-x-8`,children:[s.jsx(c,{to:"/",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Home"}),s.jsx(c,{to:"/menu",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Menu"}),s.jsx(c,{to:"/reservations",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Reservations"}),s.jsx(c,{to:"/events",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Events"}),s.jsx(c,{to:"/vip-services",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Special Services"}),s.jsx(c,{to:"/loyalty",className:({isActive:e})=>"px-3 py-2 rounded-md text-sm font-medium transition-colors "+(e?"text-white bg-dark-400":"text-gray-300 hover:text-white"),children:"Loyalty"})]}),o&&s.jsxs("button",{onClick:()=>{a(),t(!e)},className:"lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white","aria-expanded":e,"aria-label":"Toggle menu",children:[s.jsx("span",{className:"sr-only",children:"Open main menu"}),e?s.jsx(Se,{className:"h-8 w-8","aria-hidden":"true"}):s.jsx(Ae,{className:"h-8 w-8","aria-hidden":"true"})]})]}),("mobile"===r||"tablet"===r)&&s.jsx("div",{className:"lg:hidden transition-all duration-300 ease-in-out "+(e?"max-h-screen opacity-100 visible":"max-h-0 opacity-0 invisible"),children:s.jsxs("div",{className:"px-2 pt-2 pb-3 space-y-1 bg-black/95",children:[s.jsx(c,{to:"/",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Home"}),s.jsx(c,{to:"/menu",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Menu"}),s.jsx(c,{to:"/reservations",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Reservations"}),s.jsx(c,{to:"/events",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Events"}),s.jsx(c,{to:"/vip-services",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Special Services"}),s.jsx(c,{to:"/loyalty",className:({isActive:e})=>"block px-3 py-2 rounded-md text-base font-medium "+(e?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"),onClick:d,children:"Loyalty"})]})})]})})};function Ce(){const e=()=>s.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:s.jsx("path",{d:"M19.321 5.562a5.122 5.122 0 0 1-.443-.045a5.073 5.073 0 0 1-2.797-1.487a5.044 5.044 0 0 1-1.49-2.797a5.122 5.122 0 0 1-.045-.443H9.934v11.928a2.338 2.338 0 0 1-1.233 2.06a2.338 2.338 0 0 1-2.368-.029a2.338 2.338 0 0 1-.748-3.707a2.338 2.338 0 0 1 3.708.748v-3.437a5.796 5.796 0 0 0-2.342-.486A5.835 5.835 0 0 0 1.116 14.7a5.835 5.835 0 0 0 5.835 5.835a5.835 5.835 0 0 0 5.835-5.835V8.35a8.387 8.387 0 0 0 4.796 1.49V5.562h-0.06z"})});return s.jsx("div",{className:"w-full relative -mx-[50vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black",children:s.jsx("footer",{className:"w-full bg-black text-gray-400 py-4 sm:py-8",children:s.jsxs("div",{className:"max-w-7xl mx-auto px-4 md:px-8",children:[s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-6",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-gray-400 text-sm mb-2 sm:mb-3",children:"Experience luxury and relaxation in the heart of the city."}),s.jsxs("div",{className:"flex space-x-3",children:[s.jsx("a",{href:"#","aria-label":"Facebook",className:"text-gray-400 hover:text-primary-300 transition-colors",children:s.jsx(Ee,{className:"w-5 h-5"})}),s.jsx("a",{href:"#","aria-label":"Instagram",className:"text-gray-400 hover:text-primary-300 transition-colors",children:s.jsx(_e,{className:"w-5 h-5"})}),s.jsx("a",{href:"#","aria-label":"TikTok",className:"text-gray-400 hover:text-primary-300 transition-colors",children:s.jsx(e,{})})]})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-white font-semibold mb-2 sm:mb-4",children:"Quick Links"}),s.jsxs("ul",{className:"space-y-1 sm:space-y-2",children:[s.jsx("li",{children:s.jsx(l,{to:"/about",className:"text-gray-400 hover:text-primary-400 transition-colors",children:"About Us"})}),s.jsx("li",{children:s.jsx(l,{to:"/events",className:"text-gray-400 hover:text-primary-400 transition-colors",children:"Events"})}),s.jsx("li",{children:s.jsx(l,{to:"/vip-services",className:"text-gray-400 hover:text-primary-400 transition-colors",children:"Special Occasions"})})]})]}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-base font-semibold mb-1 sm:mb-2 text-gray-200",children:"Support"}),s.jsxs("ul",{className:"space-y-1 sm:space-y-1.5",children:[s.jsx("li",{children:s.jsx(l,{to:"/faq",className:"text-gray-400 hover:text-primary-300 transition-colors text-sm",children:"FAQ"})}),s.jsx("li",{children:s.jsx(l,{to:"/contact",className:"text-gray-400 hover:text-primary-300 transition-colors text-sm",children:"Contact Us"})}),s.jsx("li",{children:s.jsx(l,{to:"/privacy",className:"text-gray-400 hover:text-primary-300 transition-colors text-sm",children:"Privacy Policy"})}),s.jsx("li",{children:s.jsx(l,{to:"/terms",className:"text-gray-400 hover:text-primary-300 transition-colors text-sm",children:"Terms of Service"})})]})]}),s.jsxs("div",{children:[s.jsx("h2",{className:"text-base font-semibold mb-1 sm:mb-2 text-gray-200",children:"Opening Hours"}),s.jsxs("ul",{className:"space-y-1 sm:space-y-1.5 text-sm text-gray-400",children:[s.jsx("li",{children:"Monday: Closed"}),s.jsx("li",{children:"Tuesday - Sunday: 5PM - 2AM"}),s.jsx("li",{children:"Open Bank Holidays"})]})]})]}),s.jsx("div",{className:"border-t border-accent-700/20 mt-4 sm:mt-6 pt-4 sm:pt-6",children:s.jsxs("p",{className:"text-center text-xs text-gray-400",children:["© ",(new Date).getFullYear()," Sapphire Lounge. All rights reserved."]})})]})})})}const Te=n.memo((function(){return s.jsxs("div",{className:"min-h-screen bg-dark-900 text-white",children:[s.jsx(ve,{}),s.jsx("header",{role:"banner",children:s.jsx(Pe,{})}),s.jsx("main",{id:"main-content",role:"main",tabIndex:-1,className:"min-h-screen outline-none",children:s.jsxs("div",{className:"min-h-screen bg-gradient-to-b from-dark-300 to-dark-400 text-gray-100",children:[s.jsx("div",{className:"fixed inset-0 bg-gradient-radial from-accent-700/20 via-dark-300/50 to-dark-400 pointer-events-none","aria-hidden":"true"}),s.jsx("div",{className:"relative",children:s.jsx(d,{})})]})}),s.jsx("footer",{role:"contentinfo",children:s.jsx(Ce,{})})]})}));Te.displayName="Layout";const ze=n.lazy((()=>ge((()=>import("./Home-D-A-FiGt.js")),__vite__mapDeps([0,1,2,3,4,5])))),Ie=n.lazy((()=>ge((()=>import("./About-BXboItWv.js")),__vite__mapDeps([6,1,2])))),Re=n.lazy((()=>ge((()=>import("./Reservations--B0LY1px.js")),__vite__mapDeps([7,1,2,8,9,3,4,10,5,11])))),De=n.lazy((()=>ge((()=>import("./Menu-i7clK-Fk.js")),__vite__mapDeps([12,1,2,13,5])))),$e=n.lazy((()=>ge((()=>import("./Events-BwBbVZXC.js")),__vite__mapDeps([14,1,2,8,9,3,4,10,5])))),Me=n.lazy((()=>ge((()=>import("./Loyalty-CD3oVCfU.js")),__vite__mapDeps([15,1,2,9,16,10,4])))),He=n.lazy((()=>ge((()=>import("./Contact-C__IIBHe.js")),__vite__mapDeps([17,1,2,10,4,18])))),Ve=n.lazy((()=>ge((()=>import("./FAQ-BRZExr5t.js")),__vite__mapDeps([19,1,2,13])))),Fe=n.lazy((()=>ge((()=>import("./Privacy-BXbAMPji.js")),__vite__mapDeps([20,1,2])))),We=n.lazy((()=>ge((()=>import("./Terms-BaFceVYC.js")),__vite__mapDeps([21,1,2])))),Ue=n.lazy((()=>ge((()=>import("./NotFound-C3GdWUGB.js")),__vite__mapDeps([22,1,2])))),Be=n.lazy((()=>ge((()=>import("./VIPServices-ChtK1og8.js")),__vite__mapDeps([23,1,2,16,3,5])))),Ye=n.memo((()=>s.jsx("div",{className:"min-h-screen flex items-center justify-center",role:"status","aria-label":"Loading content",children:s.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500","aria-hidden":"true"})})));Ye.displayName="LoadingSpinner";const qe=m([{path:"/",element:s.jsx(Te,{}),errorElement:s.jsx(Ue,{}),children:[{index:!0,element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(ze,{})})},{path:"/about",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Ie,{})})},{path:"/reservations",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Re,{})})},{path:"/menu",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(De,{})})},{path:"/events",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx($e,{})})},{path:"/loyalty",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Me,{})})},{path:"/contact",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(He,{})})},{path:"/faq",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Ve,{})})},{path:"/privacy",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Fe,{})})},{path:"/terms",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(We,{})})},{path:"/vip-services",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Be,{})})},{path:"*",element:s.jsx(n.Suspense,{fallback:s.jsx(Ye,{}),children:s.jsx(Ue,{})})}]}],{future:{v7_normalizeFormMethod:!0}});function Ge(){return n.useEffect((()=>{"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/sw.js").catch((e=>{}))})),setTimeout((()=>{ge((()=>import("./Home-D-A-FiGt.js")),__vite__mapDeps([0,1,2,3,4,5])),ge((()=>import("./About-BXboItWv.js")),__vite__mapDeps([6,1,2])),ge((()=>import("./Menu-i7clK-Fk.js")),__vite__mapDeps([12,1,2,13,5])),ge((()=>import("./Contact-C__IIBHe.js")),__vite__mapDeps([17,1,2,10,4,18]))}),2e3)}),[]),s.jsx(xe,{children:s.jsx(i,{children:s.jsx(be,{children:s.jsxs("div",{className:"min-h-screen bg-dark-950 text-white",children:[s.jsx(je,{type:"Restaurant",data:we}),s.jsx(p,{router:qe,fallbackElement:s.jsx(Ye,{})})]})})})})}const Qe=()=>s.jsx("div",{className:"min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4",children:s.jsxs("div",{className:"max-w-md w-full bg-neutral-800 p-6 rounded-lg shadow-lg text-center",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Oops! Something went wrong"}),s.jsx("p",{className:"mb-4",children:"We apologize for the inconvenience. Please try refreshing the page."}),s.jsx("button",{onClick:()=>window.location.reload(),className:"bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors",children:"Refresh Page"})]})});e(document.getElementById("root")).render(s.jsx(n.StrictMode,{children:s.jsx(i,{children:s.jsxs(xe,{fallback:s.jsx(Qe,{}),children:[s.jsx(ue,{position:"top-center"}),s.jsx(Ge,{})]})})}));export{xe as E,Ee as F,_e as I,Se as X,he as _,Oe as a,Ne as c,Le as u};
//# sourceMappingURL=index-CF61LBLh.js.map
