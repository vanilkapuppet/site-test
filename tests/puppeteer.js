

const puppeteer = require('puppeteer');
const delay = require('await-delay');
const it_length = process.env.MINUTES_ITERATION_LENGHT ? parseInt(process.env.MINUTES_ITERATION_LENGHT) : 10

const runTest = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
        ],
    });
    const page = await browser.newPage();
    await page.goto(process.env.URL);
await delay(6000)


    const frame = await page.frames()[1]
    const button = await frame.evaluate(() => {
        return document.querySelector('body > div > div.actions > button.allow').click()
    });




let counter = it_length

while (counter > 0) {
    console.log('one more iteration completed')
    counter--
    await delay(60000)
}
    await browser.close();
};


(async () => {
    console.log('lets start the pain')
    while (true) {
        try {
            await runTest()
            await delay(it_length * 60000)
        } catch (e) {
            console.error('runTest err:', e)
        }

    }
})();
