//Replace words in xml files with other words.
//Word to replace and replacement word are in excel file 'replace_words.xlsx'.
//The file 'replace_words.xlsx' must be in the same folder as the xml files.
//Replaced file will be saved with the same name as the original file with '_new' appended to the name.

//Read the replace_words.xlsx file
function readXlsxFile() {
    var xlsx = require('node-xlsx');
    var obj = xlsx.parse(__dirname + '/replace_words.xlsx');
    var replacer = obj[0].data;
    return replacer;
}

//Read the xml file and replace words.
function replaceWordsInXmlFile(xmlFile, replacer) {
    var fs = require('fs');
    var xml = fs.readFileSync(__dirname + '/' + xmlFile, 'utf8');
    for (var i = 0; i < replacer.length; i++) {
        var wordToReplace = replacer[i][0];
        var replacementWord = replacer[i][1];
        xml = xml.replace(new RegExp(wordToReplace, 'g'), replacementWord);
    }
    fs.writeFileSync(__dirname + '/' + xmlFile.replace('.xml', '_new.xml'), xml);
}

//execute
var replacer = readXlsxFile();
var fs = require('fs');
var files = fs.readdirSync(__dirname);
for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.indexOf('.xml') > -1) {
        replaceWordsInXmlFile(file, replacer);
    }
}

//Run the script with node replacer.js