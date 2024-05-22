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
      language={language}
      style={dracula}
    >
    {children}
    </SyntaxHighlighter>
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
            language={extractLanguage(attributes.class)}
          >{getCombinedChildren(children)}</CodeBlock>
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
const MarkdownParser = ({content}:{content: string}) => {
  return (markdownToReactNode(content));
};

export default MarkdownParser;
