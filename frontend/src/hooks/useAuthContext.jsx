import { useContext } from 'react';
import { AuthContext } from '../context/index.js';

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
