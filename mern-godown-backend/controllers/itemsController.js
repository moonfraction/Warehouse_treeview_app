const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');
const Godown = require('../models/Godown');


const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

const getItemById = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

const createItem = asyncHandler(async (req, res) => {
    const item = new Item(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
});

const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        await item.remove();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});

const updateItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        item.item_id = req.body.item_id || item.item_id;
        item.name = req.body.name || item.name;
        item.category = req.body.category || item.category;
        item.quantity = req.body.quantity || item.quantity;
        item.godown_id = req.body.godown_id || item.godown_id;
        item.price = req.body.price || item.price;
        item.status = req.body.status || item.status;
        item.brand = req.body.brand || item.brand;
        item.attributes = req.body.attributes || item.attributes;
        item.image_url = req.body.image_url || item.image_url;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});


const changeGodownId = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        item.godown_id = req.body.godown_id || item.godown_id;
        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
});


const getCategories = asyncHandler(async (req, res) => {
    const categories = await Item.find().distinct('category');
    res.json(categories);
});

const getStatuses = asyncHandler(async (req, res) => {
    const statuses = await Item.find().distinct('status');
    res.json(statuses);
});

module.exports = { getItems, getItemById, createItem, deleteItem, updateItem, changeGodownId , getCategories, getStatuses };