// src/components/Hero/Hero.js

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { aboutData } from '../data/about';
import styles from './Hero.module.css';

// Import your image here
import profileImg from '../assets/profile.jpg'; // Adjust path as needed


const Hero = () => {
  const container = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const imageRef = useRef(null); // New ref for the image

  // Logic Refs
  const typingTimeoutRef = useRef(null);
  const taglineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  const [displayText, setDisplayText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const prefixString = "I am a ";

  // GSAP Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    gsap.set(container.current, { visibility: 'visible' });

    tl.from(container.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
    // Text Animations
    .from(nameRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
    }, '-=0.5')
    .from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, '-=0.6')
    // Image Animation (Pop in from right)
    .from(imageRef.current, {
      x: 50,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=0.8')
    .call(() => {
      setDisplayText(prefixString);
      setStartTyping(true);
    });

  }, { scope: container });

  // Typing Logic (Same as before)
  useEffect(() => {
    if (!startTyping) return;
    const typeLoop = () => {
      const currentTagline = aboutData.taglines[taglineIndexRef.current];
      const isDeleting = isDeletingRef.current;
      const currentLength = charIndexRef.current;
      const currentText = prefixString + currentTagline.substring(0, currentLength);
      setDisplayText(currentText);

      let typeSpeed = 80;
      if (isDeleting) typeSpeed = 40;

      if (!isDeleting && currentLength === currentTagline.length) {
        typeSpeed = 2000;
        isDeletingRef.current = true;
      } else if (isDeleting && currentLength === 0) {
        isDeletingRef.current = false;
        taglineIndexRef.current = (taglineIndexRef.current + 1) % aboutData.taglines.length;
        typeSpeed = 300;
      }

      if (isDeletingRef.current && currentLength > 0) {
        charIndexRef.current = currentLength - 1;
      } else if (!isDeletingRef.current && currentLength < currentTagline.length) {
        charIndexRef.current = currentLength + 1;
      }
      typingTimeoutRef.current = setTimeout(typeLoop, typeSpeed);
    };
    typingTimeoutRef.current = setTimeout(typeLoop, 100);
    return () => clearTimeout(typingTimeoutRef.current);
  }, [startTyping, prefixString]);

  const renderName = () => {
    if (!aboutData.name) return null;
    return aboutData.name.split(' ').map((word, index) => (
      <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}>
        <span className={styles.nameWord} style={{ display: 'inline-block' }}>
          {word}&nbsp;
        </span>
      </span>
    ));
  };

  return (
    <section id="home" ref={container} className={styles.heroSection} style={{ visibility: 'hidden' }}>
      <div className={styles.heroContent}>
        
        {/* Left Side: Text */}
        <div className={styles.textContent}>
          <h1
            ref={nameRef}
            className={`${styles.heroName} ${styles.glitch}`}
            data-text={aboutData.name}
          >
            {renderName()}
          </h1>
          <p ref={taglineRef} className={styles.heroTagline}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </p>
        </div>

        {/* Right Side: Unique Photo Frame */}
        <div ref={imageRef} className={styles.imageContainer}>
          <div className={styles.techFrame}>
            <img 
              src={profileImg} 
              alt={aboutData.name} 
              className={styles.profileImage} 
            />
            {/* Decorative Frame Elements */}
            <div className={styles.cornerAccent}></div>
            <div className={styles.cornerAccentBottom}></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;