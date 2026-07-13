import dashboardImage from "../../../assets/images/dashboard-preview.png";

const DashboardPreview = () => {
  return (
    <section className="dashboard-preview">

      <div className="dashboard-container">

        <img
          src={dashboardImage}
          alt="Interview Dashboard"
        />

      </div>

    </section>
  );
};

export default DashboardPreview;