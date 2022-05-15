const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

//Consultar Estacionamiento
router.get('/Estacionamiento/:ref', async(req,res)=>{
        try {
            const doc = db.collection("Estacionamiento").doc(req.params.ref);
            const item = await doc.get();
            response = {Id: item.id, 
                        Espacio: item.data().Espacio, 
                        Tipo: item.data().Tipo, 
                        Disponible: item.data().Disponible, 
                        id_parqueo: item.data().id_parqueo}
                return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
});

//Busqueda por nombre
router.get('/Estacionamiento/estacionamiento/:disponible', async(req,res)=>{
    try {
        const estac = db.collection("Estacionamiento");
        const query = estac.where("Disponible", "==", "" + req.params.disponible+ "");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: item.id, 
            Tipo: item.data(), 
            Disponible: item.data()
        }));
        return res.status(200).json(response[0]); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Eliminar Estacionamiento
router.delete("/Estacionamiento/:ref", async(req, res)=>{
    try {
        const document = db.collection("Estacionamiento").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.post("/Estacionamiento/:par1/:par2/:par3", async(req,res)=>{
    try {        
        var nEstacionamiento = { 
            Tipo: req.params.par1, 
            Disponible: req.params.par2, 
            idparqueo: req.params.par3,
        }
        await db.collection("Estacionamiento").doc().create(nEstacionamiento)
        return res.status(204).json(); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }     
});


//Cambiar Disponible 
router.put("/Estacionamiento/Disponible/:ref/:disponible", async(req, res)=>{
    try {
      const document = db.collection("Estacionamiento").doc(req.params.ref);
      await document.update({
        Disponible: req.params.disponible,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});

//Cambiar Tipo
router.put("/api/Estacionamiento/Tipo/:ref/:tipo", async(req, res)=>{
    try {
      const document = db.collection("Estacionamiento").doc(req.params.ref);
      await document.update({
        Tipo: req.params.tipo,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});

module.exports = router