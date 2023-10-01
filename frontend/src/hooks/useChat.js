import { useContext } from 'react';
import { ChatApiContext } from '../context/index.js';

const useChat = () => useContext(ChatApiContext);
export default useChat;
