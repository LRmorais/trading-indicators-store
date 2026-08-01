import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1100 } })).newPage();
await page.goto("http://localhost:8080", { waitUntil: "load" });
await page.waitForTimeout(500);

const rect = await page.evaluate(() => {
  const el = document.getElementById("planos");
  const r = el.getBoundingClientRect();
  return { top: r.top, height: r.height, docHeight: document.body.scrollHeight, headingText: el.querySelector("h2").textContent };
});
console.log("planos rect:", JSON.stringify(rect));

await page.evaluate(() => document.getElementById("planos").scrollIntoView({behavior:"instant", block:"start"}));
await page.waitForTimeout(600);
const scrollY = await page.evaluate(() => window.scrollY);
console.log("scrollY after scrollIntoView:", scrollY);
await page.screenshot({ path: "/private/tmp/claude-501/-Users-lucasmorais-Desktop-hub-site-indicadores-financeiros/1cf040fe-dc89-4f07-b385-e8dcec7cb8f1/scratchpad/shots/pricing-debug.png" });
await browser.close();
