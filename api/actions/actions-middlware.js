// add middlewares here related to actions

const Actions = require('./actions-model');

// Middleware to check if action exists
async function validateActionId(req, res, next) {
  try {
    const action = await Actions.getById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    req.action = action;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error validating action ID' });
  }
}

// Middleware to validate request body
function validateActionBody(req, res, next) {
  const { description, notes, project_id } = req.body;
  if (!description || !notes || !project_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
}

module.exports = {
  validateActionId,
  validateActionBody,
};
