// src/components/Contact.js

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  const [buttonState, setButtonState] = useState('idle'); // idle, sending, success

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    // 1. Animate Contact Info (Left)
    tl.from(infoRef.current.children, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // 2. Animate Form Inputs (Right)
    tl.from(formRef.current.children, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=0.6");

  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonState('sending');

    // Simulate Network Request
    setTimeout(() => {
      setButtonState('success');
      // Reset after 3 seconds
      setTimeout(() => setButtonState('idle'), 3000);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className={styles.contactSection} id="contact">
      <div className={styles.bgGrid}></div>
      
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <span className={styles.hash}>#</span> INITIATE_UPLINK
        </h2>

        <div className={styles.contentWrapper}>
          
          {/* Left Side: Contact Info */}
          <div ref={infoRef} className={styles.contactInfo}>
            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>Transmission Coordinates</h3>
              <p className={styles.infoText}>
                Available for freelance contracts and collaborative research operations.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.icon}>@</span>
                <a href="mailto:your.email@example.com" className={styles.link}>your.email@example.com</a>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.icon}>📍</span>
                <span>Tech City, Digital Realm</span>
              </div>
            </div>

            {/* Social Links Placeholder */}
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}>GITHUB</a>
              <a href="#" className={styles.socialLink}>LINKEDIN</a>
              <a href="#" className={styles.socialLink}>TWITTER</a>
            </div>
          </div>

          {/* Right Side: Form */}
          <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>User_ID</label>
              <input type="text" id="name" required className={styles.input} placeholder="Enter Name" />
              <div className={styles.inputLine}></div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Comms_Link</label>
              <input type="email" id="email" required className={styles.input} placeholder="Enter Email" />
              <div className={styles.inputLine}></div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Data_Packet</label>
              <textarea id="message" rows="5" required className={styles.textarea} placeholder="Type your message protocol..."></textarea>
              <div className={styles.inputLine}></div>
            </div>

            <button 
              type="submit" 
              className={`${styles.submitButton} ${styles[buttonState]}`}
              disabled={buttonState !== 'idle'}
            >
              <span className={styles.btnText}>
                {buttonState === 'idle' && 'TRANSMIT DATA'}
                {buttonState === 'sending' && 'UPLOADING...'}
                {buttonState === 'success' && 'TRANSMISSION COMPLETE'}
              </span>
              <div className={styles.btnGlitch}></div>
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;