(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0160":function(t,e,i){},1681:function(t,e,i){},"183b":function(t,e,i){t.exports=i.p+"img/clouds.61473661.jpg"},"4bd4":function(t,e,i){"use strict";var s=i("5530"),a=(i("caad"),i("2532"),i("07ac"),i("4de4"),i("d3b7"),i("159b"),i("7db0"),i("58df")),n=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(n["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},s={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?s.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(s.valid=i(t)))})):s.valid=i(t),s},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(s["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"94aa":function(t,e,i){},a844:function(t,e,i){"use strict";var s=i("5530"),a=(i("a9e3"),i("1681"),i("8654")),n=i("58df"),r=Object(n["a"])(a["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},a["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){a["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ab22:function(t,e,i){t.exports=i.p+"img/vortex.9b7e071f.png"},f820:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-row",[s("v-spacer"),s("v-col",{staticClass:"mx-md-4 py-4",attrs:{cols:"12",color:"white",elevation:"4"}},[s("h2",{staticClass:"display-2 font-weight-bold mb-4"},[t._v("About")]),s("p",[t._v(" Weather Vortex is a project that aims to provide the user a unique service to check all the weather forecasts and paragonate them. ")]),s("p",[t._v(" Starting from this need, this platform was created. Here it's possible to semplify everyday decisions that are weather-based. ")]),s("p",[t._v(" This can lead to a huge amount of time saved and to a better organization. ")]),s("p",[t._v(' On the other hand, the user can also customize his experience adding Iot devices to "trust" and leave feedbacks to all the services available. ')])]),s("v-spacer")],1),s("v-parallax",{staticClass:"my-3",attrs:{height:"300",dark:"",src:i("183b")}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"text-h4 font-weight-thin mb-4",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Weather Vortex "),s("br"),t._v("Comparison ")]),s("h4",{staticClass:"subheading",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Take the right decision, today! ")])])],1)],1),s("v-row",{staticClass:"timeline"},[s("v-spacer"),s("v-col",{attrs:{cols:"12"}},[s("h3",{staticClass:"display-1 font-weight-bold my-4"},[t._v("Timeline")]),s("Timeline")],1),s("v-spacer")],1),s("v-parallax",{staticClass:"my-3",attrs:{height:"300",dark:"",src:i("183b")}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"text-h4 font-weight-thin mb-4",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Weather Vortex "),s("br"),t._v("Feedbacks ")]),s("h4",{staticClass:"subheading",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Choose who to trust! ")])])],1)],1),s("v-row",{staticClass:"meet my-3"},[s("v-spacer"),s("v-col",{attrs:{cols:"12"}},[s("h3",{staticClass:"display-1 font-weight-bold my-4"},[t._v("Meet the Team")]),s("MeetTeam")],1),s("v-spacer")],1),s("v-parallax",{staticClass:"my-3",attrs:{height:"300",dark:"",src:i("183b")}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"text-h4 font-weight-thin mb-4",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Weather Vortex "),s("br"),t._v("Iot ")]),s("h4",{staticClass:"subheading",staticStyle:{"text-shadow":"1px 1px 2px black"}},[t._v(" Full customizable experience! "),s("br"),t._v(" Add your Iot stations, choose your favourite position, get notified! ")])])],1)],1),s("v-row",{staticClass:"contact"},[s("v-spacer"),s("v-col",{attrs:{cols:"12"}},[s("h3",{staticClass:"display-1 font-weight-bold mt-4",attrs:{id:"contact-us"}},[t._v(" Contact Us ")]),s("ContactUs")],1),s("v-spacer")],1)],1)},a=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-row",{staticClass:"my-4",attrs:{align:"center",justify:"center"}},[i("v-spacer",{staticClass:"d-none d-md-block"}),t._l(t.peopleTeam,(function(e,s){return i("v-col",{key:s,staticClass:"d-flex"},[i("PersonCard",t._b({},"PersonCard",e,!1))],1)})),i("v-spacer",{staticClass:"d-none d-md-block"})],2)},r=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"mx-auto",attrs:{"max-width":"234",tile:""}},[i("a",{attrs:{href:t.ghLink}},[i("v-row",{staticClass:"fill-height",attrs:{align:"end"}},[i("v-col",{staticClass:"pa-0",attrs:{"align-self":"start",cols:"12"}},[i("v-avatar",{staticClass:"profile",attrs:{color:"grey",size:"114",tile:""}},[i("v-img",{attrs:{src:t.ghLink+".png"}})],1)],1),i("v-col",{staticClass:"py-0"},[i("v-list-item",{attrs:{dark:""}},[i("v-list-item-content",{staticClass:"secondary"},[i("v-list-item-title",{staticClass:"text-h6"},[t._v(" "+t._s(t.name)+" ")]),i("v-list-item-subtitle",[t._v(t._s(t.description))])],1)],1)],1)],1)],1)])},l=[],c={name:"PersonCard",props:{name:String,ghLink:String,description:String}},h=c,u=i("2877"),d=i("6544"),m=i.n(d),p=i("8212"),v=i("b0af"),f=i("62ad"),g=i("adda"),b=i("da13"),w=i("5d23"),x=i("0fd9"),C=Object(u["a"])(h,o,l,!1,null,null,null),y=C.exports;m()(C,{VAvatar:p["a"],VCard:v["a"],VCol:f["a"],VImg:g["a"],VListItem:b["a"],VListItemContent:w["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VRow:x["a"]});var _={name:"MeetTeam",components:{PersonCard:y},data:function(){return{peopleTeam:[{name:"Silvia Zandoli",ghLink:"https://github.com/silviazandoli",description:"Unibo Student"},{name:"Igor Lirussi",ghLink:"https://www.github.com/igor-lirussi",description:"Unibo Student"},{name:"Daniele Tentoni",ghLink:"https://github.com/Daniele-Tentoni",description:"Unibo Student"}]}}},V=_,k=i("2fa4"),T=Object(u["a"])(V,n,r,!1,null,null,null),$=T.exports;m()(T,{VCol:f["a"],VRow:x["a"],VSpacer:k["a"]});var B=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("v-row",{staticClass:"row mb-4",attrs:{justify:"center",align:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12",sm:"8",md:"4",xs:"4"}},[s("v-img",{attrs:{src:i("ab22"),alt:"Weather Vortex logo",contain:"",height:"100"}}),s("p",{staticClass:"font-italic"},[t._v("Please feel free to send us an email:")]),s("v-form",{ref:"form",staticClass:"mx-2",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-row",[s("v-col",{staticClass:"my-0 py-0",attrs:{cols:"12"}},[s("v-text-field",{attrs:{tabindex:"1",outlined:"",rules:t.emailRules,label:"Your Email","prepend-inner-icon":"mdi-email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),s("v-row",[s("v-col",{staticClass:"my-0 py-0",attrs:{cols:"12"}},[s("v-select",{attrs:{tabindex:"2",items:t.items,outlined:"",rules:[function(t){return!!t||"Email Type is required"}],label:"Type",required:""},model:{value:t.select,callback:function(e){t.select=e},expression:"select"}})],1)],1),s("v-row",[s("v-col",{staticClass:"my-0 py-0",attrs:{cols:"12"}},[s("v-textarea",{attrs:{tabindex:"3","auto-grow":"",outlined:"",rules:t.textRules,label:"Your text",required:"",rows:"4","row-height":"30"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1)],1),s("v-btn",{staticClass:" my-4",attrs:{tabindex:"4",color:"primary","x-large":"",block:""},on:{click:t.submitForm}},[s("v-icon",{staticClass:"mb-1 mr-2"},[t._v(" mdi-email-send ")]),s("b",[t._v("Send")])],1)],1)],1)],1)],1)},S=[],I=(i("ac1f"),i("00b4"),{name:"MeetTeam",data:function(){return{email:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||"E-mail must be valid"}],text:"",textRules:[function(t){return!!t||"Email Text is required"}],select:null,items:["Question","Bug","Enhancement","Congrats"]}},methods:{submitForm:function(){var t=this;if(this.$refs.form.validate()){var e="https://weather-vortex-server.herokuapp.com",i="".concat(e,"/users/contact");this.$http.post(i,{email:this.email,select:this.select,text:this.text}).then((function(e){t.$alert("The email has been sent!","Success","success"),console.log(e)})).catch((function(e){var i="<strong>Submission</strong>&nbsp;error";t.$alert("Error during the submission of the form",i,"error"),console.log(e)}))}}}}),E=I,j=i("8336"),O=i("a523"),H=i("4bd4"),D=i("132d"),z=i("b974"),L=i("8654"),R=i("a844"),F=Object(u["a"])(E,B,S,!1,null,null,null),N=F.exports;m()(F,{VBtn:j["a"],VCol:f["a"],VContainer:O["a"],VForm:H["a"],VIcon:D["a"],VImg:g["a"],VRow:x["a"],VSelect:z["a"],VTextField:L["a"],VTextarea:R["a"]});var P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-timeline",{attrs:{dense:t.$vuetify.breakpoint.smAndDown}},t._l(t.items,(function(e,s){return i("v-timeline-item",{key:s,staticClass:"px-9",attrs:{color:e.color,icon:e.icon,"fill-dot":""}},[i("span",{class:"headline font-weight-bold ",attrs:{slot:"opposite"},domProps:{textContent:t._s(e.date)},slot:"opposite"}),i("v-card",{attrs:{color:e.color,dark:""}},[i("v-card-title",{staticClass:"text-h6"},[t._v(" "+t._s(e.title)+" ")]),i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",md:"10"}},[t._v(" "+t._s(e.text)+" ")]),i("v-col",{staticClass:"hidden-sm-and-down text-right",attrs:{md:"2"}},[i("v-icon",{attrs:{size:"64"}},[t._v(" "+t._s(e.icon)+" ")])],1)],1)],1)],1)],1)})),1)},A=[],U={data:function(){return{items:[{color:"primary darken-3",icon:"mdi-star",date:"06/2021",title:"Idea",text:"The idea is born. No platforms currently offer a service like this. The team investigates the possibility for for creation and the business market."},{color:"primary darken-2",icon:"mdi-weather-night",date:"07/2021",title:"Creation",text:"The Team starts to develop the platfrom, starting from MockUps and User Stories. The design is User Centered. "},{color:"primary lighten-1",icon:"mdi-weather-sunset",date:"08/2021",title:"Online!",text:"The platform is finally online. Starting from this point many and many refinements will be carried on to reache the result you see today."},{color:"primary",icon:"mdi-weather-sunny",date:"Future?",title:"A new Service to the People",text:"In the future we want to keep providing our services to the customers, to develop better and better solutions to the users, and to reach new people."}]}}},M=U,q=i("99d9"),G=i("5530"),W=(i("0160"),i("58df")),Y=i("7560"),Z=Object(W["a"])(Y["a"]).extend({name:"v-timeline",provide:function(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes:function(){return Object(G["a"])({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse},this.themeClasses)}},render:function(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}}),J=(i("c96a"),i("9d26")),K=i("a9ad"),Q=Object(W["a"])(K["a"],Y["a"]),X=Q.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(J["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var t=this.setBackgroundColor(this.color);return this.$createElement("div",Object(G["a"])({staticClass:"v-timeline-item__inner-dot"},t),[this.hasIcon&&this.genIcon()])},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider:function(){var t=[];return this.hideDot||t.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},t)},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render:function(t){var e=[this.genBody(),this.genDivider()];return this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:Object(G["a"])({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right},this.themeClasses)},e)}}),tt=Object(u["a"])(M,P,A,!1,null,null,null),et=tt.exports;m()(tt,{VCard:v["a"],VCardTitle:q["d"],VCol:f["a"],VContainer:O["a"],VIcon:D["a"],VRow:x["a"],VTimeline:Z,VTimelineItem:X});var it={name:"About",components:{MeetTeam:$,ContactUs:N,Timeline:et},data:function(){return{}}},st=it,at=(i("a9e3"),i("94aa"),i("2b0e")),nt=at["a"].extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}}),rt=Object(W["a"])(nt),ot=rt.extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String,srcset:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$refs.img;e&&(e.complete?(this.translate(),this.listeners()):e.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e={staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,srcset:this.srcset,alt:this.alt},ref:"img"},i=t("div",{staticClass:"v-parallax__image-container"},[t("img",e)]),s=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[i,s])}}),lt=Object(u["a"])(st,s,a,!1,null,null,null);e["default"]=lt.exports;m()(lt,{VCol:f["a"],VContainer:O["a"],VParallax:ot,VRow:x["a"],VSpacer:k["a"]})}}]);
//# sourceMappingURL=about.6c8ccb13.js.map