import axios from "axios";
import { CronJob } from "cron";

const interval = 1; // Intervalo en minutos
const baseURL = process.env.BASE_URL;

// Proceso existente
const syncCallService = new CronJob(
  `*/${interval} * * * *`,
  async () => {
    try {
      console.log(
        "Iniciando proceso de sincronización de llamadas de servicio..."
      );

      const response = await axios.get(
        `${baseURL}/api/v1/calls-services/set-incremental`
      );
      if (response.data?.insert_this) {
        const callServicesAdded = response.data.insert_this.join(", ");
        await axios.post(`${baseURL}/api/v1/create-log`, {
          description: `Call services successfully created: ${callServicesAdded}`,
          status: "start",
        });
        console.log(`Call services successfully created: ${callServicesAdded}`);
      } else if (response.data?.message === "Everything up-to-date") {
        console.log(
          "No hay nuevos servicios de llamadas para sincronizar. Todo está actualizado."
        );
      } else {
        await axios.post(`${baseURL}/api/v1/create-log`, {
          description: `Failed to create call services`,
          status: "error",
        });
        console.log("Error al crear servicios de llamadas.");
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  },
  null,
  true,
  "America/Caracas"
);

// Nuevo proceso
const sendCallServiceToMobile = new CronJob(
  `*/${interval} * * * *`,
  async () => {
    try {
      console.log(
        "Iniciando proceso de envío de llamadas de servicio móvil..."
      );

      const response = await axios.get(
        `${baseURL}/api/v1/calls-services/mobile-send-service-calls`
      );

      await axios.post(`${baseURL}/api/v1/create-log`, {
        description: `Mobile service call executed successfully.`,
        status: "info",
      });
      console.log("Mobile service call executed successfully.");
    } catch (error) {
      await axios.post(`${baseURL}/api/v1/create-log`, {
        description: `Failed to execute mobile service call: ${error.message}`,
        status: "error",
      });
      console.error("Error making request:", error);
    }
  },
  null,
  true,
  "America/Caracas"
);

// Iniciar ambos jobs
syncCallService.start();
sendCallServiceToMobile.start();
