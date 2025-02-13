import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

import { CronJob } from "cron";
import axios from "axios";

export default class TechniciansMobile {
  constructor(limit) {
    this.limit = limit; // Limit
  }

  startJob() {
    this.job = new CronJob(
      "0 * * * *", 
      async () => {
        try {
          console.log(
            "Iniciando proceso de sincronización de técnicos móviles...",
          );

          const response = await axios.get(
            `${API}/technicians/mobile/sync/${this.limit}`,
          );

          console.log(
            "Proceso de sincronización de técnicos móviles finalizado.",
            response.data,
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

