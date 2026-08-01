import { chromium } from "playwright";

const shotsDir = "/private/tmp/claude-501/-Users-lucasmorais-Desktop-hub-site-indicadores-financeiros/1cf040fe-dc89-4f07-b385-e8dcec7cb8f1/scratchpad/shots";
import fs from "node:fs";
fs.mkdirSync(shotsDir, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function checkViewport(width, height, label) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${label}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${label}] pageerror: ${err.message}`));

  await page.goto("http://localhost:8080", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${shotsDir}/${label}-hero.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shotsDir}/${label}-mid.png` });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.75));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shotsDir}/${label}-pricing.png` });

  await page.evaluate(() => document.getElementById("lead-form").scrollIntoView());
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${shotsDir}/${label}-form.png` });

  if (width < 1024) {
    await page.click("#mobile-menu-btn");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${shotsDir}/${label}-mobile-menu.png` });
    await page.click("#mobile-menu-btn");
  }

  // FAQ accordion test (desktop only, reliable target)
  if (width >= 1024) {
    await page.evaluate(() => document.getElementById("faq").scrollIntoView());
    await page.waitForTimeout(200);
    await page.click(".faq-trigger");
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${shotsDir}/${label}-faq-open.png` });
  }

  await context.close();
}

await checkViewport(1440, 900, "desktop");
await checkViewport(375, 812, "mobile");
await checkViewport(768, 1024, "tablet");

await browser.close();

if (errors.length) {
  console.log("CONSOLE ERRORS FOUND:");
  console.log(errors.join("\n"));
} else {
  console.log("NO CONSOLE ERRORS");
}
