import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

export default class ProductsMobile {
  constructor(min, limit) {
    this.min = min; // Intervalo en minutos
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      `*/${this.min} * * * *`, // Ejecutar cada 'min' minutos
      async () => {
        try {
          console.log(
            "Iniciando proceso de sincronización de productos móviles...",
          );

          const response = await axios.get(
            `${API}:${PORT}/products/mobile/sync/${this.limit}`,
          );

          console.log(
            "Proceso de sincronización de productos móviles finalizado.",
            response.data);
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
