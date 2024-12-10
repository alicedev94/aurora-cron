import { CronJob } from "cron";
import axios from "axios";

const interval = 1;

const job = new CronJob(
  `*/${interval}  * * * *`,
  async () => {
    try {
      // start
      const response = await axios.get(
        "http://localhost:3001/api/v1/calls-services/set-incremental"
      );

      if (response.data?.insert_this) {
        const callServicesAdded = response.data.insert_this.join(", ");
        await axios.post("http://localhost:3001/api/v1/create-log", {
          description: `Call services successfully created: ${callServicesAdded}`,
          status: "start", // remplace for dynamic phrase.
        });

        // update frontend-web
        // socket.emit("showLog");
      } else {
        await axios.post("http://localhost:3001/api/v1/create-log", {
          description: `Failed to create call services`,
          status: "error", // remplace for dynamic phrase.
        });

        // update frontend-web
        // socket.emit("showLog");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  },
  null,
  true,
  "America/Caracas"
);

// Iniciar el trabajo cron
job.start();
