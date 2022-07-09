// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const fs = require('fs')
const path = require('path')
const process = require('process');
const puppeteer = require('puppeteer');
const sleep = ms => new Promise(res => setTimeout(res, ms));

idmap = {}

var args = process.argv;
module.exports = {
  launch: function (skuId,id,port1,port2) {
    // whatever
    
(async () => {
  console.log(args)

  const max_file_count = Number(args[2]);
  const downloadPath = "file/"
  const link = "https://localhost:3000/?ar=0&mode=renderer&tenantId=bigc&productId="+skuId+"&env=local&port1="+port1+"&port2="+port2+"&id="+id
  
  ///console.log(downloadPath, link, max_file_count)
  //for ubuntu 20.04
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true, headless: false,executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"});
  
  // const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser', ignoreHTTPSErrors: true, headless: true, args: ['--no-sandbox']});
  const page = await browser.newPage(); 
  // await page._client.send("Page.setDownloadBehavior", {
  //   behavior: "allow",
  //   downloadPath: downloadPath
  // })
  console.log("setting page");
  // await page.setViewport({
  //   width: 1024,
  //   height: 1024,
  //   deviceScaleFactor: 1,
  // });
  await page.goto(link);
  idmap[id] = browser;
  // const max_sleep = 10*60*100000;
  // const wait_time = 1000;
  // var t = 0;
  // let file_count = 0;
  // let count = 0;
  //await sleep(wait_time);
//   while(t < max_sleep && file_count<=max_file_count){
//     count=0
//     const files = fs.readdirSync(downloadPath, {})
//       files.forEach(file => {
//         if(path.extname(file)==".png"){
//           count = count+1;
//         }
//       })    
//     file_count = count;
//     console.log(file_count)
//     await sleep(wait_time);
//     t += wait_time
//   }
  //  await browser.close();
})();
  },
  closebrowser: function (id) {
    console.log("closing broe");
    idmap[id].close();

  }
};

