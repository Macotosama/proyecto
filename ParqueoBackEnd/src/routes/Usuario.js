const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

//Buscar usuario por nombre completo - Premiun
router.get('/buscar-usuario/:nombre/:apellido1/:apellido2', async (req, res) => {
    try{
        const adminS = db.collection("usuario");
        const query = adminS.where("nombre", "==", ""+req.params.nombre).where("apellido1",  "==", ""+req.params.apellido1).where("apellido2",  "==", ""+req.params.apellido2).where("tipo_usuario", "==", true);
        
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;

        const response = docs.map((doc)=>({
            Id: doc.id,
            ...doc.data(),
        }));
        console.log(response)

        if (response.length != 0) {
            return res.status(200).json({estatus: true});
        } else {
            return res.status(200).json({estatus: false});
        }
        
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
})

router.get('/api/Usuario/:ref', async(req,res)=>{
    try {
        const doc = db.collection("Usuario").doc(req.params.ref);
        const item = await doc.get();
        response = {Id: item.id, 
                    Correo_institucional: item.data().Correo_institucional, 
                    Cedula: item.data().Cedula, 
                    Nombre: item.data().Nombre, 
                    Apellido1: item.data().Apellido1, 
                    Apellido2: item.data().Apellido2,
                    Correo_gmail: item.data().Correo_gmail, 
                    Contraseña: item.data().Contraseña, 
                    Puesto_laboral: item.data().Puesto_laboral, 
                    Tipo_usuario: item.data().tipo_usuario, 
                    jefe:item.data.jefe,  
                    discapacidad:item.data.discapacidad, 
                    id_depart:item.data.id_depart
        }
            return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
    });

router.get('/api/Usuario/contraseña/:contraseña', async(req,res)=>{
    try{
        const usua = db.collection("Usuario");
        const query = usua.where("Contraseña", "==", ""+req.params.contraseña+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Usuario: doc.data(),
        }));
        return res.status(200).json(response[0]);
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
});

router.post("/api/Usuario/:par1/:par2/:par3/:par4/:par5/:par6/:par7/:par8/:par9/:par10/:par11/:par12/:par13", async(req,res)=>{
        try {        
            var nUsuario = {Contraseña: req.params.par1, Correo_institucional: req.params.par2,Cedula: req.params.par3, Nombre: req.params.par4, Apellido1: req.params.par5, Apellido2: req.params.par6,
                Correo_gmail: req.params.par7, Contraseña: req.params.par8, Puesto_laboral: req.params.par9, tipo_usuario: req.params.par10, jefe:req.params.par11, discapacidad:req.params.par12, id_depart:req.params.par13}
            await db.collection("Usuario").doc().create(nUsuario)
            return res.status(204).json(); 
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }     
    });

    
//Cambiar Numero de contraseña
router.put("/api/Usuario/nombre/:ref/:Contraseña", async(req, res)=>{
    try {
      const document = db.collection("Usuario").doc(req.params.ref);
      await document.update({
        Contraseña: req.params.Contraseña,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});

router.put("/api/Usuario/nombre/:ref/:Correo", async(req, res)=>{
    try {
      const document = db.collection("Usuario").doc(req.params.ref);
      await document.update({
        Correo_institucional: req.params.Correo_institucional,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Eliminar Usuario
router.delete("/api/Usuario/:ref", async(req, res)=>{
    try {
        const document = db.collection("Usuario").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//Optener todas los perfiles 
router.get('/api/Usuario', async(req,res)=>{
        try {
            const query = db.collection("Usuario");
            const querySnapShot = await query.get()
            const docs = querySnapShot.docs
            const response = docs.map((doc)=>({
                Id: doc.id,
                Contraseña: doc.data().Contraseña,
                Correo_institucional: doc.data().Correo_institucional,
                /*falta*/
            }));
            return res.status(200).json(response);
        
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
        });

//Cambiar Numero de contraseña
router.put("/api/Usuario/nombre/:ref/:Contraseña", async(req, res)=>{
    try {
      const document = db.collection("Usuario").doc(req.params.ref);
      await document.update({
        Contraseña: req.params.Contraseña,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});

router.put("/api/Usuario/nombre/:ref/:Correo_gmail", async(req, res)=>{
    try {
      const document = db.collection("Usuario").doc(req.params.ref);
      await document.update({
        Correo_gmail: req.params.Correo_gmail,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Busqueda Por nombre
router.get('/api/Usuario/usu/:Nombre', async(req,res)=>{
    try {
        const nomU = db.collection("Usuario");
        const query = nomU.where("Nombre", "==", ""+req.params.Nombre+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Profesor: doc.data(),
            Correo_institucional: doc.data(), 
            Cedula: doc.data(), 
            Nombre: doc.data(), 
            Apellido1: doc.data(), 
            Apellido2: doc.data(),
            Correo_gmail: doc.data(), 
            Contraseña: doc.data(), 
            Puesto_laboral: doc.data(), 
            Tipo_usuario: doc.data(), 
            jefe: doc.data(),  
            discapacidad: doc.data(), 
            id_depart:doc.data(),       
        }));
        return res.status(200).json(response[0]);
    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
});

//Busqueda Por apellido 1
router.get('/api/Profesor/usu/:apellido 1', async(req,res)=>{
    try {
        const profes = db.collection("Profesor");
        const query = profes.where("Cedula", "==", ""+req.params.Cedula+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Profesor: doc.data(),
        }));
        return res.status(200).json(response[0]);
    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
});

//Busqueda Por apellido 2
router.get('/api/Profesor/usu/:Cedula', async(req,res)=>{
    try {
        const profes = db.collection("Profesor");
        const query = profes.where("Cedula", "==", ""+req.params.Cedula+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Profesor: doc.data(),
        }));
        return res.status(200).json(response[0]);
    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
});


    module.exports = router