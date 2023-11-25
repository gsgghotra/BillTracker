import puppeteer from "puppeteer";
import 'dotenv/config';

const Returneddata = [
    {
        "BritishGas": "Empty"
    }
]
const britishGas = async () => {
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


const affinitywater = async () => {
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
      console.log('Due Amount:', data);
  } catch (error) {
      console.error('An error occurred:', error);
  } finally {
      // Close the browser
      await browser.close();
  }
};

// Example usage:
britishGas()
    .then(result => {
        Returneddata[0].BritishGas = result;
        console.log(Returneddata[0])
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
//affinitywater();


