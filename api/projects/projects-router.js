// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', async (req, res) =>{
    try{
      const projects = await Projects.get()
        res.status(200).json(projects || [])
    } catch (err){
        res.status(500).json({
            message: "Error retriving projects"
        })
    }
})
router.get('/:id', async(req, res) =>{
    try{
        const project = await Projects.get(req.params.id)
        if(project){
            res.status(200).json(project)
        }else{
            res.status(404).json({
                message: 'Project not found'})
        }
    } catch (err){
        res.status(404).json({
            message: 'Error retrieving the project'})
    }
})
router.post('/', async(req, res)=>{
    const {name, description, completed} = req.body
    if(!name || !description){
        return res.status(400).json({
            message: "Missing required fields"})
    }
    try{
        const newProject = await Projects.insert({name, description, completed})
        res.status(201).json(newProject)
    } catch(err){
        res.status(201).json({
            message: "Error creating the project"
        })
    }
})

router.put('/:id', async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description || typeof completed === 'undefined') {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const updatedProject = await Projects.update(req.params.id, { name, description, completed });
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating the project" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting the project" });
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const project = await Projects.getProjectActions(req.params.id);
    if (project) {
      const actions = await Projects.getProjectActions(req.params.id);
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving actions for the project" });
  }
});

module.exports = router;