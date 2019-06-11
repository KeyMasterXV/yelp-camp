const mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

const data = [
    {
        name: "CLouds Rest", 
        image: "http://www.hiddenvalleydeadwood.com/sites/hiddenvalley/files/styles/navigation_tile_smart_phone/public/photos/amenity/camping/0150-hidden-valley-campground-2014-08-12.jpg?itok=z-Wrp7cd&timestamp=1514484420",
        description: "lalalalala"
    },
    {
        name: "CLouds Rest", 
        image: "http://www.hiddenvalleydeadwood.com/sites/hiddenvalley/files/styles/navigation_tile_smart_phone/public/photos/amenity/camping/0150-hidden-valley-campground-2014-08-12.jpg?itok=z-Wrp7cd&timestamp=1514484420",
        description: "hahahahaha"
    },
    {
        name: "CLouds Rest", 
        image: "http://www.hiddenvalleydeadwood.com/sites/hiddenvalley/files/styles/navigation_tile_smart_phone/public/photos/amenity/camping/0150-hidden-valley-campground-2014-08-12.jpg?itok=z-Wrp7cd&timestamp=1514484420",
        description: "yoyoyoyo"
    }
];

function seedDB() {
    Campground.remove({}, function(err) {
        // if(err) {
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");

        //             Comment.create(
        //                 {
        //                     text: "wow!",
        //                     author: "Homer"
        //                 }, function(err, comment) {
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("created a new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;