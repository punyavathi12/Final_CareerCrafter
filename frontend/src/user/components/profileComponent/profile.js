import UserNavigationBar from "../userNavBar";
import React, { useState, useEffect } from 'react';
import { userServiceObj } from "../../services/userService";

function Profile() {
    const [userDetails, setUserDetails] = useState({});
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const userId = sessionStorage.getItem("user_id");

    async function fetchUserDetails() {
        try {
            let userDetailsResponse = await userServiceObj.getUserDetailsByUserId(userId);
            if (userDetailsResponse.success === true) {
                setUserDetails(userDetailsResponse.obj);
                setIsLoading(false);
            } else {
                alert(userDetailsResponse.msg);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails({ ...updatedDetails, [name]: value });
    };

    const validateInputs = () => {
        const errors = {};

        if (!updatedDetails.first_name) {
            errors.first_name = 'First Name is required';
        }

        if (!updatedDetails.last_name) {
            errors.last_name = 'Last Name is required';
        }

        if (!/^[6-9]\d{9}$/.test(updatedDetails.phone_number)) {
            errors.phone_number = 'Phone Number must be 10 digits starting with 6, 7, 8, or 9';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdateDetails = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            try {
                let userDetailsResponse = await userServiceObj.updateUserDetails(userId, updatedDetails);
                if (userDetailsResponse.success === true) {
                    setUpdatedDetails({});
                    setIsUpdateFormVisible(false);
                    await fetchUserDetails();
                    alert("User details updated");
                    toggleUpdateForm();  // Hide the form after saving
                } else {
                    alert(userDetailsResponse.msg);
                }
            } catch (error) {
                console.error('Error updating user details:', error);
            }
        }
    };

    const toggleUpdateForm = () => {
        if (!isUpdateFormVisible) {
            setUpdatedDetails(userDetails);
        }
        setIsUpdateFormVisible(!isUpdateFormVisible);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <UserNavigationBar />
            <div>
                <div className="centered-container">
                    <h2>User Details</h2>
                    <p>First Name: {userDetails.first_name}</p>
                    <p>Last Name: {userDetails.last_name}</p>
                    <p>Phone Number: {userDetails.phone_number}</p>
                    <button onClick={toggleUpdateForm}>
                        {isUpdateFormVisible ? 'Cancel Update' : 'Update'}
                    </button>
                </div>
                {isUpdateFormVisible && (
                    <form onSubmit={handleUpdateDetails} className="registration-form">
                        <div>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="first_name"
                                    value={updatedDetails.first_name || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.first_name && <span>{errors.first_name}</span>}
                            </label>
                        </div>
                        <div>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="last_name"
                                    value={updatedDetails.last_name || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.last_name && <span>{errors.last_name}</span>}
                            </label>
                        </div>
                        <div>
                            <label>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={updatedDetails.phone_number || ''}
                                    onChange={handleInputChange}
                                />
                                {errors.phone_number && <span>{errors.phone_number}</span>}
                            </label>
                        </div>
                        <button type="submit" onClick={toggleUpdateForm}>Save</button>
                        <button type="button" onClick={toggleUpdateForm}>Cancel Update</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default Profile;
