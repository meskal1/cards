"use strict";(self.webpackChunkcards=self.webpackChunkcards||[]).push([[0],{8e3:function(a,e,s){s.r(e),s.d(e,{Packs:function(){return q}});var c=s(885),n=s(2791),t=s(3745),l=s(3379),r=s(6329),d=s(4122),i=s(1015),o=s(2377),u="Packs_packsContainer__inpxZ",k="Packs_packs__controlBlock__t1mOy",m=s(7406),p=s(6977),C=s(7358),_=s(824),b="PacksTable_emptyTableTitle__qAzq6",j="PacksTable_tablePacks__NKytf",x=s(7892),f=s.n(x),h=s(1835),v=s.n(h),N=s(1087),y=s(3294),P=s(395),Z=s(3222),g=s(7597),T=s(184),D=function(a){var e=a.heads,s=(0,d.C)((function(a){return a.packs.tableData})),c=(0,d.C)((function(a){return a.profile.userData.id})),n=(0,P.DU)();return(0,T.jsx)("tbody",{className:g.Z.tablePacks__body,children:s.map((function(a){return(0,T.jsxs)("tr",{className:g.Z.tablePacks__bodyRow,children:[e.map((function(e,s){var c=v()(a.deckCover,{mimeRequired:!0});return(0,T.jsx)("td",{className:g.Z.tablePacks__bodyCell,scope:"row",onClick:function(){return e=a._id,void("loading"!==a.requestStatus&&n(y.m.CARDS+"/".concat(e)));var e},children:(0,T.jsxs)("div",{className:g.Z.tablePacks__bodyCellContent,children:[(0,T.jsx)("div",{className:g.Z.tablePacks__bodyCellTitle,children:0===s?a[e.id]:e.label}),"name"===e.id&&c&&(0,T.jsx)("div",{className:g.Z.packImageWrapper,children:(0,T.jsx)("img",{src:a.deckCover,alt:"deckCover",className:g.Z.packImage})}),(0,T.jsx)("p",{className:"".concat(g.Z.packNameAdaptive," ").concat("name"===e.id&&c?g.Z.packName:""),children:"updated"===e.id?f()(a[e.id]).format("DD.MM.YYYY"):a[e.id]})]})},e.id)})),(0,T.jsx)("td",{className:g.Z.tablePacks__bodyCell,children:c===a.more_id?(0,T.jsx)(Z.M,{deckCover:a.deckCover,isPrivate:a.private,packID:a._id,packName:a.name,openToLeft:!0,packIsEmpty:!!a.cardsCount}):(0,T.jsx)(N.rU,{className:0===a.cardsCount?g.Z.linkToLearnDisabled:g.Z.linkToLearnActive,to:y.m.LEARN+"/".concat(a._id)})})]},a._id)}))})},w=[{id:"name",label:"Name"},{id:"user_name",label:"Created by"},{id:"cardsCount",label:"Cards"},{id:"updated",label:"Last updated"}],A=function(){var a=(0,d.C)((function(a){return a.packs.status})),e=(0,d.C)(p.l),s=(0,d.C)((function(a){return a.packs.queryParams.pageCount}));return(0,T.jsx)(T.Fragment,{children:e||"loading"===a?(0,T.jsxs)("table",{className:j,children:[(0,T.jsx)(_.E,{heads:w,withActions:!0}),"loading"===a?(0,T.jsx)(C.U,{columnsCount:w.length+1,rowsCount:s}):(0,T.jsx)(D,{heads:w})]}):(0,T.jsx)("p",{className:b,children:"No packs found."})})},q=function(){var a=(0,d.T)(),e=(0,i.v)(),s=(0,n.useState)(!1),p=(0,c.Z)(s,2),C=p[0],_=p[1],b=(0,n.useCallback)((function(){return _(!C)}),[C]);return(0,n.useEffect)((function(){0===Object.keys(e).length&&a((0,m.T4)())}),[]),(0,T.jsxs)("div",{className:u,children:[(0,T.jsxs)("div",{className:k,children:[(0,T.jsx)(r.C,{buttonClick:b}),(0,T.jsx)(l.N,{})]}),(0,T.jsx)(A,{}),(0,T.jsx)(t.$,{}),C&&(0,T.jsx)(o.Y,{isOpened:C,onClose:b})]})}}}]);
//# sourceMappingURL=0.033f524b.chunk.js.map