import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Computer Applications (BCA)</h4>
                <h5>Tilak Maharashtra Vidyapeeth, Pune | Vikas College of Art, Commerce & Science</h5>
              </div>
              <h3>2022 - 2025</h3>
            </div>
            <p>
              Graduated with 7.40 CGPA. Built a strong foundation in computer science principles, database-driven applications, and software development methodologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Python Programming Training</h4>
                <h5>RST Forum</h5>
              </div>
              <h3>Nov 2024</h3>
            </div>
            <p>
              Completed comprehensive Python course covering fundamentals, OOP, file handling, and real-world project development. Gained hands-on experience building backend applications and automation scripts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary Certificate (HSC)</h4>
                <h5>Maharashtra State Board | Vikas High School Jr. College</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Completed higher secondary education with a focus on science and mathematics. Achieved 60%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
