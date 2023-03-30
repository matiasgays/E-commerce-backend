import businessModel from "../models/business.model.js";

export default class Business {
  constructor() {}

  getBusinesses = async () => {
    try {
      const business = await businessModel.find();
      return business;
    } catch (error) {
      throw new Error(error);
    }
  };

  getBusinessById = async (id) => {
    try {
      const business = await businessModel.findById({ _id: id });
      return business;
    } catch (error) {
      throw new Error(error);
    }
  };

  saveBusiness = async (business) => {
    try {
      const newBusiness = await businessModel.create(business);
      return newBusiness;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (id, product) => {
    try {
      const business = await businessModel.findByIdAndUpdate(
        { _id: id },
        { $set: product }
      );
      return business;
    } catch (error) {
      throw new Error(error);
    }
  };
}
