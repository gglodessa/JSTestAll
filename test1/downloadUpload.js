"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function downloadUpload() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // 1. Открыть в браузере http://the-internet.herokuapp.com/
        await driver.get('http://the-internet.herokuapp.com/');
        await driver.manage().window().maximize();

        // 2. Перейти в File Download
        await driver.findElement(By.xpath("//*/ul/li[17]/a")).click();

        // 3. Скачать файл sample.png
        await driver.findElement(By.xpath("//a[@href='download/sample.png']")).click();

        // 4. Вернуться на стартовую страницу
        await driver.navigate().back();

        // 5. Проверить что открылась стартовая страница
        let startPage = await driver.findElement(By.xpath("//a[@href='http://elementalselenium.com/']")).getText();
        assert.equal(startPage, "Elemental Selenium", "Check#1"); 

        // 6. Перейти в "File Uploaded"
        await driver.findElement(By.xpath("//a[@href='/upload']")).click();

        // 7. Добавить скачанный файл в "Выберите файл"
        await driver.findElement(By.id("file-upload")).sendKeys("C:/Users/olexiy.klein/Downloads/sample.png");

        // 8. Нажать "Upload"
        await driver.findElement(By.className("button")).click();

        // 9. Проверить что отображается сообщение 
        let fileUpload = await driver.findElement(By.css("div.example")).getText();
        assert.equal(fileUpload, "File Uploaded!", "Check#2");

       
        

       } finally {
        await driver.quit();
    }
}

downloadUpload();