// src/components/Developers.jsx
import React from 'react';
import devMH from "../assets/uploads/devMH.jpg";

const developers = [
  {
    name: "Kushal",
    role: "Full Stack Developer",
    email: "habilekush.336@gmail.com",
    linkedin: "https://linkedin.com/in/kushal",
    image: "src/assets/img/devKushal.jpg", // Add path to image
  },
  {
    name: "Harsha Vardhan",
    role: "Full Stack Developer",
    email: "hydrocurd@gmail.com",
    linkedin: "https://linkedin.com/in/teammate2",
    image: "src/assets/img/devHarsha.jpg", // Add path to image
  },
  {
    name: "Ramya Kundar",
    role: "UI/UX Designer",
    email: "ramyakundar@gmail.com",
    linkedin: "https://linkedin.com/in/teammate2",
    image: "src/assets/img/devRamya.jpg", // Add path to image
  },
  {
    name: "Gowthami",
    role: "Database Architect",
    email: "gowthami@gmail.com",
    linkedin: "https://linkedin.com/in/teammate2",
    image: "src/assets/img/devGowthami.png", // Add path to image
  },
];

const Developers = () => {
  return (
    <div className="developers-page">
      <header className="masthead" style={{ backgroundImage: `url(${devMH})` }}>
        <div className="container-fluid h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-8 align-self-end mb-4 page-title">
                    <h2 className="text-white">Meet The Developers</h2>
                    <hr className="divider my-5" />
                </div>
            </div>
        </div>
      </header>
      <div className="dev-section">
        <div className="dev-cards">
          {developers.map((dev, index) => (
            <div key={index} className="dev-card">
            <img src={dev.image} alt={dev.name} className="dev-photo" />
            <h3>{dev.name}</h3>
            <p><i>{dev.role}</i></p>
            <p><a href={`mailto:${dev.email}`}>{dev.email}</a></p>
            <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          ))}
        </div>
      /</div>
    </div>
  );
};

export default Developers;
