import "dotenv/config";

const API = process.env.API;
const PORT = process.env.PORT;

export default class TechniciansMobile {
  constructor(limit) {
    this.limit = limit; // Límite
  }

  startJob() {
    this.job = new CronJob(
      "0 * * * *", // Ejecutar cada 'min' minutos
      async () => {
        try {
          console.log(
            "Iniciando proceso de sincronización de técnicos móviles...",
          );

          const response = await axios.get(
            `${API}:${PORT}/technicians/mobile/sync/${this.limit}`,
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
