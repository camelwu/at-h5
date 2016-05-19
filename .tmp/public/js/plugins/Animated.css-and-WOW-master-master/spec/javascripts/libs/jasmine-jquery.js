/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
+function(a,b,c){"use strict";b.spiedEventsKey=function(a,b){return[c(a).selector,b].toString()},b.getFixtures=function(){return b.currentFixtures_=b.currentFixtures_||new b.Fixtures},b.getStyleFixtures=function(){return b.currentStyleFixtures_=b.currentStyleFixtures_||new b.StyleFixtures},b.Fixtures=function(){this.containerId="jasmine-fixtures",this.fixturesCache_={},this.fixturesPath="spec/javascripts/fixtures"},b.Fixtures.prototype.set=function(a){return this.cleanUp(),this.createContainer_(a)},b.Fixtures.prototype.appendSet=function(a){this.addToContainer_(a)},b.Fixtures.prototype.preload=function(){this.read.apply(this,arguments)},b.Fixtures.prototype.load=function(){this.cleanUp(),this.createContainer_(this.read.apply(this,arguments))},b.Fixtures.prototype.appendLoad=function(){this.addToContainer_(this.read.apply(this,arguments))},b.Fixtures.prototype.read=function(){for(var a=[],b=arguments,c=b.length,d=0;c>d;d++)a.push(this.getFixtureHtml_(b[d]));return a.join("")},b.Fixtures.prototype.clearCache=function(){this.fixturesCache_={}},b.Fixtures.prototype.cleanUp=function(){c("#"+this.containerId).remove()},b.Fixtures.prototype.sandbox=function(a){var b=a||{};return c('<div id="sandbox" />').attr(b)},b.Fixtures.prototype.createContainer_=function(a){var b=c("<div>").attr("id",this.containerId).html(a);return c(document.body).append(b),b},b.Fixtures.prototype.addToContainer_=function(a){var b=c(document.body).find("#"+this.containerId).append(a);b.length||this.createContainer_(a)},b.Fixtures.prototype.getFixtureHtml_=function(a){return"undefined"==typeof this.fixturesCache_[a]&&this.loadFixtureIntoCache_(a),this.fixturesCache_[a]},b.Fixtures.prototype.loadFixtureIntoCache_=function(a){var b=this,d=this.makeFixtureUrl_(a),e="",f=(c.ajax({async:!1,cache:!1,url:d,success:function(a,b,c){e=c.responseText}}).fail(function(){throw new Error("Fixture could not be loaded: "+d+" (status: "+status+", message: "+errorThrown.message+")")}),c(c.parseHTML(e,!0)).find("script[src]")||[]);f.each(function(){c.ajax({async:!1,cache:!1,dataType:"script",url:c(this).attr("src"),success:function(a,b,c){e+="<script>"+c.responseText+"</script>"},error:function(a,b,c){throw new Error("Script could not be loaded: "+scriptSrc+" (status: "+b+", message: "+c.message+")")}})}),b.fixturesCache_[a]=e},b.Fixtures.prototype.makeFixtureUrl_=function(a){return this.fixturesPath.match("/$")?this.fixturesPath+a:this.fixturesPath+"/"+a},b.Fixtures.prototype.proxyCallTo_=function(a,b){return this[a].apply(this,b)},b.StyleFixtures=function(){this.fixturesCache_={},this.fixturesNodes_=[],this.fixturesPath="spec/javascripts/fixtures"},b.StyleFixtures.prototype.set=function(a){this.cleanUp(),this.createStyle_(a)},b.StyleFixtures.prototype.appendSet=function(a){this.createStyle_(a)},b.StyleFixtures.prototype.preload=function(){this.read_.apply(this,arguments)},b.StyleFixtures.prototype.load=function(){this.cleanUp(),this.createStyle_(this.read_.apply(this,arguments))},b.StyleFixtures.prototype.appendLoad=function(){this.createStyle_(this.read_.apply(this,arguments))},b.StyleFixtures.prototype.cleanUp=function(){for(;this.fixturesNodes_.length;)this.fixturesNodes_.pop().remove()},b.StyleFixtures.prototype.createStyle_=function(a){var b=c("<div></div>").html(a).text(),d=c("<style>"+b+"</style>");this.fixturesNodes_.push(d),c("head").append(d)},b.StyleFixtures.prototype.clearCache=b.Fixtures.prototype.clearCache,b.StyleFixtures.prototype.read_=b.Fixtures.prototype.read,b.StyleFixtures.prototype.getFixtureHtml_=b.Fixtures.prototype.getFixtureHtml_,b.StyleFixtures.prototype.loadFixtureIntoCache_=b.Fixtures.prototype.loadFixtureIntoCache_,b.StyleFixtures.prototype.makeFixtureUrl_=b.Fixtures.prototype.makeFixtureUrl_,b.StyleFixtures.prototype.proxyCallTo_=b.Fixtures.prototype.proxyCallTo_,b.getJSONFixtures=function(){return b.currentJSONFixtures_=b.currentJSONFixtures_||new b.JSONFixtures},b.JSONFixtures=function(){this.fixturesCache_={},this.fixturesPath="spec/javascripts/fixtures/json"},b.JSONFixtures.prototype.load=function(){return this.read.apply(this,arguments),this.fixturesCache_},b.JSONFixtures.prototype.read=function(){for(var a=arguments,b=a.length,c=0;b>c;c++)this.getFixtureData_(a[c]);return this.fixturesCache_},b.JSONFixtures.prototype.clearCache=function(){this.fixturesCache_={}},b.JSONFixtures.prototype.getFixtureData_=function(a){return this.fixturesCache_[a]||this.loadFixtureIntoCache_(a),this.fixturesCache_[a]},b.JSONFixtures.prototype.loadFixtureIntoCache_=function(a){var b=this,d=this.fixturesPath.match("/$")?this.fixturesPath+a:this.fixturesPath+"/"+a;c.ajax({async:!1,cache:!1,dataType:"json",url:d,success:function(c){b.fixturesCache_[a]=c},error:function(a,b,c){throw new Error("JSONFixture could not be loaded: "+d+" (status: "+b+", message: "+c.message+")")}})},b.JSONFixtures.prototype.proxyCallTo_=function(a,b){return this[a].apply(this,b)},b.jQuery=function(){},b.jQuery.browserTagCaseIndependentHtml=function(a){return c("<div/>").append(a).html()},b.jQuery.elementToString=function(a){return c(a).map(function(){return this.outerHTML}).toArray().join(", ")};var d={spiedEvents:{},handlers:[]};b.jQuery.events={spyOn:function(a,e){var f=function(c){d.spiedEvents[b.spiedEventsKey(a,e)]=b.util.argsToArray(arguments)};return c(a).on(e,f),d.handlers.push(f),{selector:a,eventName:e,handler:f,reset:function(){delete d.spiedEvents[b.spiedEventsKey(a,e)]}}},args:function(a,c){var e=d.spiedEvents[b.spiedEventsKey(a,c)];if(!e)throw"There is no spy for "+c+" on "+a.toString()+". Make sure to create a spy using spyOnEvent.";return e},wasTriggered:function(a,c){return!!d.spiedEvents[b.spiedEventsKey(a,c)]},wasTriggeredWith:function(a,c,d,e,f){var g=b.jQuery.events.args(a,c).slice(1);return"[object Array]"!==Object.prototype.toString.call(d)&&(g=g[0]),e.equals(d,g,f)},wasPrevented:function(a,c){var e=d.spiedEvents[b.spiedEventsKey(a,c)],f=e?e[0]:void 0;return f&&f.isDefaultPrevented()},wasStopped:function(a,c){var e=d.spiedEvents[b.spiedEventsKey(a,c)],f=e?e[0]:void 0;return f&&f.isPropagationStopped()},cleanUp:function(){d.spiedEvents={},d.handlers=[]}};var e=function(a,b){return void 0===b?void 0!==a:a===b};beforeEach(function(){b.addMatchers({toHaveClass:function(){return{compare:function(a,b){return{pass:c(a).hasClass(b)}}}},toHaveCss:function(){return{compare:function(a,b){for(var d in b){var e=b[d];if(("auto"!==e||"auto"!==c(a).get(0).style[d])&&c(a).css(d)!==e)return{pass:!1}}return{pass:!0}}}},toBeVisible:function(){return{compare:function(a){return{pass:c(a).is(":visible")}}}},toBeHidden:function(){return{compare:function(a){return{pass:c(a).is(":hidden")}}}},toBeSelected:function(){return{compare:function(a){return{pass:c(a).is(":selected")}}}},toBeChecked:function(){return{compare:function(a){return{pass:c(a).is(":checked")}}}},toBeEmpty:function(){return{compare:function(a){return{pass:c(a).is(":empty")}}}},toBeInDOM:function(){return{compare:function(a){return{pass:c.contains(document.documentElement,c(a)[0])}}}},toExist:function(){return{compare:function(a){return{pass:c(a).length}}}},toHaveLength:function(){return{compare:function(a,b){return{pass:c(a).length===b}}}},toHaveAttr:function(){return{compare:function(a,b,d){return{pass:e(c(a).attr(b),d)}}}},toHaveProp:function(){return{compare:function(a,b,d){return{pass:e(c(a).prop(b),d)}}}},toHaveId:function(){return{compare:function(a,b){return{pass:c(a).attr("id")==b}}}},toHaveHtml:function(){return{compare:function(a,d){return{pass:c(a).html()==b.jQuery.browserTagCaseIndependentHtml(d)}}}},toContainHtml:function(){return{compare:function(a,d){var e=c(a).html(),f=b.jQuery.browserTagCaseIndependentHtml(d);return{pass:e.indexOf(f)>=0}}}},toHaveText:function(){return{compare:function(a,b){var d=c.trim(c(a).text());return b&&c.isFunction(b.test)?{pass:b.test(d)}:{pass:d==b}}}},toContainText:function(){return{compare:function(a,b){var d=c.trim(c(a).text());return b&&c.isFunction(b.test)?{pass:b.test(d)}:{pass:-1!=d.indexOf(b)}}}},toHaveValue:function(){return{compare:function(a,b){return{pass:c(a).val()===b}}}},toHaveData:function(){return{compare:function(a,b,d){return{pass:e(c(a).data(b),d)}}}},toContainElement:function(){return{compare:function(b,d){return a.debug,{pass:c(b).find(d).length}}}},toBeMatchedBy:function(){return{compare:function(a,b){return{pass:c(a).filter(b).length}}}},toBeDisabled:function(){return{compare:function(a,b){return{pass:c(a).is(":disabled")}}}},toBeFocused:function(a){return{compare:function(a,b){return{pass:c(a)[0]===c(a)[0].ownerDocument.activeElement}}}},toHandle:function(){return{compare:function(a,b){var d=c._data(c(a).get(0),"events");if(!d||!b||"string"!=typeof b)return{pass:!1};var e=b.split("."),f=e.shift(),g=e.slice(0).sort(),h=new RegExp("(^|\\.)"+g.join("\\.(?:.*\\.)?")+"(\\.|$)");if(!d[f]||!e.length)return{pass:d[f]&&d[f].length>0};for(var i=0;i<d[f].length;i++){var j=d[f][i].namespace;if(h.test(j))return{pass:!0}}return{pass:!1}}}},toHandleWith:function(){return{compare:function(a,b,d){for(var e=b.split(".")[0],f=c._data(c(a).get(0),"events")[e],g=0;g<f.length;g++)if(f[g].handler==d)return{pass:!0};return{pass:!1}}}},toHaveBeenTriggeredOn:function(){return{compare:function(a,d){var e={pass:b.jQuery.events.wasTriggered(d,a)};return e.message=e.pass?"Expected event "+c(a)+" not to have been triggered on "+d:"Expected event "+c(a)+" to have been triggered on "+d,e}}},toHaveBeenTriggered:function(){return{compare:function(a){var c=a.eventName,d=a.selector,e={pass:b.jQuery.events.wasTriggered(d,c)};return e.message=e.pass?"Expected event "+c+" not to have been triggered on "+d:"Expected event "+c+" to have been triggered on "+d,e}}},toHaveBeenTriggeredOnAndWith:function(a,c){return{compare:function(d,e,f){var g=b.jQuery.events.wasTriggered(e,d),h={pass:g&&b.jQuery.events.wasTriggeredWith(e,d,f,a,c)};if(g){var i=b.jQuery.events.args(e,d,f)[1];h.message=h.pass?"Expected event "+d+" not to have been triggered with "+b.pp(f)+" but it was triggered with "+b.pp(i):"Expected event "+d+" to have been triggered with "+b.pp(f)+"  but it was triggered with "+b.pp(i)}else h.message=h.pass?"Expected event "+d+" not to have been triggered on "+e:"Expected event "+d+" to have been triggered on "+e;return h}}},toHaveBeenPreventedOn:function(){return{compare:function(a,c){var d={pass:b.jQuery.events.wasPrevented(c,a)};return d.message=d.pass?"Expected event "+a+" not to have been prevented on "+c:"Expected event "+a+" to have been prevented on "+c,d}}},toHaveBeenPrevented:function(){return{compare:function(a){var c=a.eventName,d=a.selector,e={pass:b.jQuery.events.wasPrevented(d,c)};return e.message=e.pass?"Expected event "+c+" not to have been prevented on "+d:"Expected event "+c+" to have been prevented on "+d,e}}},toHaveBeenStoppedOn:function(){return{compare:function(a,c){var d={pass:b.jQuery.events.wasStopped(c,a)};return d.message=d.pass?"Expected event "+a+" not to have been stopped on "+c:"Expected event "+a+" to have been stopped on "+c,d}}},toHaveBeenStopped:function(){return{compare:function(a){var c=a.eventName,d=a.selector,e={pass:b.jQuery.events.wasStopped(d,c)};return e.message=e.pass?"Expected event "+c+" not to have been stopped on "+d:"Expected event "+c+" to have been stopped on "+d,e}}}}),b.getEnv().addCustomEqualityTester(function(a,d){if(a&&d){if(a instanceof c||b.isDomNode(a)){var e=c(a);return d instanceof c?e.length==d.length&&a.is(d):e.is(d)}if(d instanceof c||b.isDomNode(d)){var f=c(d);return a instanceof jQuery?a.length==f.length&&f.is(a):c(d).is(a)}}}),b.getEnv().addCustomEqualityTester(function(a,b){return a instanceof jQuery&&b instanceof jQuery&&a.size()==b.size()?a.is(b):void 0})}),afterEach(function(){b.getFixtures().cleanUp(),b.getStyleFixtures().cleanUp(),b.jQuery.events.cleanUp()}),a.readFixtures=function(){return b.getFixtures().proxyCallTo_("read",arguments)},a.preloadFixtures=function(){b.getFixtures().proxyCallTo_("preload",arguments)},a.loadFixtures=function(){b.getFixtures().proxyCallTo_("load",arguments)},a.appendLoadFixtures=function(){b.getFixtures().proxyCallTo_("appendLoad",arguments)},a.setFixtures=function(a){return b.getFixtures().proxyCallTo_("set",arguments)},a.appendSetFixtures=function(){b.getFixtures().proxyCallTo_("appendSet",arguments)},a.sandbox=function(a){return b.getFixtures().sandbox(a)},a.spyOnEvent=function(a,c){return b.jQuery.events.spyOn(a,c)},a.preloadStyleFixtures=function(){b.getStyleFixtures().proxyCallTo_("preload",arguments)},a.loadStyleFixtures=function(){b.getStyleFixtures().proxyCallTo_("load",arguments)},a.appendLoadStyleFixtures=function(){b.getStyleFixtures().proxyCallTo_("appendLoad",arguments)},a.setStyleFixtures=function(a){b.getStyleFixtures().proxyCallTo_("set",arguments)},a.appendSetStyleFixtures=function(a){b.getStyleFixtures().proxyCallTo_("appendSet",arguments)},a.loadJSONFixtures=function(){return b.getJSONFixtures().proxyCallTo_("load",arguments)},a.getJSONFixture=function(a){return b.getJSONFixtures().proxyCallTo_("read",arguments)[a]}}(window,window.jasmine,window.jQuery);