import axios from "axios";

const CreateUrl = "http://localhost:5555/brands/create";
export const CreateBrand = async (form) => {
  const response = await axios.post(CreateUrl, form);
  return response;
};
const getUrl='http://localhost:5555/brands'
export const GetBrand= async()=>{
    const response=await axios.get(getUrl)
    // console.log(response.data)
    return response.data
}
