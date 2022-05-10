const {Router} = require('express');
const {db} = require('../firebase');

const router = Router();

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get();
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(contacts)
    res .send('Hello');
});

router.post('/new-contac', async (req, res) => {
    const {firstname, lastname, email, phone} = req.body

    await db.collection('contacts').add({
        firstname,
        lastname,
        email,
        phone
    })
    res.send('new contact created');
});

router.get('/edit-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).get();

    console.log({
        id: doc.id,
        ...doc.data()
    })
    res.send('edit contact')
});

router.get('/delete-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).delete();
    console.log('entro a eliminar')
    res.status(204).json();
    // res.send('contact deleted');
})

router.post('update-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).update(req.body);
})

module.exports = router;