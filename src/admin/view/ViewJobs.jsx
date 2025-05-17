import React from 'react';
import { FaBriefcase, FaBuilding, FaExclamation, FaMapMarker } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const ViewJobs = ({ job, closeModal }) => {
    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center">View Job Details</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="job-details">
                            <p><FaBuilding /><strong> Company:  </strong> {job.company}</p>
                            <p><FaBriefcase /><strong> Job Title:  </strong> {job.job_title}</p>
                            <p><FaLocationDot /><strong> Location:  </strong>  {job.location}</p>
                            <hr className="divider" />
                            <div className="description" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewJobs;
