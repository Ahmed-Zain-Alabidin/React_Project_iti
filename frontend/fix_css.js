const fs = require('fs');
function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\.[a-zA-Z0-9]+/g, (match) => toKebab(match));
  fs.writeFileSync(file.replace('.module.css', '.css'), content);
  fs.unlinkSync(file); // remove old module
}
fixFile('./src/Pages/Home.module.css');
fixFile('./src/Pages/Auth.module.css');
