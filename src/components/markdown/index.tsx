"use client";
import { getDomTreeFromMarkdown } from "markdown-parser-html";
import React, { ReactNode, createElement, Fragment, HTMLAttributes } from "react";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Highlight from "../ui/highlight";
import { DOMTree } from "markdown-parser-html/dist/htmlTokenizer";

const CodeBlock = ({ children, language }: any) => {
  return (
    <SyntaxHighlighter
      // {...rest}
      PreTag="div"
      children={children}
      language={language}
      style={dracula}
    />
  );
};

type CustomComponents = {
  [tag: string]: React.ComponentType<any>;
};

const markdownToReactNode = (
  markdown: string,
  customComponents: CustomComponents = {
    i: Highlight
  }
): ReactNode => {

      const dom = getDomTreeFromMarkdown(markdown)
  const transformNode = (node: DOMTree): ReactNode => {
    // debugger;

    if (node.tagType === "TEXT") {
      return node.content;
    }

      const { tag, attributes, children } = node as DOMTree;
      if (tag === "img") {
        return createElement(
          "div",
          { className: "w-3/4 h-[100px] relative" },
          createElement(Image, {
            ...(attributes as any),
            key: Math.random(),
            fill: true,
            src: "/" + attributes.src,
            objectFit: "contain",
          })
        );
      }
      if (tag === "code") {
        const extractLanguage = (input: string) => {
          if (!input) return "";
          const prefix = "language-";
          if (input.startsWith(prefix)) {
            return input.slice(prefix.length);
          }
          return input;
        };
        const getCombinedChildren = (children:DOMTree[]) =>{
          return children.reduce((acc:string, item:DOMTree) => {
            if(item.tagType === "TEXT") {
              acc += item.content
              return acc;
            }else {
              const parsedChildren = getCombinedChildren(item.children)
              const stringifiedAttribute = Object.entries(item.attributes).reduce((parsedAttribute, curr) => {
                parsedAttribute+= `${curr[0]}=${curr[1]} `
                return parsedAttribute
              },'')
              acc += `<${item.tag} ${stringifiedAttribute}>${parsedChildren}</${item.tag}>`;
            }
            return acc
            
          }, '')
        }
        return (
          <CodeBlock
            {...attributes}
            children={getCombinedChildren(children)}
            language={extractLanguage(attributes.class)}
          />
        );
      }
      const CustomComponent = customComponents[tag];

      const childNodes = children.map(transformNode);

      if (CustomComponent) {
        return createElement(
          CustomComponent,
          { ...attributes, key: Math.random() },
          childNodes
        );
      } else {
        return createElement(
          tag,
          { ...attributes, key: Math.random() },
          childNodes
        );
    }

  };
  return <>{dom.map(transformNode)}</>;
};
const content =
  '_State_ of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders. It is always recommended to make our state as simple as possible and minimize the number of stateful components.\n\n    ![state](images/state.jpg)\n\n    Let\'s take an example of **User** component with `message` state. Here, **useState** hook has been used to add state to the User component and it returns an array with current state and function to update it.\n\n    ```jsx harmony\n    import { useState } from "react";\n\n    function User() {\n      const [message, setMessage] = useState("Welcome to React world");\n\n      return (\n        <div>\n          <h1>{message}</h1>\n        </div>\n      );\n    }\n    ```\n\n    Whenever React calls your component or access `useState` hook, it gives you a snapshot of the state for that particular render.\n\n    <details><summary><b>See Class</b></summary>\n    <p>\n\n    ```jsx harmony\n    import React from \'react\';\n    class User extends React.Component {\n      constructor(props) {\n        super(props);\n\n        this.state = {\n          message: "Welcome to React world",\n        };\n      }\n\n      render() {\n        return (\n          <div>\n            <h1>{this.state.message}</h1>\n          </div>\n        );\n      }\n    }\n    ```\n\n    </p>\n    </details>\n\n    State is similar to props, but it is private and fully controlled by the component ,i.e., it is not accessible to any other component till the owner component decides to pass it.';
const MarkdownParser = () => {
  return (markdownToReactNode(content));
};

export default MarkdownParser;
