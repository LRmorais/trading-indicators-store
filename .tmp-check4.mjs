import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("http://localhost:8080", { waitUntil: "load" });

// Test 1: submit empty form -> validation errors should show
await page.evaluate(() => document.getElementById("lead-form").scrollIntoView());
await page.click('#lead-capture-form button[type="submit"]');
await page.waitForTimeout(200);
const errorsShown = await page.evaluate(() =>
  Array.from(document.querySelectorAll('[data-error-for]')).filter(e => !e.classList.contains('hidden')).length
);
console.log("Validation errors shown on empty submit:", errorsShown);

// Test 2: fill form correctly and capture popup URL
await page.fill("#lead-name", "Maria Teste");
await page.fill("#lead-whatsapp", "(11) 98888-7777");
await page.fill("#lead-email", "maria@example.com");
await page.selectOption("#lead-market", "WIN FUT");

const [popup] = await Promise.all([
  context.waitForEvent("page"),
  page.click('#lead-capture-form button[type="submit"]'),
]);
await popup.waitForLoadState("domcontentloaded").catch(() => {});
console.log("WhatsApp URL opened:", popup.url());

await browser.close();
