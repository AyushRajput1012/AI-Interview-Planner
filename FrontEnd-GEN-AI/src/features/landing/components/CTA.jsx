import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="cta-section">

      <div className="cta-container">

        <h2>Ready to Secure Your Dream Job?</h2>

        <p>
          Join thousands of candidates using AI to prepare smarter,
          faster, and more effectively.
        </p>

        <Link to="/register" className="cta-btn">
          Start Your Strategy Now
        </Link>

      </div>

    </section>
  );
};

export default CTA;