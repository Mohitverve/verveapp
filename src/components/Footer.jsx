import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/footer.css'; // Import the CSS file

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle smooth scroll or navigation
  const handleNavigation = (path, hash = '') => {
    if (location.pathname === path && hash) {
        // If already on the same page, scroll to the element with a smooth scroll
        const element = document.getElementById(hash.slice(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Navigate to the new page
        navigate(path + hash);
        // After navigating, scroll to top or specific section after a short delay
        setTimeout(() => {
            if (hash) {
                const element = document.getElementById(hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo(0, 0); // Scroll to top
            }
        }, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          {/* Home: Navigate to the top of the Home page */}
          <Link to="/Home" onClick={() => handleNavigation('/Home')} className="footer-link">Home</Link>

          {/* Services: Navigate to the Plans page */}
          <Link to="/Plans" onClick={() => handleNavigation('/Plans')} className="footer-link">Services</Link>

          {/* Contact: Navigate to the contact section of the Home page */}
          <Link 
            to="/Home#contact-container" 
            onClick={() => handleNavigation('/Home', '#contact-container')} 
            className="footer-link"
          >
            Contact
          </Link>
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="footer-social-icon" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
