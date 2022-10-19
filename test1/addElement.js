"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;
const logger = require('winston');


async function addElement() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {

        logger.info('1. Open a page in a browser http://the-internet.herokuapp.com/');
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

       logger.info('2.Check that we are on the required page Go to Forgot Add/Remove Elements');
       await driver.findElement(By.xpath("//a[@href='/add_remove_elements/']")).click();
      

       logger.info('3.Сheck that we are on the required page and click 5 times on "add element"');
       let checkPage = await driver.findElement(By.css('body h3')).getText();
       assert.equal(checkPage, 'Add/Remove Elements', 'Opened page');
       let addElement = await driver.findElement(By.xpath("//button[text()='Add Element']"))
       for (let i =0; i < 5; i++){
           await addElement.click();
       }
       


       logger.info('4. Make sure 5 items appear')
       let fiveElements = await driver.findElements(By.className('added-manually'));
       assert.equal(fiveElements.length, '5', 'Find five elements');
       await fiveElements[4].click();
       await fiveElements[3].click();


       logger.info('5. Сlick on two elements and make sure there are 3 left')
       fiveElements = await driver.findElements(By.className('added-manually'));
       assert.equal(fiveElements.length, 3, 'left 3 elements');

       } finally {
       await driver.quit();
    }
}

addElement();