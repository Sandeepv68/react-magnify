!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react/jsx-runtime"),require("react"),require("styled-components")):"function"==typeof define&&define.amd?define(["exports","react/jsx-runtime","react","styled-components"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).ReactMagnifier={},e.ReactJSXRuntime,e.React,e.styled)}(this,function(e,t,i,r){"use strict";var n=Object.defineProperty,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,l=(e,t,i)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,c=(e,t)=>{for(var i in t||(t={}))a.call(t,i)&&l(e,i,t[i]);if(o)for(var i of o(t))s.call(t,i)&&l(e,i,t[i]);return e};const u=(e,t)=>{if(t){const i=new CustomEvent(e,{detail:t});t.dispatchEvent(i)}},m=r.createGlobalStyle`
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
`,d=r.div`
  display: inline-block;
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`,f=r.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`,g={imageUrl:"",imageAltText:"react-magnifier-image",imageWidth:"auto",imageHeight:"auto",magnifierHeight:100,magnifierWidth:100,magnifierRadius:50,magnifierBorderColor:"#000",magnifierBorderStyle:"solid",magnifierBorderWidth:3,magnifierShadow:!0,cursor:"none",zoomSize:2,getMagnifier:()=>{},customImgStyles:"",customContainerStyles:""},p=i.memo(function(e={}){const r=i.useMemo(()=>c(c({},g),e),[e]),n=i.useRef(null),o=i.useRef(null),a=i.useRef(null),s=i.useRef(!1),[l,p]=i.useState({width:0,height:0}),[h,v]=i.useState(!1),y=i.useCallback(e=>((e,t)=>{if(!t)return{x:0,y:0};const i=t.getBoundingClientRect();let r=0,n=0;return e instanceof MouseEvent?(r=e.pageX-i.left,n=e.pageY-i.top):e instanceof TouchEvent&&e.touches.length>0&&(r=e.touches[0].pageX-i.left,n=e.touches[0].pageY-i.top),r-=window.pageXOffset,n-=window.pageYOffset,{x:r,y:n}})(e,n.current),[]),b=i.useCallback(e=>{e.preventDefault();const t=a.current,i=n.current,s=o.current;if(!t||!i||!s)return;const c=y(e);let m=c.x,d=c.y;const{width:f,height:g}=l;m>i.width-f/r.zoomSize&&(m=i.width-f/r.zoomSize),m<f/r.zoomSize&&(m=f/r.zoomSize),d>i.height-g/r.zoomSize&&(d=i.height-g/r.zoomSize),d<g/r.zoomSize&&(d=g/r.zoomSize),t.style.left=m-f+"px",t.style.top=d-g+"px",t.style.backgroundPosition=`-${m*r.zoomSize-f+3}px -${d*r.zoomSize-g+3}px`,u("magnifier-moved",s)},[l,r.zoomSize,y]),x=i.useCallback(()=>{const e=a.current;e&&(e.classList.remove("hide-magnifier"),e.classList.add("show-magnifier"),v(!0),u("magnifier-visible",o.current))},[]),w=i.useCallback(()=>{const e=a.current;e&&(e.classList.remove("show-magnifier"),e.classList.add("hide-magnifier"),v(!1),u("magnifier-invisible",o.current))},[]),z=i.useCallback(e=>{if(!n.current)return;const{width:t,height:i}=l,o=(parseFloat(e.style.left)||0)+t,a=(parseFloat(e.style.top)||0)+i;e.style.backgroundPosition=`-${o*r.zoomSize-t+3}px -${a*r.zoomSize-i+3}px`},[l,r.zoomSize]),S=i.useCallback(e=>{if(!h||!a.current||!n.current)return;const t=a.current;let i=!1;switch(e.key){case"ArrowUp":{e.preventDefault();const r=parseFloat(t.style.top)||0;t.style.top=`${Math.max(0,r-10)}px`,i=!0;break}case"ArrowDown":{e.preventDefault();const r=parseFloat(t.style.top)||0;t.style.top=`${r+10}px`,i=!0;break}case"ArrowLeft":{e.preventDefault();const r=parseFloat(t.style.left)||0;t.style.left=`${Math.max(0,r-10)}px`,i=!0;break}case"ArrowRight":{e.preventDefault();const r=parseFloat(t.style.left)||0;t.style.left=`${r+10}px`,i=!0;break}case"Escape":e.preventDefault(),w(),i=!0}i&&"Escape"!==e.key&&(z(t),u("magnifier-moved",o.current))},[h,w,z]);return i.useEffect(()=>{const e=n.current,t=o.current;if(l=r.imageUrl,!Boolean(l&&l.length>0))return i="Image url is missing! <ReactMagnifier imageUrl={url}/> is required.",console.warn(`%c ReactMagnifier Error: ${i}`,"background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;"),s.current=!1,void(a.current&&(a.current.remove(),a.current=null));var i,l;if(s.current&&a.current&&a.current.isConnected)return;if(!e||!t)return;a.current&&(a.current.remove(),a.current=null);const c=((e,t,i)=>{if(!e||!t)return null;const r=document.createElement("div");return r.setAttribute("class","react-magnifier-glass"),r.setAttribute("role","img"),r.setAttribute("aria-label","Image magnifier"),r.classList.add("hide-magnifier"),r.style.width=`${i.magnifierWidth}px`,r.style.height=`${i.magnifierHeight}px`,r.style.borderRadius=`${i.magnifierRadius}%`,r.style.border=`${i.magnifierBorderWidth}px ${i.magnifierBorderStyle} ${i.magnifierBorderColor}`,r.style.cursor=i.cursor,r.style.boxShadow=i.magnifierShadow?"0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)":"none",r.style.backgroundImage=`url('${t.src}')`,r.style.backgroundRepeat="no-repeat",r.style.backgroundSize=`${t.width*i.zoomSize}px ${t.height*i.zoomSize}px`,e.insertBefore(r,t),r})(t,e,{magnifierWidth:r.magnifierWidth,magnifierHeight:r.magnifierHeight,magnifierRadius:r.magnifierRadius,magnifierBorderWidth:r.magnifierBorderWidth,magnifierBorderStyle:r.magnifierBorderStyle,magnifierBorderColor:r.magnifierBorderColor,magnifierShadow:r.magnifierShadow,cursor:r.cursor,zoomSize:r.zoomSize});if(!c)return;a.current=c,s.current=!0;const m=c.offsetWidth/2,d=c.offsetHeight/2;return p({width:m,height:d}),r.getMagnifier(t),u("magnifier-initialized",t),()=>{a.current&&(a.current.remove(),a.current=null),s.current=!1}},[r.imageUrl]),i.useEffect(()=>{const e=a.current,t=n.current,i=o.current;if(e&&t&&i)return e.addEventListener("mousemove",b),e.addEventListener("touchmove",b),t.addEventListener("mousemove",b),t.addEventListener("touchmove",b),i.addEventListener("mouseenter",x),i.addEventListener("mouseleave",w),i.addEventListener("focusin",x),i.addEventListener("focusout",w),window.addEventListener("keydown",S),()=>{e&&(e.removeEventListener("mousemove",b),e.removeEventListener("touchmove",b)),t&&(t.removeEventListener("mousemove",b),t.removeEventListener("touchmove",b)),i&&(i.removeEventListener("mouseenter",x),i.removeEventListener("mouseleave",w),i.removeEventListener("focusin",x),i.removeEventListener("focusout",w)),window.removeEventListener("keydown",S)}},[b,x,w,S]),t.jsxs(t.Fragment,{children:[t.jsx(m,{}),t.jsxs(d,{className:"react-magnifier-image-container"+(r.customContainerStyles?` ${r.customContainerStyles}`:""),ref:o,role:"group","aria-label":"Image magnifier",tabIndex:0,children:[t.jsx("img",{ref:n,className:r.customImgStyles,src:r.imageUrl,width:r.imageWidth,height:r.imageHeight,alt:r.imageAltText,role:"img","aria-describedby":"magnifier-help"}),h&&t.jsx(f,{id:"magnifier-help",role:"status","aria-live":"polite",children:"Magnifier active. Use arrow keys to navigate, Escape to close."})]})]})});p.displayName="ReactMagnifier",e.ReactMagnifier=p,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=react-magnifier.umd.cjs.map
