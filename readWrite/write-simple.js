const fs = require('fs');
fs.writeFile('target.txt', 'This text to write in target file!!', function(err) {
  if (err) {
    throw err;
  }
  console.log("File Saved!")
})
