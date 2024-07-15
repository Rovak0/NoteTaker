const notes = require('express').Router();


const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');



//notes getting
notes.get('/', (req, res) => {
    //output a json file
    console.log('Requrest recieved for notes');
    readFromFile('./public/assets/db/notes.json').then((data) => res.json(JSON.parse(data)));
});

//notes writing
notes.post('/', (req, res) => {
    console.log('Writing notes');
    const {title, text} = req.body;
    if (title){
        const newNote = {
            title,
            text,
            //the variable needs to be id
            id: uuid()
        };
        readAndAppend(newNote, './public/assets/db/notes.json');
        res.json('Added new note');
    }
    else{
        res.json('Failed to add note');
    }
});

notes.delete('/', (req, res) => {
    console.log('Delete requestd');
    //I need to find the note based on the req.body.id
    //the id is being sent by the website, so it will be in the list
    //need to go through each object in the json to find the target
    const targetId = req.body.id;
    readFromFile('./public/assets/db/notes.json').then((data) => {
        // console.log(data);
        // console.log(typeof(data));
        // console.log(JSON.parse(data));
        let fileData = JSON.parse(data);
        let targetIndex;
        for (index in fileData){
            // console.log(fileData[item].id);
            if(fileData[index].id == targetId){
                targetIndex = index;
            } 
        }
        fileData.splice(targetIndex, 1);
        // console.log(fileData);
        
    })
    res.json('Thanks');
});



module.exports = notes;