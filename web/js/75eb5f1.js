(function(q,n,f,y){var v=f(q),o=f(n),b=f.fancybox=function(){b.open.apply(this,arguments)},E=null,p=n.createTouch!==y,B=function(a){return a&&a.hasOwnProperty&&a instanceof f},t=function(a){return a&&f.type(a)==="string"},s=function(a){return t(a)&&a.indexOf("%")>0},l=function(a,c){var e=parseInt(a,10);if(c&&s(a))e=b.getViewport()[c]/100*e;return Math.ceil(e)},r=function(a,c){return l(a,c)+"px"};f.extend(b,{version:"2.1.0",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,
maxWidth:9999,maxHeight:9999,autoSize:true,autoHeight:false,autoWidth:false,autoResize:!p,autoCenter:!p,fitToView:true,aspectRatio:false,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:true,closeBtn:true,closeClick:false,nextClick:false,mouseWheel:true,autoPlay:false,playSpeed:3E3,preload:3,modal:false,loop:true,ajax:{dataType:"html",headers:{"X-fancyBox":true}},iframe:{scrolling:"auto",preload:true},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",
34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:true,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"'+
(f.browser.msie?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",
openOpacity:true,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:true,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{closeClick:true,speedOut:200,showEarly:true,css:{}},title:{type:"float"}},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,
afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:false,isOpen:false,isOpened:false,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:false},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,c){if(a){f.isPlainObject(c)||(c={});if(false!==b.close(true)){f.isArray(a)||(a=B(a)?f(a).get():[a]);f.each(a,function(e,d){var h={},g,i,j,k,m;if(f.type(d)==="object"){if(d.nodeType)d=f(d);if(B(d)){h={href:d.attr("href"),title:d.attr("title"),
isDom:true,element:d};f.metadata&&f.extend(true,h,d.metadata())}else h=d}g=c.href||h.href||(t(d)?d:null);i=c.title!==y?c.title:h.title||"";k=(j=c.content||h.content)?"html":c.type||h.type;if(!k&&h.isDom){k=d.data("fancybox-type");if(!k)k=(k=d.prop("class").match(/fancybox\.(\w+)/))?k[1]:null}if(t(g)){if(!k)if(b.isImage(g))k="image";else if(b.isSWF(g))k="swf";else if(g.charAt(0)==="#")k="inline";else if(t(d)){k="html";j=d}if(k==="ajax"){m=g.split(/\s+/,2);g=m.shift();m=m.shift()}}if(!j)if(k==="inline")if(g)j=
f(t(g)?g.replace(/.*(?=#[^\s]+$)/,""):g);else{if(h.isDom)j=d}else if(k==="html")j=g;else if(!k&&!g&&h.isDom){k="inline";j=d}f.extend(h,{href:g,type:k,content:j,title:i,selector:m});a[e]=h});b.opts=f.extend(true,{},b.defaults,c);if(c.keys!==y)b.opts.keys=c.keys?f.extend({},b.defaults.keys,c.keys):false;b.group=a;return b._start(b.opts.index)}}},cancel:function(){var a=b.coming;if(!(!a||false===b.trigger("onCancel"))){b.hideLoading();b.ajaxLoad&&b.ajaxLoad.abort();b.ajaxLoad=null;if(b.imgPreload)b.imgPreload.onload=
b.imgPreload.onerror=null;a.wrap&&a.wrap.stop(true).trigger("onReset").remove();b.current||b.trigger("afterClose");b.coming=null}},close:function(a){b.cancel();if(false!==b.trigger("beforeClose")){b.unbindEvents();if(!b.isOpen||a===true){f(".fancybox-wrap").stop(true).trigger("onReset").remove();b._afterZoomOut()}else{b.isOpen=b.isOpened=false;b.isClosing=true;f(".fancybox-item, .fancybox-nav").remove();b.wrap.stop(true,true).removeClass("fancybox-opened");b.wrap.css("position")==="fixed"&&b.wrap.css(b._getPosition(true));
b.transitions[b.current.closeMethod]()}}},play:function(a){var c=function(){clearTimeout(b.player.timer)},e=function(){c();if(b.current&&b.player.isActive)b.player.timer=setTimeout(b.next,b.current.playSpeed)},d=function(){c();f("body").unbind(".player");b.player.isActive=false;b.trigger("onPlayEnd")};if(a===true||!b.player.isActive&&a!==false){if(b.current&&(b.current.loop||b.current.index<b.group.length-1)){b.player.isActive=true;f("body").bind({"afterShow.player onUpdate.player":e,"onCancel.player beforeClose.player":d,
"beforeLoad.player":c});e();b.trigger("onPlayStart")}}else d()},next:function(a){var c=b.current;if(c){if(!t(a))a=c.direction.next;b.jumpto(c.index+1,a,"next")}},prev:function(a){var c=b.current;if(c){if(!t(a))a=c.direction.prev;b.jumpto(c.index-1,a,"prev")}},jumpto:function(a,c,e){var d=b.current;if(d){a=l(a);b.direction=c||d.direction[a>=d.index?"next":"prev"];b.router=e||"jumpto";if(d.loop){if(a<0)a=d.group.length+a%d.group.length;a%=d.group.length}if(d.group[a]!==y){b.cancel();b._start(a)}}},
reposition:function(a,c){var e;if(b.isOpen){e=b._getPosition(c);if(a&&a.type==="scroll"){delete e.position;b.wrap.stop(true,true).animate(e,200)}else b.wrap.css(e)}},update:function(a){var c=a&&a.type,e=!c||c==="orientationchange";if(e){clearTimeout(E);E=null}if(!(!b.isOpen||E)){if(e||p){b.wrap.removeAttr("style").addClass("fancybox-tmp");b.trigger("onUpdate")}E=setTimeout(function(){var d=b.current;if(d){b.wrap.removeClass("fancybox-tmp");c!=="scroll"&&b._setDimension();c==="scroll"&&d.canShrink||
b.reposition(a);b.trigger("onUpdate");E=null}},p?500:e?20:300)}},toggle:function(a){if(b.isOpen){b.current.fitToView=f.type(a)==="boolean"?a:!b.current.fitToView;b.update()}},hideLoading:function(){o.unbind("keypress.fb");f("#fancybox-loading").remove()},showLoading:function(){var a,c;b.hideLoading();o.bind("keypress.fb",function(e){if((e.which||e.keyCode)===27){e.preventDefault();b.cancel()}});a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");if(!b.defaults.fixed){c=
b.getViewport();a.css({position:"absolute",top:c.h*0.5+c.y,left:c.w*0.5+c.x})}},getViewport:function(){var a=b.current?b.current.locked:false,c={x:v.scrollLeft(),y:v.scrollTop()};if(a){c.w=a[0].clientWidth;c.h=a[0].clientHeight}else{c.w=p&&q.innerWidth?q.innerWidth:v.width();c.h=p&&q.innerHeight?q.innerHeight:v.height()}return c},unbindEvents:function(){b.wrap&&B(b.wrap)&&b.wrap.unbind(".fb");o.unbind(".fb");v.unbind(".fb")},bindEvents:function(){var a=b.current,c;if(a){v.bind("orientationchange.fb"+
(p?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update);(c=a.keys)&&o.bind("keydown.fb",function(e){var d=e.which||e.keyCode,h=e.target||e.srcElement;if(!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey&&!(h&&(h.type||f(h).is("[contenteditable]"))))f.each(c,function(g,i){if(a.group.length>1&&i[d]!==y){b[g](i[d]);e.preventDefault();return false}if(f.inArray(d,i)>-1){b[g]();e.preventDefault();return false}})});f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(e,d,h,g){for(var i=
f(e.target||null),j=false;i.length;){if(j||i.is(".fancybox-skin")||i.is(".fancybox-wrap"))break;j=i[0]&&!(i[0].style.overflow&&i[0].style.overflow==="hidden")&&(i[0].clientWidth&&i[0].scrollWidth>i[0].clientWidth||i[0].clientHeight&&i[0].scrollHeight>i[0].clientHeight);i=f(i).parent()}if(d!==0&&!j)if(b.group.length>1&&!a.canShrink){if(g>0||h>0)b.prev(g>0?"down":"left");else if(g<0||h<0)b.next(g<0?"up":"right");e.preventDefault()}})}},trigger:function(a,c){var e,d=c||b.coming||b.current;if(d){if(f.isFunction(d[a]))e=
d[a].apply(d,Array.prototype.slice.call(arguments,1));if(e===false)return false;if(a==="onCancel"&&!b.isOpened)b.isActive=false;d.helpers&&f.each(d.helpers,function(h,g){g&&b.helpers[h]&&f.isFunction(b.helpers[h][a])&&b.helpers[h][a](g,d)});f.event.trigger(a+".fb")}},isImage:function(a){return t(a)&&a.match(/\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$/i)},isSWF:function(a){return t(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var c={},e,d;a=l(a);e=b.group[a]||null;if(!e)return false;c=
f.extend(true,{},b.opts,e);e=c.margin;d=c.padding;if(f.type(e)==="number")c.margin=[e,e,e,e];if(f.type(d)==="number")c.padding=[d,d,d,d];c.modal&&f.extend(true,c,{closeBtn:false,closeClick:false,nextClick:false,arrows:false,mouseWheel:false,keys:null,helpers:{overlay:{closeClick:false}}});if(c.autoSize)c.autoWidth=c.autoHeight=true;if(c.width==="auto")c.autoWidth=true;if(c.height==="auto")c.autoHeight=true;c.group=b.group;c.index=a;b.coming=c;if(false===b.trigger("beforeLoad"))b.coming=null;else{d=
c.type;e=c.href;if(!d){b.coming=null;if(b.current&&b.router&&b.router!=="jumpto"){b.current.index=a;return b[b.router](b.direction)}return false}b.isActive=true;if(d==="image"||d==="swf"){c.autoHeight=c.autoWidth=false;c.scrolling="visible"}if(d==="image")c.aspectRatio=true;if(d==="iframe"&&p)c.scrolling="scroll";c.wrap=f(c.tpl.wrap).addClass("fancybox-"+(p?"mobile":"desktop")+" fancybox-type-"+d+" fancybox-tmp "+c.wrapCSS).appendTo(c.parent);f.extend(c,{skin:f(".fancybox-skin",c.wrap),outer:f(".fancybox-outer",
c.wrap),inner:f(".fancybox-inner",c.wrap)});f.each(["Top","Right","Bottom","Left"],function(h,g){c.skin.css("padding"+g,r(c.padding[h]))});b.trigger("onReady");if(d==="inline"||d==="html"){if(!c.content||!c.content.length)return b._error("content")}else if(!e)return b._error("href");if(d==="image")b._loadImage();else if(d==="ajax")b._loadAjax();else d==="iframe"?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:true,autoHeight:true,minWidth:0,minHeight:0,
scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width;b.coming.height=this.height;b._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;b._error("image")};a.src=b.coming.href;if(a.complete===y||!a.complete)b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(c,e){b.coming&&
e!=="abort"?b._error("ajax",c):b.hideLoading()},success:function(c,e){if(e==="success"){a.content=c;b._afterLoad()}}}))},_loadIframe:function(){var a=b.coming,c=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",p?"auto":a.iframe.scrolling).attr("src",a.href);f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}});if(a.iframe.preload){b.showLoading();c.one("load",function(){f(this).data("ready",1);p||f(this).bind("load.fb",
b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()})}a.content=c.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,c=b.current,e=a.length,d=c.preload?Math.min(c.preload,e-1):0,h,g;for(g=1;g<=d;g+=1){h=a[(c.index+g)%e];if(h.type==="image"&&h.href)(new Image).src=h.href}},_afterLoad:function(){var a=b.coming,c=b.current,e,d,h,g,i;b.hideLoading();if(!(!a||b.isActive===false))if(false===b.trigger("afterLoad",
a,c)){a.wrap.stop(true).trigger("onReset").remove();b.coming=null}else{if(c){b.trigger("beforeChange",c);c.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove();c.wrap.css("position")==="fixed"&&c.wrap.css(b._getPosition(true))}b.unbindEvents();e=a.content;d=a.type;h=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,outer:a.outer,inner:a.inner,current:a,previous:c});g=a.href;switch(d){case "inline":case "ajax":case "html":if(a.selector)e=f("<div>").html(e).find(a.selector);
else if(B(e)){e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide());e=e.show().detach();a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",false)})}break;case "image":e=a.tpl.image.replace("{href}",g);break;case "swf":e='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+
g+'"></param>';i="";f.each(a.swf,function(j,k){e+='<param name="'+j+'" value="'+k+'"></param>';i+=" "+j+'="'+k+'"'});e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+i+"></embed></object>";break}B(e)&&e.parent().is(a.inner)||a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow",h==="yes"?"scroll":h==="no"?"hidden":h);b._setDimension();a.wrap.removeClass("fancybox-tmp");a.pos=f.extend({},a.dim,b._getPosition(true));b.isOpen=false;b.coming=null;b.bindEvents();
if(b.isOpened)c.prevMethod&&b.transitions[c.prevMethod]();else f(".fancybox-wrap").not(a.wrap).stop(true).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),c=0,e=false,d=false;e=b.wrap;var h=b.skin,g=b.inner,i=b.current;d=i.width;var j=i.height,k=i.minWidth,m=i.minHeight,w=i.maxWidth,x=i.maxHeight,N=i.scrolling,K=i.scrollOutside?i.scrollbarWidth:0,z=i.margin,F=z[1]+z[3],G=z[0]+z[2],L,u,I,C,A,H,M,D,
J;e.add(h).add(g).width("auto").height("auto");z=h.outerWidth(true)-h.width();L=h.outerHeight(true)-h.height();u=F+z;I=G+L;C=s(d)?(a.w-u)*l(d)/100:d;A=s(j)?(a.h-I)*l(j)/100:j;if(i.type==="iframe"){J=i.content;if(i.autoHeight&&J.data("ready")===1)try{if(J[0].contentWindow.document.location){g.width(C).height(9999);H=J.contents().find("body");K&&H.css("overflow-x","hidden");A=H.height()}}catch(O){}}else if(i.autoWidth||i.autoHeight){g.addClass("fancybox-tmp");i.autoWidth||g.width(C);i.autoHeight||g.height(A);
if(i.autoWidth)C=g.width();if(i.autoHeight)A=g.height();g.removeClass("fancybox-tmp")}d=l(C);j=l(A);D=C/A;k=l(s(k)?l(k,"w")-u:k);w=l(s(w)?l(w,"w")-u:w);m=l(s(m)?l(m,"h")-I:m);x=l(s(x)?l(x,"h")-I:x);H=w;M=x;F=a.w-F;G=a.h-G;if(i.aspectRatio){if(d>w){d=w;j=d/D}if(j>x){j=x;d=j*D}if(d<k){d=k;j=d/D}if(j<m){j=m;d=j*D}}else{d=Math.max(k,Math.min(d,w));j=Math.max(m,Math.min(j,x))}if(i.fitToView){w=Math.min(a.w-u,w);x=Math.min(a.h-I,x);g.width(l(d)).height(l(j));e.width(l(d+z));a=e.width();u=e.height();if(i.aspectRatio)for(;(a>
F||u>G)&&d>k&&j>m;){if(c++>19)break;j=Math.max(m,Math.min(x,j-10));d=j*D;if(d<k){d=k;j=d/D}if(d>w){d=w;j=d/D}g.width(l(d)).height(l(j));e.width(l(d+z));a=e.width();u=e.height()}else{d=Math.max(k,Math.min(d,d-(a-F)));j=Math.max(m,Math.min(j,j-(u-G)))}}if(K&&N==="auto"&&j<A&&d+z+K<F)d+=K;g.width(l(d)).height(l(j));e.width(l(d+z));a=e.width();u=e.height();e=(a>F||u>G)&&d>k&&j>m;d=i.aspectRatio?d<H&&j<M&&d<C&&j<A:(d<H||j<M)&&(d<C||j<A);f.extend(i,{dim:{width:r(a),height:r(u)},origWidth:C,origHeight:A,
canShrink:e,canExpand:d,wPadding:z,hPadding:L,wrapSpace:u-h.outerHeight(true),skinSpace:h.height()-j});!J&&i.autoHeight&&j>m&&j<x&&!d&&g.height("auto")},_getPosition:function(a){var c=b.current,e=b.getViewport(),d=c.margin,h=b.wrap.width()+d[1]+d[3],g=b.wrap.height()+d[0]+d[2];d={position:"absolute",top:d[0],left:d[3]};if(c.autoCenter&&c.fixed&&!a&&g<=e.h&&h<=e.w)d.position="fixed";else if(!c.locked){d.top+=e.y;d.left+=e.x}d.top=r(Math.max(d.top,d.top+(e.h-g)*c.topRatio));d.left=r(Math.max(d.left,
d.left+(e.w-h)*c.leftRatio));return d},_afterZoomIn:function(){var a=b.current;if(a){b.isOpen=b.isOpened=true;b.wrap.addClass("fancybox-opened").css("overflow","visible");b.reposition();if(a.closeClick||a.nextClick)b.inner.css("cursor","pointer").bind("click.fb",function(c){if(!f(c.target).is("a")&&!f(c.target).parent().is("a"))b[a.closeClick?"close":"next"]()});a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",b.close);if(a.arrows&&b.group.length>1){if(a.loop||a.index>0)f(a.tpl.prev).appendTo(b.outer).bind("click.fb",
b.prev);if(a.loop||a.index<b.group.length-1)f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)}b.trigger("afterShow");if(!a.loop&&a.index===a.group.length-1)b.play(false);else if(b.opts.autoPlay&&!b.player.isActive){b.opts.autoPlay=false;b.play()}}},_afterZoomOut:function(){var a=b.current;f(".fancybox-wrap").stop(true).trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:false,current:null,isActive:false,isOpened:false,isOpen:false,isClosing:false,wrap:null,skin:null,outer:null,inner:null});
b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,c=a.element,e=a.orig,d={},h=50,g=50,i=a.hPadding,j=a.wPadding,k=b.getViewport();if(!e&&a.isDom&&c.is(":visible")){e=c.find("img:first");e.length||(e=c)}if(B(e)){d=e.offset();if(e.is("img")){h=e.outerWidth();g=e.outerHeight()}}else{d.top=k.y+(k.h-g)*a.topRatio;d.left=k.x+(k.w-h)*a.leftRatio}if(a.locked){d.top-=k.y;d.left-=k.x}return d={top:r(d.top-i*a.topRatio),left:r(d.left-j*a.leftRatio),width:r(h+j),height:r(g+
i)}},step:function(a,c){var e,d,h=c.prop;d=b.current;var g=d.wrapSpace,i=d.skinSpace;if(h==="width"||h==="height"){e=c.end===c.start?1:(a-c.start)/(c.end-c.start);if(b.isClosing)e=1-e;d=h==="width"?d.wPadding:d.hPadding;d=a-d;b.skin[h](l(h==="width"?d:d-g*e));b.inner[h](l(h==="width"?d:d-g*e-i*e))}},zoomIn:function(){var a=b.current,c=a.pos,e=a.openEffect,d=e==="elastic",h=f.extend({opacity:1},c);delete h.position;if(d){c=this.getOrigPosition();if(a.openOpacity)c.opacity=0.1}else if(e==="fade")c.opacity=
0.1;b.wrap.css(c).animate(h,{duration:e==="none"?0:a.openSpeed,easing:a.openEasing,step:d?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,c=a.closeEffect,e=c==="elastic",d={opacity:0.1};if(e){d=this.getOrigPosition();if(a.closeOpacity)d.opacity=0.1}b.wrap.animate(d,{duration:c==="none"?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,c=a.nextEffect,e=a.pos,d={opacity:1},h=b.direction,g;e.opacity=
0.1;if(c==="elastic"){g=h==="down"||h==="up"?"top":"left";if(h==="down"||h==="right"){e[g]=r(l(e[g])-200);d[g]="+=200px"}else{e[g]=r(l(e[g])+200);d[g]="-=200px"}}c==="none"?b._afterZoomIn():b.wrap.css(e).animate(d,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=b.previous,c=a.prevEffect,e={opacity:0.1},d=b.direction;if(c==="elastic")e[d==="down"||d==="up"?"top":"left"]=(d==="up"||d==="left"?"-":"+")+"=200px";a.wrap.animate(e,{duration:c==="none"?0:a.prevSpeed,
easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={overlay:null,update:function(){var a="100%",c;this.overlay.width(a).height("100%");if(f.browser.msie){c=Math.max(n.documentElement.offsetWidth,n.body.offsetWidth);if(o.width()>c)a=o.width()}else if(o.width()>v.width())a=o.width();this.overlay.width(a).height(o.height())},onReady:function(a,c){f(".fancybox-overlay").stop(true,true);this.overlay||f.extend(this,{overlay:f('<div class="fancybox-overlay"></div>').appendTo(c.parent),
margin:o.height()>v.height()||f("body").css("overflow-y")==="scroll"?f("body").css("margin-right"):false,el:n.all&&!n.querySelector?f("html"):f("body")});if(c.fixed&&!p){this.overlay.addClass("fancybox-overlay-fixed");if(c.autoCenter){this.overlay.append(c.wrap);c.locked=this.overlay}}a.showEarly===true&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,c){var e=this.overlay.unbind(".fb").width("auto").height("auto").css(a.css);a.closeClick&&e.bind("click.fb",function(d){f(d.target).hasClass("fancybox-overlay")&&
b.close()});if(c.fixed&&!p){if(c.locked){this.el.addClass("fancybox-lock");this.margin!==false&&f("body").css("margin-right",l(this.margin)+c.scrollbarWidth)}}else this.update();e.show()},onUpdate:function(a,c){if(!c.fixed||p)this.update()},afterClose:function(a){var c=this;a=a.speedOut||0;if(c.overlay&&!b.isActive)c.overlay.fadeOut(a||0,function(){f("body").css("margin-right",c.margin);c.el.removeClass("fancybox-lock");c.overlay.remove();c.overlay=null})}};b.helpers.title={beforeShow:function(a){var c=
b.current.title,e=a.type;if(!(!t(c)||f.trim(c)==="")){c=f('<div class="fancybox-title fancybox-title-'+e+'-wrap">'+c+"</div>");switch(e){case "inside":e=b.skin;break;case "outside":e=b.wrap;break;case "over":e=b.inner;break;default:e=b.skin;c.appendTo("body").width(c.width()).wrapInner('<span class="child"></span>');b.current.margin[2]+=Math.abs(l(c.css("margin-bottom")));break}a.position==="top"?c.prependTo(e):c.appendTo(e)}}};f.fn.fancybox=function(a){var c,e=f(this),d=this.selector||"",h=function(g){var i=
f(this).blur(),j=c,k,m;if(!(g.ctrlKey||g.altKey||g.shiftKey||g.metaKey)&&!i.is(".fancybox-wrap")){k=a.groupAttr||"data-fancybox-group";m=i.attr(k);if(!m){k="rel";m=i.get(0)[k]}if(m&&m!==""&&m!=="nofollow"){i=d.length?f(d):e;i=i.filter("["+k+'="'+m+'"]');j=i.index(this)}a.index=j;b.open(i,a)!==false&&g.preventDefault()}};a=a||{};c=a.index||0;!d||a.live===false?e.unbind("click.fb-start").bind("click.fb-start",h):o.undelegate(d,"click.fb-start").delegate(d+":not('.fancybox-item, .fancybox-nav')","click.fb-start",
h);return this};o.ready(function(){if(f.scrollbarWidth===y)f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),c=a.children();c=c.innerWidth()-c.height(99).innerWidth();a.remove();return c};if(f.support.fixedPosition===y)f.support.fixedPosition=function(){var a=f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),c=a[0].offsetTop===20||a[0].offsetTop===15;a.remove();return c}();f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),
fixed:f.support.fixedPosition,parent:f("body")})})})(window,document,jQuery);
(function(q){q.fancybox.helpers.thumbs={wrap:null,list:null,width:0,source:function(n){var f;if(n.element)f=q(n.element).find("img").attr("src");if(!f&&n.type==="image"&&n.href)f=n.href;return f},init:function(n,f){var y=this,v,o=n.width||50,b=n.height||50,E=n.source||this.source;v="";for(var p=0;p<f.group.length;p++)v+='<li><a style="width:'+o+"px;height:"+b+'px;" href="javascript:jQuery.fancybox.jumpto('+p+');"></a></li>';this.wrap=q('<div id="fancybox-thumbs"></div>').addClass(n.position||"bottom").appendTo("body");
this.list=q("<ul>"+v+"</ul>").appendTo(this.wrap);q.each(f.group,function(B){var t=E(f.group[B]);t&&q("<img />").load(function(){var s=this.width,l=this.height,r,a,c;if(!(!y.list||!s||!l)){r=s/o;a=l/b;c=y.list.children().eq(B).find("a");if(r>=1&&a>=1)if(r>a){s=Math.floor(s/a);l=b}else{s=o;l=Math.floor(l/r)}q(this).css({width:s,height:l,top:Math.floor(b/2-l/2),left:Math.floor(o/2-s/2)});c.width(o).height(b);q(this).hide().appendTo(c).fadeIn(300)}}).attr("src",t)});this.width=this.list.children().eq(0).outerWidth(true);
this.list.width(this.width*(f.group.length+1)).css("left",Math.floor(q(window).width()*0.5-(f.index*this.width+this.width*0.5)))},beforeLoad:function(n,f){if(f.group.length<2)f.helpers.thumbs=false;else f.margin[n.position==="top"?0:2]+=(n.height||50)+15},afterShow:function(n,f){this.list?this.onUpdate(n,f):this.init(n,f);this.list.children().removeClass("active").eq(f.index).addClass("active")},onUpdate:function(n,f){this.list&&this.list.stop(true).animate({left:Math.floor(q(window).width()*0.5-
(f.index*this.width+this.width*0.5))},150)},beforeClose:function(){this.wrap&&this.wrap.remove();this.list=this.wrap=null;this.width=0}}})(jQuery);


/*
 * Responsible for flyout menus within the editor + on a published page.
 * Also responsible for condensing overflowing nav and making a "more..." link.
 *

 * Author: Adam Shaw
 */

(function($) {
	

	/****************************** publicly available functions ****************************/

	var moreItemHTML;
	var activeLiId;
	var currentPageId;
	var stylePrefix = window.STYLE_PREFIX || 'weebly';
	var SLIDE_DURATION = 300;

	// called from a published page
	window.initPublishedFlyoutMenus = function(topLevelSummary, cpid, moreItemHTML, aLiId, isPreview) {
		currentPageId = cpid;
		if (topLevelSummary.length > 0) {
			var go = function() {
				activeLiId = aLiId;
				var container = $("<div id='" + stylePrefix + "-menus' />").appendTo('body');
				var firstItem = navElm(topLevelSummary[0].id);
				if (firstItem) {
					window.navFlyoutMenu = new FlyoutMenu(firstItem.parent(), {
						relocate: container,
						aLiId: aLiId
					});
					condenseNav(topLevelSummary, moreItemHTML);
				}
			}
			if (isPreview) {
				go(); // css has been written in html <style> tag, no need to check if loaded
			}else{
				whenThemeCSSLoaded(go);
			}
		}
	};

	// called from the editor
	window.initEditorFlyoutMenus = function() {
		whenThemeCSSLoaded(function() {
			function go() {
				var topLevelSummary = Weebly.PageManager.getTopLevelSummary();
				if (topLevelSummary.length > 0) {
					var listItem0 = navElm(topLevelSummary[0].id);
					if (listItem0) {
						var listElement = listItem0.parent();
						if (!listElement.is('table,tbody,thead,tr')) {
							window.navFlyoutMenu = new FlyoutMenu(listElement, {
								relocate: '#' + stylePrefix + '-menus'
							});

							moreItemHTML = renderItem({ title: /*tl(*/'more...'/*)tl*/ }, false, currentNormalItem);
							moreItemHTML =
								"<span class='" + stylePrefix + "-nav-handle " + stylePrefix + "-nav-more'>" +
								moreItemHTML +
								"</span>";
							condenseNav(topLevelSummary, moreItemHTML);
						}else{
							window.navFlyoutMenu = null;
						}
					}else{
						window.navFlyoutMenu = null;
					}
				}else{
					window.navFlyoutMenu = null;
				}
			}
			if ($.browser.webkit) {
				// this solves a webkit bug where the <span>s within the <ul> are displayed as block
				// this problem has nothing to do with the flyout code, but this was the most convenient place to put it ~ashaw
				var handles = $('#icontent span.' + stylePrefix + '-nav-handle');
				handles.hide();
				setTimeout(function() {
					handles.show();
					go();
				},0);
			}else{
				go();
			}
		});
	};

	// called from the editor when nav positioning might have changed
	window.refreshNavCondense = function(callback) {
		if (window.navFlyoutMenu) {
			//console.log('refresh');
			condenseNav(Weebly.PageManager.getTopLevelSummary(), moreItemHTML);
		}
	};

	window.disableFlyouts = false;



	/*********************************** flyout menu class ************************************/

	window.FlyoutMenu = function(mainList, options) {

		mainList = $(mainList); // the element that contains all the nav elements
		options = options || {};

		// settings (an attempt at making FlyoutMenu portable)
		var listTag = options.listTag ? options.listTag.toLowerCase() : 'ul';
		var itemTag = options.itemTag ? options.itemTag.toLowerCase() : 'li';
		var delay = (options.delay || 0.5) * 1000;

		// if specified, all submenus will be detached from original place in DOM and put in here
		var relocate = options.relocate ? $(options.relocate) : false;

		// FYI
		// a 'handle' is an element that contains the templatable HTML for each page's nav link
		// a 'handle' may be a wrapping SPAN element (with className 'PREFIX-nav-handle')
		//   OR it may be the item itself (such as an LI)

		var allItems; // list of all nav items
						// (the first child within a handle OR the handle itself)


		//
		// attach all event handlers and do state-keeping for flyout menus
		//

		function initItem(item) {

			item.css('position', 'relative'); // this gives more accurate offsets
			item.find('a').css('position', 'relative'); // more accurate offset (prevents IE bug)

			// states
			var isSliding = false;
			var isExpanded = false;
			var isMouseoverItem = false;
			var mouseoverCnt = 0;

			var slidVertically = false;
			var slidRight = false;

			var sublistWrapper; // a DIV.PREFIX-menu-wrap OR null
			var sublist;        // a UL.PREFIX-menu OR null


			//
			// expand a sublist on mouseover
			//

			function itemMouseover() {
				if (disableFlyouts) return false;
				mouseoverCnt++;
				isMouseoverItem = true;
				if (!isExpanded && !isSliding) {
					if (sublist) {
						// when a sublist is expanded, immediately contract all siblings' sublists
						getSiblings(item).each(function(i, siblingNode) {
							if (siblingNode._flyoutmenu_contract) {
								siblingNode._flyoutmenu_contract();
							}
						});
						expandSublist();
					}
				}
			}


			//
			// contract sublist on mouseout (after delay)
			//

			function itemMouseout() {
				if (disableFlyouts) return false;
				isMouseoverItem = false;
				if (isExpanded) {
					var mouseoverCnt0 = mouseoverCnt;
					setTimeout(function() {
						if (mouseoverCnt == mouseoverCnt0 && isExpanded && !isSliding) {
							contractSublist();
						}
					}, delay);
				}
			}


			//
			// prevent contracting when sublist is moused over
			//

			function sublistWrapperMouseover() {
				if (disableFlyouts) return false;
				mouseoverCnt++;
			}


			//
			// do item's sublist's expand animation
			//

			function expandSublist() {
				isSliding = true;
				var opts = {
					wrapper: sublistWrapper,
					duration: SLIDE_DURATION,
					complete: function() { // when animation has finished
						isSliding = false;
						isExpanded = true;
						if (!isMouseoverItem) {
							// if mouse was not over when animation finished, immediately contract
							contractSublist();
						}else{
							// attach methods for later hiding/contracting
							item[0]._flyoutmenu_contract = contractSublist; // assign to DOM node
							item[0]._flyoutmenu_hide = function() {         //
								isSliding = false;
								isExpanded = false;
								isMouseoverItem = false;
								item[0]._flyoutmenu_contract = null;
								item[0]._flyoutmenu_hide = null;
								sublistWrapper.hide();
							};
						}
					}
				};
				var massCoords = getItemMassCoords(item);

				// need to show it for IE8 to get the correct offsetParent
				sublistWrapper.css('left', -10000);
				sublistWrapper.show();

				var localOriginElement = sublistWrapper.offsetParent();
				var localOrigin = localOriginElement.is('body') ? {top:0,left:0} : localOriginElement.offset();
					// ^ special case body. jQuery provides inaccurate offset for body. always 0,0

				sublistWrapper.hide();
				sublist.show(); // so calls to sublistWrapper.outerWidth() are correct

				if (inVerticalList(item, true, options.aLiId)) {
					// slide right/left on vertical nav
					slidVertically = false;
					sublistWrapper.css('top', -localOrigin.top + massCoords[0].top);
					var w = sublistWrapper.outerWidth();
					if (massCoords[1].left + w > $('body').outerWidth()) {
						slidRight = false;
						sublistWrapper.css('left', -localOrigin.left + massCoords[0].left - w);
						opts.direction = 'right';
						sublist.show('slide', opts);
					}else{
						slidRight = true;
						sublistWrapper.css('left', -localOrigin.left + massCoords[1].left);
						opts.direction = 'left';
						sublist.show('slide', opts);
					}
				}else{
					// slide down on horizontal nav
					slidVertically = true;
					sublistWrapper.css('top', -localOrigin.top + massCoords[1].top);
					var w = sublistWrapper.outerWidth();
					if (massCoords[0].left + w > $('body').outerWidth()) {
						sublistWrapper.css('left', -localOrigin.left + massCoords[1].left - w);
					}else{
						sublistWrapper.css('left', -localOrigin.left + massCoords[0].left);
					}
					opts.direction = 'up';
					sublist.show('slide', opts);
				}
			}


			//
			// do item's sublist's contract animation
			//

			function contractSublist(mouseoverHack) {
				if (disableFlyouts || !item.parent().length) { // no parentNode?? removed from dom already? wtf!?
					// contractSublist is often called from a delay, might have been disabled in that time
					return;
				}
				if (mouseoverHack) {
					// IE6 wasn't registering the mouseout
					isMouseoverItem = false;
				}
				isSliding = true;
				item[0]._flyoutmenu_contract = null;
				item[0]._flyoutmenu_hide = null;
				var opts = {
					wrapper: sublistWrapper,
					duration: SLIDE_DURATION,
					complete: function() {
						isSliding = false;
						isExpanded = false;
						if (isMouseoverItem) {
							// if mouseleft, but re-entered before animation finished
							// immediately expand sublist again
							expandSublist();
						}
					}
				}
				if (slidVertically) {
					opts.direction = 'up';
					sublist.hide('slide', opts);
				}else{
					if (slidRight) {
						opts.direction = 'left';
						sublist.hide('slide', opts);
					}else{
						opts.direction = 'right';
						sublist.hide('slide', opts);
					}
				}
			}


			//
			// initialize submenu and attach events
			//

			sublist = getSublist(item, listTag);
			if (sublist) {
				sublistWrapper = sublist.parent();
				sublistWrapper.css('position', 'absolute');
				sublistWrapper.hide(); // should already be display:none, but just in case
				if (relocate) {
					// since sublist is no longer a descendant of the item, mouse events
					// wont cascade. simulate this
					sublistWrapper.on('mouseover', itemMouseover);
					sublistWrapper.on('mouseout', itemMouseout);
				}else{
					// keep the submenu alive...
					sublistWrapper.on('mouseover', sublistWrapperMouseover);
				}
			}
			item.on('mouseover', itemMouseover);
			item.on('mouseout', itemMouseout);


			//
			// attach a method for removing registered events
			// (returns the sublist wrapper)
			//

			item[0]._flyoutmenu_destroy = function(removeSublist) { // attach to raw DOM node
				item.off('mouseover', itemMouseover);
				item.off('mouseout', itemMouseout);
				if (removeSublist) {
					if (sublistWrapper) {
						return sublistWrapper.remove(); // detach before returning
					}
				}
				else if (sublistWrapper) {
					if (relocate) {
						sublistWrapper.off('mouseover', itemMouseover);
						sublistWrapper.off('mouseout', itemMouseout);
					}else{
						sublistWrapper.off('mouseover', sublistWrapperMouseover);
					}
					return sublistWrapper;
				}
			};

		}


		//
		// methods for the FlyoutMenu object
		//

		// close all submenus with an animation
		this.contract = function() {
			allItems.each(function(i, itemNode) {
				if (itemNode._flyoutmenu_contract) {
					itemNode._flyoutmenu_contract(true);
				}
			});
		};

		// hide all submenus immediately
		this.hideSubmenus = function() {
			allItems.each(function(i, itemNode) {
				if (itemNode._flyoutmenu_hide) {
					itemNode._flyoutmenu_hide();
				}
			});
		};

		// detach all event handlers
		this.destroy = function() {
			allItems.each(function(i, itemNode) {
				if (itemNode._flyoutmenu_destroy) {
					itemNode._flyoutmenu_destroy();
				}
			});
		};

		// initialize a top level item that has already been placed into mainList
		this.addItem = function(handle) { // todo: rename initTopLevelItem()
			handle = $(handle);
			var item = getRealTopLevelItem(handle);
			if (item.length) {
				initItem(item);
				var sublist = getSublist(item, listTag);
				if (sublist) {
					sublist.find(itemTag).each(function(i, itemNode) { // init all subitems
						initItem($(itemNode));
					});
				}
				if (relocate && sublist) {
					relocate.append(sublist.parent()); // relocate sublist's wrap
				}
				allItems = allItems.add(item);
				writeOrderingClassNames();
			}
		};

		// detach an item's event handlers and remove from DOM
		this.removeItem = function(handle) { // todo: rename
			handle = $(handle);
			var item = getRealTopLevelItem(handle);
			if (item.length) {
				if (item[0]._flyoutmenu_destroy) {
					item[0]._flyoutmenu_destroy(true);
				}
				item.remove();
				allItems = allItems.not(item);
				writeOrderingClassNames();
			}
		};

		// accessor
		this.getMainList = function() {
			return mainList;
		};


		//
		// initialize allItems and relocate
		//
		
		function writeOrderingClassNames() {
			var i = 1;
			getTopLevelItems(mainList).each(function(i, itemNode) {
				itemNode.className = itemNode.className.replace(/wsite-nav-\w+/, '');
				var item = $(itemNode);
				if (item.css('display') != 'none') {
					item.addClass('wsite-nav-' + i);
					i++;
				}
			});
		}

		allItems = getAllItems(mainList, itemTag);
		allItems.each(function(i, itemNode) {
			initItem($(itemNode));
		});
		writeOrderingClassNames();

		if (relocate) {
			getTopLevelItems(mainList).each(function(i, itemNode) {
				var sublist = getSublist($(itemNode), listTag);
				if (sublist) {
					relocate.append(sublist.parent());
				}
			});
		}

	};





	/****************************** more... link and menu *****************************/

	function condenseNav(topLevelSummary, moreItemHTML) { // can be called repeatedly for updating
		if (window.DISABLE_NAV_MORE) return;
		//console.log('condenseNav');
		var cpid = window.currentPage || currentPageId;
		var mainList = navFlyoutMenu.getMainList();
		var mainListChildren = mainList.children();
		var moreHandle;
		if (mainListChildren.length > 0) {
			moreHandle = mainListChildren.eq(-1).filter('.' + stylePrefix + '-nav-more');
			if (!moreHandle.length) {
				moreHandle = undefined;
			}
		}
		var alreadyMore = false;
		if (moreHandle) {
			moreHandle.hide();
			alreadyMore = true;
		}
		var isVertical;
		var handles = []; // holds all the handles up til the breaking element
		var itemCoords = [];
		var breakingHandle;
		var breakingIndex;
		var verticalContainer;
		var verticalMaxY;
		for (var i=0; i<topLevelSummary.length; i++) {
			var handle = navElm(topLevelSummary[i].id);
			handle.show();
		}
		for (var i=0; i<topLevelSummary.length; i++) {
			var handle = navElm(topLevelSummary[i].id);
			var item = getRealTopLevelItem(handle);
			if (!item) continue;
			var coords = getItemMassCoords(item);
			if (i == 1) {
				isVertical = Math.abs(coords[0].top - itemCoords[0][0].top) > Math.abs(coords[0].left - itemCoords[0][0].left);
				if (isVertical) {
					verticalContainer = item.closest('.wsite-nav-vertical');
					if (verticalContainer.length) {
						verticalMaxY = verticalContainer.offset().top + (parseInt(verticalContainer.css('padding-top')) || 0) + verticalContainer.height();
					}
				}
			}
			else if (!isVertical) {
				if (i > 1 && Math.abs(coords[0].top - itemCoords[i-1][0].top) > 5) {
					breakingHandle = handle;
					breakingIndex = i;
					break;
				}
			}
			else { // is vertical
				if (coords[1].top > verticalMaxY) {
					breakingHandle = handle;
					breakingIndex = i;
					break;
				}
			}
			handles.push(handle);
			itemCoords.push(coords);
		}
		if (breakingHandle) {
			if (moreHandle) {
				moreHandle.show();
			}else{
				var temp = $("<div/>");
				temp.html(moreItemHTML);
				moreHandle = temp.children().first();
				moreHandle.find('a').each(function(i, moreAnchorNode) {
					$(moreAnchorNode)
						.on('click', function() { return false })
						.css('position', 'relative') // match what initItem does
						.attr('id', stylePrefix + '-nav-more-a');
				});
				mainList.append(moreHandle);
			}
			var moreItem = getRealTopLevelItem(moreHandle);
			moreItem.css('position', 'relative'); // match what initItem does
			var hiddenItemIndices = [];
			for (var i=breakingIndex; i<topLevelSummary.length; i++) {
				navElm(topLevelSummary[i].id).hide();
				hiddenItemIndices.push(i);
			}
			if (!isVertical) {
				var firstItem = getRealTopLevelItem(navElm(topLevelSummary[0].id));
				for (var i=breakingIndex-1; i>=0; i--) {
					var firstItemCoords = getItemMassCoords(firstItem);
					var moreCoords = getItemMassCoords(moreItem);
					if (Math.abs(moreCoords[0].top - firstItemCoords[0].top) > 5) {
						handles[i].hide();
						hiddenItemIndices.unshift(i);
					}else{
						break;
					}
				}
			}
			if (hiddenItemIndices.length == 0) {
				// no items were hidden, no need for more...
				moreHandle.remove();
			}
			else if (hiddenItemIndices.length == topLevelSummary.length) {
				// all items were hidden, revert back
				for (var i=0; i<hiddenItemIndices.length; i++) {
					navElm(topLevelSummary[hiddenItemIndices[i]].id).show();
				}
				moreHandle.remove();
			}
			else {
				if (!alreadyMore) {
					var wrap = $("<div/>");
					wrap.addClass(stylePrefix+'-menu-wrap');
					var ul = $("<ul/>");
					ul.addClass(stylePrefix+'-menu');
					wrap.append(ul);
					for (var j=0; j<hiddenItemIndices.length; j++) {
						var pageSummary = topLevelSummary[hiddenItemIndices[j]];
						var liID = stylePrefix + '-nav-' + pageSummary.id;
						var li = $("<li id='" + liID + "' />");
						if (liID == cpid) {
							li.addClass(stylePrefix + '-nav-current');
						}
						var a = $("<a/>");
						if (pageSummary.onclick) {
							a.attr('href', '#');
							a.on('click', pageSummary.onclick);
						}else{
							var url = pageSummary.url;
							if (window.IS_ARCHIVE || url.match(/^http:\/\//)) {
								a.attr('href', url);
							}else{
								a.attr('href', '/' + url);
							}
						}
						if (pageSummary.onmouseover) {
							a.on('mouseover', pageSummary.onmouseover);
						}
						if (pageSummary.onmouseout) {
							a.on('mouseout', pageSummary.onmouseout);
						}
						li.append(a);
						var submenu = getRealTopLevelItem(navElm(topLevelSummary[hiddenItemIndices[j]].id))[0]._flyoutmenu_destroy();
						a.html(
							"<span class='" + stylePrefix + "-menu-title'>" +
								pageSummary.title +
							"</span>" +
							(submenu ? "<span class='" + stylePrefix + "-menu-arrow'>&gt;</span>" : '')
						);
						if (submenu) {
							li.append(submenu);
						}
						ul.append(li);
					}
					moreItem.append(wrap);
					navFlyoutMenu.addItem(moreItem);
					if (window.showEvent) {
						showEvent('navMore');
					}
				}
			}
		}
	}





	/************************ helpers for navigating and querying items/sublists/etc ********************/

	function inVerticalList(item, strict, aLiId) {
		var list = item.parent();
		if (list.hasClass(stylePrefix + '-nav-handle')) {
			list = list.parent();
		}
		var allItems = getTopLevelItems(list, strict, aLiId);
		if (allItems.length >= 2) {
			var o1 = allItems.eq(0).offset();
			var o2 = allItems.eq(1).offset();
			var diff = Math.abs(o1.left - o2.left) - Math.abs(o1.top - o2.top);
			if (diff != 0) {
				return diff < 0;
			}
		}
		return !isItemTopLevel(item);
			// default to returning false for top level user-defined css
			// and true for weebly-created submenus
	}

	function getTopLevelItems(list, strict, aLiId) {
		var res = [];
		list.children().each(function(i, handleNode) {
			var handle = $(handleNode);
			if (!strict ||
				handle.hasClass(stylePrefix + '-nav-handle') ||
				handle.hasClass(stylePrefix + '-nav-more') ||
				handleNode.id.match(/^pg/) ||
				(aLiId && handleNode.id==aLiId)) {
					var item = getRealTopLevelItem(handle);
					if (item.length) {
						res.push(item[0]);
					}
				}
		});
		return $(res);
	}

	function getRealTopLevelItem(item) { // todo: rename to getItemFromHandle()
		if (item.hasClass(stylePrefix + '-nav-handle')) {
			item = item.children().first();
		}
		if (!item.hasClass(stylePrefix + '-menu-wrap')) {
			// sometimes with SPAN handles, markup was invalid and DOM messed up
			// so make sure item is not a menu
			return item;
		}
	}

	function getAllItems(list, itemTag) {
		// get top level and all descendant items
		return list.find(itemTag).add(getTopLevelItems(list));
		// we want this list to be unique. jQuery already does this for us (for elements in DOM)
	}

	function getSiblings(item) {
		if (item.parent().hasClass(stylePrefix + '-nav-handle')) {
			return item.parent().siblings().children(':first-child');
		}else{
			// items aren't wrapped by separate handles
			return item.siblings();
		}
	}

	function getSublist(item, listTag) {
		var sublist = item.find(listTag).first();
		if (!sublist.length) {
			var next = item.next();
			if (next.hasClass(stylePrefix + '-menu-wrap')) {
				// sometimes with SPAN handles, markup is invalid, and it
				// makes the sublist a sibling AFTER the item
				sublist = next.children().first();
			}
		}
		if (!sublist.length) {
			sublist = undefined;
		}
		return sublist;
	}

	function isItemTopLevel(item) {
		var list = item.parent();
		if (list.hasClass(stylePrefix + '-nav-handle')) {
			list = list.parent();
		}
		return !list.hasClass(stylePrefix + '-menu');
	}

	function getItemMassCoords(item) {
		// look at the item and its A tag and return the largest rectangle of space it takes up
		// NOTE: we are still using offsetHeight/offsetWidth because jQuery 1.7.2 had a bug where
		//   getting curCSS on zero-height inline-displayed elements returned wrong value
		//   (because it converted to block first)
		var anchor = item.is('a') ? item : item.find('a');
		var p1 = item.offset();
		var p2 = { top:p1.top+item[0].offsetHeight, left:p1.left+item[0].offsetWidth };
		if (!anchor) {
			// messed up DOM (SPAN's around TD's and such) sometimes pushes A tag outside of item
			return [p1, p2];
		}
		var p3 = anchor.offset();
		var p4 = { top:p3.top+anchor[0].offsetHeight, left:p3.left+anchor[0].offsetWidth };
		var p5, p6;
		if (Math.abs(p1.left - p2.left) < 10) { // a tag is really small, doen't have any mass..
			// the inner A tag is probably floated and the LI isn't. lame. just use A tag's coords
			p5 = p3;
			p6 = p4;
		}else{
			p5 = { top:Math.min(p1.top, p3.top), left:Math.min(p1.left, p3.left) };
			p6 = { top:Math.max(p2.top, p4.top), left:Math.max(p2.left, p4.left) };
		}
		return [p5, p6];
	}

	function navElm(id) { // todo: rename to getHandle()
		var elm = $('#pg' + id);
		if (!elm.length && activeLiId) {
			elm = $('#' + activeLiId);
		}
		if (elm.length) {
			return elm;	
		}
	}




	/************************** helpers for theme-css-loaded detection ***********************/

	function isThemeCSSLoaded() {
		for (var i=0; i<document.styleSheets.length; i++) {
			try {
				if (document.styleSheets[i].title == stylePrefix+'-theme-css') {
					var sheet = document.styleSheets[i];
					var rules = sheet.cssRules || sheet.rules;
					return rules && rules.length > 0;
				}
			}
			catch (err) {}
		}
		return false;
	}

	function whenThemeCSSLoaded(callback) {
		if (isThemeCSSLoaded()) {
			callback();
		}else{
			var intervalID = setInterval(function() {
				if (isThemeCSSLoaded()) {
					clearInterval(intervalID);
					callback();
				}
			}, 200);
		}
	}


})(Weebly.jQuery);

(function(){var g=void 0,h=!0,i=null,k=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,da=decodeURIComponent,l=Math;function ea(a,b){return a.name=b}
var n="push",ha="test",ia="slice",p="replace",ja="load",ka="floor",la="charAt",ma="value",q="indexOf",na="match",oa="port",pa="createElement",qa="path",r="name",u="host",v="toString",w="length",x="prototype",ra="clientWidth",y="split",sa="stopPropagation",ta="scope",z="location",ua="search",A="protocol",va="clientHeight",wa="href",B="substring",xa="apply",ya="navigator",C="join",D="toLowerCase",E;function za(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Aa(a){return"function"==typeof a}function Ba(a){return a!=g&&-1<(a.constructor+"")[q]("String")}function F(a,b){return g==a||"-"==a&&!b||""==a}function Ca(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[q](a[la](0));)a=a[B](1);for(;a&&-1<" \n\r\t"[q](a[la](a[w]-1));)a=a[B](0,a[w]-1);return a}function Da(){return l.round(2147483647*l.random())}function Ea(){}
function G(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);H(68);return escape(a)}function I(a){a=a[y]("+")[C](" ");if(da instanceof Function)try{return da(a)}catch(b){H(17)}else H(68);return unescape(a)}var Fa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ga=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};
function Ha(a,b){if(a){var c=J[pa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=J.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function K(a){return a&&0<a[w]?a[0]:""}function L(a){var b=a?a[w]:0;return 0<b?a[b-1]:""}var Ja=function(){this.prefix="ga.";this.S={}};Ja[x].set=function(a,b){this.S[this.prefix+a]=b};Ja[x].get=function(a){return this.S[this.prefix+a]};Ja[x].contains=function(a){return this.get(a)!==g};function Ka(a){0==a[q]("www.")&&(a=a[B](4));return a[D]()}function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[q]("://");0<=c&&(d.protocol=a[B](0,c),a=a[B](c+3));c=a[ua]("/|\\?|#");if(0<=c)d.host=a[B](0,c)[D](),a=a[B](c);else return d.host=a[D](),d;c=a[q]("#");0<=c&&(d.anchor=a[B](c+1),a=a[B](0,c));c=a[q]("?");0<=c&&(Ma(d.d,a[B](c+1)),a=a[B](0,c));d.anchor&&b&&Ma(d.d,d.anchor);a&&"/"==a[la](0)&&(a=a[B](1));d.path=a;return d}
function Na(a,b){function c(a){var b=(a.hostname||"")[y](":")[0][D](),c=(a[A]||"")[D](),c=1*a[oa]||("http:"==c?80:"https:"==c?443:""),a=a.pathname||"";0==a[q]("/")||(a="/"+a);return[b,""+c,a]}var d=b||J[pa]("a");d.href=J[z][wa];var e=(d[A]||"")[D](),f=c(d),j=d[ua]||"",m=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[q]("//")?a=e+a:0==a[q]("/")?a=m+a:!a||0==a[q]("?")?a=m+f[2]+(a||j):0>a[y]("/")[0][q](":")&&(a=m+f[2][B](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[A]||"")[D](),host:e[0],
port:e[1],path:e[2],Pa:d[ua]||"",url:a||""}}function Ma(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[n](c)}for(var d=Ca(b)[y]("&"),e=0;e<d[w];e++)if(d[e]){var f=d[e][q]("=");0>f?c(d[e],"1"):c(d[e][B](0,f),d[e][B](f+1))}}function Oa(a,b){if(F(a)||"["==a[la](0)&&"]"==a[la](a[w]-1))return"-";var c=J.domain;return a[q](c+(b&&"/"!=b?b:""))==(0==a[q]("http://")?7:0==a[q]("https://")?8:0)?"0":a};var Pa=0;function Qa(a,b,c){!(1<=Pa)&&!(1<=100*l.random())&&(a=["utmt=error","utmerr="+a,"utmwv=5.3.6","utmn="+Da(),"utmsp=1"],b&&a[n]("api="+b),c&&a[n]("msg="+G(c[B](0,100))),M.w&&a[n]("aip=1"),Ra(a[C]("&")),Pa++)};var Sa=0,Ta={};function N(a){return Ua("x"+Sa++,a)}function Ua(a,b){Ta[a]=!!b;return a}
var Wa=N(),Xa=N(),Ya=N(),Za=N(),$a=N(),O=N(),P=N(),ab=N(),bb=N(),cb=N(),db=N(),eb=N(),fb=N(),gb=N(),hb=N(),jb=N(),kb=N(),lb=N(),mb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(),Db=N(h),Eb=Ua("currencyCode"),Fb=Ua("page"),Gb=Ua("title"),Hb=N(),Ib=N(),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),Pb=N(),Q=N(h),Qb=N(h),Rb=N(h),Sb=N(h),Tb=N(h),Ub=N(h),Vb=N(h),Xb=N(h),Yb=N(h),Zb=N(h),$b=N(h),R=N(h),ac=N(h),bc=N(h),cc=N(h),dc=N(h),ec=N(h),
fc=N(h),gc=N(h),S=N(h),hc=N(h),ic=N(h),jc=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=Ua("campaignParams"),pc=N(),qc=Ua("hitCallback"),rc=N();N();var sc=N(),tc=N(),uc=N(),vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N();N();var Ec=N(),Fc=N(),Gc=N(),Hc=N();function Lc(a){var b=this.plugins_;if(b)return b.get(a)}var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&H(d),c[xa](this,arguments)}catch(a){throw Qa("exc",b,a&&a[r]),a;}}},Mc=function(a,b,c,d){U[x][a]=function(){try{return H(c),za(this.a.get(b),d)}catch(e){throw Qa("exc",a,e&&e[r]),e;}}},V=function(a,b,c,d,e){U[x][a]=function(f){try{H(c),e==g?this.a.set(b,za(f,d)):this.a.set(b,e)}catch(j){throw Qa("exc",a,j&&j[r]),j;}}};var Nc=RegExp(/(^|\.)doubleclick\.net$/i),Oc=function(a,b){return Nc[ha](J[z].hostname)?h:"/"!==b?k:(0==a[q]("www.google.")||0==a[q](".google.")||0==a[q]("google."))&&!(-1<a[q]("google.org"))?h:k},Pc=function(a){var b=a.get($a),c=a.c(P,"/");Oc(b,c)&&a[sa]()};var Vc=function(){var a={},b={},c=new Qc;this.g=function(a,b){c.add(a,b)};var d=new Qc;this.e=function(a,b){d.add(a,b)};var e=k,f=k,j=h;this.U=function(){e=h};this.j=function(a){this[ja]();this.set(pc,a,h);a=new Rc(this);e=k;d.execute(this);e=h;b={};this.n();a.Ka()};this.load=function(){e&&(e=k,this.La(),Sc(this),f||(f=h,c.execute(this),Tc(this),Sc(this)),e=h)};this.n=function(){if(e)if(f)e=k,Tc(this),e=h;else this[ja]()};this.get=function(c){Ta[c]&&this[ja]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ta[c]&&this[ja]();e?b[c]=d:a[c]=d;Ta[c]&&this.n()};this.z=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.La=function(){if(j){var b=this.c($a,""),c=this.c(P,"/");Oc(b,c)||(a[O]=a[fb]&&""!=b?Uc(b):1,j=k)}}};Vc[x].stopPropagation=function(){throw"aborted";};
var Rc=function(a){var b=this;this.q=0;var c=a.get(qc);this.Va=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ka=function(){!b.q&&c&&ca(c,10)};a.set(rc,b,h)};function Wc(a,b){for(var b=b||[],c=0;c<b[w];c++){var d=b[c];if(""+a==d||0==d[q](a+"."))return d}return"-"}
var Yc=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(6!==b[w]||Xc(b[0],c))return k;var c=1*b[1],d=1*b[2],e=1*b[3],f=1*b[4],b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return H(110),k;a.set(Q,c);a.set(Tb,d);a.set(Ub,e);a.set(Vb,f);a.set(Xb,b);return h},Zc=function(a){var b=a.get(Q),c=a.get(Tb),d=a.get(Ub),e=a.get(Vb),f=a.b(Xb,1);b==g?H(113):NaN==b&&H(114);0<=b&&0<c&&0<d&&0<e&&0<=f||H(115);return[a.b(O,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][C](".")},$c=function(a){return[a.b(O,1),a.b($b,0),a.b(R,1),
a.b(ac,0)][C](".")},ad=function(a,b,c){var c=c?"":a.c(O,"1"),d=b[y](".");if(4!==d[w]||Xc(d[0],c))d=i;a.set($b,d?1*d[1]:0);a.set(R,d?1*d[2]:10);a.set(ac,d?1*d[3]:a.get(Za));return d!=i||!Xc(b,c)},bd=function(a,b){var c=G(a.c(Rb,"")),d=[],e=a.get(Db);if(!b&&e){for(var f=0;f<e[w];f++){var j=e[f];j&&1==j[ta]&&d[n](f+"="+G(j[r])+"="+G(j[ma])+"=1")}0<d[w]&&(c+="|"+d[C]("^"))}return c?a.b(O,1)+"."+c:i},cd=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(2>b[w]||Xc(b[0],c))return k;b=b[ia](1)[C](".")[y]("|");
0<b[w]&&a.set(Rb,I(b[0]));if(1>=b[w])return h;b=b[1][y](-1==b[1][q](",")?"^":",");for(c=0;c<b[w];c++){var d=b[c][y]("=");if(4==d[w]){var e={};ea(e,I(d[1]));e.value=I(d[2]);e.scope=1;a.get(Db)[d[0]]=e}}return h},dd=function(a){var b;b=function(b,e){if(!F(a.get(b))){var f=a.c(b,""),f=f[y](" ")[C]("%20"),f=f[y]("+")[C]("%20");c[n](e+"="+f)}};var c=[];b(fc,"utmcid");b(kc,"utmcsr");b(S,"utmgclid");b(hc,"utmgclsrc");b(ic,"utmdclid");b(jc,"utmdsid");b(gc,"utmccn");b(lc,"utmcmd");b(mc,"utmctr");b(nc,"utmcct");
return(b=c[C]("|"))?[a.b(O,1),a.b(bc,0),a.b(cc,1),a.b(dc,1),b][C]("."):""},ed=function(a,b,c){c=c?"":a.c(O,"1");b=b[y](".");if(5>b[w]||Xc(b[0],c))return a.set(bc,g),a.set(cc,g),a.set(dc,g),a.set(fc,g),a.set(gc,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),a.set(nc,g),a.set(S,g),a.set(hc,g),a.set(ic,g),a.set(jc,g),k;a.set(bc,1*b[1]);a.set(cc,1*b[2]);a.set(dc,1*b[3]);var d=b[ia](4)[C]("."),b=function(a){return(a=d[na](a+"=(.*?)(?:\\|utm|$)"))&&2==a[w]?a[1]:g},c=function(b,c){c&&(c=e?I(c):c[y]("%20")[C](" "),
a.set(b,c))};-1==d[q]("=")&&(d=I(d));var e="2"==b("utmcvr");c(fc,b("utmcid"));c(gc,b("utmccn"));c(kc,b("utmcsr"));c(lc,b("utmcmd"));c(mc,b("utmctr"));c(nc,b("utmcct"));c(S,b("utmgclid"));c(hc,b("utmgclsrc"));c(ic,b("utmdclid"));c(jc,b("utmdsid"));return h},Xc=function(a,b){return b?a!=b:!/^\d+$/[ha](a)};var Qc=function(){this.B=[]};Qc[x].add=function(a,b){this.B[n]({name:a,s:b})};Qc[x].execute=function(a){try{for(var b=0;b<this.B[w];b++)this.B[b].s.call(W,a)}catch(c){}};function fd(a){100!=a.get(tb)&&a.get(Q)%1E4>=100*a.get(tb)&&a[sa]()}function gd(a){hd(a.get(Wa))&&a[sa]()}function id(a){"file:"==J[z][A]&&a[sa]()}function jd(a){a.get(Gb)||a.set(Gb,J.title,h);a.get(Fb)||a.set(Fb,J[z].pathname+J[z][ua],h)};var kd=new function(){var a=[];this.set=function(b){a[b]=h};this.Ya=function(){for(var b=[],c=0;c<a[w];c++)a[c]&&(b[l[ka](c/6)]=b[l[ka](c/6)]^1<<c%6);for(c=0;c<b[w];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[la](b[c]||0);return b[C]("")+"~"}};function H(a){kd.set(a)};var W=window,J=document,hd=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},ld=function(a){for(var b=[],c=J.cookie[y](";"),a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),d=0;d<c[w];d++){var e=c[d][na](a);e&&b[n](e[1])}return b},X=function(a,b,c,d,e,f){e=hd(e)?k:Oc(d,c)?k:h;if(e){if(b&&0<=W[ya].userAgent[q]("Firefox"))for(var b=b[p](/\n|\r/g," "),e=0,j=b[w];e<j;++e){var m=b.charCodeAt(e)&255;if(10==m||13==m)b=b[B](0,e)+"?"+b[B](e+1)}b&&2E3<b[w]&&(b=b[B](0,2E3),H(69));
a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date).getTime()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");J.cookie=a}};var md,nd,od=function(){if(!md){var a={},b=W[ya],c=W.screen;a.R=c?c.width+"x"+c.height:"-";a.Q=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[D]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";try{var d=J.documentElement,e=J.body,f=e&&e[ra]&&e[va],b=[];d&&(d[ra]&&d[va])&&("CSS1Compat"===J.compatMode||!f)?b=[d[ra],d[va]]:f&&(b=[e[ra],e[va]]);a.Xa=b[C]("x")}catch(j){H(135)}md=a}},pd=function(){od();for(var a=md,b=W[ya],a=b.appName+
b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.R+a.Q+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[w],c=W.history[w];0<c;)a+=c--^b++;return Uc(a)},qd=function(a){od();var b=md;a.set(Jb,b.R);a.set(Kb,b.Q);a.set(Nb,b.language);a.set(Ob,b.characterSet);a.set(Lb,b.javaEnabled);a.set(Pb,b.Xa);if(a.get(gb)&&a.get(hb)){if(!(b=nd)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[ya])?b.plugins:g)&&0<b[w])for(c=0;c<b[w]&&!e;c++)d=b[c],-1<d[r][q]("Shockwave Flash")&&(e=d.description[y]("Shockwave Flash ")[1]);
else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(j){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(m){}e&&(e=e[y](" ")[1][y](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}nd=b;a.set(Mb,nd)}else a.set(Mb,"-")};var rd=function(a){if(Aa(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.h=this.i=this.l="";-1==c&&-1==d?this.h=b:-1==c&&-1!=d?(this.i=b[B](0,d),this.h=b[B](d+1)):-1!=c&&-1==d?(this.l=b[B](0,c),this.h=b[B](c+1)):c>d?(this.i=b[B](0,d),this.l=b[B](d+1,c),this.h=b[B](c+1)):(this.i=b[B](0,d),this.h=b[B](d+1));this.k=a[ia](1);this.Na=!this.l&&"_require"==this.h;this.K=!this.i&&!this.l&&"_provide"==this.h}},Y=function(){T(Y[x],"push",Y[x][n],5);T(Y[x],"_getPlugin",Lc,121);T(Y[x],
"_createAsyncTracker",Y[x].Ta,33);T(Y[x],"_getAsyncTracker",Y[x].Ua,34);this.J=new Ja;this.p=[]};E=Y[x];E.Oa=function(a,b,c){var d=this.J.get(a);if(!Aa(d))return k;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};E.push=function(a){var b=Z.Wa[xa](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[w]&&!Z.P(b[0])&&!(b.shift(),0<Z.p[w]););Z.p=Z.p.concat(b);return 0};E.Wa=function(a){for(var b=[],c=0;c<arguments[w];c++)try{var d=new rd(arguments[c]);d.K?this.P(d):b[n](d)}catch(e){}return b};
E.P=function(a){try{if(a.s)a.s[xa](W);else if(a.K)this.J.set(a.k[0],a.k[1]);else{var b="_gat"==a.i?M:"_gaq"==a.i?Z:M.u(a.i);if(a.Na){if(!this.Oa(a.k[0],b,a.k[2])){if(!a.Qa){var c=Na(""+a.k[1]);var d=c[A],e=J[z][A];var f;if(f="https:"==d||d==e?h:"http:"!=d?k:"http:"==e){var j;a:{var m=Na(J[z][wa]);if(!(c.Pa||0<=c.url[q]("?")||0<=c[qa][q]("://")||c[u]==m[u]&&c[oa]==m[oa]))for(var s="http:"==c[A]?80:443,t=M.T,b=0;b<t[w];b++)if(c[u]==t[b][0]&&(c[oa]||s)==(t[b][1]||s)&&0==c[qa][q](t[b][2])){j=h;break a}j=
k}f=j&&!hd()}f&&(a.Qa=Ha(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.h][xa](b,a.k)}}catch(Va){}};E.Ta=function(a,b){return M.r(a,b||"")};E.Ua=function(a){return M.u(a)};var ud=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<j[w];d++)if(g!=f[a][j[d]]){c=k;break}c&&(f[a]=g)}}function d(a){var b="",c=k,d,e;for(d=0;d<j[w];d++)if(e=a[j[d]],g!=e){c&&(b+=j[d]);for(var c=[],f=g,ga=g,ga=0;ga<e[w];ga++)if(g!=e[ga]){f="";ga!=ib&&g==e[ga-1]&&(f+=ga[v]()+Va);for(var Bd=e[ga],Ic="",Wb=g,Jc=g,Kc=g,Wb=0;Wb<Bd[w];Wb++)Jc=
Bd[la](Wb),Kc=Ia[Jc],Ic+=g!=Kc?Kc:Jc;f+=Ic;c[n](f)}b+=m+c[C](t)+s;c=k}else c=h;return b}var e=this,f=[],j=["k","v"],m="(",s=")",t="*",Va="!",Ia={"'":"'0"};Ia[s]="'1";Ia[t]="'2";Ia[Va]="'3";var ib=1;e.Sa=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[w];b++)g!=f[b]&&(a+=b[v]()+d(f[b]));return a};e.Ra=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[w];c++)g!=f[c]&&!a.Sa(c)&&(b+=c[v]()+d(f[c]));return b};e.f=function(b,c,d){if(!sd(d))return k;a(b,"k",c,d);return h};e.o=function(b,
c,d){if(!td(d))return k;a(b,"v",c,d[v]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.O=function(a,c){return b(a,"v",c)};e.M=function(a){c(a,"k")};e.N=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.O,88);T(e,"_clearKey",e.M,85);T(e,"_clearValue",e.N,86)};function sd(a){return"string"==typeof a}function td(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||l.round(a)!=a||NaN==a||a==ba?k:h};var vd=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},wd=function(){var a=vd(h).hid;a==i&&(a=Da(),vd(h).hid=a);return a},xd=function(a){a.set(Ib,wd());var b=vd();if(b&&b.dh==a.get(O)){var c=b.sid;c&&("0"==c&&H(112),a.set(Vb,c),a.get(Qb)&&a.set(Ub,c));b=b.vid;a.get(Qb)&&b&&(b=b[y]("."),1*b[1]||H(112),a.set(Q,1*b[0]),a.set(Tb,1*b[1]))}};var yd,Cd=function(a,b,c){var d=a.c($a,""),e=a.c(P,"/"),f=a.b(ab,0),a=a.c(Wa,"");X(b,c,e,d,a,f)},Tc=function(a){var b=a.c($a,"");a.b(O,1);var c=a.c(P,"/"),d=a.c(Wa,"");X("__utma",Zc(a),c,b,d,a.get(ab));X("__utmb",$c(a),c,b,d,a.get(bb));X("__utmc",""+a.b(O,1),c,b,d);var e=dd(a,h);e?X("__utmz",e,c,b,d,a.get(cb)):X("__utmz","",c,b,"",-1);(e=bd(a,k))?X("__utmv",e,c,b,d,a.get(ab)):X("__utmv","",c,b,"",-1)},Sc=function(a){var b=a.b(O,1);if(!Yc(a,Wc(b,ld("__utma"))))return a.set(Sb,h),k;var c=!ad(a,Wc(b,
ld("__utmb")));a.set(Zb,c);ed(a,Wc(b,ld("__utmz")));cd(a,Wc(b,ld("__utmv")));yd=!c;return h},Dd=function(a){!yd&&!(0<ld("__utmb")[w])&&(X("__utmd","1",a.c(P,"/"),a.c($a,""),a.c(Wa,""),1E4),0==ld("__utmd")[w]&&a[sa]())};var Gd=function(a){a.get(Q)==g?Ed(a):a.get(Sb)&&!a.get(Ec)?Ed(a):a.get(Zb)&&Fd(a)},Hd=function(a){a.get(ec)&&!a.get(Yb)&&(Fd(a),a.set(cc,a.get(Xb)))},Ed=function(a){var b=a.get(Za);a.set(Qb,h);a.set(Q,Da()^pd(a)&2147483647);a.set(Rb,"");a.set(Tb,b);a.set(Ub,b);a.set(Vb,b);a.set(Xb,1);a.set(Yb,h);a.set($b,0);a.set(R,10);a.set(ac,b);a.set(Db,[]);a.set(Sb,k);a.set(Zb,k)},Fd=function(a){a.set(Ub,a.get(Vb));a.set(Vb,a.get(Za));a.z(Xb);a.set(Yb,h);a.set($b,0);a.set(R,10);a.set(ac,a.get(Za));a.set(Zb,k)};var Id="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "),Pd=function(a){if(a.get(jb)&&
!a.get(Ec)){for(var b=!F(a.get(fc))||!F(a.get(kc))||!F(a.get(S))||!F(a.get(ic)),c={},d=0;d<Jd[w];d++){var e=Jd[d];c[e]=a.get(e)}(d=a.get(oc))?(H(149),e=new Ja,Ma(e,d),d=e):d=La(J[z][wa],a.get(eb)).d;if(!("1"==L(d.get(a.get(sb)))&&b)){var f=d,j=function(b,c){var c=c||"-",d=L(f.get(a.get(b)));return d&&"-"!=d?I(d):c},d=L(f.get(a.get(lb)))||"-",e=L(f.get(a.get(ob)))||"-",m=L(f.get(a.get(nb)))||"-",s=L(f.get("gclsrc"))||"-",t=L(f.get("dclid"))||"-",Va=j(mb,"(not set)"),Ia=j(pb,"(not set)"),ib=j(qb),j=
j(rb);if(F(d)&&F(m)&&F(t)&&F(e))d=k;else{var zd=!F(t)&&F(e),Ad=F(ib);if(zd||Ad){var fa=Kd(a),fa=La(fa,h);if((fa=Ld(a,fa))&&!F(fa[1]&&!fa[2]))zd&&(e=fa[0]),Ad&&(ib=fa[1])}Md(a,d,e,m,s,t,Va,Ia,ib,j);d=h}d=d||Nd(a);!d&&(!b&&a.get(Yb))&&(Md(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h);if(d&&(a.set(ec,Od(a,c)),b="(direct)"==a.get(kc)&&"(direct)"==a.get(gc)&&"(none)"==a.get(lc),a.get(ec)||a.get(Yb)&&!b))a.set(bc,a.get(Za)),a.set(cc,a.get(Xb)),a.z(dc)}}},Nd=function(a){var b=Kd(a),c=La(b,h);if(!(b!=
g&&b!=i&&""!=b&&"0"!=b&&"-"!=b&&0<=b[q]("://"))||c&&-1<c[u][q]("google")&&c.d.contains("q")&&"cse"==c[qa])return k;if((b=Ld(a,c))&&!b[2])return Md(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(Yb))return k;a:{for(var b=a.get(zb),d=Ka(c[u]),e=0;e<b[w];++e)if(-1<d[q](b[e])){a=k;break a}Md(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[qa]);a=h}return a},Ld=function(a,b){for(var c=a.get(xb),d=0;d<c[w];++d){var e=c[d][y](":");if(-1<b[u][q](e[0][D]())){var f=b.d.get(e[1]);if(f&&(f=K(f),!f&&
-1<b[u][q]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[q](e[3]))){a:{for(var c=f,d=a.get(yb),c=I(c)[D](),j=0;j<d[w];++j)if(c==d[j]){c=h;break a}c=k}return[e[2]||e[0],f,c]}}}return i},Md=function(a,b,c,d,e,f,j,m,s,t){a.set(fc,b);a.set(kc,c);a.set(S,d);a.set(hc,e);a.set(ic,f);a.set(gc,j);a.set(lc,m);a.set(mc,s);a.set(nc,t)},Jd=[gc,fc,S,ic,kc,lc,mc,nc],Od=function(a,b){function c(a){a=(""+a)[y]("+")[C]("%20");return a=a[y](" ")[C]("%20")}function d(c){var d=""+(a.get(c)||""),c=""+(b[c]||"");return 0<
d[w]&&d==c}if(d(S)||d(ic))return H(131),k;for(var e=0;e<Jd[w];e++){var f=Jd[e],j=b[f]||"-",f=a.get(f)||"-";if(c(j)!=c(f))return h}return k},Qd=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Kd=function(a){a=Oa(a.get(Hb),a.get(P));try{if(Qd[ha](a))return H(136),a+"?q="}catch(b){H(145)}return a};var Rd,Sd,Td=function(a){Rd=a.c(S,"");Sd=a.c(hc,"")},Ud=function(a){var b=a.c(S,""),c=a.c(hc,"");b!=Rd&&(-1<c[q]("ds")?a.set(jc,g):!F(Rd)&&-1<Sd[q]("ds")&&a.set(jc,Rd))};var Wd=function(a){Vd(a,J[z][wa])?(a.set(Ec,h),H(12)):a.set(Ec,k)},Vd=function(a,b){if(!a.get(db))return k;var c=La(b,a.get(eb)),d=K(c.d.get("__utma")),e=K(c.d.get("__utmb")),f=K(c.d.get("__utmc")),j=K(c.d.get("__utmx")),m=K(c.d.get("__utmz")),s=K(c.d.get("__utmv")),c=K(c.d.get("__utmk"));if(Uc(""+d+e+f+j+m+s)!=c){d=I(d);e=I(e);f=I(f);j=I(j);f=Xd(d+e+f+j,m,s,c);if(!f)return k;m=f[0];s=f[1]}if(!Yc(a,d,h))return k;ad(a,e,h);ed(a,m,h);cd(a,s,h);Yd(a,j,h);return h},$d=function(a,b,c){var d;d=Zc(a)||"-";
var e=$c(a)||"-",f=""+a.b(O,1)||"-",j=Zd(a)||"-",m=dd(a,k)||"-",a=bd(a,k)||"-",s=Uc(""+d+e+f+j+m+a),t=[];t[n]("__utma="+d);t[n]("__utmb="+e);t[n]("__utmc="+f);t[n]("__utmx="+j);t[n]("__utmz="+m);t[n]("__utmv="+a);t[n]("__utmk="+s);d=t[C]("&");if(!d)return b;e=b[q]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[q]("?");0<e&&(c=b[B](e),b=b[B](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},Xd=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==Uc(a+b+c))return H(127),[b,c];var j=b[p](/ /g,"%20"),
m=c[p](/ /g,"%20");if(d==Uc(a+j+m))return H(128),[j,m];j=j[p](/\+/g,"%20");m=m[p](/\+/g,"%20");if(d==Uc(a+j+m))return H(129),[j,m];try{var s=b[na]("utmctr=(.*?)(?:\\|utm|$)");if(s&&2==s[w]&&(j=b[p](s[1],G(I(s[1]))),d==Uc(a+j+c)))return H(139),[j,c]}catch(t){}b=I(b)}c=I(c)}};var ae="|",ce=function(a,b,c,d,e,f,j,m,s){var t=be(a,b);t||(t={},a.get(Ab)[n](t));t.id_=b;t.affiliation_=c;t.total_=d;t.tax_=e;t.shipping_=f;t.city_=j;t.state_=m;t.country_=s;t.items_=t.items_||[];return t},de=function(a,b,c,d,e,f,j){var a=be(a,b)||ce(a,b,"",0,0,0,"","",""),m;a:{if(a&&a.items_){m=a.items_;for(var s=0;s<m[w];s++)if(m[s].sku_==c){m=m[s];break a}}m=i}s=m||{};s.transId_=b;s.sku_=c;s.name_=d;s.category_=e;s.price_=f;s.quantity_=j;m||a.items_[n](s);return s},be=function(a,b){for(var c=
a.get(Ab),d=0;d<c[w];d++)if(c[d].id_==b)return c[d];return i};var ee,fe=function(a){if(!ee){var b;b=J[z].hash;var c=W[r],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[na](d)||c&&c[na](d))?b[1]:K(ld("GASO")))&&b[na](/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i))Cd(a,"GASO",""+b),M._gasoDomain=a.get($a),M._gasoCPath=a.get(P),a=c[1],Ha("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Da(),"_gasojs");ee=h}};var Yd=function(a,b,c){c&&(b=I(b));c=a.b(O,1);b=b[y](".");!(2>b[w])&&/^\d+$/[ha](b[0])&&(b[0]=""+c,Cd(a,"__utmx",b[C](".")))},Zd=function(a,b){var c=Wc(a.get(O),ld("__utmx"));"-"==c&&(c="");return b?G(c):c};var he=function(a,b){var c=l.min(a.b(Ac,0),100);if(a.b(Q,0)%100>=c)return k;a:{if(c=(c=W.performance||W.webkitPerformance)&&c.timing){var d=c.navigationStart;if(0==d)H(133);else{c=[c.loadEventStart-d,c.domainLookupEnd-c.domainLookupStart,c.connectEnd-c.connectStart,c.responseStart-c.requestStart,c.responseEnd-c.responseStart,c.fetchStart-d,c.domInteractive-d,c.domContentLoadedEventStart-d];break a}}c=g}c||(W.top!=W?c=g:(d=(c=W.external)&&c.onloadT,c&&!c.isValidLoadTime&&(d=g),2147483648<d&&(d=g),
0<d&&c.setPageReadyTime(),c=d==g?g:[d]));if(c==g)return k;d=c[0];if(d==g||d==ba||isNaN(d))return k;if(0<d){a:{for(d=1;d<c[w];d++)if(isNaN(c[d])||c[d]==ba||0>c[d]){d=k;break a}d=h}d?b(ge(c)):b(ge(c[ia](0,1)))}else Fa(W,"load",function(){he(a,b)},k);return h},je=function(a,b,c,d){var e=new ud;e.f(14,90,b[B](0,64));e.f(14,91,a[B](0,64));e.f(14,92,""+ie(c));d!=g&&e.f(14,93,d[B](0,64));e.o(14,90,c);return e},ie=function(a){return isNaN(a)||0>a?0:5E3>a?10*l[ka](a/10):5E4>a?100*l[ka](a/100):41E5>a?1E3*l[ka](a/
1E3):41E5},ge=function(a){for(var b=new ud,c=0;c<a[w];c++)b.f(14,c+1,""+ie(a[c])),b.o(14,c+1,a[c]);return b};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Fc)[a])&&b[w])for(var c={type:a,target:e,stopPropagation:function(){throw"aborted";}},d=0;d<b[w];d++)b[d].call(e,c)}}var e=this;this.a=new Vc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(Wa,b||"UA-XXXXX-X");this.set(Ya,a||"");this.set(Xa,c||"");this.set(Za,l.round((new Date).getTime()/1E3));this.set(P,"/");this.set(ab,63072E6);this.set(cb,15768E6);this.set(bb,18E5);this.set(db,k);
this.set(wb,50);this.set(eb,k);this.set(fb,h);this.set(gb,h);this.set(hb,h);this.set(jb,h);this.set(kb,h);this.set(mb,"utm_campaign");this.set(lb,"utm_id");this.set(nb,"gclid");this.set(ob,"utm_source");this.set(pb,"utm_medium");this.set(qb,"utm_term");this.set(rb,"utm_content");this.set(sb,"utm_nooverride");this.set(tb,100);this.set(Ac,1);this.set(Bc,k);this.set(ub,"/__utm.gif");this.set(vb,1);this.set(Ab,[]);this.set(Db,[]);this.set(xb,Id[ia](0));this.set(yb,[]);this.set(zb,[]);this.C("auto");this.set(Hb,
J.referrer);a=this.a;try{var f=La(J[z][wa],k),j=da(L(f.d.get("utm_referrer")))||"";j&&a.set(Hb,j);var m=da(K(f.d.get("utm_expid")));m&&a.set(Hc,m)}catch(s){H(146)}this.set(Fc,{hit:[],load:[]});this.a.g("0",Wd);this.a.g("1",Td);this.a.g("2",Gd);this.a.g("3",Pd);this.a.g("4",Ud);this.a.g("5",Hd);this.a.g("6",d("load"));this.a.g("7",fe);this.a.e("A",gd);this.a.e("B",id);this.a.e("C",Gd);this.a.e("D",fd);this.a.e("E",Pc);this.a.e("F",ke);this.a.e("G",Dd);this.a.e("H",jd);this.a.e("I",qd);this.a.e("J",
xd);this.a.e("K",d("hit"));this.a.e("L",le);this.a.e("M",me);0===this.get(Za)&&H(111);this.a.U();this.I=g};E=U[x];E.m=function(){var a=this.get(Bb);a||(a=new ud,this.set(Bb,a));return a};E.Ma=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};E.L=function(a){if(this.get(Bc))return k;var b=this,c=he(this.a,function(c){b.set(Fb,a,h);b.t(c)});this.set(Bc,c);return c};
E.Ga=function(a){a&&Ba(a)?(H(13),this.set(Fb,a,h)):"object"===typeof a&&a!==i&&this.Ma(a);this.I=a=this.get(Fb);if(1>=1E3*l.random())try{var b=J[z];this.a.set(Gc,b.hash[w]);-1!=b.hash[ua](/utm_/)&&H(137)}catch(c){H(134)}this.a.j("page");this.L(a)};E.G=function(a,b,c,d,e){if(""==a||(!sd(a)||""==b||!sd(b))||c!=g&&!sd(c)||d!=g&&!td(d))return k;this.set(tc,a,h);this.set(uc,b,h);this.set(vc,c,h);this.set(wc,d,h);this.set(sc,!!e,h);this.a.j("event");return h};
E.Ia=function(a,b,c,d,e){var f=this.a.b(Ac,0);1*e===e&&(f=e);if(this.a.b(Q,0)%100>=f)return k;c=1*(""+c);if(""==a||(!sd(a)||""==b||!sd(b)||!td(c)||isNaN(c)||0>c||0>f||100<f)||d!=g&&(""==d||!sd(d)))return k;this.t(je(a,b,c,d));return h};E.Ha=function(a,b,c,d){if(!a||!b)return k;this.set(xc,a,h);this.set(yc,b,h);this.set(zc,c||J[z][wa],h);d&&this.set(Fb,d,h);this.a.j("social");return h};E.Fa=function(){this.set(Ac,10);this.L(this.I)};E.Ja=function(){this.a.j("trans")};
E.t=function(a){this.set(Cb,a,h);this.a.j("event")};E.ja=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){H(91);b.G(a,c,d,e)}}};E.na=function(a){return this.get(a)};E.ya=function(a,b){if(a)if(Ba(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};E.addEventListener=function(a,b){var c=this.get(Fc)[a];c&&c[n](b)};E.removeEventListener=function(a,b){for(var c=this.get(Fc)[a],d=0;c&&d<c[w];d++)if(c[d]==b){c.splice(d,1);break}};E.ra=function(){return"5.3.6"};
E.C=function(a){this.get(fb);a="auto"==a?Ka(J.domain):!a||"-"==a||"none"==a?"":a[D]();this.set($a,a)};E.wa=function(a){this.set(fb,!!a)};E.oa=function(a,b){return $d(this.a,a,b)};E.link=function(a,b){if(this.a.get(db)&&a){var c=$d(this.a,a,b);J[z].href=c}};E.va=function(a,b){this.a.get(db)&&(a&&a.action)&&(a.action=$d(this.a,a.action,b))};
E.Aa=function(){this.v();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:i;if(b&&b[ma]){a.set(Ab,[]);for(var b=b[ma][y]("UTM:"),c=0;c<b[w];c++){b[c]=Ca(b[c]);for(var d=b[c][y](ae),e=0;e<d[w];e++)d[e]=Ca(d[e]);"T"==d[0]?ce(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&de(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};E.aa=function(a,b,c,d,e,f,j,m){return ce(this.a,a,b,c,d,e,f,j,m)};E.Z=function(a,b,c,d,e,f){return de(this.a,a,b,c,d,e,f)};
E.Ba=function(a){ae=a||"|"};E.fa=function(){this.set(Ab,[])};E.xa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(wb))a=k;else if(!b||!c||128<b[w]+c[w])a=k;else{1!=d&&2!=d&&(d=3);var f={};ea(f,b);f.value=c;f.scope=d;e.get(Db)[a]=f;a=h}a&&this.a.n();return a};E.la=function(a){this.a.get(Db)[a]=g;this.a.n()};E.sa=function(a){return(a=this.a.get(Db)[a])&&1==a[ta]?a[ma]:g};E.Da=function(a,b,c){this.m().f(a,b,c)};E.Ea=function(a,b,c){this.m().o(a,b,c)};E.ta=function(a,b){return this.m().getKey(a,b)};
E.ua=function(a,b){return this.m().O(a,b)};E.ga=function(a){this.m().M(a)};E.ha=function(a){this.m().N(a)};E.ka=function(){return new ud};E.X=function(a){a&&this.get(yb)[n](a[D]())};E.ca=function(){this.set(yb,[])};E.Y=function(a){a&&this.get(zb)[n](a[D]())};E.da=function(){this.set(zb,[])};E.$=function(a,b,c,d,e){if(a&&b){a=[a,b[D]()][C](":");if(d||e)a=[a,d,e][C](":");d=this.get(xb);d.splice(c?0:d[w],0,a)}};E.ea=function(){this.set(xb,[])};
E.ia=function(a){this.a[ja]();var b=this.get(P),c=Zd(this.a);this.set(P,a);this.a.n();Yd(this.a,c);this.set(P,b)};E.za=function(a,b){if(0<a&&5>=a&&Ba(b)&&""!=b){var c=this.get(Cc)||[];c[a]=b;this.set(Cc,c)}};E.W=function(a){a=""+a;if(a[na](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Dc)||[];b[n](a);this.set(Dc,b)}};E.v=function(){this.a[ja]()};E.Ca=function(a){a&&""!=a&&(this.set(Rb,a),this.a.j("var"))};var ke=function(a){"trans"!==a.get(pc)&&500<=a.b($b,0)&&a[sa]();if("event"===a.get(pc)){var b=(new Date).getTime(),c=a.b(ac,0),d=a.b(Vb,0),c=l[ka](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set(ac,b),a.set(R,l.min(10,a.b(R,0)+c)));0>=a.b(R,0)&&a[sa]()}},me=function(a){"event"===a.get(pc)&&a.set(R,l.max(0,a.b(R,10)-1))};var ne=function(){var a=[];this.add=function(b,c,d){d&&(c=G(""+c));a[n](b+"="+c)};this.toString=function(){return a[C]("&")}},oe=function(a,b){(b||2!=a.get(vb))&&a.z($b)},pe=function(a,b){b.add("utmwv","5.3.6");b.add("utms",a.get($b));b.add("utmn",Da());var c=J[z].hostname;F(c)||b.add("utmhn",c,h);c=a.get(tb);100!=c&&b.add("utmsp",c,h)},qe=function(a,b){b.add("utmac",Ca(a.get(Wa)));a.get(Hc)&&b.add("utmxkey",a.get(Hc),h);a.get(sc)&&b.add("utmni",1);var c=a.get(Dc);c&&0<c[w]&&b.add("utmdid",c[C]("."));
var c=function(a,b){b&&d[n](a+"="+b+";")},d=[];c("__utma",Zc(a));c("__utmz",dd(a,k));c("__utmv",bd(a,h));c("__utmx",Zd(a));b.add("utmcc",d[C]("+"),h);M.w&&b.add("aip",1);b.add("utmu",kd.Ya());a.get(Gc)!=g&&b.add("utmhlen",a.get(Gc),h)},re=function(a,b){for(var c=a.get(Cc)||[],d=[],e=1;e<c[w];e++)c[e]&&d[n](e+":"+G(c[e][p](/%/g,"%25")[p](/:/g,"%3A")[p](/,/g,"%2C")));d[w]&&b.add("utmpg",d[C](","))},se=function(a,b){a.get(gb)&&(b.add("utmcs",a.get(Ob),h),b.add("utmsr",a.get(Jb)),a.get(Pb)&&b.add("utmvp",
a.get(Pb)),b.add("utmsc",a.get(Kb)),b.add("utmul",a.get(Nb)),b.add("utmje",a.get(Lb)),b.add("utmfl",a.get(Mb),h))},te=function(a,b){a.get(kb)&&a.get(Gb)&&b.add("utmdt",a.get(Gb),h);b.add("utmhid",a.get(Ib));b.add("utmr",Oa(a.get(Hb),a.get(P)),h);b.add("utmp",G(a.get(Fb),h),h)},ue=function(a,b){for(var c=a.get(Bb),d=a.get(Cb),e=a.get(Db)||[],f=0;f<e[w];f++){var j=e[f];j&&(c||(c=new ud),c.f(8,f,j[r]),c.f(9,f,j[ma]),3!=j[ta]&&c.f(11,f,""+j[ta]))}!F(a.get(tc))&&!F(a.get(uc),h)&&(c||(c=new ud),c.f(5,1,
a.get(tc)),c.f(5,2,a.get(uc)),e=a.get(vc),e!=g&&c.f(5,3,e),e=a.get(wc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Ra(d),h):d&&b.add("utme",d.A(),h)},ve=function(a,b,c){var d=new ne;oe(a,c);pe(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);ue(a,d);se(a,d);te(a,d);(b=a.get(Eb))&&d.add("utmcu",b,h);c||(re(a,d),
qe(a,d));return d[v]()},we=function(a,b,c){var d=new ne;oe(a,c);pe(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);ue(a,d);se(a,d);te(a,d);(b=a.get(Eb))&&d.add("utmcu",b,h);c||(re(a,d),qe(a,d));return d[v]()},xe=function(a,b){var c=a.get(pc);if("page"==c)c=new ne,oe(a,b),pe(a,c),ue(a,c),se(a,c),te(a,c),b||(re(a,c),qe(a,c)),c=[c[v]()];else if("event"==c)c=
new ne,oe(a,b),pe(a,c),c.add("utmt","event"),ue(a,c),se(a,c),te(a,c),b||(re(a,c),qe(a,c)),c=[c[v]()];else if("var"==c)c=new ne,oe(a,b),pe(a,c),c.add("utmt","var"),!b&&qe(a,c),c=[c[v]()];else if("trans"==c)for(var c=[],d=a.get(Ab),e=0;e<d[w];++e){c[n](ve(a,d[e],b));for(var f=d[e].items_,j=0;j<f[w];++j)c[n](we(a,f[j],b))}else"social"==c?b?c=[]:(c=new ne,oe(a,b),pe(a,c),c.add("utmt","social"),c.add("utmsn",a.get(xc),h),c.add("utmsa",a.get(yc),h),c.add("utmsid",a.get(zc),h),ue(a,c),se(a,c),te(a,c),re(a,
c),qe(a,c),c=[c[v]()]):c=[];return c},le=function(a){var b,c=a.get(vb),d=a.get(rc),e=d&&d.Va,f=0;if(0==c||2==c){var j=a.get(ub)+"?";b=xe(a,h);for(var m=0,s=b[w];m<s;m++)Ra(b[m],e,j,h),f++}if(1==c||2==c){b=xe(a);m=0;for(s=b[w];m<s;m++)try{Ra(b[m],e),f++}catch(t){t&&Qa(t[r],g,t.message)}}d&&(d.q=f)};var ye=function(){return"https:"==J[z][A]||M.H?"https://ssl.google-analytics.com":"http://www.google-analytics.com"},ze=function(a){ea(this,"len");this.message=a+"-8192"},Ae=function(a){ea(this,"ff2post");this.message=a+"-2036"},Ra=function(a,b,c,d){b=b||Ea;if(d||2036>=a[w]){var e=b,b=c||ye()+"/__utm.gif?",f=new Image(1,1);f.src=b+a;f.onload=function(){f.onload=i;f.onerror=i;e()};f.onerror=function(){f.onload=i;f.onerror=i;e()}}else if(8192>=a[w]){var j=b;if(0<=W[ya].userAgent[q]("Firefox")&&![].reduce)throw new Ae(a[w]);
var m,b=ye()+"/p/__utm.gif";if(c=W.XDomainRequest)m=new c,m.open("POST",b);else if(c=W.XMLHttpRequest)c=new c,"withCredentials"in c&&(m=c,m.open("POST",b,h),m.setRequestHeader("Content-Type","text/plain"));m?(m.onreadystatechange=function(){4==m.readyState&&(j(),m=i)},m.send(a),b=h):b=g;b||Be(a,j)}else throw new ze(a[w]);},Be=function(a,b){if(J.body){a=aa(a);try{var c=J[pa]('<iframe name="'+a+'"></iframe>')}catch(d){c=J[pa]("iframe"),ea(c,a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility=
"hidden";var e=J[z],e=ye()+"/u/post_iframe.html#"+aa(e[A]+"//"+e[u]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Fa(W,"beforeunload",f);var j=k,m=0,s=function(){if(!j){try{if(9<m||c.contentWindow[z][u]==J[z][u]){j=h;f();Ga(W,"beforeunload",f);b();return}}catch(a){}m++;ca(s,200)}};Fa(c,"load",s);J.body.appendChild(c);c.src=e}else ca(function(){Be(a,b)},100)};var $=function(){this.H=this.w=k;this.D={};this.F=[];this.V=0;this.T=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;var a=function(a,c,d){T($[x],a,c,d)};a("_createTracker",$[x].r,55);a("_getTracker",$[x].pa,0);a("_getTrackerByName",$[x].u,51);a("_getTrackers",$[x].qa,130);a("_anonymizeIp",$[x].ba,16);a("_forceSSL",$[x].ma,125);a("_getPlugin",Lc,120);a=function(a,c,d){T(U[x],a,c,d)};Mc("_getName",Ya,58);Mc("_getAccount",Wa,64);Mc("_visitCode",Q,54);Mc("_getClientInfo",
gb,53,1);Mc("_getDetectTitle",kb,56,1);Mc("_getDetectFlash",hb,65,1);Mc("_getLocalGifPath",ub,57);Mc("_getServiceMode",vb,59);V("_setClientInfo",gb,66,2);V("_setAccount",Wa,3);V("_setNamespace",Xa,48);V("_setAllowLinker",db,11,2);V("_setDetectFlash",hb,61,2);V("_setDetectTitle",kb,62,2);V("_setLocalGifPath",ub,46,0);V("_setLocalServerMode",vb,92,g,0);V("_setRemoteServerMode",vb,63,g,1);V("_setLocalRemoteServerMode",vb,47,g,2);V("_setSampleRate",tb,45,1);V("_setCampaignTrack",jb,36,2);V("_setAllowAnchor",
eb,7,2);V("_setCampNameKey",mb,41);V("_setCampContentKey",rb,38);V("_setCampIdKey",lb,39);V("_setCampMediumKey",pb,40);V("_setCampNOKey",sb,42);V("_setCampSourceKey",ob,43);V("_setCampTermKey",qb,44);V("_setCampCIdKey",nb,37);V("_setCookiePath",P,9,0);V("_setMaxCustomVariables",wb,0,1);V("_setVisitorCookieTimeout",ab,28,1);V("_setSessionCookieTimeout",bb,26,1);V("_setCampaignCookieTimeout",cb,29,1);V("_setReferrerOverride",Hb,49);V("_setSiteSpeedSampleRate",Ac,132);a("_trackPageview",U[x].Ga,1);a("_trackEvent",
U[x].G,4);a("_trackPageLoadTime",U[x].Fa,100);a("_trackSocial",U[x].Ha,104);a("_trackTrans",U[x].Ja,18);a("_sendXEvent",U[x].t,78);a("_createEventTracker",U[x].ja,74);a("_getVersion",U[x].ra,60);a("_setDomainName",U[x].C,6);a("_setAllowHash",U[x].wa,8);a("_getLinkerUrl",U[x].oa,52);a("_link",U[x].link,101);a("_linkByPost",U[x].va,102);a("_setTrans",U[x].Aa,20);a("_addTrans",U[x].aa,21);a("_addItem",U[x].Z,19);a("_clearTrans",U[x].fa,105);a("_setTransactionDelim",U[x].Ba,82);a("_setCustomVar",U[x].xa,
10);a("_deleteCustomVar",U[x].la,35);a("_getVisitorCustomVar",U[x].sa,50);a("_setXKey",U[x].Da,83);a("_setXValue",U[x].Ea,84);a("_getXKey",U[x].ta,76);a("_getXValue",U[x].ua,77);a("_clearXKey",U[x].ga,72);a("_clearXValue",U[x].ha,73);a("_createXObj",U[x].ka,75);a("_addIgnoredOrganic",U[x].X,15);a("_clearIgnoredOrganic",U[x].ca,97);a("_addIgnoredRef",U[x].Y,31);a("_clearIgnoredRef",U[x].da,32);a("_addOrganic",U[x].$,14);a("_clearOrganic",U[x].ea,70);a("_cookiePathCopy",U[x].ia,30);a("_get",U[x].na,
106);a("_set",U[x].ya,107);a("_addEventListener",U[x].addEventListener,108);a("_removeEventListener",U[x].removeEventListener,109);a("_addDevId",U[x].W);a("_getPlugin",Lc,122);a("_setPageGroup",U[x].za,126);a("_trackTiming",U[x].Ia,124);a("_initData",U[x].v,2);a("_setVar",U[x].Ca,22);V("_setSessionTimeout",bb,27,3);V("_setCookieTimeout",cb,25,3);V("_setCookiePersistence",ab,24,1);a("_setAutoTrackOutbound",Ea,79);a("_setTrackOutboundSubdomains",Ea,81);a("_setHrefExamineLimit",Ea,80)};E=$[x];
E.pa=function(a,b){return this.r(a,g,b)};E.r=function(a,b,c){b&&H(23);c&&H(67);b==g&&(b="~"+M.V++);a=new U(b,a,c);M.D[b]=a;M.F[n](a);return a};E.u=function(a){a=a||"";return M.D[a]||M.r(g,a)};E.qa=function(){return M.F[ia](0)};E.ba=function(){this.w=h};E.ma=function(){this.H=h};var Ce=function(a){if("prerender"==J.webkitVisibilityState)return k;a();return h};var M=new $;var De=W._gat;De&&Aa(De._getTracker)?M=De:W._gat=M;var Z=new Y;var Ee=function(){var a=W._gaq,b=k;if(a&&Aa(a[n])&&(b="[object Array]"==Object[x][v].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[n][xa](Z,a)};if(!Ce(Ee)){H(123);var Fe=k,Ge=function(){!Fe&&Ce(Ee)&&(Fe=h,Ga(J,"webkitvisibilitychange",Ge))};Fa(J,"webkitvisibilitychange",Ge)};function Uc(a){var b=1,c=0,d;if(a){b=0;for(d=a[w]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b};})();

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=(a.curCSS||a.css)(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.22",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;try{e.id}catch(f){e=document.body}return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return b==0?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),(c/=f/2)<1?e/2*c*c*(((g*=1.525)+1)*c-g)+d:e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){return c<f/2?a.easing.easeInBounce(b,c*2,0,e,f)*.5+d:a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fade.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.highlight.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.22 - 2012-07-24


//
// Slide was modified by Adam Shaw to accept the "wrapper" parameter,
// making the behavior similar to Scriptaculous's SlideUp and SlideDown.
//

/*!
 * jQuery UI Effects Slide 1.8.22
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function( $, undefined ) {

$.effects.slide = function(o) {

	return this.queue(function() {

		// Create element
		var el = $(this), props = ['position','top','bottom','left','right'];

		// Set options
		var mode = $.effects.setMode(el, o.options.mode || 'show'); // Set Mode
		var direction = o.options.direction || 'left'; // Default Direction

		// Adjust
		$.effects.save(el, props); el.show(); // Save & Show
		
		// >>> $.effects.createWrapper(el).css({overflow:'hidden'}); // Create Wrapper
		// <<<
		var wrapper = o.options.wrapper;
		if (wrapper) {
			wrapper = $(wrapper).show();
			if (!/relative|absolute/.test(el.css('position'))) {
				el.css('position', 'relative');
			}
		}
		else {
			wrapper = $.effects.createWrapper(el);
		}
		wrapper.css('overflow', 'hidden');
		// <<<
		
		var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
		var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
		
		// >>> var distance = o.options.distance || (ref == 'top' ? el.outerHeight( true ) : el.outerWidth( true ));
		// <<<
		// in case where el's children were all floated, el had no height. fallback to wrapper's height. ~ashaw
		var distance =
			o.options.distance ||
			(ref == 'top' ?
				(el.height() ? el.outerHeight( true ) : wrapper.height()) :
				(el.width() ? el.outerWidth( true ) : wrapper.width())
			);
		// <<<
		
		if (mode == 'show') el.css(ref, motion == 'pos' ? (isNaN(distance) ? "-" + distance : -distance) : distance); // Shift

		// Animation
		var animation = {};
		animation[ref] = (mode == 'show' ? (motion == 'pos' ? '+=' : '-=') : (motion == 'pos' ? '-=' : '+=')) + distance;
		
		// Animate
		el.animate(animation, { queue: false, duration: o.duration, easing: o.options.easing, complete: function() {
			if(mode == 'hide') el.hide(); // Hide
			
			// >>> $.effects.restore(el, props); $.effects.removeWrapper(el); // Restore
			// <<<
			$.effects.restore(el, props);
			if (o.options.wrapper) {
				wrapper.css('overflow', '');
				if (mode == 'hide') {
					wrapper.hide();
				}
			}
			else {
				$.effects.removeWrapper(el);
			}
			// <<<
			
			if(o.callback) o.callback.apply(this, arguments); // Callback
			el.dequeue();
		}});

	});

};

})(jQuery);

if(!__qc){var __qc={qcdst:function(){if(__qc.qctzoff(0)!=__qc.qctzoff(6))return 1;return 0;},qctzoff:function(m){var d1=new Date(2000,m,1,0,0,0,0);var t=d1.toGMTString();var d3=new Date(t.substring(0,t.lastIndexOf(" ")-1));return d1-d3;},qceuc:function(s){if(typeof(encodeURIComponent)=='function'){return encodeURIComponent(s);}
else{return escape(s);}},qcrnd:function(){return Math.round(Math.random()*2147483647);},qcgc:function(n){var v='';var c=document.cookie;if(!c)return v;var i=c.indexOf(n+"=");var len=i+n.length+1;if(i>-1){var end=c.indexOf(";",len);if(end<0)end=c.length;v=c.substring(len,end);}
return v;},qcdomain:function(){var d=document.domain;if(d.substring(0,4)=="www.")d=d.substring(4,d.length);var a=d.split(".");var len=a.length;if(len<3)return d;var e=a[len-1];if(e.length<3)return d;d=a[len-2]+"."+a[len-1];return d;},qhash2:function(h,s){for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);}
return h;},qhash:function(s){var h1=0x811c9dc5,h2=0xc9dc5118;var hash1=__qc.qhash2(h1,s);var hash2=__qc.qhash2(h2,s);return(Math.round(Math.abs(hash1*hash2)/65536)).toString(16);},sd:["4dcfa7079941","127fdf7967f31","588ab9292a3f","32f92b0727e5","22f9aa38dfd3","a4abfe8f3e04","18b66bc1325c","958e70ea2f28","bdbf0cb4bbb","65118a0d557","40a1d9db1864","18ae3d985046","3b26460f55d"],qcsc:function(){var s="";var d=__qc.qcdomain();if(__qc.qad==1)return";fpan=u;fpa=";var qh=__qc.qhash(d);for(var i=0;i<__qc.sd.length;i++){if(__qc.sd[i]==qh)return";fpan=u;fpa=";}
var u=document;var a=__qc.qcgc("__qca");if(a.length>0){s+=";fpan=0;fpa="+a;}
else{var da=new Date();var db=new Date(da.getTime()+47335389000);a='P0-'+__qc.qcrnd()+'-'+da.getTime();u.cookie="__qca="+a+"; expires="+db.toGMTString()+"; path=/; domain="+d;a=__qc.qcgc("__qca");if(a.length>0){s+=";fpan=1;fpa="+a;}
else{s+=";fpan=u;fpa=";}}
return s;},qcdc:function(n){document.cookie=n+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain="+__qc.qcdomain();},qpxload:function(img){if(img&&typeof(img.width)=="number"&&img.width==3){__qc.qcdc("__qca");}},qcdnt:function(){var ipf=false;if(typeof(window.external)!="undefined"&&window.external!=null){var ipfe=window.external.InPrivateFilteringEnabled;ipf=(typeof ipfe=='function'&&ipfe()===true);}
return(ipf||navigator.doNotTrack=="1"||navigator.doNotTrack=="yes"||navigator.msDoNotTrack=="1")},qcp:function(p,myqo){var s='',a=null;var media='webpage',event='load';if(myqo!=null){for(var k in myqo){if(typeof(k)!='string'){continue;}
if(typeof(myqo[k])!='string'){continue;}
if(k=='uh'){if(__qc.qcdnt()){delete myqo[k];}else{myqo[k]=__qc.qhash(myqo[k]);}}
if(k=='qacct'){a=myqo[k];continue;}
s+=';'+k+p+'='+__qc.qceuc(myqo[k]);if(k=='media'){media=myqo[k];}
if(k=='event'){event=myqo[k];}}}
if(typeof a!="string"){if((typeof _qacct=="undefined")||(_qacct.length==0))return'';a=_qacct;}
if(media=='webpage'&&event=='load'){for(var i=0;i<__qc.qpixelsent.length;i++){if(__qc.qpixelsent[i]==a)return'';}
__qc.qpixelsent.push(a);}
if(media=='ad'){__qc.qad=1;}
s=';a'+p+'='+a+s;return s;},qcesc:function(s){return s.replace(/\./g,'%2E').replace(/,/g,'%2C');},qcd:function(o){return(typeof(o)!="undefined"&&o!=null);},qcogl:function(){var m=document.getElementsByTagName('meta');var o='';for(var i=0;i<m.length;i++){if(o.length>=1000)return o;if(__qc.qcd(m[i])&&__qc.qcd(m[i].attributes)&&__qc.qcd(m[i].attributes.property)&&__qc.qcd(m[i].attributes.property.value)&&__qc.qcd(m[i].content)){var p=m[i].attributes.property.value;var c=m[i].content;if(p.length>3&&p.substring(0,3)=='og:'){if(o.length>0)o+=',';var l=(c.length>80)?80:c.length;o+=__qc.qcesc(p.substring(3,p.length))+'.'+__qc.qcesc(c.substring(0,l));}}}
return __qc.qceuc(o);},firepixel:function(qoptions){var e=(typeof(encodeURIComponent)=='function')?"n":"s";var r=__qc.qcrnd();var sr='',qo='',qm='',url='',ref='',je='u',ns='1';var qocount=0;__qc.qad=0;if(typeof __qc.qpixelsent=="undefined"){__qc.qpixelsent=new Array();}
if(typeof qoptions!="undefined"&&qoptions!=null){__qc.qopts=qoptions;for(var k in __qc.qopts){if(typeof(__qc.qopts[k])=='string'){qo=__qc.qcp("",__qc.qopts);break;}else if(typeof(__qc.qopts[k])=='object'&&__qc.qopts[k]!=null){++qocount;qo+=__qc.qcp("."+qocount,__qc.qopts[k]);}}}else if(typeof _qacct=="string"){qo=__qc.qcp("",null);}
if(qo.length==0)return;var ce=(navigator.cookieEnabled)?"1":"0";if(typeof navigator.javaEnabled!='undefined')je=(navigator.javaEnabled())?"1":"0";if(typeof _qmeta!="undefined"&&_qmeta!=null){qm=';m='+__qc.qceuc(_qmeta);_qmeta=null;}
if(self.screen){sr=screen.width+"x"+screen.height+"x"+screen.colorDepth;}
var d=new Date();var dst=__qc.qcdst();var qs='http';if(window.location.protocol=='https:'){qs+='s';}
qs+="://pixel.quantserve.com";var fp=__qc.qcsc();if(window.location&&window.location.href)url=__qc.qceuc(window.location.href);if(window.document&&window.document.referrer)ref=__qc.qceuc(window.document.referrer);if(self==top)ns='0';var ogl=__qc.qcogl();var img=new Image();img.alt="";img.src=qs+'/pixel'+';r='+r+qo+fp+';ns='+ns+';ce='+ce+';je='+je+';sr='+sr+';enc='+e+';dst='+dst+';et='+d.getTime()+';tzo='+d.getTimezoneOffset()+qm+';ref='+ref+';url='+url+';ogl='+ogl;img.onload=function(){__qc.qpxload(img);}},quantserve:function(){if(typeof _qevents=='undefined'){_qevents=[];}
if(typeof _qoptions!="undefined"&&_qoptions!=null){__qc.firepixel(_qoptions);_qoptions=null;}else if(!_qevents.length&&typeof _qacct!="undefined"){__qc.firepixel(null);}
if(!__qc.evts){for(var k in _qevents){__qc.firepixel(_qevents[k]);}
_qevents={push:function(){var a=arguments;for(var i=0;i<a.length;i++){__qc.firepixel(a[i]);}}};__qc.evts=1;}}};}
function quantserve(){__qc.quantserve();}
quantserve();



// console.log calls wont fatal-error when it doesn't exist
// TODO: put this in the weebly editor js

if (!window.console) {
	window.console = {};
}

if (!window.console.log) {
	window.console.log = function(){};
}



// -----------------------------------------------------------------------------------------------------
// Copied and pasted from libraries/jquery_utils.js!!!!!! (TODO: better JS build system)
// -----------------------------------------------------------------------------------------------------


Weebly = _W = window.Weebly || {};

Weebly.jQuery = jQuery.noConflict(true); // relinquish control of `$` and `jQuery` and save reference

// FOR EDITOR: make plain-old `jQuery` available again
// FOR PUBLISHED SITES: if a different version of jQuery wasn't previously defined,
//    make it available for end-developer convenience
jQuery = window.jQuery || Weebly.jQuery;


(function($) {


	$.fn.up = function(selector) { // note: doesn't support index argument
		return this.eq(0).parent().closest(selector || '*');
	};


	$.fn.down = function(selector) { // note: doesn't support index argument
		if (!selector) {
			return this.eq(0).children(':first');
		}
		return this.eq(0).find(selector || '*').eq(0);
	};


	var idCounter = 1;

	$.fn.identify = function() {
		var id = this.attr('id');
		if (!id && this.length) {
			do {
				id = 'anonymous_element_' + idCounter++;
			}
			while ($('#' + id).length);
			this.attr('id', id);
		}
		return id;
	};
	
	
	// we need the Prototype document.observe('dom:loaded') to work because slideshow JS relies on it
	// and often slideshow HTML/JS is cached in blog post HTML
	if (!document.observe) {
		document.observe = function(eventName, callback) {
			if (eventName == 'dom:loaded') {
				$(document).ready(callback);
			}
		};
	}


})(Weebly.jQuery);


Weebly.evalJSON = function(json) { // not related to jQuery, but Prototype had it, so keep it here for now
	// adapted from https://github.com/sstephenson/prototype/blob/master/src/prototype/lang/string.js
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	if (cx.test(json)) {
		json = json.replace(cx, function(a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}
	try {
		return eval('(' + json + ')');
	}
	catch (e) { }
	throw new SyntaxError('Badly formed JSON string: ' + json);
};




// -----------------------------------------------------------------------------------------------------
// Comments
// -----------------------------------------------------------------------------------------------------


(function($) {


	window.blogCommentDisplayForm = function(url, wrapperId, commentId) {
		var wrapper = $('#' + wrapperId);
		var isOpen = wrapper.data('isReplyFormOpen') || false;
		var replyButton = wrapper.prev('.reply-comment').find('span').first();
		var cancelText = /*tl(*/'Cancel Reply'/*)tl*/;

		if (wrapper.data('locked')) return;
		wrapper.data('locked', true);

		var replyText = wrapper.data('replyText');
		if (!replyText) {
			replyText = replyButton.html();
			wrapper.data('replyText', replyText);
		}
		
		var iframe = $('#' + wrapperId + ' iframe');
		if (!iframe.length) {
			iframe = $('<iframe src="' + url + '" frameborder="0" allowtransparency="true" scrolling="no"></iframe>');
			$('#' + wrapperId + ' > div > div').first().append(iframe);
		}

		if (isOpen) {
			replyButton.html(replyText);
			wrapper.data('isReplyFormOpen', false);
			wrapper.down().hide('slide', {
				wrapper: wrapper,
				direction: 'up',
				duration: 1000,
				complete: function() {
					wrapper.data('locked', false);
				}
			});
		}
		else {
			replyButton.html(cancelText);
			wrapper.data('isReplyFormOpen', true);
			wrapper.down().show('slide', {
				wrapper: wrapper,
				direction: 'up',
				duration: 1000,
				complete: function() {
					wrapper.data('locked', false);
				}
			});
		}

		return false;
	};


})(Weebly.jQuery);




// -----------------------------------------------------------------------------------------------------
// Form Submission
// -----------------------------------------------------------------------------------------------------


(function(Weebly, $) {


	var stylePrefix = window.STYLE_PREFIX || 'weebly';
	var currentlyFocusedFormElement = null;


	function updateForm() {
		
		if (window.location.href.match(/posted=(.*)$/)) {
			var posted = Weebly.evalJSON(
				decodeURIComponent(window.location.href.match(/posted=(.*)$/)[1].replace(/\+/g, ' '))
			);
			$('form').each(function(i, formNode) {
				var form = $(formNode);
				$.each(posted, function(key, value) {
					if (typeof value === 'object') {
						$.each(value, function(subKey, subValue) {
							form.find('input').each(function(i, inputNode) {
								if (
									inputNode.name.replace(/_u\d*/, '') == key + '[' + subKey + ']'
									|| inputNode.name == key + '[' + subKey + ']'
								) {
									if (inputNode.type === 'checkbox') {
										inputNode.checked = 1;
									}
									else {
										inputNode.value = subValue;
									}
								}
							});
						});
					}
					else {
						form.find('input,textarea,select,button').each(function(i, inputNode) {
							if (
								inputNode.name.replace(/_u\d*/, '') == key
								|| inputNode.name == key
							) {
								var realName = inputNode.name;
								if (formNode[realName][0] && formNode[realName][0].type === 'radio') {
									form.find('radio[name=' + realName + ']').each(function(i, radioNode) {
										if (radioNode.value == value) {
											radioNode.checked = true;
										}
									});
								}
								else {
									inputNode.value = value;
								}
							}
						});
					}
				});
			});
		}

		if (window.location.href.match(/form-errors=(.*?)&/) && window.location.href.match(/ucfid%22%3A%22(.*?)%/) ) {
			var errors = window.location.href.match(/form\-errors=(.*?)&/)[1].split(',');
			var ucfid = window.location.href.match(/ucfid%22%3A%22(.*?)%/)[1];
			var form = $('#form-' + ucfid);
			$.each(errors, function(i, field) {
				field = decodeURIComponent(field);
				form.find('input,textarea,select,button').each(function(i, inputNode) {
					if (
						inputNode.name.replace(/_u\d*/, '') == field 
						|| inputNode.name.replace(/.*_u/, '_u') == field
						|| inputNode.name.replace(/\[.*\]$/, '') == field
					) {
						$(inputNode)
							.addClass('form-input-error')
							.up('.' + stylePrefix + '-form-field')
								.addClass('form-field-error');
					}
				});
			});
			$('#' + ucfid + '-form-parent').after('<div>Please correct the highlighted fields</div>');
		}

		if (window.location.href.match(/success\=1/) && window.location.href.match(/ucfid\=(.*)/)) {
			var ucfid = window.location.href.match(/ucfid\=(.*?)&/)[1];
			var form = $('#form-'+ucfid);
			var confText = 'Your data was successfully submitted.';
			var textMatch = window.location.href.match(/text=(.*?)&/);
			if (textMatch) {
				confText = decodeURIComponent(textMatch[1].replace(/\+/g, ' '));
			}
			form.html('<div>' + confText + '</div>');
		}
		
	}


	function listenToResponse() {

		function receiveMessage(message) {
			var response = Weebly.evalJSON(message.data);
			switch (response.action) {
				case "finished" :
					var ucfid = response.data.ucfid;
					var form = $("#form-" + ucfid);
					form.hide();
					var msgElm = $('#' + ucfid + '-msg');
					if (!msgElm.length) {
						msgElm = $('<div id="'+ucfid+'-msg"/>')
							.insertAfter(form);
					}
					msgElm.html(response.data.message);
					msgElm.effect('highlight', {}, 2000);
					$('body').animate({
						scrollTop: msgElm.offset().top
					}, {
						easing: 'easeOutQuart',
						duration: 2000
					});
					return;
				case "redirect" :
					window.location = response.data.location;
					return;
				case "error" :
					var errors = response.data['error-fields'];
					var ucfid = response.data.ucfid;
					var form = $("#form-" + ucfid);
					form.find('input,textarea,select,button')
						.filter('.form-input-error')
						.each(function(i, inputNode) {
							$(inputNode)
								.removeClass('form-input-error')
								.up('.' + stylePrefix + '-form-field')
								.removeClass('form-field-error');
						});
					$.each(errors, function(i, field) {
						form.find('input,textarea,select,button')
							.each(function(i, inputNode) {
								if (
									inputNode.name.replace(/_u\d*/, '') == field 
									|| inputNode.name.replace(/.*_u/, '_u') == field
									|| inputNode.name.replace(/\[.*\]$/, '') == field
								) {
									$(inputNode)
										.addClass('form-input-error')
										.up('.' + stylePrefix + '-form-field')
											.addClass('form-field-error');
								} 
							});
					});
					var msgElm = $('#' + ucfid + '-msg');
					if (!msgElm.length) {
						msgElm = $('<div id="' + ucfid + '-msg"/>').insertAfter(form);
					}
					msgElm.html(response.data.message);
					return;
			}
		}

		$('form').each(function(i, formNode) {
			if (formNode.action.match(/formSubmit\.php$/)) {
				
				formNode.action = formNode.action.replace(
					/(.*)\/formSubmit\.php$/,
					window.location.protocol + "//" + window.location.host +"/ajax/apps/formSubmitAjax.php"
				);
				formNode.acceptCharset = "UTF-8";
				var name = formNode.id + "-target";
				var iframe = $('<iframe name="' + name + '"/>')
					.hide()
					.attr('id', name)
					.insertAfter(formNode);
				var iframeNode = iframe[0];
				formNode.target = iframeNode.id;
			
				if (!window.postMessage) {
					iframe.on('load', function() {
						try {
							var location = (iframeNode.contentDocument || iframeNode.contentWindow.document).location.href;
							var data = (iframeNode.contentDocument || iframeNode.contentWindow.document).body.firstChild.nodeValue;
							if (location != "about:blank") {
								receiveMessage({
									data: data,
									source: iframeNode.contentWindow
								});
							}
						}
						catch(e) {}
					});
				}
			}   
		});

		if (window.postMessage) {
			$(window).on('message', function(event) {
				receiveMessage(event.originalEvent);
			});
		}

	}


	function showFieldInstructions(msg, pointTo) {
		
		removeFieldInstructions();
		var target = $(pointTo);
		target.identify();
		var image = false;
		var el =
			$("<div/>", {
				'class': 'instructions-container',
				'id': target.attr('id') + '-instructions'
			})
			.html(msg)
			.appendTo('body')
			.on('click', function() {
				el.hide().remove();
			});
		
		currentVisibleError = el.identify();
		
		var elWidth = el.outerWidth();
		var elHeight = el.outerHeight();
		var targetWidth = target.outerWidth();
		var targetHeight = target.outerHeight();
		var targetOffset = target.offset();
		el.css({
			top: targetOffset.top + targetHeight/2 - elHeight/2,
			left: targetOffset.left + targetWidth + 20
		});
		
		//set arrow position
		var imageTop  = Math.floor(elHeight/2) - 10;
		var imageLeft = '-13';
		el.append(
			'<img' +
			' src="http://www.weebly.com/images/error_arrow_left.gif"' +
			' style="position: absolute; left:'+ imageLeft + 'px; top:' + imageTop + 'px;"' +
			'/>'
		);
	}


	function handlerRemoveFieldInstructions(event) {
		var el = $(event.target);
		if (
			!el.hasClass(stylePrefix + '-form-field') &&
			!el.up('.' + stylePrefix + '-form-field').length
		) {
			$(document).off('mousemove', handlerRemoveFieldInstructions);
			removeFieldInstructions();
		}
	}


	function removeFieldInstructions() {
		$('.instructions-container').each(function(i, node) {
			var inputID = node.id.replace('-instructions', '');
			if (
				!currentlyFocusedFormElement ||
				$('#' + inputID).up('.' + stylePrefix + '-form-field').identify() != currentlyFocusedFormElement
			) {
				$(node).remove();
			}
		});
	}


	function fieldInstructionsHandler() {
		$('.' + stylePrefix + '-form-instructions').each(function(i, elNode) {
			var el = $(elNode);
			if (el.html()) {
				var pointTo = $('#' + elNode.id.replace('instructions', 'input'));
				// select inputs
				if (!pointTo.length) {
					pointTo = el.up('.' + stylePrefix + '-form-field').down('.form-select');
				}
				// radio/checkbox inputs
				if (!pointTo.length) {
					pointTo = el.up('.' + stylePrefix + '-form-field').down('.' + stylePrefix + '-form-label');
				}
				var container = pointTo.up('.' + stylePrefix + '-form-field');
				if (
					pointTo.up('.' + stylePrefix + '-form-input-container').length &&
					pointTo.up('.' + stylePrefix + '-form-input-container').hasClass(stylePrefix + '-form-left')
				) {
					pointTo = pointTo.up('.' + stylePrefix + '-form-input-container').next('.' + stylePrefix + '-form-right');
				}
				container.on('mouseover', function(event) {
					if ($(this).hasClass(stylePrefix + '-form-field')) {
						if (!container.down('.instructions-container').length) {
							showFieldInstructions(el.html(), pointTo);
						}
						$(document).on('mousemove', handlerRemoveFieldInstructions);
					}
				});
			}
		});
	}


	function setWeeblyApproved() {
		$("input[name=" + stylePrefix + "_approved]").val('weebly');
		$(document)
			.off('mousedown', setWeeblyApproved)
			.off('keydown', setWeeblyApproved);
	}

	/**
	 * Set up handlers for our search field. We have to do this because
	 * the 'submit' / 'search' button isn't a button but a span. Which
	 * makes it easier to stylize, but harder to convert into a button.
	 */
	function listenToSearchSubmit() {
		var $form = $('#wsite-header-search-form').on('click', 'span.wsite-search-button', function(ev) {
			$form.submit();
		}).on('submit', function() {
			// Disable search from Theme Previews
			return $(document.body).hasClass('wsite-page-theme_browser/preview') ? false : true;
		});
	}

	$(document)
		.ready(updateForm)
		.ready(fieldInstructionsHandler)
		.ready(listenToResponse)
		.ready(listenToSearchSubmit)
		.on('mousedown', setWeeblyApproved)
		.on('keydown', setWeeblyApproved)
		.on('click', function(event) {
			var el = $(event.target);
			var up = el.up('.' + stylePrefix + '-form-field');
			if (el.hasClass(stylePrefix + '-form-field')) {
				up = el;
			}
			if (up.length) {
				currentlyFocusedFormElement = up.identify();
			}
			else{
				currentlyFocusedFormElement = null;
			}
			removeFieldInstructions();
		});

})(Weebly, Weebly.jQuery);




// -----------------------------------------------------------------------------------------------------
// Fancybox
// -----------------------------------------------------------------------------------------------------


(function($) {

	$(document).ready(function() {

		$('a[rel=lightbox]') // ...standalone lightbox <a>'s
			.removeAttr('rel') // don't group them by rel (fancybox will want to)
			.add('a[rel^="lightbox["]') // ...select gallery <a>'s too
				.addClass('w-fancybox');
				
		if ($.fn.fancybox) { // mobile doesn't have fancybox. uses photoswipe instead

			// it's best to use a global selector to initialize fancybox so that it can use event delegation internally.
			// PS- fancybox's same event delegation is buggy when used like this:
			// $('.whatever').removeClass('whatever').fancybox()
			$('.w-fancybox')
				.fancybox({
					prevEffect: 'none',
					nextEffect: 'none',
					padding: 10,
					helpers: {
						title: {
							type: 'inside'
						},
						thumbs: {
							width: 50,
							height: 50
						}
					}
				});
				
			window.lightboxLoaded = true;
			
		}

	});

})(Weebly.jQuery);




// -----------------------------------------------------------------------------------------------------
// PhotoSwipe
// -----------------------------------------------------------------------------------------------------


(function($) {

	
	var callbacks = [];
	var insertedTags = false;
	var isTouch = 'ontouchstart' in document.documentElement;

	
	window.whenPhotoSwipeLoaded = function(callback) {
		// TODO: could jqueryify this
		if (window.Code && window.Code.PhotoSwipe) {
			callback();
		}else{
			callbacks.push(callback);
			if (!insertedTags) {
				insertedTags = true;
				var head = document.getElementsByTagName('head')[0];
				var script = document.createElement('script');
				var cssLink = document.createElement('link');
				script.type = 'text/javascript';
				script.async = true;
				script.src = STATIC_BASE + "weebly/libraries/photoswipe/code.photoswipe-3.0.4-custom.min.js";
				cssLink.setAttribute('rel', 'stylesheet');
				cssLink.setAttribute('type', 'text/css');
				cssLink.setAttribute('href', STATIC_BASE + "weebly/libraries/photoswipe/photoswipe.css");
				head.insertBefore(cssLink, head.firstChild);
				head.insertBefore(script, head.firstChild);
			}
		}
	};

	
	window._photoSwipeLoaded = function() { // called by the photoswipe JS file
		for (var i=0; i<callbacks.length; i++) {
			callbacks[i]();
		}
	};


	function initPhotoSwipeAnchors(anchorNodes) {
		// kill lightbox onclick
		$(anchorNodes)
			.removeClass('w-fancybox')
			.attr('onclick', '')
			.off('click');
		whenPhotoSwipeLoaded(function() {
			Code.PhotoSwipe.attach(
				anchorNodes,
				{
					captionAndToolbarFlipPosition: true,
					captionAndToolbarAutoHideDelay: 0, // always show
					loop: false
				}
			);
		});
	}


	if (isTouch) {
		$(document).ready(function() {
			var anchorGroups = {};
			$('a.w-fancybox').each(function(i, anchorNode) {
				var match = ($(anchorNode).attr('rel') || '').match(/^lightbox\[(.*)\]/);
				if (match) {
					var groupName = match[1];
					anchorGroups[groupName] = anchorGroups[groupName] || [];
					anchorGroups[groupName].push(anchorNode);
				}else{
					initPhotoSwipeAnchors([ anchorNode ]);
				}
			});
			$.each(anchorGroups, function(name, anchorNodes) {
				initPhotoSwipeAnchors(anchorNodes);
			});
		});
	}

	
})(Weebly.jQuery);

