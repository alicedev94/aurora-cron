import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

import { CronJob } from "cron";
import axios from "axios";

export default class BusinessPartnerJob {
  constructor(limit) {
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      "0 * * * *", // Ejecutar cada hora en el minuto 0
      async () => {
        try {
          console.log(
            "Iniciando proceso de sincronización de socios de negocio...",
          );

          const response = await axios.get(
            `${API}:${PORT}/business-partners/sync/${this.limit}`,
          );

          if (response.data?.insert_this) {
            const businessPartnersAdded = response.data.insert_this.join(", ");
            console.log(
              `Business partners successfully created: ${businessPartnersAdded}`,
            );
          } else if (response.data?.message === "Everything up-to-date") {
            console.log(
              "No hay nuevos socios de negocio para sincronizar. Todo está actualizado.",
            );
          }
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
