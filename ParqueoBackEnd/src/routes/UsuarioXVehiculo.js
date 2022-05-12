const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 
const PDFdocument = require('pdfkit');
const fs = require('fs');


const db = admin.firestore(); 
router.get('/api/UsuarioXVehiculo/:ref', async(req,res)=>{
    try {
        const doc = db.collection("UsuarioXVehiculo").doc(req.params.ref);
        const item = await doc.get();
        Correo_institucional = item.data().idusuario;
        Placa = item.data().idvehiculo;
        const UsuarioDoc = db.collection("Usuario").doc(""+Correo_institucional+""); 
        const UsuarioInfo = await UsuarioDoc.get();
        const VehiculoDoc = db.collection("Vehiculo").doc(""+Placa+""); 
        const VehiculoInfo = await VehiculoDoc.get();
        response = {Id: item.id, 
                    idusuario: item.data().idusuario, 
                    idvehiculo: item.data().idvehiculo}
            return res.status(200).json(response);
    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
    });

router.post("/api/UsuarioXVehiculo/:par1/:par2", async(req,res)=>{
        try {        
            var nUsuario = {idusuario: req.params.par1, idvehiculo: req.params.par2,}
            await db.collection("UsuarioXVehiculo").doc().create(nUsuario)
            return res.status(204).json(); 
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }     
    });

//Cambiar Numero de idusuario
router.put("/api/UsuarioXVehiculo/nombre/:ref/:idusuario", async(req, res)=>{
    try {
      const document = db.collection("UsuarioXVehiculo").doc(req.params.ref);
      await document.update({
        idusuario: req.params.idusuario,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Cambiar Numero de idvehiculo
router.put("/api/UsuarioXVehiculo/placa/:ref/:idvehiculo", async(req, res)=>{
    try {
      const document = db.collection("UsuarioXVehiculo").doc(req.params.ref);
      await document.update({
        idvehiculo: req.params.idvehiculo,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Eliminar usuarios de viculos
router.delete("/api/UsuarioXVehiculo/:ref", async(req, res)=>{
    try {
        const document = db.collection("UsuarioXVehiculo").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});
//Optener todos los funcionarios
router.get('/api/UsuarioXVehiculo', async(req,res)=>{
    try {
        const query = db.collection("UsuarioXVehiculo");
        const querySnapShot = await query.get()
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            idusuario: doc.data().idusuario,
            idvehiculo: doc.data().idvehiculo,
        }));
 
       var listaElementos = [];
        for (x of response) {
            Correo_institucional = x.idusuario;
            Placa = x.idvehiculo;
            var UsuarioDoc = db.collection("Usuario").doc(""+Correo_institucional+""); 
            var UsuarioInfo = await UsuarioDoc.get();
            var UsuarioData = UsuarioInfo.data();
            var VehiculoDoc = db.collection("Vehiculo").doc(""+CodigoMateria+"");  
            var VehiculoInfo = await VehiculoDoc.get();
            var VehiculoData = VehiculoInfo.data();
            resPonder = {ID: x.Id, idusuario: x.idusuario, idvehiculo: x.idvehiculo, CursoData, UsuarioData};
            listaElementos.push(resPonder);
          }
          return res.status(200).json(listaElementos);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
    });

module.exports = router