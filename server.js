const config = require("./config");
const app = require("./app");
const port = config.get("port");

app.listen(port, () => {
  console.warn(`✅  Server running on port: ${port}`);
});
