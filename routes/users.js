const router = require("express").Router()


router.get("/", (req, res) => {
    res.send("users route has been created")
    console.log("ready")
})

module.exports = router