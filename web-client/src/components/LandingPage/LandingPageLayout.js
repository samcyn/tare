import React from "react";

const LandingPageLayout = () => (
  <section className="hero is-info is-large">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="red">
              <img
                src="https://bulma.io/images/bulma-type-white.png"
                alt="Logo"
              />
            </a>
            <span className="navbar-burger burger" data-target="navbarMenuHeroB">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navbarMenuHeroB" className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item is-active" href="red">Home</a>
              <a className="navbar-item" href="red">Examples</a>
              <a className="navbar-item" href="red">Documentation</a>
              <span className="navbar-item">
                <a className="button is-info is-inverted" href="red">
                  <span className="icon">
                    <i className="fab fa-github" />
                  </span>
                  <span>Download</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">Title</p>
        <p className="subtitle">Subtitle</p>
      </div>
    </div>

    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            <li className="is-active">
              <a href="red">Overview</a>
            </li>
            <li>
              <a href="red">Modifiers</a>
            </li>
            <li>
              <a href="red">Grid</a>
            </li>
            <li>
              <a href="red">Elements</a>
            </li>
            <li>
              <a href="red">Components</a>
            </li>
            <li>
              <a href="red">Layout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
);


export default LandingPageLayout;