// add middlewares here related to projects

const Projects = require('./projects-model');

// Middleware to check if project exists
async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.getById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    req.project = project; // Attach project to req
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error validating project ID' });
  }
}

// Middleware to validate request body
function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }
  next();
}

module.exports = {
  validateProjectId,
  validateProjectBody,
};

