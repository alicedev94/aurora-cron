import { CronJob } from "cron";
import axios from "axios";
// import { io } from "socket.io-client";

// this is very hard 

// const socket = io("http://localhost:3002");

// setInterval(()=> {
//   socket.emit('showLog');
//   console.log('sss');
// }, 1000)

const interval = 1;

// send to api mobile 1min si tengo nuevos tecnicos que encvair 

const job = new CronJob(
  `*/${interval} * * * *`,
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
          status: "start", // replace for dynamic phrase.
        });

        // update frontend-web
        // socket.emit("showLog");
      } else if (response.data?.message === 'Everything up-to-date') {
        // no hacer nada
      } else {
        await axios.post("http://localhost:3001/api/v1/create-log", {
          description: `Failed to create call services`,
          status: "error", // replace for dynamic phrase.
        });

        // update frontend-web
        // socket.emit("showLog");
      }
    } catch (error) {
      console.error("Error making request:", error);
    }
  },
  null,
  true,
  "America/Caracas"
);

// Start job in cron.
job.start();
