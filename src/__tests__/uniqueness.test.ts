import pluginTester from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  plugin,
  pluginName: "babel-plugin-react-data-testid-generator - Uniqueness Tests",
  babelOptions: { parserOpts: { plugins: ["jsx"] } },
  snapshot: true,
  tests: [
    {
      title:
        "should generate unique IDs for multiple same elements in one component",
      code: `
        function MultipleButtons() {
          return (
            <div>
              <button>First</button>
              <button>Second</button>
              <button>Third</button>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle deeply nested duplicate elements",
      code: `
        function DeepNesting() {
          return (
            <div>
              <div>
                <div>
                  <span>Deep 1</span>
                  <span>Deep 2</span>
                </div>
                <div>
                  <span>Deep 3</span>
                </div>
              </div>
              <div>
                <span>Top level span</span>
              </div>
            </div>
          );
        }
      `,
    },
    {
      title: "should reset counters between different components",
      code: `
        function FirstComponent() {
          return (
            <div>
              <button>Button 1</button>
              <button>Button 2</button>
            </div>
          );
        }
        
        function SecondComponent() {
          return (
            <div>
              <button>Button A</button>
              <button>Button B</button>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle mixed element types with counters",
      code: `
        function MixedElements() {
          return (
            <div>
              <span>Span 1</span>
              <button>Button 1</button>
              <span>Span 2</span>
              <div>Div 1</div>
              <button>Button 2</button>
              <div>Div 2</div>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle JSX member expressions with counters",
      code: `
        function ModalComponent() {
          return (
            <Modal.Container>
              <Modal.Header>Title</Modal.Header>
              <Modal.Body>Content</Modal.Body>
              <Modal.Header>Second header</Modal.Header>
            </Modal.Container>
          );
        }
      `,
    },
    {
      title: "should handle class components with duplicate elements",
      code: `
        class FormClass extends React.Component {
          render() {
            return (
              <form>
                <input type="text" />
                <input type="email" />
                <input type="password" />
                <div>
                  <input type="submit" />
                </div>
              </form>
            );
          }
        }
      `,
    },
    {
      title: "should handle arrow functions assigned to const with duplicates",
      code: `
        const ListComponent = () => (
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        );
      `,
    },
    {
      title: "should maintain counters across multiple return statements",
      code: `
        function ConditionalForm({ isLoggedIn }) {
          if (isLoggedIn) {
            return (
              <div>
                <button>Logout</button>
                <span>Welcome</span>
              </div>
            );
          }
          
          return (
            <div>
              <button>Login</button>
              <button>Register</button>
              <span>Please sign in</span>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle existing attributes and not override them",
      code: `
        function ExistingAttrs() {
          return (
            <div>
              <button data-testid="keep-this">Button 1</button>
              <button>Button 2</button>
              <button data-testid="keep-this-too">Button 3</button>
            </div>
          );
        }
      `,
    },
    {
      title: "should work with custom attributes and maintain uniqueness",
      code: `
        function CustomAttrsComponent() {
          return (
            <div>
              <button>Test 1</button>
              <button>Test 2</button>
            </div>
          );
        }
      `,
      pluginOptions: { attributes: ["data-cy"] },
    },
  ],
});
