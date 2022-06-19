const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

//Obtener todos los estacionamientos de un parqueo
router.get('/buscar-estacionamientos/:id', async (req, res) => {
    try {
        const adminS = db.collection("estacionamiento");
        const query = adminS.where("idparqueo", "==", ""+req.params.id);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(response)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Busca los horarios de un funcionario
router.get('/buscar-horario/:id', async (req, res) => {
    try {
        const adminS = db.collection("Horario");
        const query = adminS.where("idfuncionario", "==", ""+req.params.id);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            Id: doc.id,
            ...doc.data(),
        }));
        console.log(response)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Crea un vehiculo
router.post('/crear-vehiculo', async (req, res) => {
    try {
        console.log(req.body)
        const {anno, color, modelo, placa, tipo_transporte, usuario} = req.body
        const doc = await db.collection('vehiculo').add({
            anno,
            color,
            modelo,
            placa,
            tipo_transporte,
            usuario
        });
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Actualiza los vehiculos
router.put('/edit-vehiculos', async (req, res) => {
    try {
        console.log(req.body)
        const {anno,color,modelo,placa,tipo_transporte} = req.body
        const doc = await db.collection('vehiculo').doc(req.body.id).update({
            anno,
            color,
            modelo,
            placa,
            tipo_transporte
        });
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Obtener vehiculos de usuario por id
router.get('/buscar-vehiculo/:id', async (req, res) => {
    try {
        console.log('adios')
        const docs = db.collection('FuncionarioXVehiculo');
        const query = docs.where('idfuncionario', '==', req.params.id);
        const result = await (await query.get()).docs;
        const response = result.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Busqueda por id
router.get('/buscar-usuario/:id', async (req, res) => {
    try {
        
        const docs = await db.collection("Usuario").doc(req.params.id).get();
        const response ={
            id: docs.id,
            ...docs.data()
        }
        console.log(response);
        console.log("haaa perrro")
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Login del funcionario - Premiun
router.get('/login-user/:user/:contra', async (req, res) => {
    try{
        const adminS = db.collection("Usuario");
        const query = adminS.where("contrasenna",  "==", ""+req.params.contra).where("correo_institucional",  "==", ""+req.params.user);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            Id: doc.id,
            ...doc.data(),
        }));
        console.log(response)

        if (response.length != 0) {
            const info = db.collection("Funcionarios");
            const query2 = info.where("usuario",  "==", ""+ response[0].Id);
            const querySnapShot2 = await query2.get();
            const docs2 = querySnapShot2.docs;

            const response2 = docs2.map((doc)=>({
                Id: doc.id,
                idUsuario: response[0].Id,
                nombre: response[0].nombre,
                estatus: true,
                ...doc.data(),
            }));

            return res.status(200).json(response2);
        } else {
            return res.status(200).json({estatus: false});
        }
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
});

//Eliminar un usuario - Premiun
router.delete("/delete-usuario/:id", async (req, res) => {
    try {
        await db.collection("usuario").doc(req.params.id).delete();
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

//Editar un usuario - Premiun
router.put('/edit-usuario', async (req, res) => {
    try {
        console.log(req.body)
        const {apellido1, apellido2, email, cedula, contrasenna, nombre, correo_institucional} = req.body
        const doc = await db.collection('Usuario').doc(req.body.id).update({
            apellido1,
            apellido2,
            cedula,
            contrasenna,
            email,
            nombre,
            correo_institucional,
        });
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Crear un nuevo usuario - Premiun
router.post('/new-usuario', async (req, res) => {
    try {
        console.log(req.body)
        const {apellido1, apellido2, email, cedula, contrasena, discapacidad,
            departamento, jefe, nombre, puesto_laboral, tipo_usuario, correo_institucional} = req.body
    
        await db.collection('usuario').add({
            apellido1,
            apellido2,
            cedula,
            contrasena,
            discapacidad,
            email,
            departamento,
            jefe,
            nombre,
            puesto_laboral,
            tipo_usuario,
            correo_institucional,
        })
        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }

});

//Buscar funcionario por idusuario - Premiun
router.get('/buscar-funcionario/:id', async (req, res) => {
    try{
        const adminS = db.collection("Funcionarios");
        const query = adminS.where("usuario", "==", ""+req.params.id);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(response)

        if (response.length != 0) {
            return res.status(200).json(response);
        } else {
            return res.status(200).json({});
        }
        
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
})

//Buscar usuario por nombre sin carros - Premiun
router.get('/buscar-usuario/:nombre/:apellido1/:apellido2', async (req, res) => {
    try{
        const adminS = db.collection("Usuario");
        const query = adminS.where("nombre", "==", ""+req.params.nombre).where("apellido1",  "==", ""+req.params.apellido1).where("apellido2",  "==", ""+req.params.apellido2);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(response)

        if (response.length != 0) {
            return res.status(200).json(response);
        } else {
            return res.status(200).json({});
        }
        
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
})

module.exports = router;