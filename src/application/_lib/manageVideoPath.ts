import path from "path";
import fs from "fs";
import { ExternalServiceError } from "../../domain/applicationErrors.ts";

const uploadDir = path.join(__dirname, "..", "uploads");

export const manageVideoPath = {
  saveVideo: async (file: Buffer, filename: string): Promise<string> => {
    try {
      const filePath = path.join(uploadDir, filename);
      await fs.promises.writeFile(filePath, file);
      return filePath;
    } catch (error) {
      throw new ExternalServiceError({
        message: `There was an error creating the path: ${error}`,
      });
    }
  },
  deleteVideo: async (imagePath: string) => {
    try {
      await fs.promises.unlink(imagePath);
    } catch (error) {
      throw new ExternalServiceError({
        message: `There was an error while deleting old image: ${error}`,
      });
    }
  },
};
