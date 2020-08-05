const express = require('express');
const path = require('path');
const { ppid } = require('process');
const app = express();

app.use(express.static(__dirname + '/dist/becons'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/becons/index.html'));
});
app.listen(process.env.PORT || 8080);