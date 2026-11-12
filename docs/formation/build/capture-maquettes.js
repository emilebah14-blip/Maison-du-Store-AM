const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const dir=process.argv[2], out=process.argv[3], only=process.argv.slice(4);
const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.css':'text/css'};
(async()=>{
  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
  await ctx.route('http://maquette.local/**',r=>{
    const u=new URL(r.request().url()); const fp=path.join(dir,decodeURIComponent(u.pathname));
    if(fs.existsSync(fp)&&fs.statSync(fp).isFile()) r.fulfill({body:fs.readFileSync(fp),contentType:types[path.extname(fp)]||'application/octet-stream'});
    else { console.log('  404',u.pathname); r.fulfill({status:404,body:''}); }
  });
  const boards=JSON.parse(fs.readFileSync(path.join(dir,'canvas-pro.json'))).boards;
  const files=only.length?only.map(n=>n+'.dc.html'):fs.readdirSync(dir).filter(f=>f.endsWith('.dc.html'));
  for(const f of files){
    const bd=boards[f]||{w:1440,h:900}; const p=await ctx.newPage(); await p.setViewportSize({width:bd.w,height:Math.min(bd.h,1400)});
    try{
      await p.goto('http://maquette.local/'+f,{waitUntil:'networkidle',timeout:30000});
      await p.waitForTimeout(2000);
      await p.screenshot({path:path.join(out,f.replace('.dc.html','.png')),fullPage:true});
      console.log(f,'ok');
    }catch(e){console.log(f,'FAIL',e.message.slice(0,100));}
    await p.close();
  }
  await b.close();
})();
