import React from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        }
      }
    );
  }, { scope: cardRef });
  
  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -5,
      scale: 1.03,
      boxShadow: '0px 20px 30px rgba(0, 242, 234, 0.2)',
      duration: 0.3
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      duration: 0.3
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={styles.projectCard}
    >
      <img src={project.image} alt={project.title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>My Projects</h2>
        <div className={styles.projectsGrid}>
          {projectsData.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;