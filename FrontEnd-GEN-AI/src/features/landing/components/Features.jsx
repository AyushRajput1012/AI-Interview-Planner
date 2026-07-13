const featureData = [
  {
    icon: "🤖",
    title: "AI Job Analysis",
    description:
      "Analyze any job description to identify required skills, technologies and expectations.",
  },
  {
    icon: "📄",
    title: "Resume Tailoring",
    description:
      "Receive AI suggestions to improve your resume and align it with the selected job.",
  },
  {
    icon: "🎯",
    title: "Winning Strategy",
    description:
      "Get personalized technical questions, HR questions and a preparation roadmap.",
  },
];

const Features = () => {
  return (
    <section id="features" className="features-section">

      <h2>Empower Your Preparation</h2>

      <p className="features-subtitle">
        Built for precision. Designed for success.
      </p>

      <div className="features-grid">

        {featureData.map((feature) => (
          <div className="feature-card" key={feature.title}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;