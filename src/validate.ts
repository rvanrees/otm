import fs from "fs";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020";

const ajv = new Ajv2020();

// Get schema from YAML file
const schemaYaml = fs.readFileSync(
  "./src/transport-order.schema.yaml",
  "utf-8"
);
const schema = YAML.parse(schemaYaml);

// Get JSON data from file
const jsonData = JSON.parse(
  fs.readFileSync("./src/transport-order.json", "utf-8")
);

// Validate JSON data against the schema
const validate = ajv.compile(schema);
const valid = validate(jsonData);

if (valid) {
  console.log("✅ Valid!");
} else {
  console.error("❌ Invalid:", validate.errors);
}
