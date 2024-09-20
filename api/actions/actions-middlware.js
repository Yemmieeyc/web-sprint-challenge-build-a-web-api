// add middlewares here related to actions
const Actions = require('./actions-model')
async function validateActionId(req, res, next) {
    try {
        const actId = await Actions.get(req.params.id);
        if (!actId) {
            res.status(404).json({
                message: 'Action does not exist',
            });
        } else {
            req.actId = actId;
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Problem finding action',
        });
    }
}
// function validateActionId(req, res, next) {
//     const {id} = req.params
//     Actions.get(id)
//     .then (action => {
//         if(action){
//             req.action = action
//             next()
//         } else{
//             res.status(404).json({message: "Action not found"})
//         }
//     })
//     .catch(() =>{
//         res.status(500).json({message: "Error retriving the action"})
//     })
        
// }

// Middleware to validate request body
function validateActionBody(req, res, next) {
  const { description, notes } = req.body;
  if (notes !== undefined &&
    typeof notes === "string" &&
    notes.length && notes.trim().length &&
    description !== undefined &&
    description.length && description.trim().length
  ) {
    next()
    
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
 
}

module.exports = {
  validateActionId,
  validateActionBody,
};
