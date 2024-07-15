const express = require('express');
const path = require('path');

//port will get changed at some point
const PORT = 3001;

const app = express();

const api = require('./public/assets/js/holder.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

//this is basic show file stuff
app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

//there needs to be post management
//there is a fetch: post to api/notes
//there is a delete note to api/notes/id


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});