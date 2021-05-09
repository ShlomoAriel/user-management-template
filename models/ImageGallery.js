var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageGallerySchema = new Schema({
    name: { type: String, required: true},
    images: [{type: String, required: true}]
});
var ImageGallery = mongoose.model('ImageGallery', imageGallerySchema);
module.exports = ImageGallery;