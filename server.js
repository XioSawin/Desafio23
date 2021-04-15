const { Socket } = require('dgram');
const { sqlite3Connect } = require('./DB/sqlite3.db');

const express = require("express");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const knex = require('knex')(sqlite3Connect);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Config 
app.set("views", "./views");
app.set("view engine", "ejs");

/*
// Lista de productos
const productos = [
    {
        id: 1,
        title: 'Calculadora',
        price: 430,
        thumbnail: 'aa'
    }
]; */

// Lista de mensajes

const messages = {
    id: "12345", 
    mensajes: [
        {
            _id: "123",
            author: {
                email: 'mv33@gmail.com',
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
                email: 'dricc@gmail.com',
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
                email: 'landoooo@gmail.com',
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
                email: 'mv33@gmail.com',
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

/*
const messages = [
    {
        email: 'xsawin@gmail.com',
        timestamp: '28/2/2021 10:15:22',
        message: 'Hola!'
    }
]
*/
// add messages to db

knex('messages').insert(messages)
    .then(() => console.log('mensajes ingresados'))
    .catch((err) => console.log(err))

// Rutas

app.get('/', (req, res) => {
    res.render('pages/index', {productos: productos})
})

// Normalizr

const util = require('util');

function print(objeto){
    console.log(util.inspect(objeto, false, 12, true));
};

const user = new schema.Entity('user', {}, {idAttribute: 'email'});

const chatSchema = new.schema.Entity('message', {
    author: user
}, {idAttribute:'_id'});

/*
const mensajes = new schema.Entity('chat', {
    author: user,
    mensajes: [message]
}, {idAttribute:'_id'}); */

const normalizedData = normalize(messages, [chatSchema]);
print(normalizedData); /// resultante del proceso de normalización. - tamaño menor que el objeto original
console.log(JSON.stringify(normalizedData).length);



// Connection Socket.io

io.on('connection', (socket) => {
    socket.broadcast.emit('mensaje-user', 'Hola mundo');

    // emit
    socket.emit('products', productos);
    socket.emit('messages', normalizedData);

    // products
    /*
    socket.on('new-product', function(data){
        let myID = (productos.length)+1;

        let myTitle = data.title;
        let myPrice = data.price;
        let myThumbnail = data.thumbnail;

        const producto = {
            id: myID, 
            title: myTitle, 
            price: myPrice, 
            thumbnail: myThumbnail
        }

        productos.push(producto);

        io.sockets.emit('products', productos);
    })*/

    // message-center

    socket.on('new-message', function(data) {
        messages.push(data);

        knex('messages').insert(data)
            .then(() => console.log('mensajes ingresados'))
            .catch((err) => console.log(err))

        io.sockets.emit('messages', messages);
    });

})

http.listen(3030, () => {
    console.log('Driving-driving on port 3030');
})