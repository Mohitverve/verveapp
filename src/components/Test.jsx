import React, { useState } from 'react';
import '../styles/test.css';
import AppHeader from './Header';

const Test = () => {
    const [expanded, setExpanded] = useState(false);

    return (
       
       <div>
         <AppHeader/>
        <div className="developer-landing">
           
          
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title"> Improve  Unit Tests with Verve</h1>
                            <p className="hero-description">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.</p>

                            <form action="#" method="POST" className="search-form">
                                <div className="search-input-wrapper">
                                    <div className="search-icon">
                                        <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input type="text" name="" id="" placeholder="Try Java Developer, React Dev etc." className="search-input" />
                                </div>
                                <button type="submit" className="search-button">Find A Developer</button>
                            </form>

                           
                        </div>

                        <div className="hero-image">
                            <img className="illustration" src="/api/placeholder/400/400" alt="Hero Illustration" />
                        </div>
                    </div>
                </div>
            </section>

            <svg width="0" height="0">
                <defs>
                    <linearGradient id="star-gradient" x1="3.07813" y1="3.8833" x2="23.0483" y2="6.90161" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--color-cyan-500)" />
                        <stop offset="100%" stopColor="var(--color-purple-500)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        </div>
    );
}

export default Test;