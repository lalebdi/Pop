(this["webpackJsonppop-web"]=this["webpackJsonppop-web"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(6),r=n.n(s),i=(n(14),n(15),n(9)),o=n(3),l=n(2);function u(e,t,n,c){var a;c&&(a=JSON.stringify(c));var s=new XMLHttpRequest,r="http://127.0.0.1:8000/api".concat(t);s.responseType="json";var i=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");s.open(e,r),s.setRequestHeader("Content-Type","application/json"),i&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",i)),s.onload=function(){403===s.status&&("Authentication credentials were not provided."===s.response.detail&&(window.location.href="/login?showLoginRequired=true"));n(s.response,s.status)},s.onerror=function(e){console.log("error",e),n({message:"The request encoutered an error"},400)},s.send(a)}var d=n(8),j=n(0);function b(e){var t=e.tweet,n=e.action,c=e.didPerformAction,a=t.likes?t.likes:0,s=e.className?e.className:"btn btn-primary btn-sm",r=n.display?n.display:"Action",i=function(e,t){200!==t&&201!==t||!c||c(e,t)},o="like"===n.type?"".concat(a," ").concat(r):r;return Object(j.jsxs)("button",{className:s,onClick:function(e){e.preventDefault(),function(e,t,n){u("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,i)},children:[" ",o," "]})}function f(e){var t=e.tweet;return t.parent?Object(j.jsx)("div",{className:"row",children:Object(j.jsxs)("div",{className:"col-11 mx-auto p-3 border rounded",children:[Object(j.jsx)("p",{className:"mb-0 text-muted small",children:"Repost"}),Object(j.jsx)(m,{hideActions:!0,className:" ",tweet:t.parent})]})}):null}function m(e){var t=e.tweet,n=e.didRetweet,s=e.hideActions,r=Object(c.useState)(e.tweet?e.tweet:null),i=Object(l.a)(r,2),o=i[0],u=i[1],m=e.className?e.className:"col-10 mx-auto col-md-6",p=window.location.pathname.match(Object(d.a)(/([0-9]+)/,{tweetid:1})),O=p?p.groups.tweetid:-1,w="".concat(t.id)==="".concat(O),h=function(e,t){200===t?u(e):201===t&&n&&n(e)};return Object(j.jsxs)("div",{className:m,children:[Object(j.jsxs)("div",{children:[Object(j.jsxs)("p",{children:[t.id," - ",t.content]}),Object(j.jsx)(f,{tweet:t})]}),Object(j.jsxs)("div",{className:"btn btn-group",children:[o&&!0!==s&&Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(b,{tweet:o,didPerformAction:h,action:{type:"like",display:"Likes"}}),Object(j.jsx)(b,{tweet:o,didPerformAction:h,action:{type:"unlike",display:"Unlike"}}),Object(j.jsx)(b,{tweet:o,didPerformAction:h,action:{type:"retweet",display:"Retweet"}})]}),!0===w?null:Object(j.jsx)("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)},children:"View"})]})]})}function p(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),a=n[0],s=n[1],r=Object(c.useState)([]),i=Object(l.a)(r,2),d=i[0],b=i[1],f=Object(c.useState)(!1),p=Object(l.a)(f,2),O=p[0],w=p[1];Object(c.useEffect)((function(){var t=Object(o.a)(e.newTweets).concat(a);t.length!==d.length&&b(t)}),[e.newTweets,d,a]),Object(c.useEffect)((function(){if(!1===O){!function(e,t){var n="/tweets/";e&&(n="/tweets/?username=".concat(e)),u("GET",n,t)}(e.username,(function(e,t){200===t?(s(e),w(!0)):alert("There was an error \ud83e\udd26\ud83c\udffc\u200d\u2640\ufe0f")}))}}),[a,O,w,e.username]);var h=function(e){var t=Object(o.a)(a);t.unshift(e),s(t);var n=Object(o.a)(d);n.unshift(d),b(n)};return d.map((function(e,t){return Object(j.jsx)(m,{tweet:e,didRetweet:h,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))}))}function O(e){var t=a.a.createRef(),n=e.didTweet,c=function(e,t){201===t?n(e):(console.log(e),alert("An error occured \ud83d\ude22 please try again later"))};return Object(j.jsx)("div",{className:e.className,children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;u("POST","/tweets/create/",c,{content:n}),t.current.value=""},children:[Object(j.jsx)("textarea",{className:"form-control",name:"tweet",required:!0,ref:t}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})})}function w(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),a=n[0],s=n[1],r="false"!==e.canCreate;return Object(j.jsxs)("div",{className:e.className,children:[!0===r&&Object(j.jsx)(O,{didTweet:function(e){var t=Object(o.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(j.jsx)(p,Object(i.a)({newTweets:a},e))]})}function h(e){var t=e.tweetId,n=Object(c.useState)(!1),a=Object(l.a)(n,2),s=a[0],r=a[1],i=Object(c.useState)(null),o=Object(l.a)(i,2),d=o[0],b=o[1],f=function(e,t){200===t?b(e):alert("There was an error finding your tweet \ud83d\ude22 ")};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){u("GET","/tweets/".concat(e,"/"),t)}(t,f),r(!0))}),[t,s,r]),null===d?null:Object(j.jsx)(m,{tweet:d,className:e.className})}var v=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)("div",{children:Object(j.jsx)(w,{})})]})})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))},g=document.getElementById("root");g&&r.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(v,{})}),g);var y=a.a.createElement,N=document.getElementById("pop");N&&r.a.render(y(w,N.dataset),N),document.querySelectorAll(".pop-detail").forEach((function(e){r.a.render(y(h,e.dataset),e)})),x()}},[[17,1,2]]]);
//# sourceMappingURL=main.4812dc5b.chunk.js.map