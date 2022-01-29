import React from 'react';
import { Link } from 'react-router-dom';

function FooterComponent() {
  return (
      <>
        <div className="footer-basic border-top">
        <footer>
            <div className="social">
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
            </div>
            <ul className="list-inline">
                <li className="list-inline-item"><Link to="/">Home</Link></li>
                <li className="list-inline-item"><Link to="/services">Services</Link></li>
                <li className="list-inline-item"><Link to="/about">About</Link></li>
                <li className="list-inline-item"><Link to="/terms">Terms</Link></li>
                <li className="list-inline-item"><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
            <p className="copyright">Brand © 2022</p>
        </footer>
    </div>
      </>
  );
}

export default FooterComponent;
