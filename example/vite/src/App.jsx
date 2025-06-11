import React, { useState } from "react";
import { UserCard, ProductCard } from "./components/Cards";
import { Button, IconButton } from "./components/Buttons";
import Modal from "./components/Modal";
import ClassComponent from "./components/ClassComponent";
import SimpleTest from "./SimpleTest";
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <div className="app">
      <div className="container">
        <header className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              ⚡ <span className="gradient-text">Data TestId Generator</span>
            </h1>
            <p className="hero-subtitle">
              Automatic test ID generation for React components using Vite + our Babel plugin
            </p>
            
            <div className="highlight-card">
              <div className="highlight-icon">🔍</div>
              <div>
                <strong>Check the DOM inspector!</strong>
                <br />
                All elements have automatically generated <code>data-testid</code> attributes.
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          <section className="demo-section">
            <div className="section-header">
              <h2>Interactive Components</h2>
              <p>Test the counter and modal functionality</p>
            </div>
            <div className="button-group">
              <Button onClick={() => setCounter(counter + 1)}>
                🔢 Counter: {counter}
              </Button>
              <IconButton icon="❤️" onClick={() => alert("Liked!")}>
                Like
              </IconButton>
              <Button onClick={() => setShowModal(true)}>
                🎭 Open Modal
              </Button>
            </div>
          </section>

          <section className="demo-section">
            <div className="section-header">
              <h2>Card Components</h2>
              <p>Beautiful card layouts with generated test IDs</p>
            </div>
            <div className="cards-grid">
              <UserCard name="Jane Smith" email="jane@example.com" avatar="👩‍💻" />
              <ProductCard
                title="Vite Power Tool"
                price="$149.99"
                description="Lightning fast development with Vite!"
              />
            </div>
          </section>

          <section className="demo-section">
            <div className="section-header">
              <h2>Plugin Test</h2>
              <p>Debug and testing components</p>
            </div>
            <div className="test-components">
              <SimpleTest />
              <ClassComponent />
            </div>
          </section>

          <section className="demo-section">
            <div className="section-header">
              <h2>Dynamic Content</h2>
              <p>Inline JSX and conditional rendering</p>
            </div>
            
            <div className="content-grid">
              <div className="content-card">
                <h3>Vite Features</h3>
                <span className="description">What makes Vite awesome</span>
                <ul className="styled-list">
                  <li>⚡ Lightning Fast HMR</li>
                  <li>📦 Optimized Build</li>
                  <li>🔧 Rich Plugin Ecosystem</li>
                </ul>
              </div>

              <div className="content-card">
                <h3>Conditional Content</h3>
                <span className="description">Rendered when counter greater than 3</span>
                {counter > 3 ? (
                  <div className="conditional-content">
                    <p className="success-message">🎉 Counter is greater than 3!</p>
                    <button className="reset-btn" onClick={() => setCounter(0)}>
                      🔄 Reset Counter
                    </button>
                  </div>
                ) : (
                  <p className="info-message">Click the counter button above to see conditional content</p>
                )}
              </div>
            </div>
          </section>
        </main>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h3>⚡ Vite Modal</h3>
            <p>This modal also has auto-generated test IDs!</p>
            <div className="modal-actions">
              <button className="modal-btn primary" onClick={() => setShowModal(false)}>
                ✅ Close Modal
              </button>
            </div>
          </Modal>
        )}

        <footer className="footer">
          <div className="footer-content">
            <p>🎯 <strong>All elements have unique data-testid attributes</strong> generated automatically!</p>
            <small>Powered by babel-plugin-react-data-testid-generator + Vite ⚡</small>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App; 