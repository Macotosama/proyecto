const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();

router.get('/api/Horario/:ref', async(req,res)=>{
        try {
            const doc = db.collection("Horario").doc(req.params.ref);
            const item = await doc.get();
            response = {Id: item.id, 
                        horas_entradas: item.data().horas_entradas, 
                        horas_salidas: item.data().horas_salidas, 
                        dia_semana: item.data().dia_semana, 
                        id_usuario: item.data().id_usuario}
                return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    });
/*
//Busqueda horario
router.get('/api/Horario/horas_entradas/:horas_entradas', async(req,res)=>{
    try {
        const hori = db.collection("Horario");
        const query = hori.where("Horario", "==", ""+req.params.Horario+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            horas_entradas: item.data(), 
            horas_salidas: item.data(), 
            dia_semana: item.data(),
        }));
        return res.status(200).json(response[0]); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});
*/
//Optener todos los horarios
router.get('/api/Horario', async(req,res)=>{
    try {
        const query = db.collection("Horario");
        const querySnapShot = await query.get()
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            horas_entradas: item.data(), 
            horas_salidas: item.data(), 
            dia_semana: item.data(),
            //id_usuario: item.data()
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)  
    }
    });


//Eliminar Horario
router.delete("/api/Horario/:ref", async(req, res)=>{
    try {
        const document = db.collection("Horario").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

//Cambiar Entrada
router.put("/api/Horario/horas_entrada/:ref/:horas_entrada", async(req, res)=>{
    try {
      const document = db.collection("Horario").doc(req.params.ref);
      await document.update({
          horas_entrada: req.params.horas_entradas,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});

//Cambiar Salida
router.put("/api/Horario/horas_salidas/:ref/:horas_salidas", async(req, res)=>{
    try {
      const document = db.collection("Horario").doc(req.params.ref);
      await document.update({
          horas_salidas: req.params.horas_salidas,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});


//Cambiar dia de la semana
router.put("/api/Horario/dia_semana/:ref/:dia_semana", async(req, res)=>{
    try {
      const document = db.collection("Horario").doc(req.params.ref);
      await document.update({
          dia_semana: req.params.dia_semana,
      });
      return res.status(204).json();
    } catch (error) {
        return res.status(500).json();
        
    }
});
module.exports = router