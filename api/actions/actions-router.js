// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateActionBody } = require('./actions-middlware');

const router = express.Router();

// [GET] /api/actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.getAll();
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving actions' });
  }
});

// [GET] /api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action); // req.action set by middleware
});

// [POST] /api/actions
router.post('/', validateActionBody, async (req, res) => {
  try {
    const newAction = await Actions.create(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating action' });
  }
});

// [PUT] /api/actions/:id
router.put('/:id', validateActionId, validateActionBody, async (req, res) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.json(updatedAction);
  } catch (err) {
    res.status(500).json({ message: 'Error updating action' });
  }
});

// [DELETE] /api/actions/:id
router.delete('/:id', validateActionId, async (req, res) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end(); 
  } catch (err) {
    res.status(500).json({ message: 'Error deleting action' });
  }
});

module.exports = router;

