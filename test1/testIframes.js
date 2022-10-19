"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;
const logger = require('winston');
const nodeFetch = require("node-fetch");
const reqURL = 'https://jsonplaceholder.typicode.com/users';



async function testIframes() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        logger.info("1. Open in browser http://the-internet.herokuapp.com/");
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        logger.info("2. Перейти в Frames > iFrame");
        await (await driver.findElement(By.xpath("//a[@href='/frames']"))).click();
        await (await driver.findElement(By.xpath("//a[@href='/iframe']"))).click();

        logger.info("3. Run natively GET request https://jsonplaceholder.typicode.com/users and fill in all zip codes in addresses");
        let response = await (await nodeFetch(reqURL)).json();

        logger.info("4. Enter all titles in the text box after \ n")
        let contentBody = await driver.findElement(By.id('mce_0_ifr'));
        for (let i = 0; i < response.length; i++) {
            await contentBody.sendKeys(response[i].address.zipcode + '\n');
        }
    } finally {
        await driver.quit();
    }
}

testIframes();