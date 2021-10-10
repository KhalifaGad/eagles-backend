class ProductEntity {
  _id;
  nameEn;
  nameAr;
  descriptionEn;
  descriptionAr;
  price;
  weight;
  height;
  width;
  companyId;
  byBranchId;
  constructor({
    _id,
    nameEn,
    nameAr,
    descriptionEn,
    descriptionAr,
    price,
    weight,
    height,
    width,
    companyId,
    byBranchId,
  }) {
    this._id = _id;
    this.nameEn = nameEn;
    this.nameAr = nameAr;
    this.descriptionEn = descriptionEn;
    this.descriptionAr = descriptionAr;
    this.price = price;
    this.weight = weight;
    this.height = height;
    this.width = width;
    this.companyId = companyId;
    this.byBranchId = byBranchId;
  }
}

export default ProductEntity;
