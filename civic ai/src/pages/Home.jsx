import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <section className="hero">

        <h1>Civic AI</h1>

        <h2>
          AI-Powered Civic Complaint Management Platform
        </h2>

        <p>
          Report civic issues in seconds, track their
          resolution in real time, and ensure every
          complaint reaches the correct government
          department through intelligent routing.
        </p>

        <div className="button-group">

          <button onClick={() => navigate("/report")}>
            Report Issue
          </button>

          <button onClick={() => navigate("/track")}>
            Track Complaint
          </button>

          <button onClick={() => navigate("/officerlogin")}>
            Officer Login
          </button>

        </div>

      </section>

      <section className="problem-section">

        <h2>Challenges in Civic Complaint Management</h2>

        <div className="cards">

          <div className="card">
            <h3>❌ Incorrect Routing</h3>
            <p>
              Complaints are often sent to the wrong department.
            </p>
          </div>

          <div className="card">
            <h3>❌ Lack of Transparency</h3>
            <p>
              Citizens cannot easily track complaint progress.
            </p>
          </div>

          <div className="card">
            <h3>❌ Duplicate Reports</h3>
            <p>
              The same issue is reported multiple times.
            </p>
          </div>

          <div className="card">
            <h3>❌ Delayed Resolution</h3>
            <p>
              Issues remain unresolved due to workflow delays.
            </p>
          </div>

        </div>

      </section>

      <section className="about-section">

        <h2>Why Civic AI?</h2>

        <p>
          Citizens frequently struggle to identify the
          correct authority for civic issues and often
          receive little visibility into complaint status.
        </p>

        <p>
          Civic AI simplifies the process through smart
          categorization, department routing, and real-time
          progress tracking.
        </p>

      </section>

      <section className="feature-section">

        <h2>How It Works</h2>

        <div className="cards">

          <div className="card">
            <h3>📸 Report Issue</h3>
            <p>
              Submit issue details, location, and supporting evidence.
            </p>
          </div>

          <div className="card">
            <h3>🤖 AI Categorization</h3>
            <p>
              Automatically identifies complaint category.
            </p>
          </div>

          <div className="card">
            <h3>🏢 Department Routing</h3>
            <p>
              Routes complaints to the responsible authority.
            </p>
          </div>

          <div className="card">
            <h3>📊 Real-Time Tracking</h3>
            <p>
              Citizens monitor complaint progress instantly.
            </p>
          </div>

        </div>

      </section>

      <section className="stats">

        <h2>Platform Impact</h2>

        <div className="cards">

          <div className="card">
            <h1>50+</h1>
            <p>Complaints Reported</p>
          </div>

          <div className="card">
            <h1>5</h1>
            <p>Departments Connected</p>
          </div>

          <div className="card">
            <h1>80%</h1>
            <p>Successful Routing</p>
          </div>

        </div>

      </section>

      <section className="cta-section">

        <h2>Help Build a Smarter City</h2>

        <p>
          Report civic issues, support faster resolutions,
          and improve public services through technology.
        </p>

        <button onClick={() => navigate("/report")}>
          Report an Issue
        </button>

      </section>

      <footer className="footer">

        <h3>Civic AI</h3>

        <p>
          AI-Powered Civic Complaint Management System
        </p>

        <p>
          Built for transparent, efficient, and citizen-friendly governance.
        </p>

        <p>
          © 2026 Civic AI. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;