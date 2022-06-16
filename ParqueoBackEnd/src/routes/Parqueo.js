const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();

//Solo nombre de estacionamientos - Premiun
router.get('/parqueos-nombre', async(req, res) => {
    try {
        const query = await db.collection('parqueo').get();
        const docs = query.docs;
        console.log(docs)
        const response = docs.map((doc)=>({
            id: doc.id,
            nombre: doc.data().nombre,
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Crea un parqueo - Premiun
router.post('/crear-parqueo', async (req, res) => {
    try {
        console.log(req.body)
        hora = req.body.hora_cierre.split(':')
        console.log(hora)
        const {direccion, espacios, hora_cierre, hora_inicio, nombre, tipo_parqueo} = req.body
        var docs = await db.collection('Parqueo').add({
            hora_cierre,
            hora_inicio,
            espacios,
            nombre,
            direccion,
            tipo_parqueo,
        });
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Editar un parqueo - Premiun
router.put('/edit-parqueo', async (req, res) => {
    try {
        console.log(req.body)
        const {direccion, espacios, horarios, nombre, tipo_parqueo, motocicleta, automovil, discapacitado} = req.body
        const doc = await db.collection('parqueo').doc(req.body.id).update({
            direccion,
            espacios,
            horarios,
            nombre,
            tipo_parqueo,
            motocicleta,
            automovil,
            discapacitado,
        });
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }

});

//Obtiene todos los parqueos - Premiun
router.get('/parqueos', async(req, res) => {
    try {
        const query = await db.collection('Parqueo').get();
        const docs = query.docs;
        console.log(docs)
        const response = docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

function parceTime(hore)
module.exports = router