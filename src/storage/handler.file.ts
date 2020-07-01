import filesys, { promises as fs } from 'fs';
import path from 'path';

class HandlerFile {

    //Comprobar si el archivo o directorio existe
    private checkPath(path: string): boolean {
        return filesys.existsSync(path) ? true : false;
    }

    //Gestionar la subida de un archivo
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

    //Gestionar y remplazar archivos 
    public async updateFileUpload(currentPath: string, newPath: string, buffer: Buffer) {
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

    //Eliminar archivo
    public async deleteFile(currentPath: string):Promise<Boolean> {
        try {            
            const dPath = await this.currentPatch(currentPath);
            const existsImg: Boolean = this.checkPath(dPath);
            if (existsImg) {
                await fs.unlink(dPath); 
                return true;              
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;            
        }
    }

    //Obtener la ruta del archivo actual
    public async currentPatch(currentPath: string): Promise<string> {
        return path.join(process.cwd(), currentPath);
    }

    //Obtener la ruta del archivo nuevo
    public async newPatch(titlePath: string): Promise<string> {
        return path.join(process.cwd(), 'uploads', titlePath);
    }
}
const handlerfile = new HandlerFile();
export default handlerfile;