(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{583:function(t,r,o){var content=o(642);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(23).default)("3121b1cb",content,!0,{sourceMap:!1})},641:function(t,r,o){"use strict";o(583)},642:function(t,r,o){var e=o(22)(!1);e.push([t.i,".elo-chart-card[data-v-44a46ace]{max-width:800px;margin:auto!important}.disable-link-style[data-v-44a46ace]{text-decoration:none!important}",""]),t.exports=e},672:function(t,r,o){"use strict";o.r(r);var e={components:{EloChartCard:o(588).default},data:function(){return{chartNum:1}},head:function(){var t=this.$route.query.chartDispId;return{meta:[{hid:"og:description",property:"og:description",content:"ELO log for AoEIV"},{hid:"og:url",property:"og:url",content:"https://www.aoe4stats.net/"},{hid:"og:image",property:"og:image",content:t?"https://www.aoe4stats.net/api/elo_chart_snapshot/".concat(t):"https://www.aoe4stats.net/aoe4_stats_logo.png"}]}},methods:{onClickedAddChart:function(){this.chartNum++}}},n=(o(641),o(92)),c=o(119),l=o.n(c),d=o(178),h=o(660),v=o(177),w=o(661),component=Object(n.a)(e,(function(){var t=this,r=t.$createElement,o=t._self._c||r;return o("v-row",{attrs:{justify:"center",align:"center"}},[o("v-col",{attrs:{md:"10",sm:"12"}},[t._l(t.chartNum,(function(t){return o("div",{key:t,staticClass:"mb-3"},[o("EloChartCard",{staticClass:"elo-chart-card",attrs:{"chart-id":t}})],1)})),t._v(" "),o("v-row",[o("v-col",{staticClass:"text-center"},[o("v-btn",{attrs:{color:"success"},on:{click:function(r){return r.preventDefault(),t.onClickedAddChart.apply(null,arguments)}}},[o("v-icon",{attrs:{left:""}},[t._v("\n            mdi-plus\n          ")]),t._v("\n          Add Chart\n        ")],1)],1)],1),t._v(" "),o("v-row",{staticClass:"mt-16 text-right",attrs:{dense:""}},[o("v-col",{attrs:{cols:"12"}},[t._v("\n        Developed by\n        "),o("a",{staticClass:"disable-link-style",attrs:{href:"https://twitter.com/yukapero_com",target:"_blank"}},[o("v-icon",{staticStyle:{color:"#6262ff"},attrs:{right:""}},[t._v("\n            mdi-twitter\n          ")]),t._v("\n          @yukapero_com\n        ")],1)]),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("div",[t._v("Icons made by "),o("a",{attrs:{href:"https://www.flaticon.com/authors/gregor-cresnar",title:"Gregor Cresnar"}},[t._v("Gregor\n          Cresnar")]),t._v(" from "),o("a",{attrs:{href:"https://www.flaticon.com/",title:"Flaticon"}},[t._v("www.flaticon.com")])])])],1)],2)],1)}),[],!1,null,"44a46ace",null);r.default=component.exports;l()(component,{EloChartCard:o(588).default}),l()(component,{VBtn:d.a,VCol:h.a,VIcon:v.a,VRow:w.a})}}]);