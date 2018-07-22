(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"./docs/walkthrough/07-commands-and-side-effects.mdx":function(e,a,t){"use strict";t.r(a);var n=t("./node_modules/react/index.js"),o=t.n(n),m=t("./node_modules/@mdx-js/tag/dist/index.js");a.default=function(e){var a=e.components;return o.a.createElement(m.MDXTag,{name:"wrapper",components:a},o.a.createElement(m.MDXTag,{name:"h1",components:a,props:{id:"commands--side-effects"}},o.a.createElement(m.MDXTag,{name:"a",components:a,parentName:"h1",props:{"aria-hidden":!0,href:"#commands--side-effects"}},o.a.createElement(m.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon-link"}},"#")),"Commands & Side Effects"),o.a.createElement(m.MDXTag,{name:"ul",components:a},o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Save todo logic"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Add store enhancer to Redux store"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Update reducer to return command"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(m.MDXTag,{name:"p",components:a,parentName:"li"},"Note on testability"),o.a.createElement(m.MDXTag,{name:"ul",components:a,parentName:"li"},o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Returns ",o.a.createElement(m.MDXTag,{name:"em",components:a,parentName:"li"},"description")," of side effect"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},'"what happened" vs "what happens next"'),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Logic of how application changes over time remains in store"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Still easy to test"))),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},o.a.createElement(m.MDXTag,{name:"p",components:a,parentName:"li"},"Add delta to respond to command"),o.a.createElement(m.MDXTag,{name:"ul",components:a,parentName:"li"},o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Wait 3 seconds and emit failure or success randomly"))),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"Add success checkbox or error message"),o.a.createElement(m.MDXTag,{name:"li",components:a,parentName:"ul"},"CodeSandbox example")),o.a.createElement(m.MDXTag,{name:"p",components:a},"To handle custom side effects, create a custom delta. To do so, create a function that takes an options object and returns a function that takes a stream of ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"actions$")," and ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"state$"),". The returned function should return its own stream of ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"actions$")," that will be piped into the store."),o.a.createElement(m.MDXTag,{name:"p",components:a},o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"observeDelta")," also comes with a helper function for use with Kefir's ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"thru")," method. ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"ofType")," takes a varying number of string constants to compare against ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"action.type")," and returns a function that can be passed to ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"thru"),". This function will filter the provided observable by the provided types. See below for an example."),o.a.createElement(m.MDXTag,{name:"pre",components:a},o.a.createElement(m.MDXTag,{name:"code",components:a,parentName:"pre",props:{className:"language-js"}},"import { Kefir, ofType } from 'brookjs';\nimport { SUBMIT_FORM, formSubmitSuccess, formSubmitFail } from './actions';\n\nexport default function ajaxDelta({ ajax }) {\n    return (actions$, state$) => actions$.thru(ofType(SUBMIT_FORM))\n        .flatMap(action => ajax.post('/api', action.payload))\n        .map(formSubmitted)\n        .flatMapErrors(err => Kefir.constant(formSubmitFail(err)))\n}\n")),o.a.createElement(m.MDXTag,{name:"p",components:a},"Providing the ajax service through the ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"ajaxDelta")," options object keeps the delta pure, making it easier to test that the delta functions as expected without having to mock the XMLHttpRequest object itself. The ",o.a.createElement(m.MDXTag,{name:"inlineCode",components:a,parentName:"p"},"ajax")," service itself can then be isolated and tested against the mock object, reducing the amount of work done by each set of unit tests."),o.a.createElement(m.MDXTag,{name:"h2",components:a,props:{id:"note-about-immediate-actions"}},o.a.createElement(m.MDXTag,{name:"a",components:a,parentName:"h2",props:{"aria-hidden":!0,href:"#note-about-immediate-actions"}},o.a.createElement(m.MDXTag,{name:"span",components:a,parentName:"a",props:{className:"icon-link"}},"#")),"Note About Immediate Actions"),o.a.createElement(m.MDXTag,{name:"p",components:a},"If you need to emit an action immediately, ensure you're not doing so on the synchronous generation of the delta stream, e.g. route parsing or cookie reading usually handled on application startup. If you do, you may run into odd behavior, as the delta has not yet been fully plugged together and may result in actions either not getting dispatched properly to other deltas or even the store itself. As recommended in ",o.a.createElement(m.MDXTag,{name:"a",components:a,parentName:"p",props:{href:"bootstrapping-the-application.html"}},'"bootstrapping the application"'),', use an "INIT" action of some kind and respond to that to handle these initial reads.'))}}}]);