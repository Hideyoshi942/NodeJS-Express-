"use strict";

// lv0
const dev = () => ({
  app: {
    port: process.env.DEV_APP_PORT,
  },
  db: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME,
  },
});

// lv1
const prod = () => ({
  app: {
    port: process.env.PROD_APP_PORT,
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    name: process.env.PROD_DB_NAME,
  },
});

// lv2

const config = { dev, prod };

export default function getConfig() {
  const env = process.env.NODE_ENV || "dev";
  return config[env]();
}
