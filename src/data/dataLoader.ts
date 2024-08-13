import fs from 'fs';
import path from 'path';

/* ------------------------------------------------------------------------- */

/**
 * Dependency to load
 * @param fsModule
 * @returns
 */
export const dataLoader = (fsModule: typeof fs = fs, fileName: string) => {
    const dataPath = path.join(__dirname, fileName);
    const data = fsModule.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};


