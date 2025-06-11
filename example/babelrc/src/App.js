import React, { useState } from "react";
import { UserCard, ProductCard } from "./components/Cards";
import { Button, IconButton } from "./components/Buttons";
import Modal from "./components/Modal";
import ClassComponent from "./components/ClassComponent";

// Functional Component with hooks
function App() {
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <div className="container">
      <header>
        <h1>🧪 Data TestId Generator Demo</h1>
        <p>
          This app demonstrates automatic data-testid generation for React
          components.
        </p>

        <div className="highlight">
          <strong>Check the DOM inspector!</strong> All elements below have
          automatically generated <code>data-testid</code> attribute.
        </div>
      </header>

      <main>
        <section className="card">
          <h2>Functional Components</h2>
          <div>
            <Button onClick={() => setCounter(counter + 1)}>
              Counter: {counter}
            </Button>
            <IconButton icon="❤️" onClick={() => alert("Liked!")}>
              Like
            </IconButton>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
          </div>
        </section>

        <section className="card">
          <h2>Card Components</h2>
          <UserCard name="John Doe" email="john@example.com" avatar="👨‍💻" />
          <ProductCard
            title="Amazing Widget"
            price="$99.99"
            description="This widget will change your life!"
          />
        </section>

        <section className="card">
          <h2>Plugin Debug Test</h2>
          <SimpleTest />
        </section>

        <section className="card">
          <h2>Class Component</h2>
          <ClassComponent />
        </section>

        <section className="card">
          <h2>Inline JSX</h2>
          <div>
            <span>This is inline JSX</span>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </section>

        <section className="card">
          <h2>Conditional Rendering</h2>
          {counter > 5 && (
            <div>
              <p>Counter is greater than 5!</p>
              <button onClick={() => setCounter(0)}>Reset</button>
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Modal Content</h3>
          <p>This modal also has auto-generated test IDs!</p>
          <div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}

      <footer>
        <div>
          <p>
            🎯 All elements have unique data-testid attributes generated
            automatically!
          </p>
          <small>Powered by babel-plugin-react-data-testid-generator</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
