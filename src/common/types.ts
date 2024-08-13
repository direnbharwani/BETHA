import { Router } from 'express';
import fs from 'fs'

/* ------------------------------------------------------------------------- */

export type RouteConfig = (router: Router, data: any) => void;

export type AppConfig = {
    route: RouteConfig;
    filename: string;
    fsModule?: typeof fs;
};
