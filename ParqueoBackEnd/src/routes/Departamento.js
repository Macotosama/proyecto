const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();

router.get('/api/Departamento/:ref', async(req,res)=>{
        try {
            const doc = db.collection("Departamento").doc(req.params.ref);
            const item = await doc.get();
            response = {Id: item.id, 
                        Codigo: item.data.Codigo, 
                        Nombre: item.data().Nombre,
                        Descripcion: item.data().Decripcion
                    }
                return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
        });

//Busqueda por nombre
router.get('/api/Departamento/est/:nombre', async(req,res)=>{
    try {
        const depar = db.collection("Departamento");
        const query = depar.where("Nombre", "==", ""+req.params.nombre+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Nombre: doc.data(),
            Codigo:  doc.data()
        }));
        return res.status(200).json(response[0]); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Optener todos los departamentos
router.get('/api/Departamento', async(req,res)=>{
    try {
        const query = db.collection("Departamento");
        const querySnapShot = await query.get()
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Nombre: doc.data().Nombre,
            Decripcion: doc.data().Decripcion,
            Codigo: doc.data().Codigo
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)  
    }
    });

//Cambiar nombre
router.put("/api/Departamento/nombre/:ref/:nombre", async(req, res)=>{
    try {
      const document = db.collection("Departamento").doc(req.params.ref);
      await document.update({
          Nombre: req.params.nombre,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Cambiar decripcion
router.put("/api/Departamento/decripcion/:ref/:decripcion", async(req, res)=>{
    try {
      const document = db.collection("Departamento").doc(req.params.ref);
      await document.update({
          Decripcion: req.params.Decripcion,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//Cambiar codigo
router.put("/api/Departamento/codigo/:ref/:codigo", async(req, res)=>{
    try {
      const document = db.collection("Departamento").doc(req.params.ref);
      await document.update({
          Codigo: req.params.Codigo,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
    }
});


//Eliminar DEPARTAMENTO
router.delete("/api/Departamento/:ref", async(req, res)=>{
    try {
        const document = db.collection("Departamento").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});


module.exports = router