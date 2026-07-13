import { Link } from "react-router";
import { useNavigate } from "react-router"
import{ useAuth } from "../../auth/hooks/useAuth"




const Hero = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const handleStart = () => {

        if (user) {

            navigate("/dashboard");

        }

        else {

            navigate("/register");

        }

    }

  return (
    <section className="hero-section">

      <div className="hero-badge">
        AI Powered Career Intelligence
      </div>

      <h1 className="hero-title">
        Land Your Dream Job with{" "}
        <span>AI-Driven</span>
        <br />
        Interview Plans
      </h1>

      <p className="hero-description">
        Our AI analyzes job requirements and your unique profile
        to build a winning interview strategy tailored specifically
        for you.
      </p>

          <button className="hero-btn" 
          onClick={handleStart}>
              Get Started For Free
          </button>

    </section>
  );
};

export default Hero;