import { Share2, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="landing-footer">

      <div className="footer-left">

        <h2>InterviewAI</h2>

        <p>
          © 2026 InterviewAI. All rights reserved. Powered by Advanced AI.
        </p>

      </div>

      <div className="footer-center">

       
        <a href="#">Terms of Service</a>
        <a href="https://www.linkedin.com/in/ayushrajput2060" target="_blank" rel="noopener noreferrer">
          Contact Support
        </a>
        {/* <a href="#">Careers</a> */}

      </div>

      <div className="footer-right">

        <button>
          <Share2 size={18} />
        </button>

              <button
                  onClick={() =>
                      window.open(
                          "https://www.linkedin.com/in/ayushrajput2060",
                          "_blank"
                      )
                  }
              >
          <MessageSquare size={18} />
        </button>

      </div>

    </footer>
  );
};

export default Footer;