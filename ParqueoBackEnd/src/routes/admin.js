const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

//admin login
router.get('/login-admin/:user/:contra', async (req, res) => {
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
            const info = db.collection("Administrador");
            const query2 = info.where("usuario",  "==", ""+ response[0].Id);
            const querySnapShot2 = await query.get();
            const docs2 = querySnapShot.docs;

            const response2 = docs.map((doc)=>({
                Id: doc.id,
                ...doc.data(),
            }));
            return res.status(200).json({estatus: true});
        } else {
            return res.status(200).json({estatus: false});
        }
        
    }catch{
        console.log(error);
        return res.status(500).send(error)
    }
})

module.exports = router;