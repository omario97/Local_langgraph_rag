import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import config from "@/config";

// Create an Axios instance for making API requests
const apiClient = axios.create({
  baseURL: "/api", // Base URL for all API requests
});

// Set up an interceptor to handle API responses and errors
apiClient.interceptors.response.use(
  function (response) {
    // Return the response data directly if the request is successful
    return response.data;
  },
  function (error) {
    let message = "";

    // Handle unauthorized (401) errors by prompting the user to log in
    if (error.response?.status === 401) {
      toast.error("Please login"); // Show a toast notification
      return signIn(undefined, { callbackUrl: config.auth.callbackUrl }); // Redirect to the login page
    }
    // Handle forbidden (403) errors, typically for restricted features
    else if (error.response?.status === 403) {
      message = "Pick a plan to use this feature"; // Message for feature access restrictions
    }
    // Handle other errors and set the error message accordingly
    else {
      message =
        error?.response?.data?.error || error.message || error.toString(); // Set the error message from the response or default to a generic message
    }

    // Set the error message to a string format
    error.message =
      typeof message === "string" ? message : JSON.stringify(message);

    // Log the error message to the console for debugging
    console.error(error.message);

    // Display a toast notification with the error message
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong..."); // Fallback message if the error message is undefined
    }

    // Reject the promise with the error object to handle it further in the calling code
    return Promise.reject(error);
  }
);

export default apiClient;
