const express = require('express');
const router = express.Router();
const repairModel = require('../models/repairModel');

// Get all repairs
router.get('/', async (req, res) => {
    try {
        const repairs = await repairModel.getAllRepairs();
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get repair by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const repair = await repairModel.getRepairById(id);
        if (repair) {
            res.json(repair);
        } else {
            res.status(404).json({ error: 'Repair not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get repairs by asset ID
router.get('/asset/:assetId', async (req, res) => {
    const { assetId } = req.params;
    try {
        const repairs = await repairModel.getRepairsByAssetId(assetId);
        res.json(repairs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new repair
router.post('/', async (req, res) => {
    try {
        const newRepair = await repairModel.createRepair(req.body);
        res.status(201).json(newRepair);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a repair
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await repairModel.updateRepair(id, req.body);
        res.json({ message: 'Repair updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a repair
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await repairModel.deleteRepair(id);
        res.json({ message: 'Repair deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
