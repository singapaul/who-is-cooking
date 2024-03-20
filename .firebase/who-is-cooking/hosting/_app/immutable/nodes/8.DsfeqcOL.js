import{d as ge,a as be,k as Te,j as ke,r as qe,i as Ne,g as je,s as Be,h as De}from"../chunks/firebase.BXW4q-2E.js";import{s as Me,k as ie,I as Fe,e as p,a as U,t as ce,c as m,b as E,g as k,d as fe,f as u,v as ve,o as i,J as Ee,y as Ce,i as K,h as c,w as _e,B as Oe,K as Ge,r as He,j as Ae}from"../chunks/scheduler.CxO4csHG.js";import{S as ze,i as Je,c as x,b as ee,m as te,t as ae,a as se,d as le,j as Ke}from"../chunks/index.BqBZE8_s.js";import{c as Qe,F as We,a as Xe,T as Ye,C as Ze}from"../chunks/CurrencyInput.DRDzj19Z.js";import{A as xe}from"../chunks/AuthCheck.CwOMPwgQ.js";import{p as et}from"../chunks/stores.BBkUZuCL.js";import{g as tt}from"../chunks/entry.vAAbogbC.js";const at=async({params:a})=>{let e;const s=ge(be,"meals",a.dish),l=await Te(s);l.exists()?e=l.data():console.log("No such document!");const{chef:t,cost:r,createdAt:h,dish:$,likedBy:L,photoURL:R,postedById:C,recipe:M}=e;return{chef:t,cost:r,createdAt:h,dish:$,likedBy:L,photoURL:R,postedById:C,recipe:M}},mt=Object.freeze(Object.defineProperty({__proto__:null,load:at},Symbol.toStringTag,{value:"Module"}));function Se(a){let e,s=a[5].cost+"",l;return{c(){e=p("small"),l=ce(s)},l(t){e=m(t,"SMALL",{});var r=E(e);l=fe(r,s),r.forEach(u)},m(t,r){K(t,e,r),c(e,l)},p(t,r){r&32&&s!==(s=t[5].cost+"")&&Ae(l,s)},d(t){t&&u(e)}}}function Ie(a){let e,s=a[5].photoURL+"",l;return{c(){e=p("small"),l=ce(s)},l(t){e=m(t,"SMALL",{});var r=E(e);l=fe(r,s),r.forEach(u)},m(t,r){K(t,e,r),c(e,l)},p(t,r){r&32&&s!==(s=t[5].photoURL+"")&&Ae(l,s)},d(t){t&&u(e)}}}function Pe(a){let e,s="Uploading...",l,t;return{c(){e=p("p"),e.textContent=s,l=U(),t=p("progress"),this.h()},l(r){e=m(r,"P",{"data-svelte-h":!0}),ve(e)!=="svelte-be0b5h"&&(e.textContent=s),l=k(r),t=m(r,"PROGRESS",{class:!0}),E(t).forEach(u),this.h()},h(){i(t,"class","progress progress-info mt-6 w-56")},m(r,h){K(r,e,h),K(r,l,h),K(r,t,h)},d(r){r&&(u(e),u(l),u(t))}}}function st(a){let e,s,l,t,r,h,$,L,R,C,M="Meal cost (£)",Q,W,S,G,T,y,X,H,Y,d,w,n,_,I,F,P,re='<span class="label-text">Pick a file</span>',z,V,ue,pe,q,N,$e="submit",me,j,he,ne,O,de,Le;s=new We({props:{fieldName:"dish",label:"Dish name",bindValue:a[4].dish,handleChange:a[9],errors:a[5].dish}}),t=new Xe({props:{fieldName:"chef",label:"Chef",bindValue:a[4].chef,handleChange:a[9],errors:a[5].chef}}),h=new Ye({props:{fieldName:"recipe",label:"Recipe",bindValue:a[4].recipe,handleChange:a[9],errors:a[5].recipe}});let g=a[5].cost&&Se(a);function Ve(o){a[12](o)}let Re={currency:"GBP",name:"cost"};a[4].cost!==void 0&&(Re.value=a[4].cost),y=new Ze({props:Re}),Fe.push(()=>Ke(y,"value",Ve)),y.$on("change",a[9]);let b=a[5].photoURL&&Ie(a),v=a[2]&&Pe();return{c(){e=p("form"),x(s.$$.fragment),l=U(),x(t.$$.fragment),r=U(),x(h.$$.fragment),$=U(),L=p("label"),R=p("div"),C=p("span"),Q=ce(M),W=U(),S=p("span"),g&&g.c(),G=U(),T=p("div"),x(y.$$.fragment),Y=U(),d=p("div"),w=p("img"),_=U(),I=p("span"),b&&b.c(),F=U(),P=p("label"),P.innerHTML=re,z=U(),V=p("input"),ue=U(),v&&v.c(),pe=U(),q=p("div"),N=p("button"),N.textContent=$e,me=U(),j=p("a"),he=ce("back"),this.h()},l(o){e=m(o,"FORM",{class:!0});var f=E(e);ee(s.$$.fragment,f),l=k(f),ee(t.$$.fragment,f),r=k(f),ee(h.$$.fragment,f),$=k(f),L=m(f,"LABEL",{class:!0,for:!0});var B=E(L);R=m(B,"DIV",{class:!0});var D=E(R);C=m(D,"SPAN",{class:!0});var J=E(C);Q=fe(J,M),J.forEach(u),W=k(D),S=m(D,"SPAN",{class:!0});var Z=E(S);g&&g.l(Z),Z.forEach(u),D.forEach(u),G=k(B),T=m(B,"DIV",{class:!0});var ye=E(T);ee(y.$$.fragment,ye),ye.forEach(u),B.forEach(u),Y=k(f),d=m(f,"DIV",{class:!0});var A=E(d);w=m(A,"IMG",{src:!0,alt:!0,width:!0,height:!0,class:!0}),_=k(A),I=m(A,"SPAN",{class:!0});var we=E(I);b&&b.l(we),we.forEach(u),F=k(A),P=m(A,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),ve(P)!=="svelte-qouqa7"&&(P.innerHTML=re),z=k(A),V=m(A,"INPUT",{name:!0,type:!0,class:!0,accept:!0}),ue=k(A),v&&v.l(A),A.forEach(u),pe=k(f),q=m(f,"DIV",{class:!0});var oe=E(q);N=m(oe,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),ve(N)!=="svelte-5uxpl7"&&(N.textContent=$e),me=k(oe),j=m(oe,"A",{href:!0,class:!0});var Ue=E(j);he=fe(Ue,"back"),Ue.forEach(u),oe.forEach(u),f.forEach(u),this.h()},h(){i(C,"class","font-bold"),i(S,"class","label-text"),i(R,"class","label"),i(T,"class",H=Ee(`my-currency-input ${a[5].cost&&"my-currency-input-error"}`)+" svelte-kqxn9h"),i(L,"class","form-control"),i(L,"for","cost"),Ce(w.src,n=a[1]??a[0].photoURL??"/default-meal.webp")||i(w,"src",n),i(w,"alt","photoURL"),i(w,"width","256"),i(w,"height","256"),i(w,"class","mx-auto max-h-52 object-scale-down"),i(I,"class","label-text"),i(P,"for","photoURL"),i(P,"class","label"),i(V,"name","photoURL"),i(V,"type","file"),i(V,"class","file-input file-input-bordered w-full max-w-xs"),i(V,"accept","image/png, image/jpeg, image/gif, image/webp"),i(d,"class","form-control mx-auto my-10 w-full max-w-xs text-center"),i(N,"type","submit"),i(N,"class","btn btn-primary"),i(j,"href",ne=`/feed/${a[3].params.dish}`),i(j,"class","btn btn-accent"),i(q,"class","flex flex-col gap-5"),i(e,"class","m-auto flex max-w-96 flex-col py-9")},m(o,f){K(o,e,f),te(s,e,null),c(e,l),te(t,e,null),c(e,r),te(h,e,null),c(e,$),c(e,L),c(L,R),c(R,C),c(C,Q),c(R,W),c(R,S),g&&g.m(S,null),c(L,G),c(L,T),te(y,T,null),c(e,Y),c(e,d),c(d,w),c(d,_),c(d,I),b&&b.m(I,null),c(d,F),c(d,P),c(d,z),c(d,V),c(d,ue),v&&v.m(d,null),c(e,pe),c(e,q),c(q,N),c(q,me),c(q,j),c(j,he),O=!0,de||(Le=[_e(V,"change",a[6]),_e(V,"change",a[13]),_e(e,"submit",Oe(a[10]))],de=!0)},p(o,f){const B={};f&16&&(B.bindValue=o[4].dish),f&32&&(B.errors=o[5].dish),s.$set(B);const D={};f&16&&(D.bindValue=o[4].chef),f&32&&(D.errors=o[5].chef),t.$set(D);const J={};f&16&&(J.bindValue=o[4].recipe),f&32&&(J.errors=o[5].recipe),h.$set(J),o[5].cost?g?g.p(o,f):(g=Se(o),g.c(),g.m(S,null)):g&&(g.d(1),g=null);const Z={};!X&&f&16&&(X=!0,Z.value=o[4].cost,Ge(()=>X=!1)),y.$set(Z),(!O||f&32&&H!==(H=Ee(`my-currency-input ${o[5].cost&&"my-currency-input-error"}`)+" svelte-kqxn9h"))&&i(T,"class",H),(!O||f&3&&!Ce(w.src,n=o[1]??o[0].photoURL??"/default-meal.webp"))&&i(w,"src",n),o[5].photoURL?b?b.p(o,f):(b=Ie(o),b.c(),b.m(I,null)):b&&(b.d(1),b=null),o[2]?v||(v=Pe(),v.c(),v.m(d,null)):v&&(v.d(1),v=null),(!O||f&8&&ne!==(ne=`/feed/${o[3].params.dish}`))&&i(j,"href",ne)},i(o){O||(ae(s.$$.fragment,o),ae(t.$$.fragment,o),ae(h.$$.fragment,o),ae(y.$$.fragment,o),O=!0)},o(o){se(s.$$.fragment,o),se(t.$$.fragment,o),se(h.$$.fragment,o),se(y.$$.fragment,o),O=!1},d(o){o&&u(e),le(s),le(t),le(h),g&&g.d(),le(y),b&&b.d(),v&&v.d(),de=!1,He(Le)}}}function lt(a){let e,s;return e=new xe({props:{$$slots:{default:[st]},$$scope:{ctx:a}}}),{c(){x(e.$$.fragment)},l(l){ee(e.$$.fragment,l)},m(l,t){te(e,l,t),s=!0},p(l,[t]){const r={};t&2097215&&(r.$$scope={dirty:t,ctx:l}),e.$set(r)},i(l){s||(ae(e.$$.fragment,l),s=!0)},o(l){se(e.$$.fragment,l),s=!1},d(l){le(e,l)}}}function rt(a,e,s){let l,t,r,h;ie(a,et,n=>s(3,l=n)),ie(a,je,n=>s(11,r=n));let{data:$}=e;console.log(l);let L,R=!1,C,M=!1;async function Q(n){y(n),W(n)}async function W(n){y(n);const _=n.target.files[0];s(1,L=URL.createObjectURL(_)),C=_}const{form:S,errors:G,state:T,handleChange:y,handleSubmit:X}=Qe({initialValues:{dish:$.dish,chef:$.chef,cost:$.cost,recipe:$.recipe,photoURL:$.photoURL},validate:n=>{let _={};return n.dish===""&&(_.dish="dish is required"),n.chef===""&&(_.chef="chef is required"),n.recipe===""&&(_.recipe="Please enter a recipe or link"),(n.cost<=9||n.cost>=99)&&(_.cost="Please enter a valid price"),n.photoURL||(_.photoURL="Please attach a photo"),_},onSubmit:n=>{H(t)}});ie(a,S,n=>s(4,t=n)),ie(a,G,n=>s(5,h=n));async function H(n){const{chef:_,cost:I,dish:F,photoURL:P,recipe:re}=n;P!==$.photoURL&&(M=!0);try{await ke(ge(be,"meals",l.params.dish),{chef:_,cost:I,dish:F,photoURL:P,recipe:re}),M&&Y({docRef:l.params.dish})}catch(z){console.error("Error adding document: ",z),console.log(z)}tt("/feed")}async function Y({docRef:n}){s(2,R=!0);const _=qe(Be,`meals/${n}.png`),I=C&&await De(_,C),F=await Ne(I.ref);await ke(ge(be,"meals",n),{photoURL:F}),s(2,R=!1)}function d(n){a.$$.not_equal(t.cost,n)&&(t.cost=n,S.set(t))}function w(){t.photoURL=this.value,S.set(t)}return a.$$set=n=>{"data"in n&&s(0,$=n.data)},a.$$.update=()=>{a.$$.dirty&2048&&`${r==null?void 0:r.username}`},[$,L,R,l,t,h,Q,S,G,y,X,r,d,w]}class ht extends ze{constructor(e){super(),Je(this,e,rt,lt,Me,{data:0})}}export{ht as component,mt as universal};
