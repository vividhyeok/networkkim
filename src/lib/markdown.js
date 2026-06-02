import fs from 'fs';
import path from 'path';

export function getChapterContent(chapterId) {
  const contentDir = path.join(process.cwd(), 'src/content');
  const files = fs.readdirSync(contentDir);
  
  // Find the file that matches the chapterId (e.g. "ch01")
  const targetFile = files.find(file => file.startsWith(chapterId) && file.endsWith('.md'));
  
  if (!targetFile) {
    return null;
  }
  
  const fullPath = path.join(contentDir, targetFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  return fileContents;
}
