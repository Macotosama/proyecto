const {Router} = require('express')
const router = Router();
const admin = require('firebase-admin');//Esta constante es la encargada de proporcionar la 

const db = admin.firestore();


router.get('/api/Reserva/:ref', async(req,res)=>{
        try {
            const doc = db.collection("Reserva").doc(req.params.ref);
            const item = await doc.get();
            response = {Id: item.id, 
                        Codigo: item.data().Codigo, 
                        fecha_inicio: item.data().fecha_inicio,  
                        fecha_final: item.data().fecha_final, 
                        id_estacion: item.data().id_estacion,
                        horas_entradas: item.data(), 
                        horas_salidas: item.data(), 
                    }
                return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    });

//Busqueda Reserva
router.get('/api/Reserva/est/:codigo', async(req,res)=>{
    try {
        const reser = db.collection("Reserva");
        const query = reser.where("Reserva", "==", ""+req.params.codigo+"");
        const querySnapShot = await query.get();
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Codigo: doc.data(),
            fecha_inicio: doc.data(),  
            fecha_final: doc.data(), 
            id_estacion: doc.data(),
            horas_entradas: doc.data(), 
            horas_salidas: doc.data(),     
        }));
        return res.status(200).json(response[0]); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

//Optener todas las Reserva
router.get('/api/Reserva', async(req,res)=>{
    try {
        const query = db.collection("Reserva");
        const querySnapShot = await query.get()
        const docs = querySnapShot.docs;
        const response = docs.map((doc)=>({
            Id: doc.id,
            Placa: doc.data()
        }));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)  
    }
});


//Eliminar Reserva
router.delete("/api/Reserva/:ref", async(req, res)=>{
    try {
        const document = db.collection("Reserva").doc(req.params.ref);
        await document.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});



module.exports = router