import{s as b,y as m,j as h,f as d,m as k,e as g,c as y,w as v,h as $,n as u,p as j,u as w,q as A,r as C}from"./scheduler.BNDlRAw_.js";import{S as M,i as S,g as q,a as f,e as H,t as _}from"./index.DcAR09LG.js";import{u as L}from"./firebase.BUt1Xfaa.js";function N(o){let e,n='<h1>You must be signed in to view this page</h1> <a class="btn btn-primary" href="/login">Sign in</a>';return{c(){e=g("main"),e.innerHTML=n,this.h()},l(t){e=y(t,"MAIN",{class:!0,"data-svelte-h":!0}),v(e)!=="svelte-rjc12x"&&(e.innerHTML=n),this.h()},h(){$(e,"class","flex h-screen w-full flex-col items-center justify-center gap-4 self-center")},m(t,s){h(t,e,s)},p:u,i:u,o:u,d(t){t&&d(e)}}}function T(o){let e;const n=o[2].default,t=j(n,o,o[1],null);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,a){t&&t.m(s,a),e=!0},p(s,a){t&&t.p&&(!e||a&2)&&w(t,n,s,s[1],e?C(n,s[1],a,null):A(s[1]),null)},i(s){e||(_(t,s),e=!0)},o(s){f(t,s),e=!1},d(s){t&&t.d(s)}}}function I(o){let e,n,t,s;const a=[T,N],r=[];function p(l,i){return l[0]?0:1}return e=p(o),n=r[e]=a[e](o),{c(){n.c(),t=m()},l(l){n.l(l),t=m()},m(l,i){r[e].m(l,i),h(l,t,i),s=!0},p(l,[i]){let c=e;e=p(l),e===c?r[e].p(l,i):(q(),f(r[c],1,1,()=>{r[c]=null}),H(),n=r[e],n?n.p(l,i):(n=r[e]=a[e](l),n.c()),_(n,1),n.m(t.parentNode,t))},i(l){s||(_(n),s=!0)},o(l){f(n),s=!1},d(l){l&&d(t),r[e].d(l)}}}function Y(o,e,n){let t;k(o,L,r=>n(0,t=r));let{$$slots:s={},$$scope:a}=e;return o.$$set=r=>{"$$scope"in r&&n(1,a=r.$$scope)},[t,a,s]}class D extends M{constructor(e){super(),S(this,e,Y,I,b,{})}}export{D as A};