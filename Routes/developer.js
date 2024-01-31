const { Router } = require("express");
const route = Router();
const cntDev = require("../Controller/developer");
const authMiddleware = require("../Middleware/authorize");
const admin = require("../Middleware/admin");
route.post("/login", cntDev.login);
route.get("/count", cntDev.countDev);
route.get("/countadmin", cntDev.countAdmin);
route.use(authMiddleware.verifyToken);
route.get("/viewless", cntDev.viewLess);
route.get("/viewall", cntDev.getDev);
route.post("/add", cntDev.addDev);
// Router.get('/:drole',cntDev.getyrole)
route.get("/viewbyid/:id", cntDev.getById);
route.delete("/deldev/:id", cntDev.delDev);
route.put("/update/:id", cntDev.updateDev);
// route.get('/verifytoken',cntDev.verifyToken,cntDev.getdev);
module.exports = route;
