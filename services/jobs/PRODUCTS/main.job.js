import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

import { CronJob } from "cron";
import axios from "axios";

export default class Products {
  constructor(min, limit) {
    this.min = min; // Intervalo en minutos
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      `*/${this.min} * * * *`, // Ejecutar cada 'min' minutos
      async () => {
        try {
          console.log("Iniciando proceso de sincronización de productos...");

          const response = await axios.get(
            `${API}:${PORT}/products/sync/${this.limit}`,
          );

          if (response.data?.insert_this) {
            const productsAdded = response.data.insert_this.join(", ");
            console.log(`Products successfully created: ${productsAdded}`);
          } else if (response.data?.message === "Everything up-to-date") {
            console.log(
              "No hay nuevos productos para sincronizar. Todo está actualizado.",
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
