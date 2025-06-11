import pluginTester from "babel-plugin-tester";
import plugin from "../index";

pluginTester({
  plugin,
  pluginName: "babel-plugin-react-data-testid-generator - Edge Cases",
  babelOptions: { parserOpts: { plugins: ["jsx"] } },
  snapshot: true,
  tests: [
    {
      title: "should handle components with no JSX elements",
      code: `
        function TextOnlyComponent() {
          return "Just text";
        }
        
        const NumberComponent = () => 42;
        
        function NullComponent() {
          return null;
        }
      `,
    },
    {
      title: "should handle mixed JSX and non-JSX returns",
      code: `
        function MixedReturns({ condition }) {
          if (condition === 'text') {
            return "Just text";
          }
          if (condition === 'number') {
            return 123;
          }
          return <div>JSX content</div>;
        }
      `,
    },
    {
      title: "should handle self-closing elements",
      code: `
        function SelfClosingElements() {
          return (
            <div>
              <img src="test.jpg" />
              <br />
              <input type="text" />
              <hr />
              <img src="test2.jpg" />
            </div>
          );
        }
      `,
    },
    {
      title: "should handle elements with complex children",
      code: `
        function ComplexChildren() {
          return (
            <div>
              <span>
                Text content
                <strong>Bold text</strong>
                More text
              </span>
              <div>
                {items.map(item => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle elements with spread props",
      code: `
        function SpreadProps(props) {
          const buttonProps = { onClick: () => {}, disabled: false };
          return (
            <div>
              <button {...buttonProps}>Button 1</button>
              <span {...props}>Span with spread</span>
              <button {...buttonProps} type="submit">Button 2</button>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle elements with multiple existing data attributes",
      code: `
        function MultipleDataAttrs() {
          return (
            <div>
              <button 
                data-testid="existing-button"
                data-cy="cypress-button"
                data-custom="custom-value"
              >
                Button with existing attrs
              </button>
              <span data-other="different-attr">
                Span with different attr
              </span>
              <div>New element</div>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle very deeply nested structures",
      code: `
        function VeryDeepNesting() {
          return (
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <span>Very deep span</span>
                      <button>Very deep button</button>
                    </div>
                    <span>Level 4 span</span>
                  </div>
                  <button>Level 3 button</button>
                </div>
                <div>
                  <span>Level 2 span</span>
                </div>
              </div>
              <span>Top level span</span>
            </div>
          );
        }
      `,
    },
    {
      title: "should handle anonymous export with class",
      code: `
        export default class extends Component {
          render() {
            return (
              <div>
                <h1>Anonymous class</h1>
                <button>Click me</button>
              </div>
            );
          }
        }
      `,
    },
    {
      title: "should handle empty attributes array configuration",
      code: `
        function NoAttributesComponent() {
          return (
            <div>
              <button>Should not get attributes</button>
              <span>Neither should this</span>
            </div>
          );
        }
      `,
      pluginOptions: { attributes: [] },
    },
    {
      title: "should handle fragments and React.Fragment",
      code: `
        function FragmentComponent() {
          return (
            <>
              <div>In fragment</div>
              <React.Fragment>
                <span>In React.Fragment</span>
                <button>Fragment button</button>
              </React.Fragment>
            </>
          );
        }
      `,
    },
  ],
});
