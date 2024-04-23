import React from 'react';
import classes from './Home.module.css'; // Make sure to create an appropriate CSS file for styles
import Logo from "./logo-2.png";

function App() {
  return (
    <div className={classes["App"]}>
      <header className={classes["App-header"]}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/practice">Practice</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className={classes["App-main"]}>
        <section className={classes["Hero"]}>
        <figure>
          <img alt="logo" src={Logo}/>
        </figure>
          <h1>CODESYNC</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
          <button className={classes["JoinButton"]}>Join Room</button>
        </section>
        {/* <figure>
          <img alt="logo" src={Logo}/>
        </figure> */}
      </main>
    </div>
  );
}

export default App;
