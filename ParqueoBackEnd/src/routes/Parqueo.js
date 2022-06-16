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
        const {direccion, espacios, horarios, nombre, tipo_parqueo, motocicleta, automovil, discapacitado} = req.body
        var docs = await db.collection('parqueo').add({
            direccion,
            espacios,
            horarios,
            nombre,
            tipo_parqueo,
            motocicleta,
            automovil,
            discapacitado,
        });
        console.log(docs.id);
        for (let i = 0; i < motocicleta; i++) {
            await db.collection('estacionamiento').add({
                enUso: false,
                idparqueo: docs.id,
                tipo: 'motocicleta',
            });
        };
        for (let i = 0; i < automovil; i++) {
            await db.collection('estacionamiento').add({
                enUso: false,
                idparqueo: docs.id,
                tipo: 'automovil',
            });
        };
        for (let i = 0; i < discapacitado; i++) {
            await db.collection('estacionamiento').add({
                enUso: false,
                idparqueo: docs.id,
                tipo: 'discapacitado',
            });
        };
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
        const query = await db.collection('parqueo').get();
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

module.exports = router