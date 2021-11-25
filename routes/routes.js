const { Router } = require("express");
const router = Router();
const controller = require('../controllers/controllers.tasks');

function serverRouter(app){
    app.use("/api/tasks", router);
    
    router.get('/', controller.render)
    router.post('/', controller.create)
    router.post('/edit', controller.edit)
    router.post('/delete', controller.deleted) 
    router.post('/checked', controller.check) 

}

module.exports = serverRouter;
