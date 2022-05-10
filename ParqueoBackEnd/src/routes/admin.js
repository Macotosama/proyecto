const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

router.get('/delete-contact/:user/:contra', async (req, res) => {
    try{
        const adminS = db.collection("usuario");
        const query = adminS.where("tipo_usuario", "==", true).where("contrasena",  "==", ""+req.params.contra).where("contrasena",  "==", ""+req.params.contra);
        
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
    // const doc = await db.collection('contacts').doc(req.params.id).delete();
    // console.log('entro a eliminar')
    // res.status(204).json();
    // res.send('contact deleted');
})



module.exports = router;