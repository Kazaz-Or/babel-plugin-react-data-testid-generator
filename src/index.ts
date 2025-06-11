import * as t from "@babel/types";
import { NodePath, PluginObj } from "@babel/core";

const DEFAULT_DATA_TESTID = "data-testid";

interface PluginOptions {
  attributes?: string[];
}

interface PluginState {
  opts?: PluginOptions;
}

const componentCounters = new Map<string, Map<string, number>>();

function createDataAttribute(name: string, attributeName: string) {
  return t.jsxAttribute(t.jsxIdentifier(attributeName), t.stringLiteral(name));
}

function hasDataAttribute(
  node: t.JSXOpeningElement,
  attributeName: string
): boolean {
  return node.attributes.some(
    (attribute) =>
      t.isJSXAttribute(attribute) &&
      t.isJSXIdentifier(attribute.name, { name: attributeName })
  );
}

function getElementName(node: t.JSXOpeningElement): string {
  if (t.isJSXIdentifier(node.name)) {
    return node.name.name;
  } else if (t.isJSXMemberExpression(node.name)) {
    return t.isJSXIdentifier(node.name.property) ? node.name.property.name : "";
  }
  return "";
}

function getUniqueElementId(
  componentName: string,
  elementName: string
): string {
  if (!componentCounters.has(componentName)) {
    componentCounters.set(componentName, new Map());
  }

  const elementCounters = componentCounters.get(componentName)!;

  const currentCount = elementCounters.get(elementName) || 0;
  const nextCount = currentCount + 1;
  elementCounters.set(elementName, nextCount);

  if (nextCount === 1) {
    return elementName;
  } else {
    return `${elementName}${nextCount}`;
  }
}

function addDataTestIds(
  jsxElement: NodePath<t.JSXElement>,
  componentName: string,
  attributes: string[]
) {
  const openingElement = jsxElement.get("openingElement");
  const elementName = getElementName(openingElement.node);

  if (!elementName) return;

  const uniqueElementId = getUniqueElementId(componentName, elementName);
  const testId = `${componentName}.${uniqueElementId}`;

  for (const attribute of attributes) {
    if (!hasDataAttribute(openingElement.node, attribute)) {
      const dataAttribute = createDataAttribute(testId, attribute);
      openingElement.node.attributes.unshift(dataAttribute);
    }
  }
}

function getComponentName(path: NodePath): string | null {
  const node = path.node;

  if (t.isFunctionDeclaration(node) && node.id && t.isIdentifier(node.id)) {
    return node.id.name;
  }

  if (path.isArrowFunctionExpression() || path.isFunctionExpression()) {
    const parent = path.parentPath;
    if (
      parent &&
      parent.isVariableDeclarator() &&
      t.isIdentifier(parent.node.id)
    ) {
      return parent.node.id.name;
    }
  }

  return null;
}

function processJSXElements(
  path: NodePath,
  componentName: string,
  attributes: string[]
) {
  componentCounters.set(componentName, new Map());

  path.traverse({
    JSXElement(jsxPath: NodePath<t.JSXElement>) {
      addDataTestIds(jsxPath, componentName, attributes);
    },
  });
}

export default function (): PluginObj<PluginState> {
  return {
    name: "babel-plugin-react-data-testid-generator",
    visitor: {
      FunctionDeclaration(
        path: NodePath<t.FunctionDeclaration>,
        state: PluginState
      ) {
        const componentName = getComponentName(path);
        if (!componentName) return;

        const attributes = state.opts?.attributes ?? [DEFAULT_DATA_TESTID];
        processJSXElements(path, componentName, attributes);
      },

      FunctionExpression(
        path: NodePath<t.FunctionExpression>,
        state: PluginState
      ) {
        const componentName = getComponentName(path);
        if (!componentName) return;

        const attributes = state.opts?.attributes ?? [DEFAULT_DATA_TESTID];
        processJSXElements(path, componentName, attributes);
      },

      ArrowFunctionExpression(
        path: NodePath<t.ArrowFunctionExpression>,
        state: PluginState
      ) {
        const componentName = getComponentName(path);
        if (!componentName) return;

        const attributes = state.opts?.attributes ?? [DEFAULT_DATA_TESTID];
        processJSXElements(path, componentName, attributes);
      },

      ClassMethod(path: NodePath<t.ClassMethod>, state: PluginState) {
        const node = path.node;

        if (
          t.isIdentifier(node.key) &&
          node.key.name === "render" &&
          path.parentPath &&
          path.parentPath.isClassBody()
        ) {
          let className = "Component";

          const classPath = path.parentPath.parentPath;
          if (
            classPath &&
            classPath.isClassDeclaration() &&
            classPath.node.id
          ) {
            className = classPath.node.id.name;
          }

          const attributes = state.opts?.attributes ?? [DEFAULT_DATA_TESTID];
          processJSXElements(path, className, attributes);
        }
      },
    },
  };
}
