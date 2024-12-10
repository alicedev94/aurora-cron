import { CronJob } from 'cron';
import axios from 'axios';

const interval = 1; 

const job = new CronJob(`*/${interval}  * * * *`, async () => {
  try {
    // start 
    const response = await axios.get('http://localhost:3001/api/v1/calls-services/set-incremental');
    console.log('start');

    // finish
    console.log('Respuesta recibida:', response.data);
    console.log('finish');
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
  }
}, null, true, 'America/Caracas');

// Iniciar el trabajo cron
job.start();

