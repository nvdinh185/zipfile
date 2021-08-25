const express = require('express');
const admz = require('adm-zip');
const fs = require('fs');

const app = express();

var to_zip = fs.readdirSync(__dirname + '/' + 'upload_data');

app.get('/', function (req, res) {

    var zp = new admz();

    for (let k = 0; k < to_zip.length; k++) {
        zp.addLocalFile(__dirname + '/' + 'upload_data' + '/' + to_zip[k]);
    }

    zp.addLocalFile(__dirname + '/' + 'package.json');
    zp.addLocalFile(__dirname + '/' + 'package-lock.json');

    const file_after_download = 'downloaded_file.zip';

    const data = zp.toBuffer();

    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${file_after_download}`);
    res.set('Content-Length', data.length);
    res.send(data);

})
// this is used to listen a specific port!
app.listen(7777, function () {
    console.log('port is active at 7777');
})