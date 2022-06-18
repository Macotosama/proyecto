const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();

function parceTime(hora) {
    hora = hora.split(':');
    date = new Date();
    date.setHours(hora[0]);
    date.setMinutes(hora[1]);
    return date.getTime();
}

//Editar los estacionamientos de un parqueo - Premiun
router.put('/edit-estacionamientos', async (req, res) => {
    try {
        console.log(req.body)
        for (let i = 0; i < req.body.length; i++) {
            const a = {tipo: req.body[i].tipo};
            var docs = await db.collection('Estacionamiento').doc(req.body[i].id).update(a);
        }
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Obtiene todos los estacinamientos de un parqueo - Premiun
router.get('/estacionamientos/:id', async(req, res) => {
    try {
        const querySnapShot = await db.collection('Estacionamiento').where("idparqueo", "==", req.params.id).get();
        const docs = querySnapShot.docs;
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

//Busca un estacionamiento por nombre - Premiun
router.get('/parqueos-nombre/:nombre', async(req, res) => {
    try {
        console.log(req.params.nombre)
        const query = await db.collection('Parqueo').where("nombre", "==", req.params.nombre).get();
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
        const a = {direccion: req.body.direccion, 
            espacios: req.body.espacios, 
            hora_cierre: admin.firestore.Timestamp.fromMillis ( parceTime(req.body.hora_cierre) ),
            nombre: req.body.nombre, 
            tipo_parqueo: req.body.tipo_parqueo,
            hora_inicio: admin.firestore.Timestamp.fromMillis ( parceTime(req.body.hora_inicio) )
        };
        var docs = await db.collection('Parqueo').add(a);
        console.log(a.espacios)
        for (let i = 0; i < a.espacios; i++) {
            await db.collection('Estacionamiento').add({
                idparqueo: docs._path.segments[1],
                tipo: '',
            })
        }
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
        const a = {direccion: req.body.direccion, 
            espacios: req.body.espacios, 
            hora_cierre: admin.firestore.Timestamp.fromMillis ( parceTime(req.body.hora_cierre) ),
            nombre: req.body.nombre, 
            tipo_parqueo: req.body.tipo_parqueo,
            hora_inicio: admin.firestore.Timestamp.fromMillis ( parceTime(req.body.hora_inicio) )
        };
        var docs = await db.collection('Parqueo').doc(req.body.id).update(a);
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

module.exports = router