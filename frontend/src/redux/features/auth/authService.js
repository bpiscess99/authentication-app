import axios from 'axios';

console.log('Process Environment:', process.env);
const BACKEND_URL = process.env.REACT_APP_SERVER_URL;
console.log("BACKEND_URL", BACKEND_URL);
export const API_URL = `${BACKEND_URL}/api/users/`;
console.log("API_URL", API_URL);

// Validate Email
export const validateEmail = (email) => {   
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    );
};

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData,
    {withCredentials: true}
    );
    console.log("response", response)
    return response.data;
};

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    return response.data;
};

// Logout User 
const logout = async () => {
    const response = await axios.get(API_URL + "logout");
    return response.data;;
};

// Get Login Status
const loginStatus = async () => {
    const response = await axios.get(API_URL + "loginStatus");
    return response.data;
};

// Get User Profile
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser");
    return response.data;
};

// Update Profile
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData);
    return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
    const response = await axios.post(API_URL + "sendVerificationEmail");
    // const response = await axios.post("http://localhost:5000/api/users/sendVerificationEmail");
    return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
    const response = await axios.patch(
        `${API_URL}verifyUser/${verificationToken}`
        );
    return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
    const response = await axios.patch(API_URL + "changePassword", userData);
    return response.data.message;
};

// Reset Password 
const resetPassword = async (userData, resetToken) => {
    const response = await axios.patch(
        `${API_URL}/resetPassword/${resetToken}`,
        userData
    );
    return response.data.message
};

// Forgot Password
const forgotPassword = async (userData) => {
    const response = await axios.post(API_URL + "forgotPassword", userData);
    return response.data.message;
};

// Get Users
const getUsers = async () => {
   const response = await axios.get(API_URL + "getUsers");
   return response.data;
};

// Delete User
const deleteUser = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
    const response = await axios.post(API_URL + "upgradeUser", userData);
    return response.data.message;
};

// Send Login Code
const sendLoginCode = async (email) => {
    const response = await axios.post(API_URL + `sendLoginCode/${email}`);
    return response.data.message;
};

// Login with Code
const loginWithCode = async (email, code) => {
    const response = await axios.get(API_URL + `loginWithCode/${email}`, code);
    return response.data;
};

// Login With Google
const loginWithGoogle = async (userToken) => {
    const response = await axios.post(API_URL + "google/callback", userToken);
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    loginStatus,
    getUser,
    updateUser,
    sendVerificationEmail,
    verifyUser,
    changePassword,
    resetPassword,
    forgotPassword,
    getUsers,
    deleteUser,
    upgradeUser,
    sendLoginCode,
    loginWithCode,
    loginWithGoogle
}

export default authService;