import { createContext } from 'react';
import { io } from 'socket.io-client';

export const ApiContext = createContext(null);
export const socket = io();
