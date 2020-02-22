const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

articleSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, 'Please enter a title for your article.']
    },
    content: {
        type: String,
        required: [true, 'Please, enter some content for your article.']
    }
});

const Article = mongoose.model('Article', articleSchema);

app.get('/', (req, res) =>{
    res.render('home');
});

app.listen(3000, () =>{
    console.log('Server started and listening on port 3000.');
})