const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware/index");

// INDEX
router.get("/campgrounds", (req, res) => {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            console.log(req.body);
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE
router.post("/campgrounds", middleware.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const cost = req.body.cost;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, image: image, description: description, cost: cost, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            req.flash("error", err.message)
            res.redirect("back");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
 });

// EDIT
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        }
    });
    res.redirect("/campgrounds");
});

module.exports = router;