const express = require('express');
const router = express.Router();
const groupModel = require('../models/groupModel');

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await groupModel.getAllGroups();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get group by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const group = await groupModel.getGroupById(id);
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new group
router.post('/', async (req, res) => {
    const groupData = req.body;
    try {
        const newGroup = await groupModel.createGroup(groupData);
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a group
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const groupData = req.body;
    try {
        await groupModel.updateGroup(id, groupData);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a group
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await groupModel.deleteGroup(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
