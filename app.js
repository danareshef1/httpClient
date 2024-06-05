const axios = require('axios');

const id = "314652439";  // my ID
const year = "2000";     // my Birth Year
const ip = "localhost";  // IP for sending request
const port = "6767";     // Port for sending request
const baseURL = `http://${ip}:${port}`;  // Base URL

// Step 1: Sending a GET request
async function getRequest() {
    const getRequestUrl = `${baseURL}/test_get_method?id=${id}&year=${year}`;  // Full GET request URL
    try {
        const response = await axios.get(getRequestUrl);  // Send GET request
        return response.data.trim();  // Get the response as a string
    } catch (error) {
        console.error(`GET request error: ${error.message}`);
    }
}

// Step 2: Send a POST request
async function postRequest(getResponseStr, headers) {
    const postRequestUrl = `${baseURL}/test_post_method`;  // POST request URL
    const postDataBody = {
        "id": parseInt(id),  // Convert id to integer
        "year": parseInt(year),  // Convert year to integer
        "requestId": getResponseStr  // Include response from GET request
    };
    try {
        const response = await axios.post(postRequestUrl, postDataBody, { headers });  // Send POST request
        return response.data.message;  // Extract the message from JSON response
    } catch (error) {
        console.error(`POST request error: ${error.message}`);
    }
}

// Step 3: Send a PUT request
async function putRequest(postResponseJsonMsg, headers) {
    const putRequestUrl = `${baseURL}/test_put_method?id=${postResponseJsonMsg}`;  // PUT request URL
    const putDataBody = {
        "id": (parseInt(id) - 123503) % 92,  // Calculate new id
        "year": (parseInt(year) + 123) % 45  // Calculate new year
    };
    try {
        const response = await axios.put(putRequestUrl, putDataBody, { headers });  // Send PUT request
        return response.data.message;  // Extract the message from JSON response
    } catch (error) {
        console.error(`PUT request error: ${error.message}`);
    }
}

// Step 4: Send a DELETE request
async function deleteRequest(putResponseJsonMsg) {
    const deleteRequestUrl = `${baseURL}/test_delete_method?id=${putResponseJsonMsg}`;  // DELETE request URL
    try {
        await axios.delete(deleteRequestUrl);  // Send DELETE request
        console.log('DELETE request successful');  // Log success message
    } catch (error) {
        console.error(`DELETE request error: ${error.message}`);
    }
}

// Main function to send the requests
async function main() {
    const getResponse = await getRequest();  // Execute GET request
    console.log(`GET Response: ${getResponse}`);
    const headers = { 'Content-type': 'application/json' };  // Set headers
    const postResponse = await postRequest(getResponse, headers);  // Execute POST request
    console.log(`POST Response: ${postResponse}`);
    const putResponse = await putRequest(postResponse, headers);  // Execute PUT request
    console.log(`PUT Response: ${putResponse}`);
    await deleteRequest(putResponse);  // Execute DELETE request
}

// Execute the main function
main();
