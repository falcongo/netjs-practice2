import * as fs from 'fs';
import * as path from "path";
import * as multer from "multer";
import { Request } from "express";
import { Error } from "mongoose";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
    try {
        console.log('Create a root uploads folder...');
        fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    } catch (error: unknown) {
        console.log('The folder already exists...');
    }

    try {
        console.log(`Create a ${folder} uploads folder...`);
        fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    } catch (error: unknown) {
        console.log(`The ${folder} folder already exists...`);
    }
};

const storage = (folder: string): multer.StorageEngine => {
    createFolder(folder);
    return multer.diskStorage({
        destination(req: Request, file: Express.Multer.File, callback: (error: (Error | null), pathname: string) => void) {
            const folderName = path.join(__dirname, '..', `uploads/${folder}`);
            callback(null, folderName);
        },
        filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(file.originalname, ext)},${Date.now()}${ext}`;
            callback(null, fileName);
        }
    });
};

export const multerOptions = (folder: string) => {
    const result: MulterOptions = {
        storage: storage(folder)
    };
    return result;
}