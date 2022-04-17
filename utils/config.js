require('dotenv').config();

const LTI_URL = process.env.LTI_URL;
const BASE_URL = 'http://localhost:3000';
const BE_URL = 'http://localhost:5000';

export { LTI_URL, BASE_URL, BE_URL };