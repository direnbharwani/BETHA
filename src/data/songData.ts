import fs from 'fs';
import path from 'path';

/* ------------------------------------------------------------------------- */

const jsonFilePath = path.join(__dirname, 'data.json');
// Load JSON into memory
let songData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

/* ------------------------------------------------------------------------- */

export default songData;
