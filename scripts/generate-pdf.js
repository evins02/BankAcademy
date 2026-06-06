const puppeteer = require("puppeteer");
const path = require("path");

const HTML_PATH = path.join(__dirname, "pitch-deck.html");
const OUT_PATH = path.join(__dirname, "..", "public", "bankacademy-pitch.pdf");

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();

  console.log("Opening pitch deck HTML...");
  await page.goto(`file://${HTML_PATH}`, { waitUntil: "networkidle0" });

  // Wait for any web fonts
  await page.evaluate(() => document.fonts.ready);

  console.log("Generating PDF...");
  await page.pdf({
    path: OUT_PATH,
    format: "A4",
    landscape: false,
    printBackground: true,
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    scale: 0.9,
  });

  await browser.close();
  console.log(`PDF saved to: ${OUT_PATH}`);
})();
