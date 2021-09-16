class BaseRepo {
  constructor(model) {
    this._model = model;
  }

  count(args) {
    return this._model.countDocuments({ ...args });
  }

  create(item, leaned = true) {
    return leaned
      ? this._model.create(item).then((createdItem) => createdItem.toObject())
      : this._model.create(item);
  }

  leanedFindById(id, populateField = undefined) {
    if (populateField)
      return this._model.findById(id).populate(populateField).lean();
    return this._model.findById(id).lean();
  }

  findById(id) {
    return this._model.findById(id);
  }

  findOneBy(args) {
    return this._model.findOne({ ...args }).lean();
  }

  update(id, data) {
    return this._model.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
  }

  list(args, populateField = undefined) {
    if (populateField)
      return this._model
        .find({ ...args })
        .populate(populateField)
        .lean();
    return this._model.find({ ...args }).lean();
  }

  listUnleaned(args, populateField = undefined) {
    if (populateField)
      return this._model.find({ ...args }).populate(populateField);
    return this._model.find({ ...args });
  }

  delete(id) {
    return this._model.deleteOne({ _id: id });
  }

  insertMany(data) {
    if (!Array.isArray(data)) throw new Error("Array required!");
    return this._model.insertMany(data);
  }
}

export default BaseRepo;
