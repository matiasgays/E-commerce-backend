import Business from "../dao/classes/business.class.js";

const businessService = new Business();

export const getBusinesses = async (req, res) => {
  const businesses = await businessService.getBusinesses();
  res.status(200).json({ payload: businesses });
};

export const getBusinessById = async (req, res) => {
  const business = await businessService.getBusinessById(req.params.bid);
  res.status(200).json({ payload: business });
};

export const createBusiness = async (req, res) => {
  const business = await businessService.saveBusiness(req.body);
  res.status(200).json({ payload: business });
};

export const addProduct = async (req, res) => {
  const businesses = await businessService.addProduct(req.params.bid, req.body);
  res.status(200).json({ payload: businesses });
};
