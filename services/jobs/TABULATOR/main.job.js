import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

import { CronJob } from "cron";
import axios from "axios";

export default class Tabulator {
  constructor(limit) {
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      "0 0 * * *", // Ejecutar cada hora en el minuto 0
      async () => {
        try {
          console.log(
            "Iniciando proceso de sincronización de tabuladores...",
          );

          const response = await axios.get(
            `${API}/tabulator/sync/${this.limit}`,
          );

   
          console.log(
            "Proceso de sincronización de tabuladores.", response.data,
          );
        } catch (error) {
          console.error("Error making request:", error);
        }
      },
      null,
      true,
      "America/Caracas",
    );

    this.job.start();
  }
}
