import React, { createRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { gsap } from 'gsap';

// Layout & Global Components
import Layout from './components/Layout';
import Navbar from './components/Navbar';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

// Route Configuration with Refs for CSSTransition
const routes = [
  { path: '/', name: 'Home', Component: HomePage, nodeRef: createRef(null) },
  { path: '/about', name: 'About', Component: AboutPage, nodeRef: createRef(null) },
  { path: '/experience', name: 'Experience', Component: ExperiencePage, nodeRef: createRef(null) },
  { path: '/skills', name: 'Skills', Component: SkillsPage, nodeRef: createRef(null) },
  { path: '/contact', name: 'Contact', Component: ContactPage, nodeRef: createRef(null) },
];

const App = () => {
  const location = useLocation();

  // --- GSAP PAGE TRANSITIONS ---
  
  const onEnter = (node) => {
    gsap.killTweensOf(node);
    // Slide Up + Fade In + Remove Blur
    gsap.fromTo(node, 
      { 
        y: 50, 
        autoAlpha: 0, 
        scale: 0.98,
        filter: 'blur(10px)'
      },
      {
        duration: 0.6,
        y: 0,
        autoAlpha: 1,
        scale: 1,
        filter: 'blur(0px)',
        ease: 'power3.out',
        delay: 0.1, 
      }
    );
  };

  const onExit = (node) => {
    gsap.killTweensOf(node);
    // Slide Up + Fade Out + Add Blur
    gsap.to(node, {
      duration: 0.4,
      y: -50,
      autoAlpha: 0,
      scale: 0.98,
      filter: 'blur(5px)',
      ease: 'power2.in',
    });
  };

  const currentRoute = routes.find((route) => route.path === location.pathname) || routes[0];

  return (
    <>
      <Navbar />
      <Layout>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            nodeRef={currentRoute.nodeRef}
            timeout={600}
            onEnter={onEnter}
            onExit={onExit}
            mountOnEnter
            unmountOnExit
          >
            {/* The container class matches index.css settings */}
            <div ref={currentRoute.nodeRef} className="page-transition-container">
              <Routes location={location}>
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    </>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;