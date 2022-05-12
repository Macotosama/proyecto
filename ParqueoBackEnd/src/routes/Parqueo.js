const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();


router.get('/api/Parqueo/:ref', async(req,res)=>{
        try {
            const doc = db.collection("Parqueo").doc(req.params.ref);
            const item = await doc.get();
            response = {Id: item.id, 
                        Nombre: item.data().Nombre, 
                        Direccion: item.data().Direccion, 
                        Espacios: item.data().Espacios, 
                        Horario: item.data().Horario, 
                        Tipo_Parqu: item.data().Tipo_Parqu}
                return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
});



//Busqueda por nombre
router.get('/api/Parqueo/nombre/:nombre', async(req,res)=>{
    try {
        const parqu = db.collection("Parqueo");
        const query = parqu.where("Nombre", "==", ""+req.params.nombre+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id, 
            Nombre: item.data(), 
            Direccion: item.data(), 
            Espacios: item.data(), 
            Horario: item.data(),
            Tipo_Parqu: item.data()
        }));
        return res.status(200).json(response[0]); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Eliminar Parqueo
router.delete("/api/Parqueo/:ref", async(req, res)=>{
    try {
        const document = db.collection("Parqueo").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.post("/api/Parqueo/:par1/:par2/:par3/:par4/:par5", async(req,res)=>{
    try {        
        var nParqueo = { 
            Nombre: req.params.par1, 
            Direccion: req.params.par2, 
            Espacios: req.params.par3, 
            Horario: req.params.par4,
            Tipo_Parqu: req.params.par5}
        await db.collection("Parqueo").doc().create(nParqueo)
        return res.status(204).json(); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }     
});

//Cambiar Espacios
router.put("/api/Parqueo/espacios:ref/:Espacios", async(req, res)=>{
    try {
      const document = db.collection("Parqueo").doc(req.params.ref);
      await document.update({
        Espacios: req.params.Espacios,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});


//Cambiar Horario
router.put("/api/Parqueo/ horario:ref/: Horario", async(req, res)=>{
    try {
      const document = db.collection("Parqueo").doc(req.params.ref);
      await document.update({
        Horario: req.params.horario,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});

//Cambiar Nombre
router.put("/api/Parqueo/nombre:ref/:nombre", async(req, res)=>{
    try {
      const document = db.collection("Parqueo").doc(req.params.ref);
      await document.update({
        Nombre: req.params.nombre,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();  
    }
});



module.exports = router