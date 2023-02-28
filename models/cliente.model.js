const db = require('../config/db').promise();

//Recuperar todos los registros
const getAll = () => {
    return db.query('SELECT * FROM clientes');
}

//Obtener un registro por nombre
const getByName = (nombre) => {
    return db.query('SELECT * FROM clientes WHERE nombre = ?', [nombre])
}

//Ordenar un registro por nombre
const nameSort = () => {
    return db.query('SELECT * FROM clientes ORDER BY nombre')
}

//Obtener un registro por Id
const getById = (registroId) => {
    return db.query('SELECT * FROM clientes WHERE id = ?', [registroId])
}

//Crear un registro
const create = ({ nombre, apellidos, direccion, email, cuota }) => {
    return db.query('INSERT INTO clientes (nombre, apellidos, direccion, email, cuota) VALUES (?,?,?,?,?)', [nombre, apellidos, direccion, email, cuota])
}

//Eliminar un registro
const deleteById = (clienteId) => {
    return db.query('DELETE FROM clientes WHERE id  = ?', [clienteId])
}

//Actualizar un regitro

const update = (clienteId, { nombre, apellidos, direccion, email, cuota }) => {
    return db.query(
        'update clientes set nombre = ?, apellidos = ?, direccion = ?,  email = ?, cuota = ? where id = ?',
        [nombre, apellidos, direccion, email, cuota, clienteId]
    );
}


module.exports = {
    getAll, create, deleteById, getById, update, getByName, nameSort
}