import fs from 'fs';
import path from 'path';

/* ------------------------------------------------------------------------- */

/**
 * Function to load data based on the given filename.
 * @param fsModule the
 * @param fileName name of the json file
 * @returns JSON object of the loaded file
 */
export const dataLoader = (fsModule: typeof fs = fs, fileName: string) => {
    const dataPath = path.join(__dirname, fileName);
    const data = fsModule.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};


