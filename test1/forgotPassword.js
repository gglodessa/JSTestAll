"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;
const logger = require('winston');


async function forgotPassword() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {

        logger.info('1. Open a page in a browser http://the-internet.herokuapp.com/');
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

       logger.info('2. Go to Forgot Password and check that the required page has opened');
       await driver.findElement(By.xpath("//a[@href='/forgot_password']")).click();
       let checkPage = await driver.findElement(By.className('example')).getText();
       assert.include(checkPage, 'Forgot Passwor', 'PageOpened');

       logger.info('3. Enter email and click Retrieve password');
       let email = await driver.findElement(By.id('email')).sendKeys('absoft@gmail.com');
       await driver.findElement(By.className('radius')).click();


       logger.info('4. Check that the message is displayed - Internal Server Error')
       let succes = await driver.findElement(By.css('body h1')).getText();
       assert.equal(succes, 'Internal Server Error', 'CheckMessage');



       } finally {
       await driver.quit();
    }
}

forgotPassword();