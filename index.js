const express = require('express');
const app = express();
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

app.use(express.json());

const msgArray = {
    id: "12345", 
    mensajes: [
        {
            _id: "123",
            author: {
                id: 'mv33@gmail.com',
                nombre: 'Max',
                apellido: 'Verstappen',
                edad: '23',
                alias: 'Flying dutchman',
                avatar: 'aaaa',
            },
            text: 'Hola!'
        },
        {
            _id: "321",
            author: {
                id: 'dricc@gmail.com',
                nombre: 'Daniel',
                apellido: 'Ricciardo',
                edad: '33',
                alias: 'Honey Badger',
                avatar: 'sup',
            },
            text: 'Sup mate!'
        },
        {
            _id: "213",
            author: {
                id: 'landoooo@gmail.com',
                nombre: 'Lando',
                apellido: 'Norris',
                edad: '4',
                alias: 'Quadrant',
                avatar: 'aaaaa',
            },
            text: 'Hola'
        },
        {
            _id: "123",
            author: {
                id: 'mv33@gmail.com',
                nombre: 'Max',
                apellido: 'Verstappen',
                edad: '23',
                alias: 'Flying dutchman',
                avatar: 'aaaa',
            },
            text: 'Como estan?'
        }
    ] 
}



// schemas

const user = new schema.Entity('users', {}, {idAttribute: '_id'});

const message = new.schema.Entity('message', {
    messenger: user
}, {idAttribute:'_id'});

const mensajes = new schema.Entity('articles', {
    author: user,
    mensajes: [message]
}, {idAttribute:'_id'});

app.get('/mensajes', (req, res) => {
    
    res.send(productos);
})

app.post('/mensajes', (req, res) => {
    
})

app.listen(8080, ()=>{
    console.log('driving driving on port 8080');
})