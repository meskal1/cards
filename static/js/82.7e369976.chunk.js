"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[82],{5680:function(e,n,r){r.d(n,{t:function(){return c}});var o=r(1413),a=r(5987),t=r(9417),i="CustomInput_input__4vgJw",s=r(184),l=["className","helperText"],c=function(e){var n=e.className,r=e.helperText,c=(0,a.Z)(e,l),d="".concat(i," ").concat(n||""),u=r||" ";return(0,s.jsx)(t.Z,(0,o.Z)((0,o.Z)({className:d,variant:c.variant||"standard",type:c.type||"text",fullWidth:c.fullWidth||!0},c),{},{helperText:u}))}},5725:function(e,n,r){r.d(n,{E:function(){return h}});var o=r(1413),a=r(885),t=r(5987),i=r(2791),s=r(3746),l=r(165),c=r(8254),d=r(3811),u=r(5680),p=r(184),m=["value","type"],h=function(e){var n=e.value,r=(e.type,(0,t.Z)(e,m)),h=(0,i.useState)(!1),f=(0,a.Z)(h,2),g=f[0],v=f[1];return(0,p.jsx)(u.t,(0,o.Z)({type:g?"text":"password",value:n,InputProps:{endAdornment:(0,p.jsx)(c.Z,{position:"end",children:n&&(0,p.jsx)(d.Z,{"aria-label":"toggle password visibility",onClick:function(){return v(!g)},children:g?(0,p.jsx)(l.Z,{}):(0,p.jsx)(s.Z,{})})})}},r))}},9082:function(e,n,r){r.r(n),r.d(n,{LogInApp:function(){return B}});var o=r(1413),a=r(4165),t=r(5861),i=r(6378),s=r(7831),l=r(2900),c=r(4565),d=r(5473),u=r(5705),p=r(7689),m=r(1087),h=r(1607),f=r(5680),g=r(5725),v=r(3294),b=r(4122),Z=r(6732),_=r(3263),x="LogInApp_loginContainer__ytUUQ",k="LogInApp_login__title__RfdQk",y="LogInApp_login__form__SE9zN",w="LogInApp_login__blockRemember__bF8JE",j="LogInApp_login__checkBoxBlock__sseNN",P="LogInApp_login__typography__BS5tL",C="LogInApp_login__forgotPassword__Cblo7",I="LogInApp_login__signUpBlock__8r8LS",R="LogInApp_login__text__UvvGQ",N="LogInApp_login__textEmail__flGDr",S="LogInApp_login__textPassword__ctCwX",L="LogInApp_login__buttonsBlock__iDXsT",F="LogInApp_login__buttonSignIn__Ze7ow",z="LogInApp_login__signUp__UiTY5",A="LogInApp_checkbox__23mWi",E="LogInApp_credentialsColor__LS5Hx",q=r(184),B=function(){var e=(0,p.s0)(),n=(0,b.T)(),r=(0,b.C)((function(e){return e.auth.status})),B=(0,u.TA)({initialValues:{email:"",password:"",rememberMe:!1},validationSchema:Z.nv,onSubmit:function(){var r=(0,t.Z)((0,a.Z)().mark((function r(o){return(0,a.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,n((0,_.gd)(o));case 2:r.sent&&e(v.m.PACKS);case 4:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()});return(0,q.jsxs)("div",{className:x,children:[(0,q.jsx)("h2",{className:k,children:"Sign in"}),(0,q.jsxs)("form",{className:y,onSubmit:B.handleSubmit,children:[(0,q.jsx)(f.t,(0,o.Z)({label:"Email",error:B.touched.email&&!!B.errors.email,helperText:B.touched.email&&B.errors.email},B.getFieldProps("email"))),(0,q.jsx)(g.E,(0,o.Z)({label:"Password",error:B.touched.password&&!!B.errors.password,helperText:B.touched.password&&B.errors.password},B.getFieldProps("password"))),(0,q.jsxs)("div",{className:w,children:[(0,q.jsx)(l.Z,{className:j,label:(0,q.jsx)(c.Z,{className:P,children:"Remember me"}),control:(0,q.jsx)(d.Z,(0,o.Z)((0,o.Z)({},B.getFieldProps("rememberMe")),{},{className:A,checked:B.values.rememberMe,size:"medium",style:B.values.rememberMe?{color:"#1B79CE "}:{color:"grey "},icon:(0,q.jsx)(i.Z,{}),checkedIcon:(0,q.jsx)(s.Z,{})}))}),(0,q.jsx)(m.rU,{className:C,to:v.m.RECOVERY,children:"Forgot password?"})]}),(0,q.jsxs)("div",{className:L,children:[(0,q.jsx)(h.o,{className:F,disabled:"loading"===r,children:(0,q.jsx)("p",{children:"Sign in"})}),(0,q.jsx)(m.rU,{className:z,to:v.m.REGISTRATION,children:"Sign up"})]})]}),(0,q.jsxs)("div",{className:I,children:[(0,q.jsx)("p",{className:R,children:"To log in, get registered or use common test account credentials:"}),(0,q.jsxs)("p",{className:N,children:["Email: ",(0,q.jsx)("span",{className:E,children:"testsetcards2022@gmail.com"})]}),(0,q.jsxs)("p",{className:S,children:["Password: ",(0,q.jsx)("span",{className:E,children:"testsetcards"})]})]})]})}},6732:function(e,n,r){r.d(n,{Fm:function(){return g},M8:function(){return v},_E:function(){return f},ap:function(){return Z},nv:function(){return m},tA:function(){return h},uj:function(){return b}});var o=r(2797),a=o.Z_().required("Required"),t=a,i=o.Z_().email("Enter a valid email").required("Email is required"),s=o.Z_().min(8,"Password must contain at least 8 characters").required("Enter your password"),l=o.Z_().oneOf([o.iH("password")],"Password does not match").required("Confirm your password"),c=o.O7(),d=o.Z_().max(100,"Question should be less then 100 characters").required("Question is required"),u=o.Z_().max(100,"Answer should be less then 100 characters").required("Answer is required"),p=o.Z_().max(100,"Name should be less then 100 characters").required("Pack name is required"),m=o.Ry({email:i,password:s,rememberMe:c}),h=o.Ry({email:i,password:s,confirmPassword:l}),f=(o.Ry({name:a,avatar:t}),o.Ry({password:s})),g=o.Ry({email:i}),v=o.Ry({question:d,answer:u}),b=o.Ry({name:p}),Z=function(e){var n={};return!e.selectedItem||e.size||e.isImageExist?e.type&&!new RegExp(e.type,"gi").test(["image/jpeg","image/png","image/jpg","image/gif","image/webp","image/svg"].join(","))?(n.questionImg="Unsupported file format",n.deckCover="Unsupported file format",n):e.size&&e.size>1e5?(n.questionImg="File size is more than 100kb",n.deckCover="File size is more than 100kb",n):n:(n.questionImg="Question image is required",n)}},6378:function(e,n,r){var o=r(4836);n.Z=void 0;var a=o(r(5649)),t=r(184),i=(0,a.default)((0,t.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked");n.Z=i},7831:function(e,n,r){var o=r(4836);n.Z=void 0;var a=o(r(5649)),t=r(184),i=(0,a.default)((0,t.jsx)("path",{d:"M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39l-1.61 1.61z"}),"TaskAlt");n.Z=i},5473:function(e,n,r){r.d(n,{Z:function(){return I}});var o=r(4942),a=r(3366),t=r(7462),i=r(2791),s=r(8182),l=r(4419),c=r(2065),d=r(7278),u=r(1245),p=r(184),m=(0,u.Z)((0,p.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),h=(0,u.Z)((0,p.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),f=(0,u.Z)((0,p.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),g=r(9853),v=r(5513),b=r(277),Z=r(5878),_=r(1217);function x(e){return(0,_.Z)("MuiCheckbox",e)}var k=(0,Z.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),y=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],w=(0,b.ZP)(d.Z,{shouldForwardProp:function(e){return(0,b.FO)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[n.root,r.indeterminate&&n.indeterminate,"default"!==r.color&&n["color".concat((0,g.Z)(r.color))]]}})((function(e){var n,r=e.theme,a=e.ownerState;return(0,t.Z)({color:(r.vars||r).palette.text.secondary},!a.disableRipple&&{"&:hover":{backgroundColor:r.vars?"rgba(".concat("default"===a.color?r.vars.palette.action.activeChannel:r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):(0,c.Fq)("default"===a.color?r.palette.action.active:r.palette[a.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==a.color&&(n={},(0,o.Z)(n,"&.".concat(k.checked,", &.").concat(k.indeterminate),{color:(r.vars||r).palette[a.color].main}),(0,o.Z)(n,"&.".concat(k.disabled),{color:(r.vars||r).palette.action.disabled}),n))})),j=(0,p.jsx)(h,{}),P=(0,p.jsx)(m,{}),C=(0,p.jsx)(f,{}),I=i.forwardRef((function(e,n){var r,o,c=(0,v.Z)({props:e,name:"MuiCheckbox"}),d=c.checkedIcon,u=void 0===d?j:d,m=c.color,h=void 0===m?"primary":m,f=c.icon,b=void 0===f?P:f,Z=c.indeterminate,_=void 0!==Z&&Z,k=c.indeterminateIcon,I=void 0===k?C:k,R=c.inputProps,N=c.size,S=void 0===N?"medium":N,L=c.className,F=(0,a.Z)(c,y),z=_?I:b,A=_?I:u,E=(0,t.Z)({},c,{color:h,indeterminate:_,size:S}),q=function(e){var n=e.classes,r=e.indeterminate,o=e.color,a={root:["root",r&&"indeterminate","color".concat((0,g.Z)(o))]},i=(0,l.Z)(a,x,n);return(0,t.Z)({},n,i)}(E);return(0,p.jsx)(w,(0,t.Z)({type:"checkbox",inputProps:(0,t.Z)({"data-indeterminate":_},R),icon:i.cloneElement(z,{fontSize:null!=(r=z.props.fontSize)?r:S}),checkedIcon:i.cloneElement(A,{fontSize:null!=(o=A.props.fontSize)?o:S}),ownerState:E,ref:n,className:(0,s.Z)(q.root,L)},F,{classes:q}))}))},2900:function(e,n,r){r.d(n,{Z:function(){return k}});var o=r(4942),a=r(3366),t=r(7462),i=r(2791),s=r(8182),l=r(4419),c=r(529),d=r(4565),u=r(9853),p=r(277),m=r(5513),h=r(5878),f=r(1217);function g(e){return(0,f.Z)("MuiFormControlLabel",e)}var v=(0,h.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]),b=r(40),Z=r(184),_=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","slotProps","value"],x=(0,p.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[(0,o.Z)({},"& .".concat(v.label),n.label),n.root,n["labelPlacement".concat((0,u.Z)(r.labelPlacement))]]}})((function(e){var n=e.theme,r=e.ownerState;return(0,t.Z)((0,o.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16},"&.".concat(v.disabled),{cursor:"default"}),"start"===r.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===r.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===r.labelPlacement&&{flexDirection:"column",marginLeft:16},(0,o.Z)({},"& .".concat(v.label),(0,o.Z)({},"&.".concat(v.disabled),{color:(n.vars||n).palette.text.disabled})))})),k=i.forwardRef((function(e,n){var r,o=(0,m.Z)({props:e,name:"MuiFormControlLabel"}),p=o.className,h=o.componentsProps,f=void 0===h?{}:h,v=o.control,k=o.disabled,y=o.disableTypography,w=o.label,j=o.labelPlacement,P=void 0===j?"end":j,C=o.slotProps,I=void 0===C?{}:C,R=(0,a.Z)(o,_),N=(0,c.Z)(),S=k;"undefined"===typeof S&&"undefined"!==typeof v.props.disabled&&(S=v.props.disabled),"undefined"===typeof S&&N&&(S=N.disabled);var L={disabled:S};["checked","name","onChange","value","inputRef"].forEach((function(e){"undefined"===typeof v.props[e]&&"undefined"!==typeof o[e]&&(L[e]=o[e])}));var F=(0,b.Z)({props:o,muiFormControl:N,states:["error"]}),z=(0,t.Z)({},o,{disabled:S,labelPlacement:P,error:F.error}),A=function(e){var n=e.classes,r=e.disabled,o=e.labelPlacement,a=e.error,t={root:["root",r&&"disabled","labelPlacement".concat((0,u.Z)(o)),a&&"error"],label:["label",r&&"disabled"]};return(0,l.Z)(t,g,n)}(z),E=null!=(r=I.typography)?r:f.typography,q=w;return null==q||q.type===d.Z||y||(q=(0,Z.jsx)(d.Z,(0,t.Z)({component:"span"},E,{className:(0,s.Z)(A.label,null==E?void 0:E.className),children:q}))),(0,Z.jsxs)(x,(0,t.Z)({className:(0,s.Z)(A.root,p),ownerState:z,ref:n},R,{children:[i.cloneElement(v,L),q]}))}))},7278:function(e,n,r){r.d(n,{Z:function(){return x}});var o=r(885),a=r(3366),t=r(7462),i=r(2791),s=r(8182),l=r(4419),c=r(9853),d=r(277),u=r(5178),p=r(529),m=r(753),h=r(5878),f=r(1217);function g(e){return(0,f.Z)("PrivateSwitchBase",e)}(0,h.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var v=r(184),b=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Z=(0,d.ZP)(m.Z)((function(e){var n=e.ownerState;return(0,t.Z)({padding:9,borderRadius:"50%"},"start"===n.edge&&{marginLeft:"small"===n.size?-3:-12},"end"===n.edge&&{marginRight:"small"===n.size?-3:-12})})),_=(0,d.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),x=i.forwardRef((function(e,n){var r=e.autoFocus,i=e.checked,d=e.checkedIcon,m=e.className,h=e.defaultChecked,f=e.disabled,x=e.disableFocusRipple,k=void 0!==x&&x,y=e.edge,w=void 0!==y&&y,j=e.icon,P=e.id,C=e.inputProps,I=e.inputRef,R=e.name,N=e.onBlur,S=e.onChange,L=e.onFocus,F=e.readOnly,z=e.required,A=e.tabIndex,E=e.type,q=e.value,B=(0,a.Z)(e,b),M=(0,u.Z)({controlled:i,default:Boolean(h),name:"SwitchBase",state:"checked"}),T=(0,o.Z)(M,2),O=T[0],U=T[1],H=(0,p.Z)(),Q=f;H&&"undefined"===typeof Q&&(Q=H.disabled);var V="checkbox"===E||"radio"===E,D=(0,t.Z)({},e,{checked:O,disabled:Q,disableFocusRipple:k,edge:w}),W=function(e){var n=e.classes,r=e.checked,o=e.disabled,a=e.edge,t={root:["root",r&&"checked",o&&"disabled",a&&"edge".concat((0,c.Z)(a))],input:["input"]};return(0,l.Z)(t,g,n)}(D);return(0,v.jsxs)(Z,(0,t.Z)({component:"span",className:(0,s.Z)(W.root,m),centerRipple:!0,focusRipple:!k,disabled:Q,tabIndex:null,role:void 0,onFocus:function(e){L&&L(e),H&&H.onFocus&&H.onFocus(e)},onBlur:function(e){N&&N(e),H&&H.onBlur&&H.onBlur(e)},ownerState:D,ref:n},B,{children:[(0,v.jsx)(_,(0,t.Z)({autoFocus:r,checked:i,defaultChecked:h,className:W.input,disabled:Q,id:V&&P,name:R,onChange:function(e){if(!e.nativeEvent.defaultPrevented){var n=e.target.checked;U(n),S&&S(e,n)}},readOnly:F,ref:I,required:z,ownerState:D,tabIndex:A,type:E},"checkbox"===E&&void 0===q?{}:{value:q},C)),O?d:j]}))}))}}]);
//# sourceMappingURL=82.7e369976.chunk.js.map