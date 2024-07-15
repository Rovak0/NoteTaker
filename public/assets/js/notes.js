const notes = require('express').Router();
const fs = require('fs');


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
    //there doesn't need to be a body
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

notes.delete('/:term', (req, res) => {
    console.log('Delete requested');
    //I need to find the note based on the req.body.id
    //the id is being sent by the website, so it will be in the list
    //need to go through each object in the json to find the target
    //get the target id from the parameter
    const targetId = req.params.term;
    //read the notes file
    fs.readFile('./public/assets/db/notes.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        let fileData = JSON.parse(data);
        let targetIndex;
        //find the delete note
        for (index in fileData){
            if(fileData[index].id == targetId){
                targetIndex = index;
            } 
        }
        //delete the note and save it
        fileData.splice(targetIndex, 1);
        fs.writeFile('./public/assets/db/notes.json', JSON.stringify(fileData), (writeErr) => 
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!'));
        res.json('Delete finished');
    })
});



module.exports = notes;