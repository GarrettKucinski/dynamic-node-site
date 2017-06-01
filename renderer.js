"use strict";

const fs = require('fs');

function mergeValues(values, content) {
    for (let key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

function css(response) {
    // let dirContents = fs.readdirSync('./css');
    // for (let file of dirContents) {
    let cssContents = fs.readFileSync(`./css/app.css`, { encoding: 'utf-8' });
    response.write(cssContents);
    // }
}

function view(templateName, values, response) {
    // Read from the template files
    let fileContents = fs.readFileSync(`./views/${templateName}.html`, { encoding: 'utf-8' });
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents);
}

module.exports.view = view;
module.exports.css = css;