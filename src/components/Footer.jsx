import React, { memo } from "react";
import "./comps.css";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer--content">
        <div className="footer--copyright">
          <h2>{currentYear} © Invoicify</h2>
        </div>
        <div className="footer--links">
          <a 
            href="https://github.com/mehmetemrekayacan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/mehmet-emre-kayacan-5a4556254/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:emremehmet32@hotmail.com"
            className="footer-link"
          >
            Contact
          </a>
        </div>
        <div className="footer--credit">
          <h2>Designed & Developed by Mehmet Emre</h2>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
