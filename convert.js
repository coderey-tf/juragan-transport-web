const fs = require('fs');

let html = fs.readFileSync('../downloads/html/beranda.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log("No body found");
  process.exit(1);
}
let bodyHtml = bodyMatch[1];

// Convert class to className
bodyHtml = bodyHtml.replace(/class=/g, 'className=');

// Convert attributes for SVG
bodyHtml = bodyHtml.replace(/preserveaspectratio/g, 'preserveAspectRatio');
bodyHtml = bodyHtml.replace(/viewbox/g, 'viewBox');
bodyHtml = bodyHtml.replace(/fill-rule/g, 'fillRule');
bodyHtml = bodyHtml.replace(/clip-rule/g, 'clipRule');

// Fix closing tags for img and input
bodyHtml = bodyHtml.replace(/<img([^>]*[^/])>/g, '<img$1 />');
bodyHtml = bodyHtml.replace(/<input([^>]*[^/])>/g, '<input$1 />');

// Convert HTML comments to JSX comments
bodyHtml = bodyHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Convert inline styles if any (none exist in beranda.html outside of <style>)
// The script block inside tailwind is in head. 

const jsx = `export default function Home() {
  return (
    <>
${bodyHtml}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', jsx);
console.log('Conversion done.');
