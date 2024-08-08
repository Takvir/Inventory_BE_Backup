const express = require('express');
const router = express.Router();
const branchModel = require('../models/branchModel');

// Get all branches
router.get('/', async (req, res) => {
    try {
        const branches = await branchModel.getAllBranches();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get branch by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const branch = await branchModel.getBranchById(id);
        if (branch) {
            res.json(branch);
        } else {
            res.status(404).json({ error: 'Branch not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new branch
router.post('/', async (req, res) => {
    const branchData = req.body;
    try {
        const newBranch = await branchModel.createBranch(branchData);
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a branch
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const branchData = req.body;
    try {
        await branchModel.updateBranch(id, branchData);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a branch
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await branchModel.deleteBranch(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
