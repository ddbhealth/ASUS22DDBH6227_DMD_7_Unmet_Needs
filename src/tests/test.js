import fs from 'fs';
import path from 'path';


const getFolders = (dirname) =>{
  return fs.readdirSync(dirname)
  .filter(function(file) {
      return fs.statSync(path.join(dirname, file)).isDirectory();
  });
}

let emailPath = `./dist/${getFolders('./dist/')[0]}/index.html`,
    email = fs.readFileSync(emailPath, 'utf8');


test('Use Html entities', () => {
  expect(email).not.toMatch(/©|®|≥|≤|™|½|–|—|•|†|‡|§|‖|¶/);
});

/*
These check < and >, to do: Loop inside email/components, not the build
test('Less than symbol as HTML entity', () => {
  expect("email content").not.toMatch(/((?:^|>)[^<]*?)>/);
});

test('Greater than symbol as HTML entity', () => {
  expect("email content").not.toMatch(/((?:^|>)[^<]*?)>/);
});
*/
