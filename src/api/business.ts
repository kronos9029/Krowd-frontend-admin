import axios from 'axios';
import { useQuery } from 'react-query';
import { BusinessManager } from '../@types/business';

const getAllBusiness = async () => {
  const url = 'https://ec2-13-215-197-250.ap-southeast-1.compute.amazonaws.com/api/v1.0/businesses';
  const { data } = await axios.get<[BusinessManager]>(url);
  return data;
};

const useGetBusiness = () => useQuery('get', getAllBusiness);
export default useGetBusiness;
