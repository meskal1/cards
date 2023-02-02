"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[561],{5680:function(e,r,n){n.d(r,{t:function(){return c}});var s=n(1413),t=n(5987),i=n(550),a="CustomInput_input__4vgJw",o=n(184),u=["className","helperText"],c=function(e){var r=e.className,n=e.helperText,c=(0,t.Z)(e,u),l="".concat(a," ").concat(r||""),d=n||" ";return(0,o.jsx)(i.Z,(0,s.Z)((0,s.Z)({className:l,variant:c.variant||"standard",type:c.type||"text",fullWidth:c.fullWidth||!0},c),{},{helperText:d}))}},5561:function(e,r,n){n.r(r),n.d(r,{Recovery:function(){return q}});var s=n(1413),t=n(4165),i=n(5861),a=n(5705),o=n(7689),u=n(1087),c=n(1607),l=n(5680),d=n(3294),m=n(4122),p=n(6732),f=n(3263),h="Recovery_forgotPassword__eomcr",_="Recovery_form__+Z1XI",y="Recovery_help__oWZ1a",g="Recovery_title__mo5n8",v="Recovery_forgotQuestion__CSlgv",w="Recovery_forgotLink__rAn4I",x=n(184),q=function(){var e=(0,m.T)(),r=(0,o.s0)(),n=(0,m.C)((function(e){return e.auth.status})),q=(0,a.TA)({initialValues:{email:""},validationSchema:p.Fm,onSubmit:function(){var n=(0,i.Z)((0,t.Z)().mark((function n(s){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e((0,f.Nn)(s.email));case 2:n.sent.payload&&r(d.m.CHECK_EMAIL);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}),Z=q.handleSubmit,R=q.getFieldProps,j=q.errors,b=q.touched;return(0,x.jsxs)("div",{className:h,children:[(0,x.jsx)("h2",{className:g,children:"Forgot your password?"}),(0,x.jsxs)("form",{className:_,onSubmit:Z,children:[(0,x.jsx)(l.t,(0,s.Z)({label:"Email",error:!!j.email&&b.email,helperText:b.email&&j.email},R("email"))),(0,x.jsx)("p",{className:y,children:"Enter your email address and we will send you further instructions"}),(0,x.jsx)(c.o,{disabled:"loading"===n,fullWidth:!0,children:(0,x.jsx)("p",{children:"Send instructions"})})]}),(0,x.jsx)("p",{className:v,children:"Have you remembered your password?"}),(0,x.jsx)(u.rU,{className:w,to:d.m.LOGIN,children:"Try logging in"})]})}},6732:function(e,r,n){n.d(r,{Fm:function(){return _},M8:function(){return y},_E:function(){return h},ap:function(){return v},nv:function(){return p},tA:function(){return f},uj:function(){return g}});var s=n(7103),t=s.Z_().required("Required"),i=t,a=s.Z_().email("Enter a valid email").required("Email is required"),o=s.Z_().min(8,"Password must contain at least 8 characters").required("Enter your password"),u=s.Z_().oneOf([s.iH("password")],"Password does not match").required("Confirm your password"),c=s.O7(),l=s.Z_().max(100,"Question should be less then 100 characters").required("Question is required"),d=s.Z_().max(100,"Answer should be less then 100 characters").required("Answer is required"),m=s.Z_().max(100,"Name should be less then 100 characters").required("Pack name is required"),p=s.Ry({email:a,password:o,rememberMe:c}),f=s.Ry({email:a,password:o,confirmPassword:u}),h=(s.Ry({name:t,avatar:i}),s.Ry({password:o})),_=s.Ry({email:a}),y=s.Ry({question:l,answer:d}),g=s.Ry({name:m}),v=function(e){var r={};return!e.selectedItem||e.size||e.isImageExist?e.type&&!new RegExp(e.type,"gi").test(["image/jpeg","image/png","image/jpg","image/gif","image/webp"].join(","))?(r.questionImg="Unsupported file format",r.deckCover="Unsupported file format",r):e.size&&e.size>5e5?(r.questionImg="File size is more than 0.5MB",r.deckCover="File size is more than 0.5MB",r):r:(r.questionImg="Question image is required",r)}}}]);
//# sourceMappingURL=561.5ec99259.chunk.js.map