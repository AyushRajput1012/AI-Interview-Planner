import React, { useState, useEffect } from 'react';
import "../style/interview.scss"
import { Menu, X, Home, LogOut } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useInterview } from "../hooks/useInterview.js"
import { useNavigate, useParams } from "react-router"

const Interview = () => {
  // Sample data - will come from API/State layer
  const [activeSection, setActiveSection] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true);
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId])

  // console.log("Full Report:", report);
  // console.log("AI Response:", report?.aiResponse);
  // console.log("Skill Gaps:", report?.aiResponse?.skillGaps);


  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }


  const menuItems = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' }
  ]

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index)
  }

  const logoutUser = async () => {

    const success = await handleLogout();

    if (success) {

      navigate("/");

    }

  }

  const renderMainContent = () => {
    switch (activeSection) {
      case 'technical':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Technical Questions</h2>
              <span className="question-count">{report.aiResponse.technicalQuestions.length} questions</span>
            </div>
            <div className="questions-list">
              {report.aiResponse.technicalQuestions.map((question, idx) => (
                <div key={idx} className={`question-card ${expandedQuestion === idx ? 'expanded' : ''}`}>
                  <div className="question-header" onClick={() => toggleQuestion(idx)}>
                    <div className="question-number">Q{idx + 1}</div>
                    <p className="question-text">
                      {question.question}
                    </p>
                    <div className="expand-icon">▼</div>
                  </div>
                  {expandedQuestion === idx && (
                    <div className="question-answer">
                      <h4>Why this question?</h4>
                      <p>{question.intention}</p>

                      <h4>How to answer</h4>
                      <p>{question.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'behavioral':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Behavioral Questions</h2>
              <span className="question-count">{report.aiResponse.behavioralQuestions.length} questions</span>
            </div>
            <div className="questions-list">
              {report.aiResponse.behavioralQuestions.map((question, idx) => (
                <div key={idx} className={`question-card ${expandedQuestion === idx ? 'expanded' : ''}`}>
                  <div className="question-header" onClick={() => toggleQuestion(idx)}>
                    <div className="question-number">Q{idx + 1}</div>
                    <p className="question-text">
                      {question.question}
                    </p>
                    <div className="expand-icon">▼</div>
                  </div>
                  {expandedQuestion === idx && (
                    <div className="question-answer">
                      <h4>Why this question?</h4>
                      <p>{question.intention}</p>

                      <h4>How to answer</h4>
                      <p>{question.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'roadmap':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Preparation Road Map</h2>
              <span className="question-count">{report.aiResponse.preparationPlan.length} days</span>
            </div>
            <div className="roadmap-list">
              {report.aiResponse.preparationPlan.map((plan, idx) => (
                <div key={idx} className="roadmap-card">

                  <div className="day-badge">
                    Day {plan.day}
                  </div>

                  <h3>{plan.focus}</h3>

                  <ul>
                    {plan.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <header className="interview-navbar">

        <div className="navbar-left">

          <button
            className="menu-toggle"
            onClick={() => setShowSidebar(!showSidebar)}
          >

            {showSidebar ? <X size={22} /> : <Menu size={22} />}

          </button>

          <div>
            <h2>HireForge AI</h2>
            <small>{report.aiResponse.title}</small>
          </div>

        </div>

        <div className="navbar-right">

          <button
            className="home-btn"
            onClick={() => navigate("/dashboard")}
          >

            <Home size={18} strokeWidth={2.2} />

            <span>Home</span>

          </button>

          <button
            className="log-btn"
            onClick={logoutUser}
          >

            <LogOut size={18} strokeWidth={2.2} />

            <span>Logout</span>

          </button>

        </div>

      </header>

      <main
        className={`interview-page ${showSidebar ? "sidebar-open" : "sidebar-closed"
          }`}
      >
        {/* Left Sidebar - Navigation */}
        {showSidebar && (
          <aside
            className={`sidebar left-sidebar ${showSidebar ? "show" : "hide"}`}
          >
            <div className="sidebar-header">
              <h3>SECTIONS</h3>
            </div>
            <nav className="sidebar-menu">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="menu-label">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="download-btn-container">
              <button
                onClick={() => getResumePdf(interviewId)}
                className=" button primary-button">
                Download  Resume
              </button>
            </div>
          </aside>
        )}

        {/* Center - Main Content */}
        <section className="main-content">
          {/* Dynamic Content */}
          {renderMainContent()}
        </section>

        {/* Right Sidebar - Match Score & Skill Gaps */}
        <aside className="sidebar right-sidebar">
          {/* Match Score Section */}
          <div className="score-section">
            <div className="score-header-label">MATCH SCORE</div>
            <div className="score-badge">
              <div className="score-circle">
                <div className="score-value">{report.matchScore}</div>
              </div>
            </div>
            <p className="score-text">Strong match for this role</p>
          </div>

          {/* Skill Gaps Section */}
          <div className="skills-section">
            <div className="skills-header">
              <h3>SKILL GAPS</h3>
            </div>
            <div className="skills-container">
              {report.aiResponse.skillGaps.map((skill, idx) => (

                <div key={idx} className="skill-badge">
                  <strong>{skill.skill}</strong>
                  <br />
                  {skill.severity}
                </div>

              ))}
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}

export default Interview
