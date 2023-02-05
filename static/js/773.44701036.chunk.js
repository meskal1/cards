"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[773],{6977:function(e,n,t){t.d(n,{l:function(){return r},q:function(){return o}});var a=t(6916),r=(0,a.P1)((function(e){return e.packs.tableData}),(function(e){return e.length>0})),o=(0,a.P1)([function(e){return e.cards.cardsData.packUserId},function(e){return e.profile.userData.id}],(function(e,n){return e===n}))},7942:function(e,n,t){t.d(n,{J:function(){return d}});var a=t(1087),r=t(3294),o=t(7406),i=t(4122),s=t(5582),c=t(395),l="BackToPacks_backToPacks__linkPacks__ez79f",u=t(184),d=function(){var e=(0,c.JU)(),n=(0,i.C)((function(e){return e.packs.queryParams})),t="/profile"===e.pathname?"":"?"+(0,s.u)(n,o.F7);return(0,u.jsx)(a.rU,{className:l,to:r.m.PACKS+t,children:"Packs"})}},5680:function(e,n,t){t.d(n,{t:function(){return l}});var a=t(1413),r=t(5987),o=t(9417),i="CustomInput_input__4vgJw",s=t(184),c=["className","helperText"],l=function(e){var n=e.className,t=e.helperText,l=(0,r.Z)(e,c),u="".concat(i," ").concat(n||""),d=t||" ";return(0,s.jsx)(o.Z,(0,a.Z)((0,a.Z)({className:u,variant:l.variant||"standard",type:l.type||"text",fullWidth:l.fullWidth||!0},l),{},{helperText:d}))}},3745:function(e,n,t){t.d(n,{$:function(){return m}});var a=t(9987),r=t(8316),o=t(172),i=t(7406),s=t(4122),c=t(885),l=t(2791),u=function(e){var n=function(e){return"undefined"!==typeof window&&window.matchMedia(e).matches},t=(0,l.useState)(n(e)),a=(0,c.Z)(t,2),r=a[0],o=a[1];function i(){o(n(e))}return(0,l.useEffect)((function(){var n=window.matchMedia(e);return i(),n.addListener?n.addListener(i):n.addEventListener("change",i),function(){n.removeListener?n.removeListener(i):n.removeEventListener("change",i)}}),[e]),r},d="CustomPagination_paginationContainer__0Y+sw",p="CustomPagination_paginationTable__htEVR",_=t(184),m=function(e){var n=e.forCards,t=void 0!==n&&n,c=(0,s.T)(),l=(0,s.C)((function(e){return t?e.cards.status:e.packs.status})),m=(0,s.C)((function(e){return e.packs.queryParams.page})),f=(0,s.C)((function(e){return e.cards.queryParams.page})),k=(0,s.C)((function(e){return e.packs.queryParams.pageCount})),h=(0,s.C)((function(e){return e.cards.queryParams.pageCount})),v=(0,s.C)((function(e){return e.cards.cardsData.cardsTotalCount})),C=(0,s.C)((function(e){return e.packs.packsData.cardPacksTotalCount})),x=t?f:m,b=t?h:k,g=Math.ceil(t?v/h:C/k),P=t?v>4:C>4,y=u("(max-width: 599px)"),j=u("(max-width: 472px)"),w=u("(max-width: 374px)"),N=function(e){c(t?(0,o.az)(e):(0,i.qw)(e))};return(0,_.jsxs)("div",{className:d,children:[g<=1?null:(0,_.jsx)(a.Z,{disabled:"loading"===l,count:g,shape:"circular",color:"primary",onChange:function(e,n){return N({page:n})},page:x,size:w?"small":"medium",hidePrevButton:y,hideNextButton:y}),P?(0,_.jsx)(r.Z,{className:p,component:"div",labelRowsPerPage:j?"":"Rows per page",labelDisplayedRows:function(){return""},count:101,page:-1===x?0:1,onPageChange:function(){},rowsPerPage:b,rowsPerPageOptions:[4,8,12,16,30,50,100],ActionsComponent:function(){return null},onRowsPerPageChange:function(e){N({pageCount:+e.target.value,page:1})},SelectProps:{disabled:"loading"===l}}):null]})}},2142:function(e,n,t){t.d(n,{N:function(){return k}});var a=t(885),r=t(2791),o=t(9417),i=t(172),s=t(7406),c=t(4122),l=t(2472),u=t(1015),d="CustomSearch_searchContainer__i+W9a",p="CustomSearch_search__placeholder__O+aX4",_="CustomSearch_search__placeholderAnimate__GVaMc",m="CustomSearch_search__input__XRkjf",f=t(184),k=function(e){var n=e.forCards,t=void 0!==n&&n,k=(0,c.T)(),h=(0,u.v)(),v=(0,c.C)((function(e){return e.packs.queryParams.search})),C=(0,c.C)((function(e){return e.cards.queryParams.cardQuestion})),x=(0,r.useState)(h.search||h.cardQuestion||""),b=(0,a.Z)(x,2),g=b[0],P=b[1],y=function(e,n){var t=(0,r.useState)(e),o=(0,a.Z)(t,2),i=o[0],s=o[1];return(0,r.useEffect)((function(){var t=setTimeout((function(){return s(e)}),n||700);return function(){clearTimeout(t)}}),[e,n]),i}(g);return(0,l.V)((function(){t?C!==g&&k((0,i.az)({cardQuestion:g})):v!==g&&k((0,s.qw)({search:g}))}),[y]),(0,l.V)((function(){P(h.search||h.cardQuestion||"")}),[h.search,h.cardQuestion]),(0,l.V)((function(){v||P("")}),[v]),(0,f.jsxs)("label",{className:d,children:[(0,f.jsx)("p",{className:"".concat(p," ").concat(g?_:""),children:t?"Search by question":"Search by name"}),(0,f.jsx)(o.Z,{className:m,value:g,variant:"outlined",type:"search",autoComplete:"off",onChange:function(e){P(e.currentTarget.value)}})]})}},8142:function(e,n,t){t.d(n,{A:function(){return f}});var a=t(885),r=t(2791),o=t(2472),i="CustomSelect_select__fjUBm",s="CustomSelect_selected__nAJle",c="CustomSelect_opened__d1kj8",l="CustomSelect_options__6baiE",u="CustomSelect_optionsLeft__GpfKK",d="CustomSelect_option__jHXSW",p=t(5325),_=t(184),m=function(e){var n=e.parentRef,t=e.options,a=e.closeMenu,o=e.handleClickOption,i=e.positionOptions,s=(0,r.useRef)();return(0,p.t)(a,s,n),(0,_.jsx)("ul",{ref:s,className:"left"===i?u:l,onClick:a,children:t.map((function(e,n){return(0,_.jsx)("li",{onMouseDown:function(n){return o(n,e.id)},className:d,children:e.label},n)}))})},f=(0,r.memo)((function(e){var n=e.initValue,t=e.reset,l=void 0!==t&&t,u=e.options,d=e.selectedOption,p=e.positionOptions,f=void 0===p?"center":p,k=u.filter((function(e){return e.id===n}))[0].label,h=(0,r.useState)(k),v=(0,a.Z)(h,2),C=v[0],x=v[1],b=(0,r.useState)(!1),g=(0,a.Z)(b,2),P=g[0],y=g[1],j=(0,r.useRef)(),w=function(){return y(!P)};return(0,o.V)((function(){l&&x(k)}),[l]),(0,_.jsxs)("div",{ref:j,className:i,onClick:w,onKeyDown:function(e){"Enter"===e.key&&w()},tabIndex:2,children:[(0,_.jsx)("p",{className:"".concat(s," ").concat(P?c:""),children:C}),P&&(0,_.jsx)(m,{parentRef:j,positionOptions:f,options:u,handleClickOption:function(e,n){x(e.currentTarget.textContent),d(n)},closeMenu:w})]})}))},7358:function(e,n,t){t.d(n,{U:function(){return d}});var a=t(1373),r=t(1441),o=t(9773),i=t(2952),s=t(807),c=t(7597),l=t(395),u=t(184),d=function(e){var n=e.columnsCount,t=e.rowsCount,d=e.withActions,p=void 0!==d&&d,_=(0,l.JU)(),m=new RegExp("/cards").test(_.pathname),f=(0,a.Z)("(max-width: 599px)"),k=new Array(p?n+1:m&&f?n+1:n).fill("").map((function(e,n){return(0,u.jsx)(i.Z,{className:f?c.Z.tablePacks__bodyCell:"",children:(0,u.jsx)(r.Z,{animation:"wave",height:f?34:37,variant:f?"text":"rounded"})},n)})),h=new Array(t).fill("").map((function(e,n){return(0,u.jsx)(s.Z,{className:f?c.Z.tablePacks__bodyRow:"",children:k},n)}));return(0,u.jsx)(o.Z,{className:f?c.Z.tablePacks__body:"",children:h})}},824:function(e,n,t){t.d(n,{E:function(){return m}});var a=t(4122),r="CustomTableHead_headCellTitle__81uXu",o="CustomTableHead_tablePacks__head__uEZX5",i="CustomTableHead_tablePacks__headRow__2qhlm",s="CustomTableHead_tablePacks__headCell__GDWrE",c="CustomTableHead_headCellContainer__mDJu8",l="CustomTableHead_actionCell__tLL0b",u="CustomTableHead_gradeCell__4Aig2",d="CustomTableHead_sortArrowUp__+6NuH",p="CustomTableHead_sortArrowDown__eDqKf",_=t(184),m=function(e){var n=e.heads,t=e.forCards,m=void 0!==t&&t,f=e.withActions,k=void 0!==f&&f,h=(0,a.C)((function(e){return m?e.cards.queryParams.sortCards:e.packs.queryParams.sortPacks})),v=h.slice(0,1),C=h.slice(1),x=+v?d:p;return(0,_.jsx)("thead",{className:o,children:(0,_.jsxs)("tr",{className:i,children:[n.map((function(e){return(0,_.jsx)("th",{className:"Grade"===e.label?u:s,scope:"col",children:(0,_.jsx)("div",{className:c,children:(0,_.jsx)("span",{className:"".concat(r," ").concat(C===e.id?x:""),children:e.label})})},e.id)})),(0,_.jsx)("th",{className:k?s:l,scope:"col"})]})})}},6329:function(e,n,t){t.d(n,{C:function(){return de}});var a=t(885),r=t(2791),o=t(6977),i=t(3222),s=t(4122),c=t(395),l=t(7942),u=t(1607),d=t(1413),p=t(1091),_=t(6582),m=t(7406),f="PackOwnerSwitcher_switcherContainer__C-K6U",k="PackOwnerSwitcher_switcher__title__nhtu-",h="PackOwnerSwitcher_switcher__block__nfE+f",v="PackOwnerSwitcher_switcher__blockItem__9ogFb",C="PackOwnerSwitcher_active__w99qF",x=t(184),b=function(){var e=(0,s.T)(),n=(0,s.C)((function(e){return e.packs.queryParams.isMyPacks}));return(0,x.jsxs)("div",{className:f,children:[(0,x.jsx)("p",{className:k,children:"Owner"}),(0,x.jsxs)(_.Z,{className:h,disableElevation:!0,variant:"text",children:[(0,x.jsx)(p.Z,{disabled:!!n,className:"".concat(v," ").concat(n?C:""),onClick:function(){return e((0,m.qw)((0,d.Z)((0,d.Z)({},m.F7),{},{isMyPacks:"yes"})))},children:(0,x.jsx)("p",{children:"My"})}),(0,x.jsx)(p.Z,{disabled:!n,className:"".concat(v," ").concat(n?"":C),onClick:function(){return e((0,m.qw)(m.F7))},children:(0,x.jsx)("p",{children:"All"})})]})]})},g=t(2472),P=t(9501),y=t(2451),j=t(3457),w=t(2065),N="#99CCF3",T="#3399FF",Z="#66B2FF",A="#007FFF",O="#afb8c1",B="#57606a",q=(0,j.Z)(P.Z)((function(e){var n=e.theme;return"\n\t color: ".concat("light"===n.palette.mode?A:Z,";\n\t height: 6px;\n\t width: 100%;\n\t padding: 16px 0;\n\t display: inline-block;\n\t position: relative;\n\t cursor: pointer;\n\t touch-action: none;\n\t -webkit-tap-highlight-color: transparent;\n  \n\t &:hover {\n\t\topacity: 1;\n\t }\n  \n\t &.").concat(y.Z.disabled," { \n\t\tpointer-events: none;\n\t\tcursor: default;\n\t\tcolor: ").concat("light"===n.palette.mode?O:B,";\n\t\topacity: 0.5;\n\t }\n  \n\t & .").concat(y.Z.rail," {\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\theight: 4px;\n\t\tborder-radius: 2px;\n\t\tbackground-color: currentColor;\n\t\topacity: 0.4;\n\t }\n  \n\t & .").concat(y.Z.track," {\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\theight: 4px;\n\t\tborder-radius: 2px;\n\t\tbackground-color: currentColor;\n\t }\n  \n\t & .").concat(y.Z.thumb," {\n\t\tposition: absolute;\n\t\twidth: 16px;\n\t\theight: 16px;\n\t\tmargin-left: -6px;\n\t\tmargin-top: -6px;\n\t\tbox-sizing: border-box;\n\t\tborder-radius: 50%;\n\t\toutline: 0;\n\t\tborder: 3px solid currentColor;\n\t\tbackground-color: #fff;\n  \n\t\t:hover,\n\t\t&.").concat(y.Z.focusVisible," {\n\t\t  box-shadow: 0 0 0 0.25rem ").concat((0,w.Fq)("light"===n.palette.mode?T:Z,.15),";\n\t\t}\n  \n\t\t&.").concat(y.Z.active," {\n\t\t  box-shadow: 0 0 0 0.25rem ").concat((0,w.Fq)("light"===n.palette.mode?N:Z,.3),";\n\t\t}\n\t }\n  \n\t & .").concat(y.Z.mark," {\n\t\tposition: absolute;\n\t\twidth: 4px;\n\t\theight: 4px;\n\t\tborder-radius: 2px;\n\t\tbackground-color: currentColor;\n\t\ttop: 50%;\n\t\topacity: 0.7;\n\t\ttransform: translateX(-50%);\n\t }\n  \n\t & .").concat(y.Z.markActive," {\n\t\tbackground-color: #fff;\n\t }\n  \n\t & .").concat(y.Z.valueLabel," {\n\t\tfont-family: IBM Plex Sans;\n\t\tfont-size: 14px;\n\t\tdisplay: block;\n\t\tposition: relative;\n\t\ttop: -1.6em;\n\t\ttext-align: center;\n\t\ttransform: translateX(-50%);\n\t }\n  ")})),S="PackSlider_sliderContainer__6gwYF",E="PackSlider_slider__D06Uk",D="PackSlider_slider__title__6u9If",M="PackSlider_slider__block__riSPd",R="PackSlider_slider__number__KcdYx",F=function(){var e=(0,s.T)(),n=(0,s.C)((function(e){return e.packs.queryParams.min})),t=(0,s.C)((function(e){return e.packs.queryParams.max})),o=(0,s.C)((function(e){return e.packs.packsData.minCardsCount})),i=(0,s.C)((function(e){return e.packs.packsData.maxCardsCount})),c=(0,r.useState)([n||o,t||i]),l=(0,a.Z)(c,2),u=l[0],d=l[1];return(0,g.V)((function(){d([n||o,t||i])}),[o,i,n,t]),(0,x.jsxs)("div",{className:S,children:[(0,x.jsx)("p",{className:D,children:"Amount of cards"}),(0,x.jsxs)("div",{className:M,children:[(0,x.jsx)("div",{className:R,children:u[0]}),(0,x.jsx)(q,{className:E,value:u,onChange:function(e,n){return d(n)},disableSwap:!0,min:o,max:i,onChangeCommitted:function(){u[0]!==u[1]&&e((0,m.qw)({min:u[0],max:u[1]}))}}),(0,x.jsx)("div",{className:R,children:u[1]})]})]})},I="PacksResetFilter_packsResetFilter__6n1Ps",L=function(){var e=(0,s.T)(),n=(0,s.C)((function(e){return e.packs.status}));return(0,x.jsx)("div",{className:I,onClick:function(){"idle"===n&&e((0,m.zc)())},children:"Reset"})},z=t(6492),U=t(5325),H=t(2599),V=t(172),W=t(5582),J=t(8142),K="SortTableItems_packsSortContainer__W1e0h",X="SortTableItems_packsSortTitle__x2EJm",Q=[{id:"0name",label:"Pack name A-z"},{id:"1name",label:"Pack name Z-a"},{id:"0user_name",label:"Created by A-z"},{id:"1user_name",label:"Created by Z-a"},{id:"1cardsCount",label:"Cards ascending"},{id:"0cardsCount",label:"Cards descending"},{id:"1updated",label:"Older packs"},{id:"0updated",label:"Newer packs"}],Y=[{id:"0question",label:"Question A-z"},{id:"1question",label:"Question Z-a"},{id:"0answer",label:"Answer A-z"},{id:"1answer",label:"Answer Z-a"},{id:"1updated",label:"Older question"},{id:"0updated",label:"Newer question"},{id:"0grade",label:"Lower grade"},{id:"1grade",label:"Higher grade"}],G=function(e){var n=e.forCards,t=void 0!==n&&n,a=(0,s.T)(),o=(0,s.C)((function(e){return e.packs.queryParams})),i=(0,W.u)(o,m.F7),c=t?Y:Q,l=0===Object.keys(i).length||"isMyPacks=yes"===i,u=(0,s.C)((function(e){return t?e.cards.queryParams.sortCards:e.packs.queryParams.sortPacks})),d=(0,r.useCallback)((function(e){a(t?(0,V.az)({sortCards:e}):(0,m.qw)({sortPacks:e}))}),[]);return(0,x.jsxs)("div",{className:K,children:[(0,x.jsx)("p",{className:X,children:"Sort items"}),(0,x.jsx)(J.A,{initValue:u,reset:l,options:c,selectedOption:d})]})},$="FiltersComponent_filtersConainer__9kYxJ",ee="FiltersComponent_switcherContainer__uVVPW",ne="FiltersComponent_overlay__S0e0z",te=function(e){var n=e.parentRef,t=e.forCards,a=void 0!==t&&t,o=e.closeMenu,i=(0,s.C)((function(e){return e.packs.status})),c=(0,s.C)((function(e){return e.cards.status})),l="loading"===i||"loading"===c,u=(0,r.useRef)();return(0,U.t)(o,u,n),(0,z.q)(o),(0,x.jsxs)("div",{ref:u,className:$,children:[l&&(0,x.jsx)("div",{className:ne,children:(0,x.jsx)(H.A,{})}),a?(0,x.jsx)(G,{forCards:!0}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(G,{}),(0,x.jsx)(F,{}),(0,x.jsxs)("div",{className:ee,children:[(0,x.jsx)(b,{}),(0,x.jsx)(L,{})]})]})]})},ae="PageTitleBlock_pageTitleBlockContainer__TZcWP",re="PageTitleBlock_pageTitleBlock__content__XAXrx",oe="PageTitleBlock_pageTitleBlock__titleBlock__-vzA3",ie="PageTitleBlock_pageTitleBlock__title__GUU9P",se="PageTitleBlock_filterButtonContainer__9WveT",ce="PageTitleBlock_filterButton__b0oO6",le="PageTitleBlock_learnButton__LWmxa",ue="PageTitleBlock_addButton__VUmnx",de=(0,r.memo)((function(e){var n=e.linkToPacks,t=void 0!==n&&n,d=e.hasButtons,p=void 0===d||d,_=e.title,m=void 0===_?"Packs list":_,f=e.buttonClick,k=(0,c.JU)(),h=k.pathname.split("/cards/")[1],v=(0,s.C)((function(e){return e.cards.cardsData.cardsTotalCount})),C=(0,s.C)(o.q),b=(0,r.useState)(!1),g=(0,a.Z)(b,2),P=g[0],y=g[1],j=new RegExp("/cards").test(k.pathname),w=(0,r.useRef)(),N=j?"".concat(C?"Add new card":"Learn to pack"):"Add new pack",T=function(){return y((function(e){return!e}))};return(0,x.jsxs)("div",{className:ae,children:[t&&(0,x.jsx)(l.J,{}),(0,x.jsxs)("div",{className:re,children:[(0,x.jsxs)("div",{className:oe,children:[(0,x.jsx)("h2",{className:ie,children:m}),C&&(0,x.jsx)(i.M,{packID:h,packName:m,packIsEmpty:!!v})]}),p&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{className:se,children:(0,x.jsxs)("div",{ref:w,children:[P&&(0,x.jsx)(te,{parentRef:w,closeMenu:T,forCards:t}),(0,x.jsx)(u.o,{className:ce,onClick:T,children:(0,x.jsx)("p",{children:"Add filter"})})]})}),(0,x.jsx)(u.o,{className:"Learn to pack"===N?le:ue,onClick:f,children:(0,x.jsx)("p",{children:N})})]})]})]})}))},4001:function(e,n,t){t.d(n,{V:function(){return c}});var a=t(6910),r=t(8298),o=t(4346),i="Dialog_container__DW96z",s=t(184),c=function(e){var n=e.title,t=e.primaryColor,c=e.onOkButtonText,l=e.children,u=e.onOk,d=e.onCloseButtonText,p=e.isOpened,_=e.onClose;return(0,s.jsx)(o.I,{isOpened:p,onClose:_,children:(0,s.jsxs)("div",{className:i,children:[(0,s.jsx)(r.g,{title:n,onClose:_}),l,(0,s.jsx)(a.n,{primaryColor:t,primaryButtonText:c,primaryButtonOnClick:u,secondaryButtonText:d,secondaryButtonOnClick:_})]})})}},6910:function(e,n,t){t.d(n,{n:function(){return d}});var a=t(4122),r=t(1607),o="FooterModal_container__37l3S",i="FooterModal_colorWhite__Af0Aj",s="FooterModal_colorBlue__1iAqa",c="FooterModal_colorRed__+WSZh",l="FooterModal_secondaryButton__+cjjb",u=t(184),d=function(e){var n=e.primaryColor,t=e.primaryButtonText,d=void 0===t?"Submit":t,p=e.primaryButtonOnClick,_=e.secondaryButtonText,m=void 0===_?"Cancel":_,f=e.secondaryButtonOnClick,k=(0,a.C)((function(e){return e.packs.status})),h=(0,a.C)((function(e){return e.cards.status})),v="loading"===k||"loading"===h,C=i;switch(n){case"white":default:C=i;break;case"red":C=c;break;case"blue":C=s}return(0,u.jsxs)("div",{className:o,children:[(0,u.jsx)(r.o,{disabled:v,className:l,onClick:f,children:m}),(0,u.jsx)(r.o,{disabled:v,className:C,onClick:p,children:d})]})}},8298:function(e,n,t){t.d(n,{g:function(){return s}});var a="HeaderModal_conteiner__F54+d",r="HeaderModal_title__zNIL3",o="HeaderModal_button__qYEyN",i=t(184),s=function(e){var n=e.title,t=e.onClose;return(0,i.jsxs)("div",{className:a,children:[(0,i.jsx)("h2",{className:r,children:n}),(0,i.jsx)("div",{className:o,onClick:t,onKeyDown:function(e){"Enter"===e.key&&t()},role:"button",tabIndex:1})]})}},8726:function(e,n,t){t.d(n,{N:function(){return c}});var a=t(6910),r=t(8298),o=t(4346),i="MainPopup_container__39hXy",s=t(184),c=function(e){var n=e.title,t=e.className,c=e.onOkButtonText,l=e.onOk,u=e.onCloseButtonText,d=e.children,p=e.isOpened,_=e.onClose;return(0,s.jsx)(o.I,{isOpened:p,onClose:_,children:(0,s.jsxs)("div",{className:"".concat(i," ").concat(t||""),children:[(0,s.jsx)(r.g,{title:n,onClose:_}),d,(0,s.jsx)(a.n,{primaryButtonText:c,primaryButtonOnClick:l,secondaryButtonText:u,secondaryButtonOnClick:_})]})})}},4346:function(e,n,t){t.d(n,{I:function(){return _}});var a=t(8822),r=t(6492),o=t(885),i=t(2791),s=t(4164),c=function(e){var n=e.children,t=(0,i.useState)((function(){return document.createElement("div")})),a=(0,o.Z)(t,1)[0];return a.className="portal",(0,i.useEffect)((function(){return document.body.appendChild(a),document.body.style.overflow="hidden",function(){document.body.removeChild(a),document.body.removeAttribute("style")}}),[]),(0,s.createPortal)(n,a)},l="OverlayingPopup_container__C54HS",u="OverlayingPopup_overlay__FoBLb",d="OverlayingPopup_focusLock__x0o6U",p=t(184),_=function(e){var n=e.children,t=e.isOpened,o=e.onClose;return t?((0,r.q)(o),(0,p.jsx)(c,{children:(0,p.jsx)(a.ZP,{disabled:!1,className:d,children:(0,p.jsxs)("div",{className:l,role:"dialog",children:[(0,p.jsx)("div",{className:u,role:"button",onClick:o}),n]})})})):null}},2377:function(e,n,t){t.d(n,{Y:function(){return B}});var a=t(4165),r=t(5861),o=t(1413),i=t(885),s=t(2791),c=t(6378),l=t(7831),u=t(5473),d=t(5705),p=t(1835),_=t.n(p),m=t(5680),f=t(8726),k=t(4122),h=t(4472),v=t(395),C=t(6732),x=t(172),b=t(7406),g="AddEditPack_addImageBlock__3hNpf",P="AddEditPack_privateAndRemoveContainer__65YpO",y="AddEditPack_removeImageButton__eh3Xe",j="AddEditPack_dargOver__ParJA",w="AddEditPack_addImageBlockTitle__VoEKH",N="AddEditPack_hidden__iGEWg",T="AddEditPack_imageContainer__orTuf",Z="AddEditPack_image__g+KO5",A="AddEditPack_checkbox__B+BMM",O=t(184),B=(0,s.memo)((function(e){var n=e.isOpened,t=e.onClose,p=e.packData,B=(0,v.JU)(),q=new RegExp("/cards").test(B.pathname),S=(0,k.T)(),E=(0,k.C)((function(e){return e.cards.cardsData})),D=q?E.packPrivate:null===p||void 0===p?void 0:p.private,M=_()((null===p||void 0===p?void 0:p.deckCover)||"",{mimeRequired:!0}),R=(0,s.useState)(M?null===p||void 0===p?void 0:p.deckCover:""),F=(0,i.Z)(R,2),I=F[0],L=F[1],z=(0,s.useState)(null),U=(0,i.Z)(z,2),H=U[0],V=U[1],W=(0,s.useState)(!1),J=(0,i.Z)(W,2),K=J[0],X=J[1],Q=(0,s.useRef)(),Y={size:(null===H||void 0===H?void 0:H.size)||0,type:(null===H||void 0===H?void 0:H.type)||"",isImageExist:!!I},G={deckCover:"",name:(null===p||void 0===p?void 0:p.name)||"",private:D||!1},$=(0,d.TA)({initialValues:G,validationSchema:C.uj,validate:function(){return(0,C.ap)(Y)},onSubmit:function(e){var n=H||I?I:" ",a=e.name!==G.name,r=e.private!==G.private,i=(0,o.Z)((0,o.Z)({},E),{},{packPrivate:e.private,packDeckCover:n||""});p&&(H||a||r||M&&!I)&&(q&&S((0,x.po)(i)),S((0,b.uT)((0,o.Z)((0,o.Z)({},e),{},{id:(null===p||void 0===p?void 0:p.id)||"",deckCover:n})))),p||S((0,b.Nb)((0,o.Z)((0,o.Z)({},e),{},{deckCover:I}))),t()}}),ee=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(n){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,"files"in n.target&&n.target.files?V(n.target.files[0]):"dataTransfer"in n&&V(n.dataTransfer.files[0]),e.next=5,(0,h.f)(n);case 5:t=e.sent,$.setFieldValue("deckCover"," "),$.setTouched((0,o.Z)((0,o.Z)({},$.touched),{},{deckCover:!0})),L(t),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.log("Error File Upload: ",e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(n){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){setTimeout((function(){var e;return null===Q||void 0===Q||null===(e=Q.current)||void 0===e?void 0:e.focus()}),50)}),[]),(0,O.jsx)(f.N,{title:p?"Edit pack":"Add new pack",onOkButtonText:p?"Update":"Create",onOk:$.handleSubmit,isOpened:n,onClose:t,children:(0,O.jsxs)("form",{onSubmit:$.handleSubmit,children:[(0,O.jsx)(m.t,(0,o.Z)({inputRef:Q,label:"Name",autoComplete:"new-password",error:$.touched.name&&!!$.errors.name,helperText:$.touched.name&&$.errors.name,onKeyDown:function(e){"Enter"===e.key&&$.handleSubmit()}},$.getFieldProps("name"))),(0,O.jsxs)("label",{className:"".concat(g," ").concat(K?j:""),onDragOver:function(e){e.preventDefault(),X(!0)},onDragLeave:function(){return X(!1)},onDrop:ee,children:[(0,O.jsxs)("p",{className:w,children:["Drag your image here or click to upload.",(0,O.jsx)("br",{}),"File size should be less than 100kb"]}),(0,O.jsx)(m.t,(0,o.Z)((0,o.Z)({type:"file",inputProps:{accept:".jpg,.jpeg,.gif,.png,.webp,.svg"},className:N,error:$.touched.deckCover&&!!$.errors.deckCover,helperText:$.touched.deckCover&&$.errors.deckCover},$.getFieldProps("deckCover")),{},{value:"",onChange:ee})),!!I&&(0,O.jsx)("div",{className:T,children:(0,O.jsx)("img",{src:I,alt:"cover",className:Z})})]}),(0,O.jsxs)("div",{className:P,children:[(0,O.jsxs)("label",{className:A,children:[(0,O.jsx)(u.Z,(0,o.Z)({size:"medium",style:$.values.private?{color:"#1B79CE "}:{color:"grey "},checked:$.values.private,icon:(0,O.jsx)(c.Z,{}),checkedIcon:(0,O.jsx)(l.Z,{})},$.getFieldProps("private"))),"Private"]}),I&&(0,O.jsx)("div",{className:y,onClick:function(){L(""),V(null)},children:"Remove"})]})]})})}))},3222:function(e,n,t){t.d(n,{M:function(){return Z}});var a=t(1413),r=t(885),o=t(2791),i=t(3294),s=t(4122),c=t(395),l=t(2377),u=t(4165),d=t(5861),p=t(4001),_=t(6479),m=t(5582),f=t(7406),k=t(184),h=function(e){var n=e.isOpened,t=e.onClose,a=e.packData,r=(0,s.T)(),o=(0,c.JU)(),l=(0,c.DU)(),h=(0,s.C)((function(e){return e.packs.queryParams})),v=(0,m.u)(h,f.F7),C=new RegExp("isMyPacks=yes").test(v)?"?isMyPacks=yes":"?"+v,x=function(){var e=(0,d.Z)((0,u.Z)().mark((function e(){return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r((0,f.V5)(a.id));case 2:/cards/gi.test(o.pathname)&&l(i.m.PACKS+C),t();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,_.P)(x),(0,k.jsx)(p.V,{title:"Delete pack",primaryColor:"red",onOkButtonText:"Delete",onOk:x,isOpened:n,onClose:t,children:(0,k.jsxs)("span",{children:["Are you sure you want to delete Pack: ",(0,k.jsx)("b",{children:a.name}),"? ",(0,k.jsx)("br",{}),"All cards will be deleted."]})})},v="PackActionsMenu_menuContainer__H97fe",C="PackActionsMenu_menu__NWrWg",x="PackActionsMenu_openMenuRight__mq36c",b="PackActionsMenu_openMenuLeft__pXSMK",g="PackActionsMenu_openItemRight__OXx92",P="PackActionsMenu_openItemLeft__M6Ej2",y="PackActionsMenu_disableLearn__n5Ffq",j="PackActionsMenu_menuItem__O2h4E",w=t(6492),N=t(5325),T=function(e){var n=e.parentRef,t=e.handleLearn,a=e.handleEdit,r=e.handleDelete,i=e.closeMenu,s=e.packIsEmpty,c=e.openToLeft,l="".concat(j," ").concat(c?P:g),u=(0,o.useRef)();return(0,N.t)(i,u,n),(0,w.q)(i),(0,k.jsxs)("ul",{ref:u,className:C,onClick:i,children:[(0,k.jsx)("li",{className:"".concat(l," ").concat(s?"":y),onMouseDown:t}),(0,k.jsx)("li",{className:l,onMouseDown:a}),(0,k.jsx)("li",{className:l,onMouseDown:r})]})},Z=function(e){var n=e.deckCover,t=e.isPrivate,u=void 0!==t&&t,d=e.openToLeft,p=void 0!==d&&d,_=e.packID,m=e.packName,f=e.packIsEmpty,C=(0,s.C)((function(e){return e.cards.cardsData.packDeckCover})),g=(0,c.DU)(),P=(0,o.useState)(!1),y=(0,r.Z)(P,2),j=y[0],w=y[1],N=j?"".concat(p?b:x):"",Z={deleteOpened:!1,editOpened:!1},A=(0,o.useState)(Z),O=(0,r.Z)(A,2),B=O[0],q=O[1],S=(0,o.useRef)(),E={id:_,private:u||!1,name:m,deckCover:n||C||""},D=function(){return w(!j)},M=function(){return q(Z)};return(0,k.jsxs)(k.Fragment,{children:[B.editOpened&&(0,k.jsx)(l.Y,{isOpened:B.editOpened,onClose:M,packData:E}),B.deleteOpened&&(0,k.jsx)(h,{isOpened:B.deleteOpened,onClose:M,packData:E}),(0,k.jsx)("div",{ref:S,className:"".concat(v," ").concat(N),onMouseDown:D,children:j&&(0,k.jsx)(T,{parentRef:S,handleLearn:function(){f&&g(i.m.LEARN+"/".concat(_))},handleEdit:function(){return q((0,a.Z)((0,a.Z)({},B),{},{editOpened:!B.editOpened}))},handleDelete:function(){return q((0,a.Z)((0,a.Z)({},B),{},{deleteOpened:!B.deleteOpened}))},closeMenu:D,packIsEmpty:f,openToLeft:p})})]})}},6479:function(e,n,t){t.d(n,{P:function(){return r}});var a=t(2791),r=function(e){var n=(0,a.useCallback)((function(n){"Enter"===n.key&&e()}),[e]);(0,a.useEffect)((function(){return document.addEventListener("keyup",n,!1),function(){document.removeEventListener("keyup",n,!1)}}),[n])}},4472:function(e,n,t){t.d(n,{f:function(){return o}});var a=t(4165),r=t(5861),o=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(n){var t,r,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((t=n.target.files||n.dataTransfer.files)&&t.length&&t[0].size<1e5&&t[0].type.includes("image"))){e.next=8;break}return(r=new FileReader).readAsDataURL(t[0]),e.next=6,new Promise((function(e,n){r.onload=function(){return e(r.result)},r.onerror=function(e){return n(e)}}));case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},6732:function(e,n,t){t.d(n,{Fm:function(){return k},M8:function(){return h},_E:function(){return f},ap:function(){return C},nv:function(){return _},tA:function(){return m},uj:function(){return v}});var a=t(2797),r=a.Z_().required("Required"),o=r,i=a.Z_().email("Enter a valid email").required("Email is required"),s=a.Z_().min(8,"Password must contain at least 8 characters").required("Enter your password"),c=a.Z_().oneOf([a.iH("password")],"Password does not match").required("Confirm your password"),l=a.O7(),u=a.Z_().max(100,"Question should be less then 100 characters").required("Question is required"),d=a.Z_().max(100,"Answer should be less then 100 characters").required("Answer is required"),p=a.Z_().max(100,"Name should be less then 100 characters").required("Pack name is required"),_=a.Ry({email:i,password:s,rememberMe:l}),m=a.Ry({email:i,password:s,confirmPassword:c}),f=(a.Ry({name:r,avatar:o}),a.Ry({password:s})),k=a.Ry({email:i}),h=a.Ry({question:u,answer:d}),v=a.Ry({name:p}),C=function(e){var n={};return!e.selectedItem||e.size||e.isImageExist?e.type&&!new RegExp(e.type,"gi").test(["image/jpeg","image/png","image/jpg","image/gif","image/webp","image/svg"].join(","))?(n.questionImg="Unsupported file format",n.deckCover="Unsupported file format",n):e.size&&e.size>1e5?(n.questionImg="File size is more than 100kb",n.deckCover="File size is more than 100kb",n):n:(n.questionImg="Question image is required",n)}},7597:function(e,n){n.Z={packImageWrapper:"PacksTableBody_packImageWrapper__igyw8",packName:"PacksTableBody_packName__5R5ye",packNameAdaptive:"PacksTableBody_packNameAdaptive__UmHCp",packImage:"PacksTableBody_packImage__PyUN8",tablePacks__body:"PacksTableBody_tablePacks__body__ukNlG",tablePacks__bodyRow:"PacksTableBody_tablePacks__bodyRow__Indab",tablePacks__bodyCell:"PacksTableBody_tablePacks__bodyCell__DSqMF",tablePacks__bodyCellTitle:"PacksTableBody_tablePacks__bodyCellTitle__CJvep",tablePacks__bodyCellContent:"PacksTableBody_tablePacks__bodyCellContent__plP0T",linkToLearnActive:"PacksTableBody_linkToLearnActive__Q5gph",linkToLearnDisabled:"PacksTableBody_linkToLearnDisabled__bLr6a"}}}]);
//# sourceMappingURL=773.44701036.chunk.js.map