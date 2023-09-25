import axios from 'axios';
import routesAPI from '../routes';

const authAPI = () => {
  const signIn = async (userData) => {
    const response = await axios.post(routesAPI.signInPath(), userData);
    return response.data;
  };
  const signUp = async (userData) => {
    const response = await axios.post(routesAPI.signUpPath(), userData);
    return response.data;
  };
  return { signIn, signUp };
};

export default authAPI;
