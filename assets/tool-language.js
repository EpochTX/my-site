window.TOOL_TRANSLATIONS = {
  "查询结果": "Lookup results",
  "NET SIGHT / IP 信息": "NET SIGHT / IP INFORMATION",
  "本地与出口 IP": "Local & exit IP",
  "本地 / 出口 / 查询": "Local / Exit / Lookup",
  "本地 / 直连 IP": "Local / direct IP",
  "my.ip.cn 接口": "my.ip.cn service",
  "出口 IP": "Exit IP",
  "公网出口": "Public internet exit",
  "自定义查询": "Custom lookup",
  "输入 IP / 域名，留空刷新当前出口 IP": "Enter an IP or domain; leave blank to refresh your exit IP",
  "查询": "Look up",
  "刷新全部": "Refresh all",
  "清空": "Clear",
  "准备查询...": "Ready to look up...",
  "正在检测": "Detecting...",
  "正在查询": "Looking up...",
  "等待查询": "Waiting for a query",
  "本地 / 直连 IP 地图": "Local / direct IP map",
  "本地直连 IP 地图": "Local / direct IP map",
  "出口 IP 地图": "Exit IP map",
  "查询结果地图": "Lookup result map",
  "正在等待本地 IP 接口返回。": "Waiting for the local IP service.",
  "幸运抽签 / 决策实验室": "LUCKY DRAW / DECISION LAB",
  "幸运抽签站": "Lucky draw",
  "列表、数字、是 / 否、权重与历史记录。": "Lists, numbers, yes or no, weighted choices, and history.",
  "列表抽签": "From a list",
  "数字范围": "Number range",
  "是 / 否": "Yes / No",
  "权重抽签": "Weighted draw",
  "每行一个选项": "One option per line",
  "去重": "Remove duplicates",
  "事项模板": "Activity ideas",
  "吃饭模板": "Food ideas",
  "是": "Yes",
  "否": "No",
  "再想想": "Think again",
  "格式：选项 | 权重": "Format: option | weight",
  "开始抽签": "Start draw",
  "重置动画": "Reset",
  "复制结果": "Copy result",
  "准备开始": "Ready when you are",
  "历史次数": "Total draws",
  "不同结果": "Unique results",
  "最近结果": "Recent results",
  "暂无历史": "No history yet",
  "清空历史": "Clear history",
  "状态": "Status",
  "查询中": "Looking up...",
  "IP 信息已更新。你也可以输入 IP / 域名继续查询。": "IP details updated. You can also look up an IP or domain.",
  "先写选项": "Add some options first",
  "原始返回": "Raw response",
  "可能存在代理特征": "Possible proxy indicators",
  "国家 / 地区": "Country / region",
  "坐标": "Coordinates",
  "城市": "City",
  "复制失败": "Copy failed",
  "已复制": "Copied",
  "当前出口 IP 已刷新。": "Current exit IP refreshed.",
  "接口": "Service",
  "接口已返回 IP，但详情接口暂时不可用": "An IP was returned, but its details are temporarily unavailable.",
  "时区": "Time zone",
  "未发现明显代理风险": "No obvious proxy indicators found",
  "本地 IP": "Local IP",
  "本地 IP 接口不可用": "Local IP service unavailable",
  "本地 IP 接口请求失败，请检查网络分流或接口可用性。": "Local IP request failed. Check your routing or service availability.",
  "查询失败": "Lookup failed",
  "正在刷新当前出口 IP...": "Refreshing current exit IP...",
  "正在识别出口公网 IP...": "Identifying public exit IP...",
  "正在调用本地 IP 接口": "Contacting the local IP service",
  "省州": "State / province",
  "组织": "Organization",
  "网络不可用": "Network unavailable",
  "网络请求失败": "Network request failed",
  "自定义查询完成，右侧查询地图已更新。": "Custom lookup complete. The result map has been updated.",
  "说明": "Details",
  "路由": "Route",
  "选项 A": "Option A",
  "选项 B": "Option B",
  "风险": "Risk indicators",
  "本地 IP 接口返回：": "Local IP service returned: ",
  "出口 IP 查询失败：": "Exit IP lookup failed: ",
  "查询失败：": "Lookup failed: ",
  "，数据来自 ": "; source: ",
  "，地图已按接口返回的公网地址定位。": ". The map uses the returned public IP location.",
  "，详情接口暂时不可用。": "; details are temporarily unavailable.",
  "本地 / 直连 IP：": "Local / direct IP: ",
  "正在查询 ": "Looking up "
};
(() => {
 try{window.Site.lang=localStorage.getItem('siteLanguage')||localStorage.getItem('epochtx-lang')||'zh';}catch(_){}
 const map=window.TOOL_TRANSLATIONS, sources=new WeakMap();
 const terms=Object.keys(map).sort((a,b)=>b.length-a.length);
 window.toolText = text => {
   const source=String(text); if (window.Site?.lang !== 'en') return source;
   if(map[source])return map[source];
   // Match original fragments in one pass so translations never translate each other.
   const pattern=new RegExp(terms.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
   return source.replace(pattern,s=>map[s]);
 };
 function convert(node) {
   if(node.nodeType!==3||!node.textContent.trim())return;
   if(node.parentElement?.closest('script,style,textarea,[data-zh],#draw-output,#draw-history'))return;
   let record=sources.get(node);
   if(!record||record.rendered!==node.textContent){record={source:node.textContent,rendered:null};sources.set(node,record);}
   const text=toolText(record.source);if(text!==node.textContent)node.textContent=text;record.rendered=text;
 }
 function translate() {
   observer.disconnect();
   const walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);let node;
   while(node=walker.nextNode())convert(node);
   document.querySelectorAll('main [placeholder],main iframe[title]').forEach(el=>{
     const attr=el.hasAttribute('placeholder')?'placeholder':'title';
     const key='original'+attr;if(!el.dataset[key])el.dataset[key]=el.getAttribute(attr);
     el.setAttribute(attr,toolText(el.dataset[key]));
   });
   observer.observe(document.querySelector('main'),{subtree:true,childList:true,characterData:true});
 }
 const observer=new MutationObserver(translate);
 const defaults={
  'draw-items':['火锅\n烤肉\n麦当劳\n兰州拉面\n便利店饭团\n麻辣烫','Hot pot\nBBQ\nBurgers\nNoodles\nRice balls\nSpicy soup'],
  'weight-items':['高优先级任务 | 5\n普通任务 | 2\n摸鱼五分钟 | 1','High-priority task | 5\nRegular task | 2\nFive-minute break | 1']
 };
 function translateDefaults(){
   Object.entries(defaults).forEach(([id,values])=>{const el=document.getElementById(id);if(el&&values.includes(el.value))el.value=values[Site.lang==='en'?1:0];});
   const samples=document.querySelectorAll('[data-sample]');
   const en=['Write code|Play a game|Tidy the desk|Review a project|Take a walk|Watch a show','Hot pot|BBQ|Noodles|Spicy soup|Burgers|Convenience store'];
   samples.forEach((el,i)=>{el.dataset.sampleZh ||= el.dataset.sample;el.dataset.sample=Site.lang==='en'?en[i]:el.dataset.sampleZh;});
 }
 translate();translateDefaults();
 document.addEventListener('site:language',()=>{translate();translateDefaults();});
})();
