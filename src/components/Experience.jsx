// src/components/Experience.js

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/experience';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ data }) => {
  const cardRef = useRef(null);
  const isCurrent = data.highlight; // Check the boolean flag

  // Hover animation logic
  const onEnter = () => {
    // If it's already the current job, we want a subtle effect, 
    // otherwise we do the standard hover
    gsap.to(cardRef.current, {
      x: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderColor: 'var(--glitch-cyan)', 
      boxShadow: '0 10px 30px -10px rgba(0, 229, 255, 0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const onLeave = () => {
    // Return to base state (Active state keeps its specific border)
    gsap.to(cardRef.current, {
      x: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
      // If current, keep the active border, otherwise reset to transparent/dim
      borderColor: isCurrent ? 'var(--glitch-cyan)' : 'var(--border-color)',
      boxShadow: isCurrent ? '0 0 15px rgba(0, 229, 255, 0.05)' : 'none',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      ref={cardRef} 
      // Conditionally add the 'activeCard' class
      className={`${styles.card} ${isCurrent ? styles.activeCard : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.role}>{data.role}</h3>
          <span className={styles.company}>@ {data.company}</span>
        </div>
        
        <div className={styles.headerRight}>
          {/* Show a status badge if this is the current job */}
          {isCurrent && (
            <div className={styles.statusBadge}>
              <span className={styles.pulseDot}></span>
              STATUS: ACTIVE
            </div>
          )}
          <span className={styles.duration}>{data.duration}</span>
        </div>
      </div>

      <ul className={styles.pointsList}>
        {data.description.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <div className={styles.tags}>
        <span className={styles.tagLabel}>Tech Stack:</span>
        {data.tools.map((tool, i) => (
          <span key={i} className={styles.tag}>{tool}</span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    tl.from(listRef.current.children, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, "-=0.3");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.experienceSection} id="experience">
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionTitle}>
          <span className={styles.hash}>#</span> EXPERIENCE_LOG
        </h2>
        
        <div ref={listRef} className={styles.listContainer}>
          {experienceData.map((item, index) => (
            <ExperienceCard key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;