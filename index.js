var express = require('express');

var app = new express();
app.use(express.static('public'));

app.listen(process.env.PORT || 7070);
