/**
 * Importing the classes for the synchronization of business partners
 */
import BusinessPartnerJob from "./services/jobs/BUSSINESS_PARTNER/main.job.js";

/**
 * Importing the classes for the synchronization of products
 */
import Products from "./services/jobs/PRODUCTS/main.job.js";
import  ProductsMobile from "./services/jobs/PRODUCTS/mobile.job.js";
import TechniciansMobile from "./services/jobs/TECHNICIANS/main.job.js";

/** *
 * API URL AND PORT
 */

const API = process.env.API;
const PORT = process.env.PORT;

console.log(`API: ${API}:${PORT}`);

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

const syncProducts = new Products(productsInterval, productsLimit);
syncProducts.startJob();

/**
 * Configuration for product synchronization
 * Execution interval: 5 minutes
 * Limit of elements to synchronize: 1000
 */
const productsMobileLimit = 1000;
const productsMobileInterval = 5; // Interval in minutes

const syncProductsWithAppMobile = new ProductsMobile(productsMobileInterval, productsMobileLimit);
syncProductsWithAppMobile.startJob();


/** 
 * Configuration for technician synchronization
 * Execution interval: 1 hour (60 minutes)
 * Limit of elements to synchronize: 1000
 */
const techniciansMobileLimit = 1000;
const syncTechniciansMobile = new TechniciansMobile(techniciansMobileLimit);
syncTechniciansMobile.startJob();

