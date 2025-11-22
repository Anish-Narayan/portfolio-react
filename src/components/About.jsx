// src/components/About.js

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../data/about'; 
import styles from './About.module.css';

// IMPORT YOUR NEW PHOTO HERE
import profileImg from '../assets/profile2.jpg'; // <--- Update this path

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const revealRef = useRef(null);
  const bioRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.to(revealRef.current, {
      scaleX: 0, 
      transformOrigin: 'right',
      duration: 0.8,
      ease: 'power3.inOut',
    }, "-=0.4");

    tl.from(imageRef.current, {
      scale: 1.4,
      duration: 1,
      ease: 'power3.out',
    }, "<");

    tl.from(bioRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, "-=0.5");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="about">
      <div className={styles.bgGrid}></div>

      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.sectionTitle}>
          <span className={styles.hash}>#</span> ABOUT_ME
        </h2>
        
        <div className={styles.aboutContent}>
          
          {/* Left: Image with Tech Frame */}
          <div className={styles.imageWrapper}>
            <div className={styles.frame}>
              <div ref={revealRef} className={styles.revealCover}></div>
              {/* Using the imported image variable */}
              <img 
                ref={imageRef}
                src={profileImg} 
                alt="Profile" 
                className={styles.profilePic}
              />
              <div className={`${styles.corner} ${styles.cornerTL}`}></div>
              <div className={`${styles.corner} ${styles.cornerBR}`}></div>
            </div>
          </div>

          {/* Right: Bio Terminal */}
          <div ref={bioRef} className={styles.bioContainer}>
            <div className={styles.terminalHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <span className={styles.termTitle}>user_bio.txt</span>
            </div>

            <div className={styles.textContent}>
              {Array.isArray(aboutData.bio) ? (
                aboutData.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{aboutData.bio}</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;