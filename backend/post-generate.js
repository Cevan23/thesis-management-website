const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '../frontend/src/api');

function addCredentialsInclude(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(
    /(externalLoginPost: async .*?{ method: 'POST', .*?};)/s,
    `$1
    localVarRequestOptions.withCredentials = true;`
  );
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}

fs.readdir(apiDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(apiDir, file);
    if (file.endsWith('.ts')) {
      addCredentialsInclude(filePath);
    }
  });
});
