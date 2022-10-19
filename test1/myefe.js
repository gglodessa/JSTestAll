"use strict";

const { Builder, By } = require('selenium-webdriver');
const assert = require('chai').assert;

async function myefe() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Открыть в браузере https://myefe.ru/
        await driver.get('https://myefe.ru/');
        await driver.manage().window().maximize();
        
        // 2. Зайти в личный кабинет
        let btnIn = await driver.findElement(By.className("msui-login-text")).click();
        let login = await driver.findElement(By.id("user_login")).sendKeys("test26092021@ukr.net");
        let pass = await driver.findElement(By.id("user_pass")).sendKeys("PcWVwyto3wyD");
        let submit = await driver.findElement(By.id("wp-submit")).click();

        // 3. Открыть личный кабинет, проверить что открыта нужная страница
        let avatar = await driver.findElement(By.className("ui dropdown avatar item")).click();
        let prof = await driver.findElement(By.xpath("/html/body/div[2]/div/div/div/div[2]/div/a[1]")).click();
        let check = await driver.findElement(By.id("bbp-user-body")).getText();
        assert.include(check, "Профиль", "Check#2");

        // 4. Изменить пароль и проверить что появилось сообщение об успехе
        let changePassworld = await driver.findElement(By.className("bbp-user-edit-link")).click();
        let newPass = await driver.findElement(By.id("pass1")).sendKeys("GgWVwyto3wyD");
        let newPassTwo = await driver.findElement(By.id("pass2")).sendKeys("GgWVwyto3wyD");
        let updateProfile = await driver.findElement(By.id("bbp_user_edit_submit")).click();
        let messageUpdate = await driver.findElement(By.className("bbp-template-notice updated")).getText();
        assert.include(messageUpdate, "Пользователь обновлён.", "Check#3");

        // 5. Выйти с аккаунта и зайти под новым паролем. Проверить что пользователь зашел на стартовую страницу
        avatar = await driver.findElement(By.className("ui dropdown avatar item")).click();
        let exit = await driver.findElement(By.xpath("/html/body/div[2]/div/div/div/div[2]/div/a[2]")).click();
        btnIn = await driver.findElement(By.className("msui-login-text")).click();
        login = await driver.findElement(By.id("user_login")).sendKeys("test26092021@ukr.net");
        let parol = await driver.findElement(By.id("user_pass")).sendKeys("GgWVwyto3wyD");
        submit = await driver.findElement(By.id("wp-submit")).click();
        let checkNewPassworld = await driver.findElement(By.className("bbp-user-forum-role")).getText();
        assert.include(checkNewPassworld, "Роль форума: Участник", "Check#4");
       

    } finally {
      await driver.quit();
    }
}

myefe();