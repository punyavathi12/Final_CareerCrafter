import React, { useState } from 'react';
import { adminServiceObj } from '../../services/adminService';
import './adminRegisterStyles.css';

const AdminRegister = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        retypePassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!form.retypePassword) {
            newErrors.retypePassword = 'Please retype your password';
        } else if (form.password !== form.retypePassword) {
            newErrors.retypePassword = 'Passwords do not match';
        }

        if (!form.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!form.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!form.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(form.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await adminServiceObj.createAdmin({
                    email: form.email,
                    password: form.password,
                    first_name: form.firstName,
                    last_name: form.lastName,
                    phone_number: form.phoneNumber
                });
                if (response.success) {
                    alert('Admin registered successfully');
                } else {
                    setErrors({ form: 'Error registering admin' });
                }
            } catch (error) {
                setErrors({ form: 'Error registering admin' });
            }
        }
    };

    return (
        <form className="formrr" onSubmit={handleSubmit}>
            <h2 className="h2rr">Admin Register</h2>
            {errors.form && <p className="spanrr">{errors.form}</p>}
            <div>
                <label className="labelrr">Email:</label>
                <input
                    className="inputrr"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="spanrr">{errors.email}</span>}
            </div>
            <div>
                <label className="labelrr">Password:</label>
                <input
                    className="inputrr"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="spanrr">{errors.password}</span>}
                </div>
               <div>
                   <label className="labelrr">First Name:</label>
                   <input
                       className="inputrr"
                       type="text"
                       name="firstName"
                       value={form.firstName}
                       onChange={handleChange}
                   />
                   {errors.firstName && <span className="spanrr">{errors.firstName}</span>}
               </div>
               <div>
                   <label className="labelrr">Last Name:</label>
                   <input
                       className="inputrr"
                       type="text"
                       name="lastName"
                       value={form.lastName}
                       onChange={handleChange}
                   />
                   {errors.lastName && <span className="spanrr">{errors.lastName}</span>}
               </div>
               <div>
                   <label className="labelrr">Phone Number:</label>
                   <input
                       className="inputrr"
                       type="text"
                       name="phoneNumber"
                       value={form.phoneNumber}
                       onChange={handleChange}
                   />
                   {errors.phoneNumber && <span className="spanrr">{errors.phoneNumber}</span>}
               </div>
               <button className="buttonrr" type="submit">Register</button>
           </form>
       );
   };

   export default AdminRegister;
