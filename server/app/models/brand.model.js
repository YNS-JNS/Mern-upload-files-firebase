const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

brandSchema.method("toJSON", function () {
  
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

module.exports = mongoose.model('BrandModel', brandSchema);
