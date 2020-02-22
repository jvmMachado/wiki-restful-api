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

app.route('/articles')

    .get((req, res) =>{
        Article.find({}, (err, articlesFound) => {
            if (err) {
                console.log(err);
            } else {
                res.send(articlesFound)
            }
        })
    })

    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Successfully added a new article.');
            }
        });
    })

    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Successfully deleted all articles.');
            }
        });
    });

app.listen(3000, () =>{
    console.log('Server started and listening on port 3000.');
});