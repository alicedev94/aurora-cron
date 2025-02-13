/**
 * Importing the classes for the synchronization of business partners
 */
import BusinessPartnerJob from "./services/jobs/BUSSINESS_PARTNER/main.job.js";

/**
 * Importing the classes for the synchronization of products
 */
import Products from "./services/jobs/PRODUCTS/main.job.js";
import ProductsMobile from "./services/jobs/PRODUCTS/mobile.job.js";
import TechniciansMobile from "./services/jobs/TECHNICIANS/main.job.js";

// Call Services
import ServiceCall from "./services/jobs/SERVICE_CALLS/main.job.js";
import ServiceCallMobile from "./services/jobs/SERVICE_CALLS/mobile.job.js";
import ServiceCallServer from "./services/jobs/SERVICE_CALLS/server.job.js";

// Tabulator
import Tabulator from "./services/jobs/TABULATOR/main.job.js";
import TabulatorMobile from "./services/jobs/TABULATOR/mobile.job.js";

/** *
 * API URL AND PORT
 */

const API = process.env.API;
const PORT = process.env.PORT;

console.log(`API: ${API}`);

/**
 * Configuration for business partner synchronization
 * Execution interval: 1 hour (60 minutes)
 * Limit of elements to synchronize: 1000
 */
const businessPartnerLimit = 1000;
const businessPartnerInterval = 60; // Interval in minutes for 1 hour

const syncBusinessPartner = new BusinessPartnerJob(businessPartnerInterval, businessPartnerLimit);
syncBusinessPartner.startJob();

/**
 * Configuration for product synchronization
 * Execution interval: 3 minutes
 * Limit of elements to synchronize: 1000
 */
const productsLimit = 1000;
const productsInterval = 3; // Interval in minutes

// const syncProducts = new Products(productsInterval, productsLimit);
// syncProducts.startJob();

/**
 * Configuration for product synchronization
 * Execution interval: 5 minutes
 * Limit of elements to synchronize: 1000
 */
const productsMobileLimit = 1000;
const productsMobileInterval = 120; // Interval in minutes

const syncProductsWithAppMobile = new ProductsMobile(productsMobileInterval, productsMobileLimit);
syncProductsWithAppMobile.startJob();

/**
 * Configuration for service call syncronization
 */
const serviceCallLimit = 300;  // Does not work, ilustrative
const serviceCallInterval = 10; // Interval in minutes

const serviceCallMobileLimit = 350;  // Does not work, ilustrative
const serviceCallMobileInterval = 6; // Interval in minutes

const serviceCallServerLimit = 350;  // Does not work, ilustrative
const serviceCallServerInterval = 10; // Interval in minutes

const techniciansMobileLimit = 1000;
const getNewServiceCalls = new ServiceCall(serviceCallInterval,serviceCallLimit)

async function startJobs() {
  try {
    getNewServiceCalls.startJob();
  } catch (error) {
    console.error('Error in getNewServiceCalls:', error);
  }

  try {
    const syncTechniciansMobile = new TechniciansMobile(techniciansMobileLimit);
    syncTechniciansMobile.startJob();
  } catch (error) {
    console.error('Error in syncTechniciansMobile:', error);
  }

  try {
    const sendNewServiceCalls = new ServiceCallMobile(serviceCallMobileLimit, serviceCallMobileInterval);
    sendNewServiceCalls.startJob();
  } catch (error) {
    console.error('Error in sendNewServiceCalls:', error);
  }

  try {
    const getUpdatedServiceCalls = new ServiceCallServer(serviceCallServerLimit, serviceCallServerInterval);
    getUpdatedServiceCalls.startJob();
  } catch (error) {
    console.error('Error in getUpdatedServiceCalls:', error);
  }
}

startJobs().catch(console.error);

/**
 * Configuration for tabulator
 */
const TabulatorLimit = 100
const TabulatorMobileLimit = 100

const getTabulator = new Tabulator(TabulatorLimit)
getTabulator.startJob();

const sendMobileTabulator = new TabulatorMobile(TabulatorMobileLimit)
sendMobileTabulator.startJob();




