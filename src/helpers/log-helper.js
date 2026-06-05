import 'dotenv/config';
import fs from 'fs';

class LogHelper {
  // Lee config de .env una sola vez al arrancar
  constructor() {
    this.filePath           = process.env.LOG_FILE_PATH;
    this.fileName           = process.env.LOG_FILE_NAME;
    this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase()    === 'true';
    this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
  }

  /**
   * Este método almacena en un archivo de texto y/o muestra por consola información del Error.
   * @param {*} errorObject
   */
  logError = (errorObject) => {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${errorObject.message}\n${errorObject.stack}\n`;

    // Vuelca al destino configurado
    if (this.logToConsoleEnabled) {
      console.error(entry);
    }

    if (this.logToFileEnabled) {
      try {
        // Crea el directorio si todavía no existe
        if (!fs.existsSync(this.filePath)) {
          fs.mkdirSync(this.filePath, { recursive: true });
        }
        fs.appendFileSync(`${this.filePath}${this.fileName}`, entry, 'utf8'); // append, nunca sobreescribe
      } catch (fsError) {
        console.error('LogHelper: failed to write to log file.', fsError.message);
      }
    }
  }
}

// Singleton — una sola instancia para toda la app
export default new LogHelper(); 
