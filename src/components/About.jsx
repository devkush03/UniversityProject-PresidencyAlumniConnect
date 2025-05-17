import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../assets/uploads/logo.png"
import { baseUrl } from '../utils/globalurl';
import aboutMH from "../assets/uploads/aboutMH.jpg";

const About = () => {
  const [system, setSystem] = useState([]);


  useEffect(() => {
    // axios.get('http://localhost:3000/auth/settings')
    axios.get(`${baseUrl}auth/settings`)
      .then((res) => {
        setSystem(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
 <header className="masthead" style={{ backgroundImage: `url(${aboutMH})` }}>
  <div className="container">
    {/* <div className="row align-items-center justify-content-center">
      <div className="col-lg-6 text-center">
        <img src={logo} className='aboutlogo img-fluid' alt="logo" />
      </div>
    </div> */}
    <div className="row mt-5  h-100 align-items-center justify-content-center text-center">
      <div className="col-lg-10 align-self-end mb-4" style={{ background: "#0000003e", borderRadius: "10px", padding: "20px" }}>
        <h3 className="text-uppercase text-white font-weight-light"><u>About Us</u></h3>
        <hr className="divider my-4" />
        <p className="text-white-75 text-light mb-5 font-weight-bold text-uppercase"><h1>Presidency University</h1></p>
      </div>
    </div>
  </div>
</header>

      {system.length > 0 && (
        <section className="page-section">
          <div className="container">
            <h2 className='text-center'>{system[0].name}</h2>
            <br />
            <p dangerouslySetInnerHTML={{ __html: system[0].about_content }}></p>
          </div>
        </section>
      )}
    </>
  )
}

export default About;
