import aiImg from "../../../assets/images/ai-img.png";

const steps = [
  {
    number: "01",
    title: "Upload Resume",
    description:
      "Upload your latest resume and the job description of your target role.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our AI compares your profile against the job requirements and identifies strengths and gaps.",
  },
  {
    number: "03",
    title: "Prepare",
    description:
      "Receive a personalized interview roadmap with technical and HR questions.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-section">

      <div className="how-left">

        <h2>How HireForge AI Works</h2>

        {steps.map((step) => (
          <div className="step" key={step.number}>

            <div className="step-number">
              {step.number}
            </div>

            <div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>

          </div>
        ))}

      </div>

      <div className="how-right">

        <img
          src={aiImg}
          alt="AI Illustration"
        />

      </div>

    </section>
  );
};

export default HowItWorks;