const fs = require('fs');
const htmlparser = require('node-html-parser');
const { downloadFile, genId, gDriveParse, gDocUrl, isSelfOrdered } = require('../utils');

const GDOC_ID = '17xkdiEkCjV-4bRoLg5FgXGxlPDX1NPLCZjWIasnFaeY';

async function scrap() {
  const index = await downloadFile(GDOC_ID);
  const rootNode = htmlparser.parse(index);
  const tabs = rootNode.querySelectorAll('table');
  const catalog = {
    src: gDocUrl(GDOC_ID),
    id: genId('Rathcaps'),
    name: 'Rathcaps',
    instagram: 'https://www.instagram.com/rathcaps/',
    website: '',
    selfOrder: isSelfOrdered(index),
    sculpts: [],
  };
  return gDriveParse(catalog, tabs);
}

if (require.main === module) {
  scrap().then((catalog) => {
    fs.writeFileSync('rathcaps.json', JSON.stringify(catalog));
  });
}

module.exports = {
  scrap,
};
