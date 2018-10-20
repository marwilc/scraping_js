
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
        var obj = {};
        //var body = document.body;

        const body = $('html');
        console.log(body[0]);
        var json;
        //json = himalaya.parse(html);
        //console.dir(json, {colors: true, depth: null});
        getAllChild(body[0], obj);

        var fs = require('fs');
        fs.writeFile("test.json", JSON.stringify(obj, null, 4), function (err) {
            if (err) {
                console.log(err);
            }
        });

    }
});


function getAllChild(element, obj) {
    if (element.type != 'script' && element.type != 'style') {
        //obj.type = element.type;
        //obj.name = element.name;
        if(element.attribs != undefined ){
            obj.attribs = element.attribs;

        }
        if(element.content != undefined){
            obj.content = element.content;
        }
            
            
        //obj.parent = element.parent();
        console.log(obj);
        if (element.children) {
            if (element.children.length != 0) {
                obj.children = [];
                [].forEach.call(element.children, (val, i) => {
                    obj.children[i] = {};
                    getAllChild(val, obj.children[i]);
                });
            }

        }

    }


}

