"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function checkboxes() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в Checkboxes
        await driver.findElement(By.xpath("//a[@href='/checkboxes']")).click();

        
        // 3. Убрать Checkboxes 2 и проверить что Checkboxes 2 убран
        let boxOne = await driver.findElement(By.xpath("//*[@id='checkboxes']/input[2]")).click();
        let unChecked = await driver.findElement(By.xpath("//*[@id='checkboxes']/input[2]")).isSelected();
        assert.equal(unChecked, false, "checked");

      
         
        // 4. Установить Checkboxes 1 и проверить что Checkboxes 1 установлен
       let boxTwo = await driver.findElement(By.xpath("//*[@id='checkboxes']/input[1]")).click();
       let checked = await driver.findElement(By.xpath("//*[@id='checkboxes']/input[1]")).isSelected();
       assert.equal(checked, true, 'Check2');
        


       } finally {
        await driver.quit();
    }
}

checkboxes();