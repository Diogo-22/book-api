const Grocery = require('../model/Grocery')

const getAllGroceries = async (req, res) => {
    const groceries = await Grocery.find();
    if (!groceries) return res.status(204).json( {'message': 'No groceries found.'})
    res.json(groceries);
}

const createNewGrocery = async (req, res) => {
    if ( !req?.body?.name) {
        return res.status(400).json({ 'message': 'Grocery name is required'})
    }

    try {
        const result = await Grocery.create({
            name: req.body.name
        })
        res.status(201).json(result)
    } catch (err) {
       console.error(err); 
    }
}

const updateGrocery = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.'})
    }

    const grocery = await Grocery.findOne({ _id: req.body.id}).exec() 
    if (!grocery) {
        return res.status(204).json({ "message": `No Grocery matches ID ${req.body.id}.` });
    }
    if (req.body?.name) grocery.name = req.body.name;
    const result = await grocery.save()
    res.json(result);
}

const deleteGrocery = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'Grocery ID required'})
    
    const grocery = await Grocery.findOne({ _id: req.body.id}).exec() 
    if (!grocery) {
        return res.status(204).json({ "message": `No Grocery matches ID ${req.body.id}.` });
    }
    const result = await Grocery.deleteOne({ _id: req.body.id})
    res.json(result);
}

const getGrocery = async (req, res) => {
    if (!req.params?.id) return res.status(400).json({'message': 'Grocery ID required'})
    
    const grocery = await Grocery.findOne({ _id: req.params.id}).exec() 
    if (!grocery) {
        return res.status(204).json({ "message": `No Grocery matches ID ${req.body.id}.` });
    }
    res.json(grocery);
}

module.exports = {
    getAllGroceries,
    createNewGrocery,
    updateGrocery,
    deleteGrocery,
    getGrocery
}