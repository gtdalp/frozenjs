!function(a){function b(b,d){var i=b[h],j=i&&e[i];if(void 0===d)return j||c(b);if(j){if(d in j)return j[d];var k=g(d);if(k in j)return j[k]}return f.call(a(b),d)}function c(b,c,f){var i=b[h]||(b[h]=++a.uuid),j=e[i]||(e[i]=d(b));return void 0!==c&&(j[g(c)]=f),j}function d(b){var c={};return a.each(b.attributes||i,function(b,d){0==d.name.indexOf("data-")&&(c[g(d.name.replace("data-",""))]=a.zepto.deserializeValue(d.value))}),c}var e={},f=a.fn.data,g=a.camelCase,h=a.expando="Zepto"+ +new Date,i=[];a.fn.data=function(d,e){return void 0===e?a.isPlainObject(d)?this.each(function(b,e){a.each(d,function(a,b){c(e,a,b)})}):0 in this?b(this[0],d):void 0:this.each(function(){c(this,d,e)})},a.fn.removeData=function(b){return"string"==typeof b&&(b=b.split(/\s+/)),this.each(function(){var c=this[h],d=c&&e[c];d&&a.each(b||d,function(a){delete d[b?g(this):a]})})},["remove","empty"].forEach(function(b){var c=a.fn[b];a.fn[b]=function(){var a=this.find("*");return"remove"===b&&(a=a.add(this)),a.removeData(),c.call(this)}})}(window.Zepto),!function(a){var b={};b.cache={},a.tpl=function(a,c,d){var e=/[^\w\-\.:]/.test(a)?function(a,b){var c,d=[],f=[];for(c in a)d.push(c),f.push(a[c]);return new Function(d,e.code).apply(b||a,f)}:b.cache[a]=b.cache[a]||this.get(document.getElementById(a).innerHTML);return e.code=e.code||"var $parts=[]; $parts.push('"+a.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/(^|%>)[^\t]*/g,function(a){return a.replace(/'/g,"\\'")}).replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("$parts.push('")+"'); return $parts.join('');",c?e(c,d):e},a.adaptObject=function(b,c,d,e,f,g){var h=b;if("string"!=typeof d){var i=a.extend({},c,"object"==typeof d&&d),j=!1;a.isArray(h)&&h.length&&"script"==a(h)[0].nodeName.toLowerCase()?(h=a(a.tpl(h[0].innerHTML,i)).appendTo("body"),j=!0):a.isArray(h)&&h.length&&""==h.selector?(h=a(a.tpl(h[0].outerHTML,i)).appendTo("body"),j=!0):a.isArray(h)||(h=a(a.tpl(e,i)).appendTo("body"),j=!0)}return h.each(function(){var b=a(this),e=b.data("fz."+g);e||b.data("fz."+g,e=new f(this,a.extend({},c,"object"==typeof d&&d),j)),"string"==typeof d&&e[d]()})}}(window.Zepto),function(a,b){a.tapHandling=!1;var c=function(a){return a.off(".fz.tap")},d=function(c){return c.each(function(){function c(a){b(a.target).trigger("tap",[a,b(a.target).attr("href")]),a.stopPropagation()}function d(a){var b=a.originalEvent||a,c=b.touches||b.targetTouches;return c?[c[0].pageX,c[0].pageY]:null}function e(a){if(a.touches&&a.touches.length>1||a.targetTouches&&a.targetTouches.length>1)return!1;var b=d(a);j=b[0],i=b[1]}function f(a){if(!k){var b=d(a);b&&(Math.abs(i-b[1])>m||Math.abs(j-b[0])>m)&&(k=!0)}}function g(b){if(clearTimeout(h),h=setTimeout(function(){a.tapHandling=!1,k=!1},1e3),!(b.which&&b.which>1||b.shiftKey||b.altKey||b.metaKey||b.ctrlKey)){if(b.preventDefault(),k||a.tapHandling&&a.tapHandling!==b.type)return void(k=!1);a.tapHandling=b.type,c(b)}}var h,i,j,k,l=b(this),m=10;l.bind("touchstart.fz.tap MSPointerDown.fz.tap",e).bind("touchmove.fz.tap MSPointerMove.fz.tap",f).bind("touchend.fz.tap MSPointerUp.fz.tap",g).bind("click.fz.tap",g)})};if(b.event&&b.event.special)b.event.special.tap={add:function(){d(b(this))},remove:function(){c(b(this))}};else{var e=b.fn.on,f=b.fn.off;b.fn.on=function(a){return/(^| )tap( |$)/.test(a)&&(c(this),d(this)),e.apply(this,arguments)},b.fn.off=function(a){return/(^| )tap( |$)/.test(a)&&c(this),f.apply(this,arguments)}}b.fn.tap=function(a){this.on("tap",a)}}(this,Zepto),!function(a){function b(){return!1}function c(b){return a.adaptObject(this,e,b,d,f,"dialog")}var d='<div class="ui-dialog"><div class="ui-dialog-cnt"><div class="ui-dialog-bd"><div><h4><%=title%></h4><div><%=content%></div></div></div><div class="ui-dialog-ft ui-btn-group"><% for (var i = 0; i < button.length; i++) { %><% if (i == select) { %><button type="button" data-role="button"  class="select" id="dialogButton<%=i%>"><%=button[i]%></button><% } else { %><button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div><% } %><% } %></div></div></div>',e={title:"",content:"",button:["确认"],select:0,allowScroll:!1,callback:function(){}},f=function(b,c,d){this.option=a.extend(e,c),this.element=a(b),this._isFromTpl=d,this.button=a(b).find('[data-role="button"]'),this._bindEvent(),this.toggle()};f.prototype={_bindEvent:function(){var b=this;b.button.on("tap",function(){var c=a(b.button).index(a(this)),d=a.Event("dialog:action");d.index=c,b.element.trigger(d),b.hide.apply(b)})},toggle:function(){this.element.hasClass("show")?this.hide():this.show()},show:function(){var c=this;c.element.trigger(a.Event("dialog:show")),c.element.addClass("show"),this.option.allowScroll&&c.element.on("touchmove",b)},hide:function(){var c=this;c.element.trigger(a.Event("dialog:hide")),c.element.off("touchmove",b),c.element.removeClass("show"),c._isFromTpl&&c.element.remove()}},a.fn.dialog=a.dialog=c}(window.Zepto),!function(a){function b(b){return a.adaptObject(this,d,b,c,e,"loading")}var c='<div class="ui-dialog ui-dialog-notice show"><div class="ui-dialog-cnt"><i class="ui-loading-bright"></i><p><%=content%></p></div></div>',d={content:"加载中..."},e=function(b,c,e){this.element=a(b),this._isFromTpl=e,this.option=a.extend(d,c),this.show()};e.prototype={show:function(){var b=a.Event("loading:show");this.element.trigger(b),this.element.show()},hide:function(){var b=a.Event("loading:hide");this.element.trigger(b),this.element.remove()}},a.fn.loading=a.loading=b}(window.Zepto),function(a,b,c,d){function e(a,c){this.wrapper="string"==typeof a?b.querySelector(a):a,this.options={startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,eventPassthrough:"",freeScroll:!1,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0};for(var e in c)this.options[e]=c[e];if("slider"===this.options.role||"tab"===this.options.role?(this.options.scrollX=!0,this.options.scrollY=!1,this.options.momentum=!1,"slider"===this.options.role?(this.scroller=b.querySelector(".ui-slider-content"),this.indicator=this.options.indicator?b.querySelector(".ui-slider-indicators"):null,this.indicator&&d(this.indicator.children[0]).addClass("current")):(this.scroller=b.querySelector(".ui-tab-content"),this.nav=b.querySelector(".ui-tab-nav"),d(this.nav.children[0]).addClass("current")),this.currentPage=0,this.count=this.scroller.children.length,this.itemWidth=this.scroller.children[0].clientWidth,this.scrollWidth=this.itemWidth*this.count):this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.translateZ=f.hasPerspective&&this.options.HWCompositing?" translateZ(0)":"",this.options.useTransition=f.hasTransition&&this.options.useTransition,this.options.useTransform=f.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX,this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?f.ease[this.options.bounceEasing]||f.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable(),this.options.autoplay){var g=this;this.options.interval=this.options.interval||2e3,this.options.flag=setTimeout(function(){g._autoplay.apply(g)},g.options.interval)}}var f=function(){function d(a){return g===!1?!1:""===g?a:g+a.charAt(0).toUpperCase()+a.substr(1)}var e={},f=b.createElement("div").style,g=function(){for(var a,b=["t","webkitT","MozT","msT","OT"],c=0,d=b.length;d>c;c++)if(a=b[c]+"ransform",a in f)return b[c].substr(0,b[c].length-1);return!1}();e.getTime=Date.now||function(){return(new Date).getTime()},e.extend=function(a,b){for(var c in b)a[c]=b[c]},e.addEvent=function(a,b,c,d){a.addEventListener(b,c,!!d)},e.removeEvent=function(a,b,c,d){a.removeEventListener(b,c,!!d)},e.prefixPointerEvent=function(b){return a.MSPointerEvent?"MSPointer"+b.charAt(9).toUpperCase()+b.substr(10):b},e.momentum=function(a,b,d,e,f,g){var h,i,j=a-b,k=c.abs(j)/d;return g=void 0===g?6e-4:g,h=a+k*k/(2*g)*(0>j?-1:1),i=k/g,e>h?(h=f?e-f/2.5*(k/8):e,j=c.abs(h-a),i=j/k):h>0&&(h=f?f/2.5*(k/8):0,j=c.abs(a)+h,i=j/k),{destination:c.round(h),duration:i}};var h=d("transform");return e.extend(e,{hasTransform:h!==!1,hasPerspective:d("perspective")in f,hasTouch:"ontouchstart"in a,hasPointer:a.PointerEvent||a.MSPointerEvent,hasTransition:d("transition")in f}),e.isBadAndroid=/Android /.test(a.navigator.appVersion)&&!/Chrome\/\d/.test(a.navigator.appVersion),e.extend(e.style={},{transform:h,transitionTimingFunction:d("transitionTimingFunction"),transitionDuration:d("transitionDuration"),transitionDelay:d("transitionDelay"),transformOrigin:d("transformOrigin")}),e.offset=function(a){for(var b=-a.offsetLeft,c=-a.offsetTop;a=a.offsetParent;)b-=a.offsetLeft,c-=a.offsetTop;return{left:b,top:c}},e.preventDefaultException=function(a,b){for(var c in b)if(b[c].test(a[c]))return!0;return!1},e.extend(e.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),e.extend(e.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(a){return a*(2-a)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(a){return c.sqrt(1- --a*a)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(a){var b=4;return(a-=1)*a*((b+1)*a+b)+1}},bounce:{style:"",fn:function(a){return(a/=1)<1/2.75?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}},elastic:{style:"",fn:function(a){var b=.22,d=.4;return 0===a?0:1==a?1:d*c.pow(2,-10*a)*c.sin(2*(a-b/4)*c.PI/b)+1}}}),e}();e.prototype={_init:function(){this._initEvents()},_initEvents:function(b){var c=b?f.removeEvent:f.addEvent,d=this.options.bindToWrapper?this.wrapper:a;c(a,"orientationchange",this),c(a,"resize",this),this.options.click&&c(this.wrapper,"click",this,!0),this.options.disableMouse||(c(this.wrapper,"mousedown",this),c(d,"mousemove",this),c(d,"mousecancel",this),c(d,"mouseup",this)),f.hasPointer&&!this.options.disablePointer&&(c(this.wrapper,f.prefixPointerEvent("pointerdown"),this),c(d,f.prefixPointerEvent("pointermove"),this),c(d,f.prefixPointerEvent("pointercancel"),this),c(d,f.prefixPointerEvent("pointerup"),this)),f.hasTouch&&!this.options.disableTouch&&(c(this.wrapper,"touchstart",this),c(d,"touchmove",this),c(d,"touchcancel",this),c(d,"touchend",this)),c(this.scroller,"transitionend",this),c(this.scroller,"webkitTransitionEnd",this),c(this.scroller,"oTransitionEnd",this),c(this.scroller,"MSTransitionEnd",this),"tab"===this.options.role&&(c(this.nav,"touchend",this),c(this.nav,"mouseup",this),c(this.nav,"pointerup",this))},refresh:function(){this.wrapper.offsetHeight;this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight;var b=a.getComputedStyle(this.wrapper,null),c=b["padding-top"].replace(/[^-\d.]/g,""),d=b["padding-bottom"].replace(/[^-\d.]/g,""),e=b["padding-left"].replace(/[^-\d.]/g,""),g=b["padding-right"].replace(/[^-\d.]/g,"");this.scrollerWidth=this.scroller.offsetWidth+parseInt(e)+parseInt(g),this.scrollerHeight=this.scroller.offsetHeight+parseInt(c)+parseInt(d),("slider"===this.options.role||"tab"===this.options.role)&&(this.scrollerWidth=this.scrollWidth),this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=f.offset(this.wrapper),this.resetPosition()},handleEvent:function(a){switch(a.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(a);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(a);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(a);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(a);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(a);break;case"keydown":this._key(a);break;case"click":a._constructed||(a.preventDefault(),a.stopPropagation())}},_start:function(a){if(!(1!=f.eventType[a.type]&&0!==a.button||!this.enabled||this.initiated&&f.eventType[a.type]!==this.initiated)){!this.options.preventDefault||f.isBadAndroid||f.preventDefaultException(a.target,this.options.preventDefaultException)||a.preventDefault();var b,e=a.touches?a.touches[0]:a;if(this.initiated=f.eventType[a.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=f.getTime(),this.options.useTransition&&this.isInTransition?(this.isInTransition=!1,b=this.getComputedPosition(),this._translate(c.round(b.x),c.round(b.y)),d(this.scroller).trigger(d.Event("scrollEnd"))):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,d(this.scroller).trigger(d.Event("scrollEnd"))),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=e.pageX,this.pointY=e.pageY,("slider"===this.options.role||"tab"===this.options.role)&&d(this.scroller).trigger(d.Event("beforeScrollStart")),this.options.autoplay){var g=this;clearTimeout(this.options.flag),this.options.flag=setTimeout(function(){g._autoplay.apply(g)},g.options.interval)}}},_move:function(a){if(this.enabled&&f.eventType[a.type]===this.initiated){this.options.preventDefault&&a.preventDefault();var b,d,e,g,h=a.touches?a.touches[0]:a,i=h.pageX-this.pointX,j=h.pageY-this.pointY,k=f.getTime();if(this.pointX=h.pageX,this.pointY=h.pageY,this.distX+=i,this.distY+=j,e=c.abs(this.distX),g=c.abs(this.distY),!(k-this.endTime>300&&10>e&&10>g)){if(this.directionLocked||this.options.freeScroll||(this.directionLocked=e>g+this.options.directionLockThreshold?"h":g>=e+this.options.directionLockThreshold?"v":"n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)a.preventDefault();else if("horizontal"==this.options.eventPassthrough)return void(this.initiated=!1);j=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)a.preventDefault();else if("vertical"==this.options.eventPassthrough)return void(this.initiated=!1);i=0}i=this.hasHorizontalScroll?i:0,j=this.hasVerticalScroll?j:0,b=this.x+i,d=this.y+j,(b>0||b<this.maxScrollX)&&(b=this.options.bounce?this.x+i/3:b>0?0:this.maxScrollX),(d>0||d<this.maxScrollY)&&(d=this.options.bounce?this.y+j/3:d>0?0:this.maxScrollY),this.directionX=i>0?-1:0>i?1:0,this.directionY=j>0?-1:0>j?1:0,this.moved=!0,this._translate(b,d),k-this.startTime>300&&(this.startTime=k,this.startX=this.x,this.startY=this.y)}}},_end:function(a){if(this.enabled&&f.eventType[a.type]===this.initiated){this.options.preventDefault&&!f.preventDefaultException(a.target,this.options.preventDefaultException)&&a.preventDefault();var b,e,g=(a.changedTouches?a.changedTouches[0]:a,f.getTime()-this.startTime),h=c.round(this.x),i=c.round(this.y),j=c.abs(h-this.startX),k=(c.abs(i-this.startY),0),l="";if(this.isInTransition=0,this.initiated=0,this.endTime=f.getTime(),!this.resetPosition(this.options.bounceTime)){if(this.scrollTo(h,i),this.options.momentum&&300>g&&(b=this.hasHorizontalScroll?f.momentum(this.x,this.startX,g,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:h,duration:0},e=this.hasVerticalScroll?f.momentum(this.y,this.startY,g,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:i,duration:0},h=b.destination,i=e.destination,k=c.max(b.duration,e.duration),this.isInTransition=1),h!=this.x||i!=this.y)return(h>0||h<this.maxScrollX||i>0||i<this.maxScrollY)&&(l=f.ease.quadratic),void this.scrollTo(h,i,k,l);"tab"===this.options.role&&d(event.target.parentNode).hasClass("ui-tab-nav")&&(d(this.nav).children().removeClass("current"),d(event.target).addClass("current"),this.currentPage=d(event.target).index()),("slider"===this.options.role||"tab"===this.options.role)&&(50>j?this.scrollTo(-this.itemWidth*this.currentPage,0,this.options.bounceTime,this.options.bounceEasing):h-this.startX<0?this.scrollTo(-this.itemWidth*++this.currentPage,0,this.options.bounceTime,this.options.bounceEasing):h-this.startX>=0&&this.scrollTo(-this.itemWidth*--this.currentPage,0,this.options.bounceTime,this.options.bounceEasing),this.indicator&&j>=50?(d(this.indicator).children().removeClass("current"),d(this.indicator.children[this.currentPage]).addClass("current")):this.nav&&j>=50&&(d(this.nav).children().removeClass("current"),d(this.nav.children[this.currentPage]).addClass("current")),d(this.scroller).trigger(d.Event("scrollEnd")))}}},_resize:function(){var a=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){a.refresh()},this.options.resizePolling)},_transitionEnd:function(a){a.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,d(this.scroller).trigger(d.Event("scrollEnd"))))},destroy:function(){this._initEvents(!0)},resetPosition:function(a){var b=this.x,c=this.y;return a=a||0,!this.hasHorizontalScroll||this.x>0?b=0:this.x<this.maxScrollX&&(b=this.maxScrollX),!this.hasVerticalScroll||this.y>0?c=0:this.y<this.maxScrollY&&(c=this.maxScrollY),b==this.x&&c==this.y?!1:(this.scrollTo(b,c,a,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},scrollTo:function(a,b,c,d){d=d||f.ease.circular,this.isInTransition=this.options.useTransition&&c>0,!c||this.options.useTransition&&d.style?(this.scrollerStyle[f.style.transitionTimingFunction]=d.style,this._transitionTime(c),this._translate(a,b)):console.err("browser dont support transform & transition")},_transitionTime:function(a){a=a||0,this.scrollerStyle[f.style.transitionDuration]=a+"ms",!a&&f.isBadAndroid&&(this.scrollerStyle[f.style.transitionDuration]="0.001s")},_translate:function(a,b){this.options.useTransform?this.scrollerStyle[f.style.transform]="translate("+a+"px,"+b+"px)"+this.translateZ:(a=c.round(a),b=c.round(b),this.scrollerStyle.left=a+"px",this.scrollerStyle.top=b+"px"),this.x=a,this.y=b},getComputedPosition:function(){var b,c,d=a.getComputedStyle(this.scroller,null);return this.options.useTransform?(d=d[f.style.transform].split(")")[0].split(", "),b=+(d[12]||d[4]),c=+(d[13]||d[5])):(b=+d.left.replace(/[^-\d.]/g,""),c=+d.top.replace(/[^-\d.]/g,"")),{x:b,y:c}},_autoplay:function(){var a=this;a.currentPage=a.currentPage>=a.count-1?0:++a.currentPage,a.scrollTo(-a.itemWidth*a.currentPage,0,a.options.bounceTime,a.options.bounceEasing),a.indicator?(d(a.indicator).children().removeClass("current"),d(a.indicator.children[a.currentPage]).addClass("current")):a.nav&&(d(a.nav).children().removeClass("current"),d(a.nav.children[a.currentPage]).addClass("current")),a.options.flag=setTimeout(function(){a._autoplay.apply(a)},a.options.interval)}},e.utils=f,a.Scroll=e,"function"==typeof define&&define(function(a,b,c){c.exports=e})}(window,document,Math,window.Zepto),!function(a){function b(b){return a.adaptObject(this,d,b,c,e,"tips")}var c='<div class="ui-poptips ui-poptips-<%=type%>"><div class="ui-poptips-cnt"><i></i><%=content%></div></div>',d={content:"",stayTime:1e3,type:"info",callback:function(){}},e=function(b,c,e){var f=this;this.element=a(b),this._isFromTpl=e,this.elementHeight=a(b).height(),this.option=a.extend(d,c),a(b).css({"-webkit-transform":"translateY(-"+this.elementHeight+"px)"}),setTimeout(function(){a(b).css({"-webkit-transition":"all .5s"}),f.show()},20)};e.prototype={show:function(){var b=this;b.element.trigger(a.Event("tips:show")),this.element.css({"-webkit-transform":"translateY(0px)"}),b.option.stayTime>0&&setTimeout(function(){b.hide()},b.option.stayTime)},hide:function(){var b=this;b.element.trigger(a.Event("tips:hide")),this.element.css({"-webkit-transform":"translateY(-"+this.elementHeight+"px)"}),setTimeout(function(){b._isFromTpl&&b.element.remove()},500)}},a.fn.tips=a.tips=b}(window.Zepto);