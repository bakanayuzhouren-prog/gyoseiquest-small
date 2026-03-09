const fs = require('fs');

function checkLength(file) {
  const s = fs.readFileSync(file, 'utf8');
  const st = s.indexOf('"行政法総論": [');
  if (st === -1) return "Not found";

  // Simple way to count {} pairs in the array
  const en = s.indexOf('"行政手続法": [', st);
  const sub = s.substring(st, en);
  const count = sub.split('"text"').length - 1;
  return count;
}

console.log('src/questions.js count:', checkLength('src/questions.js'));
console.log('src/questions.js.backup count:', checkLength('src/questions.js.backup'));
console.log('src/questions.js.backup_ai count:', checkLength('src/questions.js.backup_ai'));