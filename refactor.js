const fs = require('fs');
const path = require('path');
const dir = 'src/components/slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Slides.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace grid2 definition
  content = content.replace(/grid2:\s*\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr 1fr",\s*gap:\s*"1.5rem",\s*marginTop:\s*"1rem"\s*\}/g, 'grid2: { marginTop: "1rem" }');
  
  // Replace <div style={s.grid2}> with <div className="grid-1-to-2" style={s.grid2}>
  content = content.replace(/<div style=\{s\.grid2\}>/g, '<div className="grid-1-to-2" style={s.grid2}>');
  
  // Replace <div style={{ display: "flex", gap: "1.5rem" }}>
  content = content.replace(/<div style=\{\{\s*display:\s*"flex",\s*gap:\s*"1.5rem"\s*\}\}>/g, '<div className="flex-col-to-row" style={{}}>');
  content = content.replace(/<div style=\{\{\s*display:\s*"flex",\s*gap:\s*"2rem"\s*\}\}>/g, '<div className="flex-col-to-row" style={{}}>');
  
  // Replace <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
  content = content.replace(/<div style=\{\{\s*display:\s*"flex",\s*gap:\s*"2rem",\s*alignItems:\s*"flex-start"\s*\}\}>/g, '<div className="flex-col-to-row" style={{ alignItems: "flex-start" }}>');
  
  // Replace <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
  content = content.replace(/<div style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr 1fr",\s*gap:\s*"1.5rem"\s*\}\}>/g, '<div className="grid-1-to-2" style={{}}>');

  fs.writeFileSync(filePath, content);
});
console.log('Done refactoring grids and flexes');
