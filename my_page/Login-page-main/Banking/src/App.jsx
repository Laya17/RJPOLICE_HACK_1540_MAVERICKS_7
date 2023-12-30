/*import styles from './Style'

import React from 'react'

import {
  Navbar,
  Clients,
  CTA,
  Stats,
  Hero,
} from "./components"


const App = () => (

  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
       < Navbar/>
      </div>
    </div>




   
    <div className={`bg-primary ${styles.flexStart}`}>

      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>




    <div className={`bg-primary ${styles.flexStart} ${styles.paddingX}`}>
      <div className={`${styles.boxWidth}`}>
      
        
        <Clients />
        <CTA />
        <Stats />
      </div>
    </div>


  </div>
)


export default App */





import React from "react";

import styles from "./style";
import {Clients, CTA, Navbar, Stats, Hero } from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Clients />
        <CTA />
        <Hero/>
      </div>
    </div>
  </div>
);

export default App;
