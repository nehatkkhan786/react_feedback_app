import { Link } from "react-router-dom";

function AboutPage(){
    return (
        <>
        <div className="card">
            <div className="about">
                <h1>About This Project</h1>
                <p>This is a React App to leave feedback for a product or service</p>
                <p>Version: 1.0.0 </p>
            </div>
                <p>
                    <Link to="/" >Back To Home</Link>
                </p>
        </div>
        </>
    );
}

export default AboutPage;