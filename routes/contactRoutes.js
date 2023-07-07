const express =  require('express');
const router = express.Router();
const {getAllContatct,createContatct,getContatct,updateContatct,deleteContatct} =  require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken)

router.route("/").get(getAllContatct).post(createContatct);
router.route("/:id").get(getContatct).put(updateContatct).delete(deleteContatct);

// router.route("/").post(createContatct);

// router.route("/:id").put(updateContatct);

// router.route("/:id").delete(deleteContatct);
module.exports = router;