/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
var Stats=function(){var a=Date.now(),b=a,c=0,d=1/0,e=0,f=0,g=1/0,h=0,i=0,j=0,k=document.createElement("div");k.id="stats",k.addEventListener("mousedown",function(a){a.preventDefault(),s(++j%2)},!1),k.style.cssText="width:80px;opacity:0.9;cursor:pointer";var l=document.createElement("div");l.id="fps",l.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",k.appendChild(l);var m=document.createElement("div");m.id="fpsText",m.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",m.innerHTML="FPS",l.appendChild(m);var n=document.createElement("div");for(n.id="fpsGraph",n.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",l.appendChild(n);n.children.length<74;){var o=document.createElement("span");o.style.cssText="width:1px;height:30px;float:left;background-color:#113",n.appendChild(o)}var p=document.createElement("div");p.id="ms",p.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",k.appendChild(p);var q=document.createElement("div");q.id="msText",q.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",q.innerHTML="MS",p.appendChild(q);var r=document.createElement("div");for(r.id="msGraph",r.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",p.appendChild(r);r.children.length<74;){var o=document.createElement("span");o.style.cssText="width:1px;height:30px;float:left;background-color:#131",r.appendChild(o)}var s=function(a){switch(j=a){case 0:l.style.display="block",p.style.display="none";break;case 1:l.style.display="none",p.style.display="block"}},t=function(a,b){var c=a.appendChild(a.firstChild);c.style.height=b+"px"};return{REVISION:11,domElement:k,setMode:s,begin:function(){a=Date.now()},end:function(){var j=Date.now();return c=j-a,d=Math.min(d,c),e=Math.max(e,c),q.textContent=c+" MS ("+d+"-"+e+")",t(r,Math.min(30,30-c/200*30)),i++,j>b+1e3&&(f=Math.round(1e3*i/(j-b)),g=Math.min(g,f),h=Math.max(h,f),m.textContent=f+" FPS ("+g+"-"+h+")",t(n,Math.min(30,30-f/100*30)),b=j,i=0),j},update:function(){a=this.end()}}};