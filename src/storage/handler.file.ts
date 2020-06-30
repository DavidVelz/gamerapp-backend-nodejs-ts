import filesys, { promises as fs, rmdir as rm } from 'fs';
import path from 'path';
import del from 'del';
import { env } from '../config/config';

class HandlerFile {

    private checkPath(path: string): boolean {
        return filesys.existsSync(path) ? true : false;
    }

    public async fileUpload(dirPath: string, newPath: string, buffer: Buffer) {
        try {
            const dirExists: Boolean = this.checkPath(dirPath);
            if (dirExists) {
                await fs.writeFile(newPath, buffer);
            } else {
                await filesys.mkdirSync(dirPath);
                fs.writeFile(newPath, buffer);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteFileUpload(currentPath: string, newPath: string, buffer: Buffer) {
        try {
            const existsImg: Boolean = this.checkPath(currentPath);
            if (existsImg) {
                await fs.unlink(currentPath);
                fs.writeFile(newPath, buffer);
            } else {
                await fs.writeFile(newPath, buffer);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async currentPatch(currentPath: string): Promise<string> {
        return path.join(process.cwd(), currentPath);
    }

    public async newPatch(titlePath: string): Promise<string> {
        return path.join(process.cwd(), 'uploads', titlePath);
    }
}
const handlerfile = new HandlerFile();
export default handlerfile;