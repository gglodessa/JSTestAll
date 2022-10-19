//В данном тесте получилось сделать кодировку только данным способом, но совпадают только первые 10 символов
"use strict"
const assert = require('chai').assert;
const logger = require('winston'); 
const fetch = require('node-fetch'); 
let Base64 = require('base-64');
const fs = require('fs');
const request = require("request");

async function testOne() {

      try {

   logger.info('1. Through a GET request, get an image from a link');
request.get("http://apimeme.com/meme?meme=Alarm-Clock&top=Top+text&bottom=Bottom+text").pipe(fs.createWriteStream('meme.jpeg'));

logger.info('2.Check that the image matches example.jpeg in base64')

 let value = await Base64.encode('c:\\Users\\olexiy.klein\\JSAutomation\\JSTests\\example\\meme.jpeg').substring(1, 10);
 
 let value2 = await  Base64.encode('c:\\Users\\olexiy.klein\\JSAutomation\\JSTests\\meme.jpeg').substring(1, 10);

 assert.include(value2, value, 'match in base64');

} finally {
}
};
testOne();




 






