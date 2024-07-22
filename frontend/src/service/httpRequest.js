const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Create an Axios instance with the base URL
const httpRequest = axios.create({
    baseURL: `${BASE_URL}`,
});

// Function to make a GET request
 const get = async (path, config = {}) => {
    const response = await httpRequest.get(path, config);
    // console.log("response", response.data);
    return response.data;
};

// Function to make a POST request
 const post = async (path, data, config = {}) => {
    const response = await httpRequest.post(path, data, config);
    return response.data;
};

// Function to make a PUT request
 const put = async (path, data, config = {}) => {
    const response = await httpRequest.put(path, data, config);
    return response.data;
};

// Function to make a DELETE request
 const del = async (path, config = {}) => {
    const response = await httpRequest.delete(path, config);
    return response.data;
};
module.exports = { get, post, put, del};
// export default httpRequest;