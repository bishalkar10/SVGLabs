export function formatSvg(svgString: string): string {
  try {
      // 1. Parse string to DOM
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      
      const errorNode = doc.querySelector("parsererror");
      if (errorNode) throw new Error("Invalid SVG");

      // 2. Recursive pretty print
      return prettyPrint(doc.documentElement, 0);
  } catch (e) {
      console.error("Formatting failed", e);
      return svgString; // Fail gracefuly
  }
}

function prettyPrint(node: Element, level: number): string {
  const indent = "  ".repeat(level);
  const tagName = node.tagName;
  
  // Format attributes
  let attrs = "";
  if (node.hasAttributes()) {
      const attrList = Array.from(node.attributes);
      if (attrList.length > 2) {
           // Multiline attributes for clarity if many
           attrs = "\n" + attrList.map(a => `${indent}  ${a.name}="${a.value}"`).join("\n");
      } else {
           // Inline for few
           attrs = " " + attrList.map(a => `${a.name}="${a.value}"`).join(" ");
      }
  }

  // Self closing if no children and no text
  if (node.childNodes.length === 0) {
      return `${indent}<${tagName}${attrs} />`;
  }

  let content = "";
  const children = Array.from(node.childNodes);
  
  let hasElementChildren = false;

  children.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
          hasElementChildren = true;
          content += "\n" + prettyPrint(child as Element, level + 1);
      } else if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent?.trim();
          if (text) content += text;
      }
  });

  if (hasElementChildren) {
      return `${indent}<${tagName}${attrs}>${content}\n${indent}</${tagName}>`;
  } else {
      // Text only content, keep on same line
      return `${indent}<${tagName}${attrs}>${content}</${tagName}>`;
  }
}
