const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const renderTemplate = (templateName, data) => {
    const templatePath = path.join(__dirname, '../views', `${templateName}.ejs`);
    
    return new Promise((resolve, reject) => {
        fs.readFile(templatePath, 'utf8', (err, template) => {
            if (err) {
                return reject(err);
            }
            const rendered = ejs.render(template, data);
            resolve(rendered);
        });
    });
};

module.exports = {
    renderTemplate
};