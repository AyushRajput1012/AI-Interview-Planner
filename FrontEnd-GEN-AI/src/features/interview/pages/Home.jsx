import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from "../hooks/useInterview.js"
import { useAuth } from "../../auth/hooks/useAuth.js"
import { useNavigate } from "react-router"


const Home = () => {
  // UI State for character count and file upload

  const { loading, generateReport, reports, deleteReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate()
  const { handleLogout, user } = useAuth();


  const logoutUser = async () => {
    const success = await handleLogout();

    if (success) {
      navigate("/");
    }
  }


  const handleGenerateReport = async () => {

    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    navigate(`/interview/${data._id}`)
  }


  const handleDeleteReport = async (e, reportId) => {

    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    const success = await deleteReport(reportId);

    if (success) {
      alert("Report deleted successfully!");
    }
  };



  const [jobDescriptionLength, setJobDescriptionLength] = useState(0)
  const [resumeFileName, setResumeFileName] = useState(null)

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
    setJobDescriptionLength(e.target.value.length)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeFileName(file.name)
    }
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }


  return (
    <main className="home">
      <button
        className="logout-btn"
        onClick={logoutUser}
      >
        Logout
      </button>

      {/* Header Section */}
      <header className="interview-header">

        <div>
          <h1>
            Create Your Custom <span className="highlight">Interview Plan</span>
          </h1>

        </div>

        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>

      </header>

      {/* Main Content */}
      <div className="interview-container">
        {/* Left Section - Job Description */}
        <section className="section left-section">
          <div className="section-header">
            <div className="section-title">
              <span className="icon">💼</span>
              <h2>Target Job Description</h2>
            </div>
            <span className="badge required">REQUIRED</span>
          </div>

          <div className="textarea-wrapper">
            <textarea
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              maxLength={5000}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the full job description here...&#10;&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
            ></textarea>
            <div className="char-counter">
              {jobDescriptionLength} / 5000 chars
            </div>
          </div>
        </section>

        {/* Right Section - Profile */}
        <section className="section right-section">
          <div className="section-header profile-header">

            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <h2>{user?.username || "Your Profile"}</h2>
          </div>

          {/* Resume Upload */}
          <div className="input-group">
            <div className="label-with-badge">
              <label>Upload Resume <span className="best-results">[Best Results]</span></label>
            </div>
            <div className="file-upload-box"
              onClick={() => resumeInputRef.current.click()}
            >
              <div className="upload-icon">☁️</div>
              <div className="upload-text">
                <p className="upload-main">Click to upload or drag & drop</p>
                <p className="upload-sub">PDF or DOCX (Max 5MB)</p>
              </div>
              <input
                ref={resumeInputRef}
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                hidden
              />
            </div>
            {resumeFileName && (
              <div className="file-name">
                ✓ {resumeFileName}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Self Description */}
          <div className="input-group">
            <label htmlFor="selfDescription">Quick Self-Description</label>
            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              maxLength={5000}
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            ></textarea>
          </div>

          {/* Info Alert */}
          <div className="info-alert">
            <span className="info-icon">ℹ️</span>
            <p>Either a Resume or a Self Description is required to generate a personalized plan.</p>
          </div>
        </section>
      </div>


      {/* Footer Section */}
      <footer className="interview-footer">
        <div className="footer-left">
          <span className="ai-badge">🤖 AI-Powered Strategy Generation</span>
          <span className="time-estimate">• Approx 30s</span>
        </div>
        <button
          onClick={handleGenerateReport}
          className="btn btn-primary">
          ✨ Generate My Interview Strategy
        </button>
      </footer>
      {/* Recent Reports Section */}
      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>Recent Interview Reports</h2>
          <ul className="reports-list">
            {reports.map((report) => (
              <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                <h3>{report.title || "Untitled Report"}</h3>
                {/* <div className="report-title">{report.title || "Untitled Report"}</div> */}
                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--medium' : 'score--low'}`}>
                  Match Score: {report.matchScore}%
                </p>
                <button
                  className="delete-report-btn"
                  onClick={(e) => handleDeleteReport(e, report._id)}
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default Home
