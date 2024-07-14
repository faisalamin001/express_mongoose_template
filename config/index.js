const convict = require("convict");
convict.addFormat(require("convict-format-with-validator").ipaddress);

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    uri: {
      doc: "Database host uri",
      format: String,
      default: "127.0.0.1",
      env: "DATABASE_HOST",
    },
    name: {
      doc: "Database host name",
      format: String,
      default: "",
      env: "DATABASE_NAME",
    },
  },
  signIn: {
    jwtSecret: {
      doc: "JWT Secret",
      format: String,
      default: "",
      env: "JWT_SECRET",
    },
    jwtExpiresIn: {
      doc: "JWT Expire",
      format: String,
      default: "30d",
      env: "JWT_EXPIRE",
    },
  },
  endpoint: {
    doc: "Current endpoint host",
    format: String,
    default: "",
    env: "CURRENT_ENDPOINT_HOST",
  },
});

// Load environment dependent configuration
const env = config.get("env");
if (env === "development" || env === "test") {
  config.loadFile(__dirname + "/environments/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });
module.exports = config;
