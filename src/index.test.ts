import pluginTester from "babel-plugin-tester";
import plugin from ".";

pluginTester({
  plugin,
  babelOptions: { parserOpts: { plugins: ["jsx"] } },
  snapshot: true,
  tests: [
    {
      title: "function Component",
      code: `
function Div() {
  return <div />
}

function Nested() {
  return (
    <div>
      hello
      <div>world</div>
    </div>
  )
}
      `,
    },
    {
      title: "arrow function",
      code: `
const Div = () => <div />

const DivBody = () => {
  return <div />
}

const Div2 = () => <Div />
      `,
    },
    {
      title: "with children",
      code: `
const Div = ({ children }) => <div>{children}</div>

function Div2({ children }) {
  return <div>{children}</div>
}
      `,
    },
    {
      title: "class components",
      code: `
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>
  }
}

class NestedClass extends React.Component {
  render() {
    return (
      <div>
        <span>Nested</span>
      </div>
    )
  }
}
      `,
    },
    {
      title: "fragment",
      code: `
import React from 'react'

function Items() {
  return <>
    {items.map((item) => <Item key={item.key} />)}
  </>
}

const Items2 = () => <React.Fragment>hello</React.Fragment>
      `,
    },
    {
      title: "with data-testid",
      code: `
const Div = () => <div data-testid="hello" />
    `,
    },
    {
      title: "export default",
      code: `
export default () => {
  return <div>hello</div>
}
      `,
    },
    {
      title: "jsx spread attribute",
      code: `
const Div = (props) => {
  return <div {...props}>hello</div>
}
      `,
    },
    {
      title: "nested components with unique IDs",
      code: `
const Card = () => {
  return (
    <div>
      <h1>Title</h1>
      <div>
        <button>Click me</button>
        <span>Text</span>
      </div>
    </div>
  )
}
      `,
    },
    {
      title: "JSX member expressions",
      code: `
const Dialog = () => {
  return (
    <Modal.Header>
      <Modal.Title>Hello</Modal.Title>
      <Modal.Body>
        <Button.Primary>Click</Button.Primary>
      </Modal.Body>
    </Modal.Header>
  )
}
      `,
    },
    {
      title: "anonymous function expressions",
      code: `
const obj = {
  render: function() {
    return <div>Anonymous function</div>
  }
}

const Component = function() {
  return <span>Unnamed function</span>
}
      `,
    },
    {
      title: "multiple return statements",
      code: `
const ConditionalComponent = ({ show }) => {
  if (show) {
    return <div>Shown</div>
  }
  return <span>Hidden</span>
}

function EarlyReturn({ error }) {
  if (error) return <div>Error</div>
  
  return (
    <div>
      <p>Success</p>
    </div>
  )
}
      `,
    },
    {
      title: "class without name",
      code: `
export default class extends React.Component {
  render() {
    return <div>Anonymous class</div>
  }
}
      `,
    },
    {
      title: "non-render class methods",
      code: `
class TestClass extends React.Component {
  componentDidMount() {
    return <div>Should not be processed</div>
  }
  
  render() {
    return <div>Should be processed</div>
  }
  
  helperMethod() {
    return <span>Helper method</span>
  }
}
      `,
    },
    {
      title: "complex destructured assignment",
      code: `
const { Component: RenamedComponent } = React;
const [FirstComponent, SecondComponent] = components;

const Wrapper = () => {
  return (
    <div>
      <RenamedComponent />
      <FirstComponent />
    </div>
  )
}
      `,
    },
  ],
});

pluginTester({
  title: "with attributes",
  plugin,
  pluginOptions: {
    attributes: ["data-testid", "data-cy"],
  },
  babelOptions: { parserOpts: { plugins: ["jsx"] } },
  snapshot: true,
  tests: [
    {
      title: "multiple attributes",
      code: `
function Div() {
  return <div />
}
      `,
    },
    {
      title: "with data-cy",
      code: `
const Div = () => <div data-cy="hello" />
    `,
    },
    {
      title: "empty attributes array",
      code: `
const EmptyComponent = () => <div>No attributes</div>
      `,
    },
  ],
});

pluginTester({
  title: "edge cases",
  plugin,
  pluginOptions: {
    attributes: [],
  },
  babelOptions: { parserOpts: { plugins: ["jsx"] } },
  snapshot: true,
  tests: [
    {
      title: "empty attributes configuration",
      code: `
const Div = () => <div />
      `,
    },
    {
      title: "array openingElement path (edge case)",
      code: `
const Div = () => <div />
      `,
    },
    {
      title: "Playwright data-test-id attribute",
      code: `
const PlaywrightButton = () => <button>Click me</button>
      `,
      pluginOptions: {
        attributes: ["data-test-id"],
      },
    },
    {
      title: "multiple testing framework attributes",
      code: `
const MultiFrameworkButton = () => (
  <div>
    <button>Test me</button>
    <input type="text" />
  </div>
)
      `,
      pluginOptions: {
        attributes: ["data-testid", "data-cy", "data-test-id", "data-pw"],
      },
    },
    {
      title: "component with existing attributes should not override",
      code: `
const ExistingComponent = () => (
  <div>
    <button data-testid="existing-id">Keep this ID</button>
    <span>New element</span>
  </div>
)
      `,
    },
    {
      title: "non-JSX return statement",
      code: `
const StringComponent = () => {
  return "just a string"
}

const NumberComponent = () => {
  return 42
}
      `,
    },
    {
      title: "function without identifier (anonymous)",
      code: `
const obj = {
  render: function() {
    return <div>No component name</div>
  },
  arrow: () => <span>Arrow in object</span>
}

// Function expression without name or parent variable declarator
export default function() {
  return <div>Unnamed export</div>
}
      `,
    },
    {
      title: "non-matching attribute name (hasDataAttribute false path)",
      code: `
const ComponentWithMismatch = () => (
  <div data-other="different">
    <span data-wrong="attribute">Test</span>
  </div>
)
      `,
      pluginOptions: {
        attributes: ["data-testid"],
      },
    },
    {
      title: "component with destructured complex assignment",
      code: `
const { render: CustomRender } = {
  render: () => <div>Complex assignment</div>
}

const [FirstComponent] = [() => <span>Array destructured</span>]
      `,
    },
    {
      title: "element with non-JSXIdentifier attribute (coverage line 12)",
      code: `
const TestComponent = () => (
  <div {...{someSpread: true}}>
    <span className="test">Text</span>
  </div>
)
      `,
    },
    {
      title: "arrow function without variable declarator parent",
      code: `
// Arrow function in object property (no VariableDeclarator parent)
const config = {
  component: () => <div>No parent declarator</div>
}

// Arrow function as function argument
someFunction(() => <span>Argument function</span>)

// Arrow function with non-identifier declarator
const [, secondComponent] = [null, () => <div>Array destructured</div>]
      `,
    },
    {
      title: "function expression without identifier",
      code: `
// Function expression assigned to object property
const obj = {
  method: function() {
    return <div>Object method</div>
  }
}

// Function expression as argument
callSomething(function() {
  return <span>Function argument</span>
})
      `,
    },
    {
      title: "component with spread attributes and existing data attrs",
      code: `
const SpreadComponent = (props) => (
  <div {...props} data-existing="keep">
    <button data-testid="existing-button">Keep this</button>
    <span>Add to this</span>
  </div>
)
      `,
      pluginOptions: {
        attributes: ["data-testid"],
      },
    },
  ],
});
