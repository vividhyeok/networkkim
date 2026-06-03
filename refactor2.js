const fs = require('fs');
const path = require('path');
const dir = 'src/components/slides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Slides.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <div style={s.grid2}>
  content = content.replace(/<div style=\{s\.grid2\}>/g, '<div className="grid-1-to-2" style={s.grid2}>');
  // Replace <div style={s.grid3}>
  content = content.replace(/<div style=\{s\.grid3\}>/g, '<div className="grid-1-to-3" style={s.grid3}>');
  
  // For Ch03 inline grids with gap: "1rem"
  content = content.replace(/<div style=\{\{\s*display:\s*"grid",\s*gridTemplateColumns:\s*"1fr 1fr",\s*gap:\s*"1rem"(.*?)\}\}>/g, '<div className="grid-1-to-2" style={{ gap: "1rem" }}>');

  fs.writeFileSync(filePath, content);
});
console.log('Done refactoring remaining grids');
