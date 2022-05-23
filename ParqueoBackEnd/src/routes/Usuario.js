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
        const response = docs   .map((doc)=>({
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
        const adminS = db.collection("horarios");
        const query = adminS.where("idusuario", "==", ""+req.params.id);
        
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
        const {anno,color,modelo,placa,tipo_transporte, usuario} = req.body
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
        const docs = db.collection('vehiculo');
        const query = docs.where('usuario', '==', req.params.id);
        const result = await (await query.get()).docs;
        const response = result.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Busqueda por id
router.get('/buscar-usuario/:id', async (req, res) => {
    try {
        const docs = await db.collection('usuario').doc(req.params.id).get();
        const response ={
            id: docs.id,
            ...docs.data()
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Login del usuario - Premiun
router.get('/login-user/:user/:contra', async (req, res) => {
    try{
        const adminS = db.collection("usuario");
        const query = adminS.where("tipo_usuario", "==", false).where("contrasena",  "==", ""+req.params.contra).where("correo_institucional",  "==", ""+req.params.user);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            estatus: true,
            id: doc.id,
            ...doc.data(),
        }));
        console.log(response)

        if (response.length != 0) {
            return res.status(200).json(response);
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
        console.log('entro')
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
        const {apellido1, apellido2, email, cedula, contrasena, discapacidad,
            departamento, jefe, nombre, puesto_laboral, tipo_usuario, correo_institucional} = req.body
        const doc = await db.collection('usuario').doc(req.body.id).update({
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

//Buscar usuario por nombre sin carros - Premiun
router.get('/buscar-usuario/:nombre/:apellido1/:apellido2', async (req, res) => {
    try{
        const adminS = db.collection("usuario");
        const query = adminS.where("nombre", "==", ""+req.params.nombre).where("apellido1",  "==", ""+req.params.apellido1).where("apellido2",  "==", ""+req.params.apellido2);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            Id: doc.id,
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

// router.get('/api/Usuario/:ref', async(req,res)=>{
//     try {
//         const doc = db.collection("Usuario").doc(req.params.ref);
//         const item = await doc.get();
//         response = {Id: item.id, 
//                     Correo_institucional: item.data().Correo_institucional, 
//                     Cedula: item.data().Cedula, 
//                     Nombre: item.data().Nombre, 
//                     Apellido1: item.data().Apellido1, 
//                     Apellido2: item.data().Apellido2,
//                     Correo_gmail: item.data().Correo_gmail, 
//                     Contraseña: item.data().Contraseña, 
//                     Puesto_laboral: item.data().Puesto_laboral, 
//                     Tipo_usuario: item.data().tipo_usuario, 
//                     jefe:item.data.jefe,  
//                     discapacidad:item.data.discapacidad, 
//                     id_depart:item.data.id_depart
//         }
//             return res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error)
//     }
//     });

// router.get('/api/Usuario/contraseña/:contraseña', async(req,res)=>{
//     try{
//         const usua = db.collection("Usuario");
//         const query = usua.where("Contraseña", "==", ""+req.params.contraseña+"");
//         const querySnapShot = await query.get();
//         const docs = querySnapShot.docs;
//         const response = docs.map((doc)=>({
//             Id: doc.id,
//             Usuario: doc.data(),
//         }));
//         return res.status(200).json(response[0]);
//     }catch{
//         console.log(error);
//         return res.status(500).send(error)
//     }
// });

// router.post("/api/Usuario/:par1/:par2/:par3/:par4/:par5/:par6/:par7/:par8/:par9/:par10/:par11/:par12/:par13", async(req,res)=>{
//         try {        
//             var nUsuario = {Contraseña: req.params.par1, Correo_institucional: req.params.par2,Cedula: req.params.par3, Nombre: req.params.par4, Apellido1: req.params.par5, Apellido2: req.params.par6,
//                 Correo_gmail: req.params.par7, Contraseña: req.params.par8, Puesto_laboral: req.params.par9, tipo_usuario: req.params.par10, jefe:req.params.par11, discapacidad:req.params.par12, id_depart:req.params.par13}
//             await db.collection("Usuario").doc().create(nUsuario)
//             return res.status(204).json(); 
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }     
//     });

    
// //Cambiar Numero de contraseña
// router.put("/api/Usuario/nombre/:ref/:Contraseña", async(req, res)=>{
//     try {
//       const document = db.collection("Usuario").doc(req.params.ref);
//       await document.update({
//         Contraseña: req.params.Contraseña,
//       });
//       return res.status(204).json();
//     } catch (error) {
//         return res.status(500).json();  
//     }
// });

// router.put("/api/Usuario/nombre/:ref/:Correo", async(req, res)=>{
//     try {
//       const document = db.collection("Usuario").doc(req.params.ref);
//       await document.update({
//         Correo_institucional: req.params.Correo_institucional,
//       });
//       return res.status(204).json();
//     } catch (error) {
//         return res.status(500).json();
        
//     }
// });

// //Eliminar Usuario
// router.delete("/api/Usuario/:ref", async(req, res)=>{
//     try {
//         const document = db.collection("Usuario").doc(req.params.ref);
//         await document.delete();
//         return res.status(200).json();
//     } catch (error) {
//         return res.status(500).json();
//     }
// });

// //Optener todas los perfiles 
// router.get('/api/Usuario', async(req,res)=>{
//         try {
//             const query = db.collection("Usuario");
//             const querySnapShot = await query.get()
//             const docs = querySnapShot.docs
//             const response = docs.map((doc)=>({
//                 Id: doc.id,
//                 Contraseña: doc.data().Contraseña,
//                 Correo_institucional: doc.data().Correo_institucional,
//                 /*falta*/
//             }));
//             return res.status(200).json(response);
        
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error)
//         }
//         });

// //Cambiar Numero de contraseña
// router.put("/api/Usuario/nombre/:ref/:Contraseña", async(req, res)=>{
//     try {
//       const document = db.collection("Usuario").doc(req.params.ref);
//       await document.update({
//         Contraseña: req.params.Contraseña,
//       });
//       return res.status(204).json();
//     } catch (error) {
//         return res.status(500).json();  
//     }
// });

// router.put("/api/Usuario/nombre/:ref/:Correo_gmail", async(req, res)=>{
//     try {
//       const document = db.collection("Usuario").doc(req.params.ref);
//       await document.update({
//         Correo_gmail: req.params.Correo_gmail,
//       });
//       return res.status(204).json();
//     } catch (error) {
//         return res.status(500).json();
        
//     }
// });

// //Busqueda Por nombre
// router.get('/api/Usuario/usu/:Nombre', async(req,res)=>{
//     try {
//         const nomU = db.collection("Usuario");
//         const query = nomU.where("Nombre", "==", ""+req.params.Nombre+"");
//         const querySnapShot = await query.get();
//         const docs = querySnapShot.docs;
//         const response = docs.map((doc)=>({
//             Id: doc.id,
//             Profesor: doc.data(),
//             Correo_institucional: doc.data(), 
//             Cedula: doc.data(), 
//             Nombre: doc.data(), 
//             Apellido1: doc.data(), 
//             Apellido2: doc.data(),
//             Correo_gmail: doc.data(), 
//             Contraseña: doc.data(), 
//             Puesto_laboral: doc.data(), 
//             Tipo_usuario: doc.data(), 
//             jefe: doc.data(),  
//             discapacidad: doc.data(), 
//             id_depart:doc.data(),       
//         }));
//         return res.status(200).json(response[0]);
    
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error)
        
//     }
// });

// //Busqueda Por apellido 1
// router.get('/api/Profesor/usu/:apellido 1', async(req,res)=>{
//     try {
//         const profes = db.collection("Profesor");
//         const query = profes.where("Cedula", "==", ""+req.params.Cedula+"");
//         const querySnapShot = await query.get();
//         const docs = querySnapShot.docs;
//         const response = docs.map((doc)=>({
//             Id: doc.id,
//             Profesor: doc.data(),
//         }));
//         return res.status(200).json(response[0]);
    
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error)
        
//     }
// });

// //Busqueda Por apellido 2
// router.get('/api/Profesor/usu/:Cedula', async(req,res)=>{
//     try {
//         const profes = db.collection("Profesor");
//         const query = profes.where("Cedula", "==", ""+req.params.Cedula+"");
//         const querySnapShot = await query.get();
//         const docs = querySnapShot.docs;
//         const response = docs.map((doc)=>({
//             Id: doc.id,
//             Profesor: doc.data(),
//         }));
//         return res.status(200).json(response[0]);
    
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error)
        
//     }
// });


    module.exports = router