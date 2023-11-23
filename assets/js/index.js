import puppeteer from "puppeteer";
import 'dotenv/config';

const britishGas = async () => {
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
      await page.click('#loginForm-email');
      // Simulate typing into the email input field
      await page.type('#loginForm-email', process.env.BRITISH_GAS_EMAIL);

      // Add a 5-second delay
      await page.waitForTimeout(5000);
      // Wait for the continue button to be present
      await page.waitForSelector('.emailInput_emailInput__f_Zud');

      // Evaluate in the context of the page
      const btnValue2 = await page.evaluate(() => {
          const continueBtn = document.querySelector('.emailInput_emailInput__f_Zud');
          if (continueBtn) {
              // Get the first child of continueBtn
              const firstChild = continueBtn.firstElementChild;

              if (firstChild) {
                  // Get the last child of the first child
                  const lastChild = firstChild.lastElementChild;

                  if (lastChild) {
                      console.log(lastChild);

                      // Click on the last child of continueBtn
                      lastChild.click();
                  }
              }
          }
          return null;
      });
  } catch (error) {
      console.error('An error occurred:', error);
  } finally {
      // Close the browser
      // await browser.close();
  }
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

// Start the login and scraping process
britishGas();
//affinitywater();