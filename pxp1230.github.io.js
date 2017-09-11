d = document;
//判断是否是index.html
var isIndex=false;
var str=window.location.pathname;
a=str.substr(str.lastIndexOf("/")+1);
a=a.substr(0,a.lastIndexOf(".")).toLowerCase();
if(a==""||a=="index"){isIndex=true;}
//JSLoader
var JSLoader=function(){var scripts={};function getScript(url){var script=scripts[url];if(!script){script={loaded:false,funs:[]};scripts[url]=script;add(script,url)}return script}function run(script){var funs=script.funs,len=funs.length,i=0;for(;i<len;i++){var fun=funs.pop();fun()}}function add(script,url){var scriptdom=document.createElement('script');scriptdom.type='text/javascript';scriptdom.loaded=false;scriptdom.src=url;scriptdom.onload=function(){scriptdom.loaded=true;run(script);scriptdom.onload=scriptdom.onreadystatechange=null};scriptdom.onreadystatechange=function(){if((scriptdom.readyState==='loaded'||scriptdom.readyState==='complete')&&!scriptdom.loaded){run(script);scriptdom.onload=scriptdom.onreadystatechange=null}};document.getElementsByTagName('head')[0].appendChild(scriptdom)}return{load:function(url){var arg=arguments,len=arg.length,i=1,script=getScript(url),loaded=script.loaded;for(;i<len;i++){var fun=arg[i];if(typeof fun==='function'){if(loaded){fun()}else{script.funs.push(fun)}}}}}}();
if(!isIndex){
	//处理title
	var ch=d.title.charAt(d.title.length-1);
	if(ch==" "){
		d.title=d.title.substr(0,d.title.length-3);
	}else if(ch=="–"||ch=="-"){
		d.title=d.title.substr(0,d.title.length-2);
	}
	//监听键盘事件
	d.onkeydown=function(e){if(typeof(disableListenKeyDownEvent)=='undefined'){if(e.keyCode==88||e.keyCode==27||e.keyCode==46){window.open('','_self');window.close()}else if(e.keyCode==37)window.open('index.html','_self')}}
}else{
	//监听键盘事件
	function FindFirstChar(str,ch){for(var i=0;i<str.length;i++){var testChar=str.charAt(i).toUpperCase();var testCharCode=testChar.charCodeAt(0);if((testCharCode<=57&&testCharCode>=48)||(testCharCode<=90&&testCharCode>=65)){if(testChar==ch)return true;break}}return false}
	d.onkeydown=function(e){if(typeof(disableListenKeyDownEvent)=='undefined')if(e.keyCode==37)window.open('../index.html','_self');else if(e.keyCode==27||e.keyCode==46){window.open('','_self');window.close()}else if((e.keyCode<=57&&e.keyCode>=48)||(e.keyCode<=90&&e.keyCode>=65)){var keychar=String.fromCharCode(e.keyCode);var links=d.links;for(var i=0;i<links.length;i++){if(!links[i].onclick&&FindFirstChar(links[i].innerText,keychar)){window.open(links[i].href,links[i].target=='_blank'?'_blank':'_self');break}}}}
}
//创建首部元素
c = d.createElement('style');
c.type = "text/css";
var css = "#navbar{background:#333;background:-webkit-gradient(linear,0% 0%,0% 100%,from(#333),to(#232323));margin:20px 0;border:none;box-shadow:4px 8px 20px #000;border-radius:2px;}#navbar .m-nav{margin:0 auto;text-align:center;}#navbar a{display:inline-flex;justify-content:center;align-items:center;color:#666;font:bold 15px 'Hiragino Sans GB','Microsoft YaHei','微软雅黑',tahoma,arial,simsun,'宋体';width:16%;min-width:80px;max-width:250px;line-height:35px;height:35px;text-decoration:none;}#navbar a:hover{color:#666;background:#282828;background:-webkit-gradient(linear,0% 0%,0% 100%,from(#333),to(#15292f));box-shadow:0px 0px 4px #111;}#busuanzi{width:100%;text-align:center;color:rgba(73,73,73,0.7);font:bold 12px 'Hiragino Sans GB','Microsoft YaHei','微软雅黑',tahoma,arial,simsun,'宋体';margin:20px auto 16px;line-height:1.6;}#busuanzi .no-break-span{display:inline-block !important;margin:0 10px;}";
nav = d.createElement("div");
nav.id="navbar";
nav.innerHTML="<div class=\"m-nav\">"+
		"<a href=\"/\">首页</a>"+
		"<a href=\"./\">目录</a>"+
		"<a href=\"/README.html\">关于</a>"+
		"<a  target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=2423200363&site=qq&menu=yes\" onclick=\"manual_load_js()\">QQ在线</a>"+
	"</div>";
if(isIndex){
	surrounderEnable = false;
	var pathname=window.location.pathname;
	if(pathname=="/"||pathname=="/index.html")
		d.title = "DEATH MATCH";
}else{
	css += "div#surrounder{max-width:700px;margin:25px auto;}";
	d.title += " - "+d.domain;
	surrounderEnable = true;
}
if(c.styleSheet){
	c.styleSheet.cssText = css;
}else{
	c.appendChild(d.createTextNode(css));
}
d.head.appendChild(c);
//https://highlightjs.org/，使用过的样式：pojoaque.min.css
highlight_style = d.createElement('link');
highlight_style.rel = "stylesheet";
highlight_style.href = "//cdn.bootcss.com/highlight.js/9.12.0/styles/railscasts.min.css";
//创建尾部元素
mathjax = d.createElement('script');
mathjax.src = '//cdn.bootcss.com/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML';
busuanzi = d.createElement("div");
busuanzi.id="busuanzi";
var year = new Date().getFullYear();
busuanzi.innerHTML = "<span class='no-break-span'>© 2015"+(year==2015?"":"－"+year)+" 潘霄鹏</span><span id='busuanzi_container_page_pv' class='no-break-span'>本页已被阅读 <span id='busuanzi_value_page_pv'>-</span> 次</span><span id='busuanzi_container_site_uv' class='no-break-span'>博客已被 <span id='busuanzi_value_site_uv'>-</span> 人访问</span>";
window.onload = function() {
	//调整布局，添加所有元素
	if(surrounderEnable){
		surrounder = d.createElement("div");
		surrounder.id="surrounder";
		while(d.body.hasChildNodes())
			surrounder.appendChild(d.body.firstChild);
		d.body.appendChild(surrounder);
	}
	d.body.insertBefore(nav,d.body.firstChild);
	if(!isIndex && a!="readme"){
		var cc=d.createElement("p");
		cc.innerHTML="<br><br><br><br><strong>✲</strong> <em>版权声明：转载时请以超链接形式标明 <a href='"+window.location.href+"'>文章原始出处</a> 和 <a href='http://pxp1230.github.io/README.html'>作者信息</a> 及 <a href='http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh'>本声明</a></em><br><strong>✲</strong> <em>署名-非商业性使用-禁止演绎 4.0 国际</em><br><strong>✲</strong> <em>Attribution-NonCommercial-NoDerivatives 4.0 International (<a href='http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh'>CC BY-NC-ND 4.0</a>)</em>";
		surrounder.appendChild(cc);
	}
	d.body.appendChild(busuanzi);
	//https://highlightjs.org/
	d.head.appendChild(highlight_style);
	JSLoader.load('//cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js',function(){hljs.initHighlighting();});
	(d.head || d.body).appendChild(mathjax);
	(function() {
		//http://ibruce.info/
		var s1 = d.createElement('script');
		s1.src = '//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js';
		s1.async = true;
		d.body.appendChild(s1);
		//https://pxp1230.qiyukf.com/
		if(a=="readme"){
			manual_load_js();
		}
	})();
};
function manual_load_js(){
	if(typeof(disableListenKeyDownEvent)!='undefined')return;
	disableListenKeyDownEvent = true;
	//https://pxp1230.qiyukf.com/
	var s3 = d.createElement('script');
	s3.src = '//qiyukf.com/script/0df53532e5f9eed1c406c616d31dea34.js';
	s3.defer = true;
	s3.async = true;
	d.head.appendChild(s3);
}

