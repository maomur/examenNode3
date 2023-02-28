const router = require('express').Router();
const ClienteModel = require('../../models/cliente.model')

// RECUPERAR TODOS LOS CLIENTES

router.get('/', async (req, res) => {

    if (req.query.search) {
        [resultado] = await ClienteModel.getByName(req.query.search);
    } else {
        resultado = (await ClienteModel.getAll())[0];
    }
    res.render('index', {
        registros: resultado
    })
})

//NUEVO REGISTRO

//Ir al Formulario
router.get('/new', (req, res) => {
    res.render('form')
})

//Agregar un Registro
router.post('/create', async (req, res) => {
    try {
        const [resulltado] = await ClienteModel.create(req.body);
        res.redirect('/api/clientes')
    } catch (err) {
        res.json({ error: err.message })
    }
})

//ELIMINAR REGISTRO
router.get('/delete/:registroId', async (req, res) => {
    try {
        const [resultado] = await ClienteModel.deleteById(req.params.registroId);
        res.redirect('/api/clientes')
    } catch (err) {
        res.json({ error: err.message })
    }
})

//BUSCAR REGISTRO
router.get('/search/:registroId', async (req, res) => {
    try {
        const [resultado] = await ClienteModel.getById(req.params.registroId)
        res.json(resultado[0])
    } catch (error) {
        res.json({ error: error.message })
    }
})

// ORDENAR POR NOMBRE
router.get('/nombre', async (req, res) => {
    const [resultado] = await ClienteModel.nameSort();

    res.render('index', {
        registros: resultado
    })
})

//EDITAR REGISTRO
//Obtener registro
router.get('/edit/:clienteId', async (req, res) => {
    try {
        const [resultado] = await ClienteModel.getById(req.params.clienteId);
        res.render('editForm', {
            registro: resultado[0]
        })
    } catch (err) {
        res.json({ error: err.message })
    }
})

//Actualizar registro
router.post('/:clienteId', async (req, res) => {
    try {
        const resultado = await ClienteModel.update(req.params.clienteId, req.body)
        res.redirect('/')

    } catch (error) {
        res.json({ error: error })
    }
})







module.exports = router;