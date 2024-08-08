const express = require('express');
const router = express.Router();
const assetModel = require('../models/assetModel');

// Get all assets
router.get('/', async (req, res) => {
    try {
        const assets = await assetModel.getAllAssets();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get asset by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await assetModel.getAssetById(id);
        if (asset) {
            res.json(asset);
        } else {
            res.status(404).json({ error: 'Asset not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get assets by branch ID
router.get('/branch/:branchId', async (req, res) => {
    const { branchId } = req.params;
    try {
        const assets = await assetModel.getAssetsByBranchId(branchId);
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get assets by branch and group
router.get('/branch/:branchId/group/:groupId', async (req, res) => {
    const { branchId, groupId } = req.params;
    try {
        const assets = await assetModel.getAssetsByBranchAndGroup(branchId, groupId);
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get assets by group ID
router.get('/group/:groupId', async (req, res) => {
    const { groupId } = req.params;
    try {
        const assets = await assetModel.getAssetsByGroupId(groupId);
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create asset
router.post('/', async (req, res) => {
    const asset = req.body;
    try {
        const newAsset = await assetModel.createAsset(asset);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update asset
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const asset = req.body;
    try {
        await assetModel.updateAsset(id, asset);
        res.json({ id, ...asset });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete asset
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await assetModel.deleteAsset(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get asset count by branch
router.get('/count/branch', async (req, res) => {
    try {
        const assetCount = await assetModel.getAssetCountByBranch();
        res.json(assetCount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get asset count by branch and group
router.get('/count/branch-group', async (req, res) => {
    try {
        const assetCount = await assetModel.getAssetCountByBranchAndGroup();
        res.json(assetCount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
