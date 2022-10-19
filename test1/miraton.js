"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function shoppingInMiraton() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Открыть в браузере https://www.miraton.ua/ 
        await driver.get('https://www.miraton.ua/');
        await driver.manage().window().maximize();

        //2. Убедиться что открылся нужный страница
        let check = (await driver.findElement(By.xpath('//*[@id="rmjs-1"]/h2[1]')).getText()).toLowerCase();
        assert.include(check, "Miraton – интернет магазин обуви №1 в Украине".toLowerCase(), "Проверка№1"); 
        
    

        // 3. Перейти в рздел для "мужчин" 
        let search = await driver.findElement(By.xpath('//*/div[3]/div/ul[1]/li[2]/a')).click(); 
        
        
        // 4. Выбрать раздел "мокамины" и убедиться что открылась нужная страница
        let button = await driver.findElement(By.xpath("/html/body/div[3]/div/ul[1]/li[2]/div/ul[1]/li[7]/a"));
        await button.click();
        let mokasins = (await driver.findElement(By.className('site-title')).getText()).toLowerCase();
        assert.include(mokasins, "Мужские мокасины".toLowerCase(), "Проверка#2");


        // 5. Выбрать "Мужские мокасины Miguel Miratez черные 590A-76-962" и проверить что открылась нужная траница
        let choose = await driver.findElement(By.id("previewimg318753")); 
        await choose.click(); 
        let MiguelMirates = (await driver.findElement(By.className("item-title")).getText());
        assert.include(MiguelMirates, "590A-76-962", "Проверка#3");

        // 6.Выбрать 43 размер и нажать "Добавить товар в корзину"
        let size = await driver.findElement(By.xpath("//*/label[5]"));
        await size.click();
        let add = await driver.findElement(By.className("item-add regular to-basket"));
        await add.click();

        // 7.  Перейти в корзину
        let checkout = await driver.findElement(By.className("cart"));
        await checkout.click();
        
        // 8. Установить колличество 5 пар и заполнить поля произвольными данными
        let addShose = await driver.findElement(By.className("up"));
        for (let i = 0; i < 4; i++){
            await addShose.click();
        } 
        
        let name = await driver.findElement(By.id("soa-property-1")).sendKeys("NameTest");
        let surname = await driver.findElement(By.id("soa-property-10")).sendKeys("SurmaneTest");
        let email = await driver.findElement(By.id("soa-property-2")).sendKeys("miraton26092021@gmail.com");
        let phone = await driver.findElement(By.id("soa-property-3")).sendKeys("380675570250");
        let desk = await driver.findElement(By.id("orderDescription")).sendKeys("я оптовый покупатель");
        let np = await driver.findElement(By.className("filter-option pull-left")).click();
        let delivery = await driver.findElement(By.xpath("//*[5]/a/span[1]")).click();
    
       // 9. Нажать кнопку "Оформить заказ" и убедиться что отображается текст "Ваш заказ №"
       let buy = await driver.findElement(By.className("pull-right btn btn-default btn-lg hidden-xs hide-1024")).click();
       let checkOrder = await driver.findElement(By.className("sale_order_full_table")).getText();
       assert.include(checkOrder, "Ваш заказ", "Проверка№4");

    } finally {
      await driver.quit();
    }
}

shoppingInMiraton();