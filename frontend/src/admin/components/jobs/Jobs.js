import React, { useState, useEffect } from 'react';
import AdminNavigationBar from '../AdminNav';
import { jobServiceObj } from '../../services/jobService';
import './jobStyles.css'; // Import the CSS file for Jobs styling

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = sessionStorage.getItem('admin-token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await jobServiceObj.getJobListingDetails(token);
        console.log('Response from backend:', response);

        const jobsArray = response.data.data;
        console.log('Jobs array:', jobsArray);

        const reversedJobs = jobsArray.reverse();
        console.log('Reversed jobs:', reversedJobs);

        setJobs(reversedJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (salary) => {
    return (salary / 100000).toFixed(1) + ' LPA';
  };

  const handleView = (job) => {
    setSelectedJob(job);
  };

  return (
    <>
      <AdminNavigationBar />
      <div className="jobs-dd">
        {loading ? (
          <p>Loading job listings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="job-cards-container-dd">
            {jobs.map(job => (
              <div className="job-card-dd" key={job.job_id}>
                <div className="color-box-dd">
                  <span className="hiring-text-dd">Hiring</span>
                </div>
                <div className="job-details-dd">
                  <h2>{job.job_title}</h2>
                  <p className="qualification-industry-dd">
                    <span className="qualification-dd">{job.qualifications}</span>
                    <span className="industry-dd">{job.job_industry}</span>
                    <span className="company-dd">{job.company_name}</span>
                  </p>
                  <p className="salary-dd" style={{ color: 'green' }}>
                    {formatSalary(job.min_salary)} - {formatSalary(job.max_salary)}
                  </p>
                  <p className="location-dd">
                    <img src="/Images/location.webp" alt="Location Icon" className="location-icon-dd" />
                    {job.location}
                  </p>
                  <button className="view-button-dd" onClick={() => handleView(job)}>View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedJob && (
        <div className="job-details-modal-dd">
          <div className="job-details-content-dd">
            <h2>{selectedJob.job_title}</h2>
            <p><strong>Industry:</strong> {selectedJob.job_industry}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Qualifications:</strong> {selectedJob.qualifications}</p>
            <p><strong>Application Instructions:</strong> {selectedJob.application_instructions}</p>
            <p><strong>Created By:</strong> {selectedJob.created_by}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Min Salary:</strong> {formatSalary(selectedJob.min_salary)}</p>
            <p><strong>Max Salary:</strong> {formatSalary(selectedJob.max_salary)}</p>
            <p><strong>Company Name:</strong> {selectedJob.company_name}</p>
            <p><strong>Status:</strong> {selectedJob.job_status}</p>
            <button onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobs;
