import { type Context } from "ldkit";
import { SPARQL_ENDPOINT } from "../../app/variables";

// We should probably move the check somewhere else
if (!SPARQL_ENDPOINT) {
  throw new Error("SPARQL_ENDPOINT variable is not defined");
}

export const context: Context = {
  sources: [
    {
      type: "sparql",
      value: SPARQL_ENDPOINT,
    },
  ],
  language: "cs",
};
