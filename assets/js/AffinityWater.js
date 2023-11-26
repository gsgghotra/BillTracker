import puppeteer from "puppeteer";
const AffinityWater = async () => {
    return new Promise(async (resolve, reject) => {
        // Launch Puppeteer in headless mode
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        try {
            // Navigate to the Affinity Water login page
            await page.goto('https://myonlineaccount.affinitywater.co.uk/Account/Login?ReturnUrl=%2F', {
                waitUntil: 'domcontentloaded',
            });

            // Wait for the login form to be visible
            await page.waitForSelector('#Email');

            // Fill in the login form with your credentials
            await page.type('#Email', process.env.AFFINITY_WATER_USERNAME);
            await page.type('#Password', process.env.AFFINITY_WATER_PASSWORD);

            // Click the login button
            await page.click('.btn-login');

            // Wait for navigation to complete after clicking the login button
            await page.waitForNavigation();

            // Add a 10-second delay
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Example: Extract data from the page
            const data = await page.evaluate(() => {
                // Add your scraping logic here
                // For example, you can use document.querySelector to select elements and extract data

                // Check if the URL matches the expected URL after successful login
                if (window.document.URL === 'https://myonlineaccount.affinitywater.co.uk/') {
                    // Remove any unwanted modal
                    let modal = document.getElementById('water-quiz-modal');
                    let modalBackdrop = document.querySelector('.modal-backdrop');

                    if (modal) {
                        modal.remove();
                    }
                    if (modalBackdrop) {
                        modalBackdrop.remove();
                    }

                    // Get the value of the element
                    let amountElement = document.querySelector('.site_Next_Payment_Due_value');
                    if (amountElement) {
                        return amountElement.innerText;
                    } else {
                        console.error('Element not found. Check the selector.');
                        return null;
                    }
                } else {
                    console.error('Unexpected URL after login.');
                    return null;
                }
            });

            // Log the scraped data
            resolve(data);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            // Close the browser
            await browser.close();
        }
    });
};

export default AffinityWater;