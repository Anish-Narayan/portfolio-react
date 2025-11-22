// src/components/Skills.js

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skills';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const SkillBar = ({ skill }) => {
  const barRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: barRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate the Width
    tl.to(fillRef.current, {
      width: `${skill.level}%`,
      duration: 1.5,
      ease: 'power3.out',
    });

    // Animate the Number Counter
    tl.fromTo(textRef.current, 
      { innerText: 0 },
      {
        innerText: skill.level,
        duration: 1.5,
        ease: 'power3.out',
        snap: { innerText: 1 },
        onUpdate: function() {
          if(this.targets()[0]) {
            this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText) + '%';
          }
        }
      }, 
      "<"
    );
  }, { scope: barRef });

  return (
    <div ref={barRef} className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{skill.name}</span>
        <span ref={textRef} className={styles.skillLevel}>0%</span>
      </div>
      <div className={styles.skillTrack}>
        <div ref={fillRef} className={styles.skillFill}></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    // Stagger the columns entry
    gsap.from(`.${styles.skillCategory}`, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.skillsSection} id="skills">
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionTitle}>
          <span className={styles.hash}>#</span> TECHNICAL_ARSENAL
        </h2>
        
        <div className={styles.skillsGrid}>
          {Object.entries(skillsData).map(([category, skills], index) => (
            <div key={index} className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <div className={styles.terminalDot}></div>
                <h3 className={styles.categoryTitle}>{category}</h3>
              </div>
              <div className={styles.categoryContent}>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;