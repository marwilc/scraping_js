
// Web scraping in Node
const request = require('request');
const cheerio = require('cheerio');
const himalaya = require('himalaya');

/**
 * Please insert the url web page here
 */
request('http://codedemos.com/sampleblog', (error,
    response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const body = $('html').html();
        var json;
        json = himalaya.parse(html);
        console.dir(json, {colors: true, depth: null});

        var fs = require('fs');
        fs.writeFile("test.json", JSON.stringify(json, null, 4), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
});

