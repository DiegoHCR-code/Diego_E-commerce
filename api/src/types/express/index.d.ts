import type { File as MulterFile } from "multer";

declare global {
  namespace Express {
    interface Request {
      file?: MulterFile;       // para upload único
      files?: MulterFile[];     // ou múltiplos uploads
    }
  }
}

export {};