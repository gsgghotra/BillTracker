import puppeteer from "puppeteer";
const BritishGas = async () => {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        try {
            await page.goto("https://www.britishgas.co.uk/identity/", {
                waitUntil: "domcontentloaded",
            });
            // Wait for the email field to be present
            await page.waitForSelector('#loginForm-email');
            //Click on the page to fake a click
            await page.click('#loginForm-email');
            // Simulate typing into the email input field
            await page.type('#loginForm-email', process.env.BRITISH_GAS_EMAIL);
            // Add a 5-second delay
            await page.waitForTimeout(5000);
            // Wait for the continue button to be present
            await page.waitForSelector('.emailInput_emailInput__f_Zud');

            // Find the continue button anc click on it
            const continueBtnClicked = await page.evaluate(() => {
            const continueBtn = document.querySelector('.emailInput_emailInput__f_Zud');

                //If continue button exists
                if (continueBtn) {
                    const firstChild = continueBtn.firstElementChild;
                    if (firstChild) {
                        const lastChild = firstChild.lastElementChild;
                        if (lastChild) {
                            console.log(lastChild);
                            //Click on the button
                            lastChild.click();
                            return true;
                        }
                    }
                }

                return false;
            });

            if (!continueBtnClicked) {
                throw new Error('Failed to click the continue button for login page.');
            }

            // PASSWORD SECTION
            await page.waitForTimeout(5000); // Add a 5-second delay
            // Find the password field
            await page.evaluate(async (password) => {
                const getForm = document.querySelector("#loginForm").nextSibling.firstChild.shadowRoot.children[0].lastElementChild.lastChild;
                let loginBtn = document.querySelector("#loginForm").nextSibling.lastChild.shadowRoot.children[0];
                //If password field is found.
                if (getForm) {
                    // Clear the existing value (if any)
                    getForm.value = '';
                    // Simulate typing the entire password at once
                    getForm.value = password;
                    // Dispatch an input event
                    getForm.dispatchEvent(new Event('input', { bubbles: true }));
                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    // Click the button
                    loginBtn.click();
                }
            }, process.env.BRITISH_GAS_PASSWORD);


            // SCRAPING SECTION
            await page.waitForTimeout(5000); // Add a 5-second delay
            // Scrape Data
            const scrapedData = await page.evaluate(() => {
                let getAccountNumber = document.querySelector(".enlighten").innerText;
                if (getAccountNumber) {
                    //console.log(getAccountNumber);
                    return getAccountNumber;
                }
                return null; // Return null if the element is not found
            });
            resolve(scrapedData);
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        } finally {
            // Close the browser
            //await browser.close();
        }
    });
};

export default BritishGas;