const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const dir=process.argv[2], out=process.argv[3];
const specs=JSON.parse(process.argv[4]);
const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.css':'text/css'};
(async()=>{
  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  await ctx.route('http://maquette.local/**',r=>{
    const u=new URL(r.request().url()); const fp=path.join(dir,decodeURIComponent(u.pathname));
    if(fs.existsSync(fp)&&fs.statSync(fp).isFile()) r.fulfill({body:fs.readFileSync(fp),contentType:types[path.extname(fp)]||'application/octet-stream'});
    else r.fulfill({status:404,body:''});
  });
  for(const [key,board,text] of specs){
    const p=await ctx.newPage();
    await p.goto('http://maquette.local/'+board+'.dc.html',{waitUntil:'networkidle',timeout:30000});
    await p.waitForTimeout(1500);
    let y=0;
    if(text){ y=await p.evaluate(t=>{const h=t.startsWith('#'); const n=t.replace(/^#/,''); const el=[...document.querySelectorAll(h?'h1,h2,h3':'h1,h2,h3,span,div,p')].find(e=>h? e.textContent.trim().endsWith(n) : (e.childElementCount===0&&e.textContent.trim()===n)); if(!el) return -1; const r=el.getBoundingClientRect(); return r.top+window.scrollY;},text); if(y<0){console.log(key,'TEXT NOT FOUND');} else await p.evaluate(v=>window.scrollTo(0,v-70),y); await p.waitForTimeout(500);}
    await p.screenshot({path:path.join(out,key+'.png')});
    console.log(key,board,text||'',Math.round(y)); await p.close();
  }
  await b.close();
})();
