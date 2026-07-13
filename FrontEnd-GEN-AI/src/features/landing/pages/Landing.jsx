import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import "../style/landing.scss";



const Landing = () => {
    return (

        <main className="landing-page">

            <Navbar />

            <Hero />

            <DashboardPreview />

            <Features />

            <HowItWorks />

            <CTA />

            <Footer />

        </main>

    );
};

export default Landing;