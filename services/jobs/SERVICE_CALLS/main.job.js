import "dotenv/config";

const API = process.env.API;

import { CronJob } from "cron";
import axios from "axios";

export default class ServiceCall {
  constructor(min, limit) {
    this.min = min; // Intervalo en minutos
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      `*/${this.min} * * * *`, // Ejecutar cada 'min' minutos
      async () => {
        try {
          console.log("Iniciando proceso de seleccion de de llamadas de serivicio...");

          const response = await axios.get(
            `${API}/service-calls/sap/sync`,
          );

          console.log("Proceso de sincronización de llamadas finalizado.", response.data);
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
