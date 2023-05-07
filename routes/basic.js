const router=require('express').Router();
let item=require('../Public/api/notes')
router.get('/',(req,res)=>{
res.render('index',{
    title:'my home page'
});
});
router.get('/api/notes',(req,res)=>{
    res.json(item)
})
router.post('/api/notes', (req, res) => {
   

    const {  data } = req.body;

    // if (!name || !price) {
    //     next(ErrorHandler.validationError('Name and price fields are required!'));
    //     // throw new Error('All fields are required!');
    //     // return res.status(422).json({ error: 'All fields are required.'});
    // }
    const product = {
        data,
        
        id: new Date().getTime().toString()
    }
    item.push(product);
    res.json(product);
});
router.delete('/api/notes/:notesId', (req, res) => {
    item = item.filter((product) => req.params.notesId !== product.id);
    res.json({ status: 'OK' });
});
module.exports=router;