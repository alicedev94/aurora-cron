/**
 * Importing the classes for the synchronization of business partners, products, service calls, and tabulators
 */
import BusinessPartnerJob from "./services/jobs/BUSSINESS_PARTNER/main.job.js";
import Products from "./services/jobs/PRODUCTS/main.job.js";
import ProductsMobile from "./services/jobs/PRODUCTS/mobile.job.js";
import TechniciansMobile from "./services/jobs/TECHNICIANS/main.job.js";
import ServiceCall from "./services/jobs/SERVICE_CALLS/main.job.js";
import ServiceCallMobile from "./services/jobs/SERVICE_CALLS/mobile.job.js";
import ServiceCallServer from "./services/jobs/SERVICE_CALLS/server.job.js";
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
 */
const businessPartnerLimit = 1000;
const businessPartnerInterval = 60; // Interval in minutes for 1 hour

const syncBusinessPartner = new BusinessPartnerJob(
  businessPartnerInterval,
  businessPartnerLimit
);
syncBusinessPartner.startJob();

/**
 * Configuration for product synchronization
 */
const productsLimit = 1000;
const productsInterval = 3; // Interval in minutes

const syncProducts = new Products(productsInterval, productsLimit);
syncProducts.startJob();

const productsMobileLimit = 1000;
const productsMobileInterval = 120; // Interval in minutes

const syncProductsWithAppMobile = new ProductsMobile(
  productsMobileInterval,
  productsMobileLimit
);
syncProductsWithAppMobile.startJob();

/**
 * Configuration for service call synchronization
 */
async function startServiceCallJobs() {
  const serviceCallIntervalMinutes = 10;
  const serviceCallLimit = 300;

  const serviceCallMobileIntervalMinutes = 6;
  const serviceCallMobileLimit = 350;

  const serviceCallServerIntervalMinutes = 10;
  const serviceCallServerLimit = 350;

  const techniciansMobileLimit = 1000;

  try {
    const getNewServiceCalls = new ServiceCall(
      serviceCallIntervalMinutes,
      serviceCallLimit
    );
    getNewServiceCalls.startJob();
  } catch (error) {
    console.error("Error in getNewServiceCalls:", error);
  }

  try {
    const syncTechniciansMobile = new TechniciansMobile(techniciansMobileLimit);
    syncTechniciansMobile.startJob();
  } catch (error) {
    console.error("Error in syncTechniciansMobile:", error);
  }

  try {
    const sendNewServiceCalls = new ServiceCallMobile(
      serviceCallMobileIntervalMinutes,
      serviceCallMobileLimit
    );
    sendNewServiceCalls.startJob();
  } catch (error) {
    console.error("Error in sendNewServiceCalls:", error);
  }

  try {
    const getUpdatedServiceCalls = new ServiceCallServer(
      serviceCallServerIntervalMinutes,
      serviceCallServerLimit
    );
    getUpdatedServiceCalls.startJob();
  } catch (error) {
    console.error("Error in getUpdatedServiceCalls:", error);
  }
}
startServiceCallJobs().catch(console.error);

/**
 * Configuration for tabulator
 */
const TabulatorLimit = 100;
const TabulatorMobileLimit = 100;

const getTabulator = new Tabulator(TabulatorLimit);
getTabulator.startJob();

const sendMobileTabulator = new TabulatorMobile(TabulatorMobileLimit);
sendMobileTabulator.startJob();
