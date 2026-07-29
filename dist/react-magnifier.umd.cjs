!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react/jsx-runtime"),require("react"),require("styled-components")):"function"==typeof define&&define.amd?define(["exports","react/jsx-runtime","react","styled-components"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).ReactMagnifier={},e.ReactJSXRuntime,e.React,e.styled)}(this,function(e,t,i,r){"use strict";var n=Object.defineProperty,o=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,u=(e,t,i)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,m=(e,t)=>{for(var i in t||(t={}))l.call(t,i)&&u(e,i,t[i]);if(s)for(var i of s(t))c.call(t,i)&&u(e,i,t[i]);return e};const d=(e,t)=>{if(t){const i=new CustomEvent(e,{detail:t});t.dispatchEvent(i)}},f=r.createGlobalStyle`
  .react-magnifier-glass {
    position: absolute;
    border: 3px solid #000;
    border-radius: 50%;
    cursor: none;
    height: 100px;
    width: 100px;
    z-index: 999999;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .show-magnifier {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }

  .hide-magnifier {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }
`,g=r.div`
  display: inline-block;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`,h=r.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`,p={imageAltText:"react-magnifier-image",imageWidth:"auto",imageHeight:"auto",magnifierHeight:100,magnifierWidth:100,magnifierRadius:50,magnifierBorderColor:"#000",magnifierBorderStyle:"solid",magnifierBorderWidth:3,magnifierShadow:!0,cursor:"none",zoomSize:2,getMagnifier:()=>{},customImgClass:"",customContainerClass:""},v=i.memo(i.forwardRef(function(e,r){const n=(s=m(m({},p),e),l={customImgClass:e.customImgClass||e.customImgStyles||p.customImgClass,customContainerClass:e.customContainerClass||e.customContainerStyles||p.customContainerClass},o(s,a(l)));var s,l;const c=i.useRef(null),u=i.useRef(null),v=i.useRef(null),y=i.useRef(!1),b=i.useId(),[x,z]=i.useState({width:0,height:0}),[w,S]=i.useState(!1),E=i.useCallback(e=>((e,t)=>{if(!t)return{x:0,y:0};const i=t.getBoundingClientRect();let r=0,n=0;return e instanceof MouseEvent?(r=e.clientX-i.left,n=e.clientY-i.top):e instanceof TouchEvent&&e.touches.length>0&&(r=e.touches[0].clientX-i.left,n=e.touches[0].clientY-i.top),{x:r,y:n}})(e,c.current),[]),C=i.useCallback(e=>{e.preventDefault();const t=v.current,i=c.current,r=u.current;if(!t||!i||!r)return;const o=E(e);let a=o.x,s=o.y;const{width:l,height:m}=x;a>i.width-l/n.zoomSize&&(a=i.width-l/n.zoomSize),a<l/n.zoomSize&&(a=l/n.zoomSize),s>i.height-m/n.zoomSize&&(s=i.height-m/n.zoomSize),s<m/n.zoomSize&&(s=m/n.zoomSize),t.style.left=a-l+"px",t.style.top=s-m+"px";const f=n.magnifierBorderWidth;t.style.backgroundPosition=`-${a*n.zoomSize-l+f}px -${s*n.zoomSize-m+f}px`,d("magnifier-moved",r)},[x,n.zoomSize,n.magnifierBorderWidth,E]),L=i.useCallback(()=>{const e=v.current;e&&(e.classList.remove("hide-magnifier"),e.classList.add("show-magnifier"),S(!0),d("magnifier-visible",u.current))},[]),k=i.useCallback(()=>{const e=v.current;e&&(e.classList.remove("show-magnifier"),e.classList.add("hide-magnifier"),S(!1),d("magnifier-invisible",u.current))},[]),B=i.useCallback(e=>{if(!c.current)return;const{width:t,height:i}=x,r=(parseFloat(e.style.left)||0)+t,o=(parseFloat(e.style.top)||0)+i,a=n.magnifierBorderWidth;e.style.backgroundPosition=`-${r*n.zoomSize-t+a}px -${o*n.zoomSize-i+a}px`},[x,n.zoomSize,n.magnifierBorderWidth]),R=i.useCallback(e=>{if(!w||!v.current||!c.current)return;const t=v.current,i=c.current,r=i.width-x.width/n.zoomSize,o=i.height-x.height/n.zoomSize;let a=!1;switch(e.key){case"ArrowUp":{e.preventDefault();const i=parseFloat(t.style.top)||0;t.style.top=`${Math.max(0,Math.min(o,i-10))}px`,a=!0;break}case"ArrowDown":{e.preventDefault();const i=parseFloat(t.style.top)||0;t.style.top=`${Math.max(0,Math.min(o,i+10))}px`,a=!0;break}case"ArrowLeft":{e.preventDefault();const i=parseFloat(t.style.left)||0;t.style.left=`${Math.max(0,Math.min(r,i-10))}px`,a=!0;break}case"ArrowRight":{e.preventDefault();const i=parseFloat(t.style.left)||0;t.style.left=`${Math.max(0,Math.min(r,i+10))}px`,a=!0;break}case"Escape":e.preventDefault(),k(),a=!0}a&&"Escape"!==e.key&&(B(t),d("magnifier-moved",u.current))},[w,k,B,x,n.zoomSize]);i.useEffect(()=>{const e=c.current,t=u.current;if(o=n.imageUrl,!Boolean(o&&o.length>0))return i="Image url is missing! <ReactMagnifier imageUrl={url}/> is required.",console.warn(`%c ReactMagnifier Error: ${i}`,"background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;"),y.current=!1,void(v.current&&(v.current.remove(),v.current=null));var i,o;if(y.current&&v.current&&v.current.isConnected)return;if(!e||!t)return;v.current&&(v.current.remove(),v.current=null);const a=((e,t,i)=>{if(!e||!t)return null;const r=document.createElement("div");return r.setAttribute("class","react-magnifier-glass"),r.setAttribute("role","img"),r.setAttribute("aria-label","Image magnifier"),r.classList.add("hide-magnifier"),r.style.width=`${i.magnifierWidth}px`,r.style.height=`${i.magnifierHeight}px`,r.style.borderRadius=`${i.magnifierRadius}%`,r.style.border=`${i.magnifierBorderWidth}px ${i.magnifierBorderStyle} ${i.magnifierBorderColor}`,r.style.cursor=i.cursor,r.style.boxShadow=i.magnifierShadow?"0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)":"none",r.style.backgroundImage=`url('${t.src}')`,r.style.backgroundRepeat="no-repeat",r.style.backgroundSize=`${t.width*i.zoomSize}px ${t.height*i.zoomSize}px`,e.insertBefore(r,t),r})(t,e,{magnifierWidth:n.magnifierWidth,magnifierHeight:n.magnifierHeight,magnifierRadius:n.magnifierRadius,magnifierBorderWidth:n.magnifierBorderWidth,magnifierBorderStyle:n.magnifierBorderStyle,magnifierBorderColor:n.magnifierBorderColor,magnifierShadow:n.magnifierShadow,cursor:n.cursor,zoomSize:n.zoomSize});if(!a)return;v.current=a,y.current=!0;const s=a.offsetWidth/2,l=a.offsetHeight/2;return z({width:s,height:l}),n.getMagnifier(t),r&&("function"==typeof r?r(t):r.current=t),d("magnifier-initialized",t),()=>{v.current&&(v.current.remove(),v.current=null),y.current=!1,r&&("function"==typeof r?r(null):r.current=null)}},[n.imageUrl]),i.useEffect(()=>{const e=v.current,t=c.current,i=u.current;if(e&&t&&i)return e.addEventListener("mousemove",C),e.addEventListener("touchmove",C),t.addEventListener("mousemove",C),t.addEventListener("touchmove",C),i.addEventListener("mouseenter",L),i.addEventListener("mouseleave",k),i.addEventListener("focusin",L),i.addEventListener("focusout",k),window.addEventListener("keydown",R),()=>{e.removeEventListener("mousemove",C),e.removeEventListener("touchmove",C),t.removeEventListener("mousemove",C),t.removeEventListener("touchmove",C),i.removeEventListener("mouseenter",L),i.removeEventListener("mouseleave",k),i.removeEventListener("focusin",L),i.removeEventListener("focusout",k),window.removeEventListener("keydown",R)}},[C,L,k,R]);const M=["react-magnifier-image-container",n.customContainerClass].filter(Boolean).join(" ");return t.jsxs(t.Fragment,{children:[t.jsx(f,{}),t.jsxs(g,{className:M,ref:u,role:"group","aria-label":"Image magnifier",tabIndex:0,children:[t.jsx("img",{ref:c,className:n.customImgClass||void 0,src:n.imageUrl,width:n.imageWidth,height:n.imageHeight,alt:n.imageAltText,role:"img","aria-describedby":b}),w&&t.jsx(h,{id:b,role:"status","aria-live":"polite",children:"Magnifier active. Use arrow keys to navigate, Escape to close."})]})]})}));v.displayName="ReactMagnifier",e.ReactMagnifier=v,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=react-magnifier.umd.cjs.map
