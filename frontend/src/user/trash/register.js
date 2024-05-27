import React, { useState } from 'react';

const Register = () => {
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
            newErrors.password = 'Password must be at least 6 characters';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert('Form submitted successfully:');
            console.log('Form submitted successfully:', form);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <div>
                <label>Retype Password:</label>
                <input
                    type="password"
                    name="retypePassword"
                    value={form.retypePassword}
                    onChange={handleChange}
                />
                {errors.retypePassword && <span>{errors.retypePassword}</span>}
            </div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
