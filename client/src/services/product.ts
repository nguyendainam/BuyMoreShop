import axios from "../until/axios.ts";
/*
 *
 *
 *
 *
 */
// CATEGORY
export const CorUCategories = async (data: FormData) => {
  return await axios.post("/system/CandUCategory", data);
};

// PRODUCT
export const CreateProduct = async (data: FormData) => {
  return await axios.post(`/system/createProduct`, data);
};
