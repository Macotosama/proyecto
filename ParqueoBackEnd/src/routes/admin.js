const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

//admin login
router.get('/login-admin/:user/:contra', async (req, res) => {
    try{
        const adminS = db.collection("usuario");
        const query = adminS.where("tipo_usuario", "==", true).where("contrasena",  "==", ""+req.params.contra).where("email",  "==", ""+req.params.user);
        
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

module.exports = router;