import path from "path";
import fs from "fs";
import { ExternalServiceError } from "../../domain/applicationErrors.ts";

const uploadDir = path.join(__dirname, "..", "uploads");

export const managePath = {
  save: async (file: Buffer, filename: string): Promise<string> => {
    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, file);
    return filePath;
  },
  delete: async (imagePath: string) => {
    try {
      await fs.promises.unlink(imagePath);
    } catch (error) {
      throw new ExternalServiceError({
        message: `There was an error while deleting old image: ${error}`,
      });
    }
  },
};
