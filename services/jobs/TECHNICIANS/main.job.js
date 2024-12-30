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

          if (response.data?.insert_this) {
            const techniciansAdded = response.data.insert_this.join(", ");
            console.log(
              `Technicians successfully created: ${techniciansAdded}`,
            );
          } else if (response.data?.message === "Everything up-to-date") {
            console.log(
              "No hay nuevos técnicos móviles para sincronizar. Todo está actualizado.",
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
