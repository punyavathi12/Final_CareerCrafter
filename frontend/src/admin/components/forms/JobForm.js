import React, { useState, useEffect } from 'react';
import { jobServiceObj } from '../../services/jobService'; // Import the job service object
import './formstyles.css'; // Import the CSS file
import AdminNavigationBar from '../AdminNav';
import { useNavigate } from 'react-router-dom';

function JobForm() {
    const [jobobj, setjobobj] = useState({
        job_title: '',
        job_industry: '',
        description: '',
        qualifications: '',
        application_instructions: '',
        created_by: '', // Include created_by field
        location: '',
        min_salary: '',
        max_salary: '',
        company_name: '',
        job_status: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [jobListings, setJobListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch job listings when component mounts
        fetchJobListings();
    }, []);

    const fetchJobListings = async () => {
        try {
            const token = sessionStorage.getItem('admin-token');
            const response = await jobServiceObj.getJobListingDetails(token);
            setJobListings(response.data);
        } catch (error) {
            console.error('Error fetching job listings:', error);
            setJobListings([]); // Set to an empty array in case of error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setjobobj(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.job_title = jobobj.job_title ? '' : 'Job title is required';
        tempErrors.job_industry = jobobj.job_industry ? '' : 'Industry is required';
        tempErrors.description = jobobj.description ? '' : 'Description is required';
        tempErrors.qualifications = jobobj.qualifications ? '' : 'Qualifications are required';
        tempErrors.application_instructions = jobobj.application_instructions ? '' : 'Application instructions are required';
        tempErrors.location = jobobj.location ? '' : 'Location is required';
        tempErrors.min_salary = jobobj.min_salary ? '' : 'Min salary is required';
        tempErrors.max_salary = jobobj.max_salary ? '' : 'Max salary is required';
        tempErrors.company_name = jobobj.company_name ? '' : 'Company name is required';
        tempErrors.job_status = jobobj.job_status ? '' : 'Status is required';

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const adminId = sessionStorage.getItem('adminId');
                const jobData = {
                    ...jobobj,
                    created_by: adminId
                };
                const response = await jobServiceObj.postJobListing(jobData);
                setMessage('Job listing created successfully!');
                console.log('Job listing created:', response);

                // Fetch updated job listings after successful submission
                fetchJobListings();
            } catch (error) {
                setMessage('Error creating job listing. Please try again later.');
                console.error('Error creating job listing:', error);
            }
        }
    };

    return (
        <>
            <AdminNavigationBar />
            <div className="container-rd">
                <div className="form-wrapper-rd">
                    <h2>Create Job Listing</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-rd">
                            <label>Job Title:</label>
                            <input
                                type="text"
                                name="job_title"
                                value={jobobj.job_title}
                                onChange={handleChange}
                                placeholder="e.g., Software Engineer"
                                required
                            />
                            {errors.job_title && <div className="error-rd">{errors.job_title}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Industry:</label>
                            <input
                                type="text"
                                name="job_industry"
                                value={jobobj.job_industry}
                                onChange={handleChange}
                                placeholder="e.g., Technology"
                                required
                            />
                            {errors.job_industry && <div className="error-rd">{errors.job_industry}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={jobobj.description}
                                onChange={handleChange}
                                placeholder="e.g., Job responsibilities and tasks"
                                required
                            ></textarea>
                            {errors.description && <div className="error-rd">{errors.description}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Qualifications:</label>
                            <textarea
                                name="qualifications"
                                value={jobobj.qualifications}
                                onChange={handleChange}
                                placeholder="e.g., Bachelor's degree in related field"
                                required
                            ></textarea>
                            {errors.qualifications && <div className="error-rd">{errors.qualifications}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Application Instructions:</label>
                            <textarea
                                name="application_instructions"
                                value={jobobj.application_instructions}
                                onChange={handleChange}
                                placeholder="e.g., Please email your resume to hr@example.com"
                                required
                            ></textarea>
                            {errors.application_instructions && <div className="error-rd">{errors.application_instructions}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={jobobj.location}
                                onChange={handleChange}
                                placeholder="e.g., Remote"
                                required
                            />
                            {errors.location && <div className="error-rd">{errors.location}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Min Salary:</label>
                            <input
                                type="text"
                                name="min_salary"
                                value={jobobj.min_salary}
                                onChange={handleChange}
                                placeholder="e.g., 500000"
                                required
                            />
                            {errors.min_salary && <div className="error-rd">{errors.min_salary}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Max Salary:</label>
                            <input
                                type="text"
                                name="max_salary"
                                value={jobobj.max_salary}
                                onChange={handleChange}
                                placeholder="e.g., 800000"
                                required
                            />
                            {errors.max_salary && <div className="error-rd">{errors.max_salary}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Company Name:</label>
                            <input
                                type="text"
                                name="company_name"
                                value={jobobj.company_name}
                                onChange={handleChange}
                                placeholder="e.g., Hexaware"
                                required
                            />
                            {errors.company_name && <div className="error-rd">{errors.company_name}</div>}
                        </div>
                        <div className="form-group-rd">
                            <label>Job Status:</label>
                            <input
                                type="text"
                                name="job_status"
                                value={jobobj.job_status}
                                onChange={handleChange}
                                placeholder="e.g., Open"
                                required
                            />
                            {errors.job_status && <div className="error-rd">{errors.job_status}</div>}
                        </div>
                        <button type="submit">Submit</button>
                        {message && <div className="message-rd">{message}</div>}
                    </form>
                </div>
                <button className="button-rd" onClick={() => navigate('/AdminHome/Jobs')}>Back to Jobs</button>
            </div>
        </>
    );
}

export default JobForm;
