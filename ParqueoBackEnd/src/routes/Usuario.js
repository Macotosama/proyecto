const {Router} = require('express');
const {db} = require('../firebase');
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 
const router = Router();

function parceTime(hora) {
    hora = hora.split(':');
    date = new Date();
    date.setHours(hora[0]);
    date.setMinutes(hora[1]);
    return date.getTime();
}

function parceDay(hora, day) {
    hora = hora.split(':');
    date = new Date(day);
    date.setHours(hora[0]);
    date.setMinutes(hora[1]);
    return date.getTime();
}

//guardar reservaciones
router.post('/guardarReservaciones', async (req, res) => {
    try {
        console.log(req.body)
        const {activa, final, id_estacionamiento, idfuncionario, inicio, fecha} = req.body;
        db.collection("Funcionarios").add({
            activa: activa,
            final: parceDay(final, fecha),
            id_estacionamiento: id_estacionamiento,
            idfuncionario: idfuncionario,
            inicio: parceDay(inicio, fecha),
            fecha: this.fechaActual,
        });

        return res.status(200).json({status: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

//Obtener datos funcionario
router.get('/bucarInfoFuncionario/:id', async (req, res) => {
    try {
        const adminS = db.collection("Funcionarios").where("usuario", "==", req.params.id);
        
        const querySnapShot = await adminS.get();
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
})

//Obtener todos los estacionamientos jefes de un parqueo
router.get('/buscar-estacionamientos-jefes/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const adminS = db.collection("Estacionamiento");
        const query = adminS.where("idparqueo", "==", ""+req.params.id).where("tipo", "==", "jefatura");
        
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

//Obtener todos los estacionamientos discapacitados de un parqueo
router.get('/buscar-estacionamientos-discapacitado/:id', async (req, res) => {
    try {
        const adminS = db.collection("Estacionamiento");
        const query = adminS.where("idparqueo", "==", ""+req.params.id).where("tipo", "==", "discapacidad");
        
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

//Obtener todos los estacionamientos normales de un parqueo
router.get('/buscar-estacionamientos-normal/:id', async (req, res) => {
    try {
        const adminS = db.collection("Estacionamiento");
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

//Edita los horarios de un funcionario
router.put('/editar-horarios', async (req, res) => {
    try {
        console.log(req.body);
        const adminS = db.collection("Horario");

        var a = {
            dia_semana: req.body.lunes.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.lunes.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.lunes.horas_salidas) ),
        };
        await adminS.doc(req.body.lunes.id).update(a);
        a = {
            dia_semana: req.body.martes.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.martes.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.martes.horas_salidas) ),
        };
        await adminS.doc(req.body.martes.id).update(a);
        a = {
            dia_semana: req.body.miercoles.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.miercoles.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.miercoles.horas_salidas) ),
        };
        await adminS.doc(req.body.miercoles.id).update(a);
        a = {
            dia_semana: req.body.jueves.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.jueves.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.jueves.horas_salidas) ),
        };
        await adminS.doc(req.body.jueves.id).update(a);
        a = {
            dia_semana: req.body.viernes.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.viernes.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.viernes.horas_salidas) ),
        };
        await adminS.doc(req.body.viernes.id).update(a);
        a = {
            dia_semana: req.body.sabado.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.sabado.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.sabado.horas_salidas) ),
        };
        await adminS.doc(req.body.sabado.id).update(a);
        a = {
            dia_semana: req.body.domingo.dia_semana, 
            hora_entrada: admin.firestore.Timestamp.fromMillis( parceTime(req.body.domingo.horas_entradas) ), 
            hora_cierre: admin.firestore.Timestamp.fromMillis( parceTime(req.body.domingo.horas_salidas) ),
        };
        await adminS.doc(req.body.domingo.id).update(a);
        return res.status(200).json({status:true});
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
        const doc = await db.collection('Vehiculo').add({
            anno,
            color,
            modelo,
            placa,
            tipo_transporte,
        });

        await db.collection('FuncionarioXVehiculo').add ({
            idfuncionario: usuario,
            placa: placa
        })
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
        const doc = await db.collection('Vehiculo').doc(req.body.id).update({
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
router.get('/buscar-vehiculo-usuario/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const adminFun = db.collection("Funcionarios");
        const queryFun = adminFun.where("usuario", "==", ""+req.params.id);
        
        const querySnapShotFun = await queryFun.get();
        const docsFun = querySnapShotFun.docs;

        const responseFun = docsFun.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(responseFun)
        const docs = db.collection('FuncionarioXVehiculo');
        const query = docs.where('idfuncionario', '==', responseFun[0].id);
        const result = await (await query.get()).docs;
        const response = result.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        const docs2 = db.collection('Vehiculo');
        var response2 = [];
        for (let i = 0; i < response.length; i++) {
            const result2 = await (await docs2.where('placa', '==', response[i].placa).get()).docs;
            const temp = result2.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            response2.push(temp[0]);
        }
        console.log(response2);
        return res.status(200).json(response2);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Obtener vehiculos de usuario por id
router.get('/buscar-vehiculo/:id', async (req, res) => {
    try {
        const docs = db.collection('FuncionarioXVehiculo');
        const query = docs.where('idfuncionario', '==', req.params.id);
        const result = await (await query.get()).docs;
        const response = result.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        const docs2 = db.collection('Vehiculo');
        var response2 = [];
        for (let i = 0; i < response.length; i++) {
            const result2 = await (await docs2.where('placa', '==', response[i].placa).get()).docs;
            const temp = result2.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            response2.push(temp[0]);
        }
        console.log(response2);
        return res.status(200).json(response2);
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