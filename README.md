# Desafio23 - JSON normalización
Coderhouse - Programación Backend

> Consigna: 
- Sobre el desafío entregable de la clase anterior, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
- El nuevo formato de mensaje será:
   var mensaje = { 
            author: {
                id: 'mail del usuario', 
                nombre: 'nombre del usuario', 
                apellido: 'apellido del usuario', 
                edad: 'edad del usuario', 
                alias: 'alias del usuario',
                avatar: 'url avatar (foto, logo) del usuario'
            },
            text: 'mensaje del usuario'
        }

>> Aspectos a incluir en el entregable: 
- El mensaje se envía del frontend hacia el backend, el cual lo almacenará en el base de datos. Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista. 
- El array debe estar normalizado con normalizr, conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo).
- El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.
- Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:
const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'});
- En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. 


