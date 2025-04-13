import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./PdcPackages.css";
 
const PdcPackages = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // Get projectId from URL parameters
 
  const handleCreateNewPackage = () => {
    if (!projectId) {
      console.error('Project ID is not provided');
      return;
    }
    navigate(`/create-pdc-package/${projectId}`);
  };
 
  // Dummy data for saved packages, replace with real data fetching
  const savedPackages = [
    {
      id: 1,
      status: 'Under review',
      createdDate: '2024-07-09',
      createdBy: 'Rajdeep'
    }
    // Add more packages as needed
  ];
 
  return (
    <div className="container">
      <h3>PDC Packages</h3>
      <p>
        More information about the PDC process is available at
        <a href="http://www.uwindsor.ca/qualityassurance/810/program-and-course-changes">
          this link
        </a>.
      </p>
      <button className="btn btn-primary" onClick={handleCreateNewPackage}>
        Create a new PDC Package
      </button>
      <h4>Active packages</h4>
      {savedPackages.map((pkg) => (
        <div key={pkg.id} className="package-card">
          <h5 className="package-status">{pkg.status} (Package #{pkg.id})</h5>
          <p>
            Package created {pkg.createdDate} by {pkg.createdBy}
          </p>
        </div>
      ))}
    </div>
  );
};
 
export default PdcPackages;