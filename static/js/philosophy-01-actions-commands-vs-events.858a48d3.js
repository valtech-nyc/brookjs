(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"./docs/philosophy/01-actions-commands-vs-events.mdx":function(e,a,n){"use strict";n.r(a);var t=n("./node_modules/react/index.js"),m=n.n(t),o=n("./node_modules/@mdx-js/tag/dist/index.js");a.default=function(e){var a=e.components;return m.a.createElement(o.MDXTag,{name:"wrapper",components:a},m.a.createElement(o.MDXTag,{name:"h1",components:a,props:{id:"actions-commands-vs-events"}},m.a.createElement(o.MDXTag,{name:"a",components:a,parentName:"h1",props:{"aria-hidden":!0,href:"#actions-commands-vs-events"}},m.a.createElement(o.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon-link"}},"#")),"Actions: Commands vs Events"),m.a.createElement(o.MDXTag,{name:"ul",components:a},m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},m.a.createElement(o.MDXTag,{name:"p",components:a,parentName:"li"},'Events are "something happened"'),m.a.createElement(o.MDXTag,{name:"ul",components:a,parentName:"li"},m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"Context"))),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},'Commands are "do this thing"'),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},m.a.createElement(o.MDXTag,{name:"p",components:a,parentName:"li"},"Everything is controlled in the Redux store"),m.a.createElement(o.MDXTag,{name:"ul",components:a,parentName:"li"},m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"All state + behavior described in pure functions"),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"Application logic exists in pure, testable store"))),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},m.a.createElement(o.MDXTag,{name:"p",components:a,parentName:"li"},"All delta-managed side effects are commands in, events out"),m.a.createElement(o.MDXTag,{name:"ul",components:a,parentName:"li"},m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"translate commands -> side effects"),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"emit events when things happen"),m.a.createElement(o.MDXTag,{name:"li",components:a,parentName:"ul"},"Replace deltas or view layer with zero disruption to rest of application")))))}}}]);