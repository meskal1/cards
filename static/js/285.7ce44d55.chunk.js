"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[285],{7942:function(e,r,n){n.d(r,{J:function(){return f}});var t=n(1087),a=n(3294),i=n(7406),s=n(4122),o=n(5582),u=n(395),c="BackToPacks_backToPacks__linkPacks__ez79f",l=n(184),f=function(){var e=(0,u.JU)(),r=(0,s.C)((function(e){return e.packs.queryParams})),n="/profile"===e.pathname?"":"?"+(0,o.u)(r,i.F7);return(0,l.jsx)(t.rU,{className:c,to:a.m.PACKS+n,children:"Packs"})}},5680:function(e,r,n){n.d(r,{t:function(){return c}});var t=n(1413),a=n(5987),i=n(9417),s="CustomInput_input__4vgJw",o=n(184),u=["className","helperText"],c=function(e){var r=e.className,n=e.helperText,c=(0,a.Z)(e,u),l="".concat(s," ").concat(r||""),f=n||" ";return(0,o.jsx)(i.Z,(0,t.Z)((0,t.Z)({className:l,variant:c.variant||"standard",type:c.type||"text",fullWidth:c.fullWidth||!0},c),{},{helperText:f}))}},285:function(e,r,n){n.r(r),n.d(r,{Profile:function(){return I}});var t=n(4165),a=n(5861),i=n(2791),s=n(4855),o=n(4657),u=n(7942),c=n(1607),l=n(885),f=n(4122),m=n(5680),d="EditableSpan_inputContainer__iMl27",p="EditableSpan_sendButton__jZgQo",_="EditableSpan_userName__kgfOm",h="EditableSpan_marker__jy8nl",g="EditableSpan_errorButton__JDJG1",v=n(184),x=(0,i.memo)((function(e){var r=e.changeName,n=(0,f.C)((function(e){return e.profile.userData.name})),t=(0,i.useState)(n||""),a=(0,l.Z)(t,2),s=a[0],o=a[1],u=(0,i.useState)(!1),c=(0,l.Z)(u,2),x=c[0],j=c[1],k=(0,i.useState)(!1),y=(0,l.Z)(k,2),P=y[0],w=y[1],N=(0,i.useState)(""),b=(0,l.Z)(N,2),Z=b[0],C=b[1],q=function(e){if(null===e||void 0===e||e.preventDefault(),""===s.trim()||s.length>50)return w(!0),void C(g);j(!1),s.trim()!==n&&r(s.trim())},E=function(){o(n||""),j(!1),w(!1)};return(0,v.jsx)(v.Fragment,{children:x?(0,v.jsxs)("div",{className:d,children:[(0,v.jsx)(m.t,{value:s,onBlur:E,onKeyDown:function(e){"Enter"===e.key&&q(),"Escape"===e.key&&E()},onChange:function(e){""!==e.currentTarget.value.trim()&&w(!1),o(e.currentTarget.value)},autoFocus:!0,autoComplete:"new-password",error:P||s.length>50,helperText:s.length>50?"Name should be less then 50 characters":"",InputProps:{inputProps:{style:{textAlign:"center"}}}}),(0,v.jsx)("div",{className:"".concat(p," ").concat(Z),onMouseDown:q,onClick:function(){P&&C(g)},onAnimationEnd:function(){return C("")}})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{className:_,children:n}),(0,v.jsx)("div",{className:h,onClick:function(){o(s.trim()),j(!0)}})]})})})),j=n(4472),k=n(6732),y=n(3263),P=n(7406),w="Profile_profileContainer__TQBsh",N="Profile_profile__content__ysyQW",b="Profile_profile__title__YLrQj",Z="Profile_profile__avatarBlock__HYY4r",C="Profile_profile__pic__749ru",q="Profile_profile__img__dyT94",E="Profile_profile__avatarIcon__APPKr",T="Profile_profile__userName__7xtU4",R="Profile_profile__userEmail__UFRFm",S="Profile_profile__button__6m94J",z="Profile_profile__buttonIcon__gSWb9",F=n(1720),I=function(){var e=(0,f.T)(),r=(0,f.C)((function(e){return e.profile.userData.email})),n=(0,f.C)((function(e){return e.profile.userData.avatar})),l=(0,i.useCallback)((function(r){e((0,F.GN)({name:r}))}),[e]),m=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(n){var a,i,o;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.target.files){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,(0,j.f)(n);case 4:a=r.sent,i={size:n.target.files[0].size||0,type:n.target.files[0].type||"",isImageExist:!!a},o=(0,k.ap)(i).deckCover,e(o?(0,s._f)({messageText:o,messageType:"error"}):(0,F.GN)({avatar:a}));case 8:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return(0,i.useEffect)((function(){return function(){e((0,P.zc)())}}),[]),(0,v.jsxs)("div",{className:w,children:[(0,v.jsx)(u.J,{}),(0,v.jsxs)("div",{className:N,children:[(0,v.jsx)("h2",{className:b,children:"Personal information"}),(0,v.jsxs)("div",{className:Z,children:[(0,v.jsx)("div",{className:C,children:(0,v.jsx)("img",{className:q,src:n||o,alt:"avatar"})}),(0,v.jsxs)("label",{children:[(0,v.jsx)("input",{type:"file",onChange:m,style:{display:"none"},accept:"image/*"}),(0,v.jsx)("div",{className:E})]})]}),(0,v.jsx)("div",{className:T,children:(0,v.jsx)(x,{changeName:l})}),(0,v.jsx)("p",{className:R,children:r}),(0,v.jsx)(c.o,{className:S,onClick:function(){return e((0,y.$d)())},children:(0,v.jsx)("p",{className:z,children:"Log out"})})]})]})}},4472:function(e,r,n){n.d(r,{f:function(){return i}});var t=n(4165),a=n(5861),i=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(r){var n,a,i;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((n=r.target.files||r.dataTransfer.files)&&n.length&&n[0].size<1e5&&n[0].type.includes("image"))){e.next=8;break}return(a=new FileReader).readAsDataURL(n[0]),e.next=6,new Promise((function(e,r){a.onload=function(){return e(a.result)},a.onerror=function(e){return r(e)}}));case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()},6732:function(e,r,n){n.d(r,{Fm:function(){return h},M8:function(){return g},_E:function(){return _},ap:function(){return x},nv:function(){return d},tA:function(){return p},uj:function(){return v}});var t=n(7103),a=t.Z_().required("Required"),i=a,s=t.Z_().email("Enter a valid email").required("Email is required"),o=t.Z_().min(8,"Password must contain at least 8 characters").required("Enter your password"),u=t.Z_().oneOf([t.iH("password")],"Password does not match").required("Confirm your password"),c=t.O7(),l=t.Z_().max(100,"Question should be less then 100 characters").required("Question is required"),f=t.Z_().max(100,"Answer should be less then 100 characters").required("Answer is required"),m=t.Z_().max(100,"Name should be less then 100 characters").required("Pack name is required"),d=t.Ry({email:s,password:o,rememberMe:c}),p=t.Ry({email:s,password:o,confirmPassword:u}),_=(t.Ry({name:a,avatar:i}),t.Ry({password:o})),h=t.Ry({email:s}),g=t.Ry({question:l,answer:f}),v=t.Ry({name:m}),x=function(e){var r={};return!e.selectedItem||e.size||e.isImageExist?e.type&&!new RegExp(e.type,"gi").test(["image/jpeg","image/png","image/jpg","image/gif","image/webp"].join(","))?(r.questionImg="Unsupported file format",r.deckCover="Unsupported file format",r):e.size&&e.size>1e5?(r.questionImg="File size is more than 100kb",r.deckCover="File size is more than 100kb",r):r:(r.questionImg="Question image is required",r)}}}]);
//# sourceMappingURL=285.7ce44d55.chunk.js.map