import puppeteer from "puppeteer";
import 'dotenv/config';

const affinitywater = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    await page.goto('https://myonlineaccount.affinitywater.co.uk/Account/Login?ReturnUrl=%2F', {
      waitUntil: 'domcontentloaded',
    });
  
    // Wait for the login form to be visible
    await page.waitForSelector('#Email');
  
    // Fill in the login form
    await page.type('#Email', process.env.AFFINITY_WATER_USERNAME);
    await page.type('#Password', process.env.AFFINITY_WATER_PASSWORD);
  
    // Click the login button
    await page.click('.btn-login');
  
    // Wait for navigation to complete
    await page.waitForNavigation();
  
    // Examp: Extract data from the page
    const data = await page.evaluate(() => {
      // Add your scraping logic here
      // For example, you can use document.querySelector to select elements and extract data
      if(window.document.URL === "https://myonlineaccount.affinitywater.co.uk/" ){
          // Get the value of the element
          setTimeout(()=>{
            let amount = document.querySelector('.site_Next_Payment_Due_value');
            console.log("DO YOU SEE MEE: ", );
            return ;
          }, 5000)
      }
    });
    console.log('Scraped data:', data);
    // Close the browser
    await browser.close();
};

// Start the login and scraping process
affinitywater();