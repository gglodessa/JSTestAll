//В данном тесте не получилось заменить в iframe src атрибут заменить на https://www.bing.com. 
//В способе который закомментированный после нажатия на  Run возвращается старая ссылка. Выполнил данный тест с 3 шага.

"use strict";
const {assert} = require('chai');
const webdriver = require('selenium-webdriver');
const Capabilities = require('selenium-webdriver/lib/capabilities')
        .Capabilities;
const capabilities = Capabilities.chrome();
capabilities.set('marionette', true);
const { Builder, By, Key, until } = require('selenium-webdriver');
const logger = require('winston');
let driver;




describe("Explicit expectation", ()=> {

  it('Test#2', async() => {

    const driver = await new Builder().forBrowser('chrome').build();

    try {
        logger.info("1. Open in browser https://www.bing.com");
       // await driver.get('https://www.bing.com');
        await driver.manage().window().maximize();


       /* let test = await (driver.findElement(By.className('cm-m-xml cm-string')));
       test.replace=("https://www.w3schools.com",'eeeeeeeeeeee');
       await driver.executeScript('arguments[0].innerText = "https://www.bing.com"', test);
       await driver.findElement(By.id('runbtn')).click(); */

      logger.info( '2. Enter “Redmond” in the search field, wait for the drop-down list with recommended queries');
      let search = await driver.findElement(By.xpath('//*[@id="sb_form_q"]')).sendKeys('Redmond');
     
      
      


      logger.info('3.Check that the dropdown contains the string "redmond washington');
     // let line = await driver.findElement(By.linkText("redmond washington"));
      
     
     
     
      
    

     // assert.include(line, 'redmond washington', 'Check line'); 

      logger.info('4.Click on "redmond washington"');
      
      

      logger.info('5. Check if there is a link in the search results');


} finally {
      
    }
});

before(async() => {
    driver = await new webdriver.Builder()
            .withCapabilities(capabilities).build();
    driver.get("https://www.bing.com");
    
    
});
after(async() => {
    
    await driver.quit();
});
})