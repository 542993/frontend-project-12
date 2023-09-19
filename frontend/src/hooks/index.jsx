import { useContext } from 'react';
import { AuthContext, ChatApiContext } from '../context/index.js';

export const useAuth = () => useContext(AuthContext);
export const useChat = () => useContext(ChatApiContext);
