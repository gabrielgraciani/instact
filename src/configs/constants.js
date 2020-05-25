import io from 'socket.io-client';

export const STORAGE_URL	= 'https://instact.s3.amazonaws.com/';
//export const API_URL = 'http://localhost:3333';
export const API_URL = 'https://instact.herokuapp.com';
//export const SITE_URL = 'http://localhost:3000/';
export const SITE_URL = 'https://instact.now.sh/';
//export const socket = io('http://localhost:3333');
export const socket = io('https://instact.herokuapp.com');

