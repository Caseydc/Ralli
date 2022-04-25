const { Router } = require("express");

const controller = require("./controllers/controller");

const router = Router();

router.get("/rallies", controller.index);

router.post("/createrally", controller.createRally);
// router.post("/participants", controller.createParticipant);

router.put("/update/:id", controller.updateRally);

//router.delete("/task/:id", toDoController.destroy); For later

module.exports = router;
