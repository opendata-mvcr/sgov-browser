import { createContext } from "@ldkit/core";
import { SPARQL_ENDPOINT } from "../../app/variables";

// We should probably move the check somewhere else
if (!SPARQL_ENDPOINT) {
  throw new Error("SPARQL_ENDPOINT variable is not defined");
}

// Provide custom fetch function to handle UTF-8 characters properly
const utf8Fetch = (resource: RequestInfo, init?: RequestInit) => {
  const headers = init?.headers as Headers;
  const ct = (init?.headers as Headers).get("Content-type");
  if (ct === "application/x-www-form-urlencoded") {
    headers.set(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
  }
  return fetch(resource, init);
};

export const context = createContext({
  sources: [
    {
      type: "sparql",
      value: SPARQL_ENDPOINT,
    },
  ],
  fetch: utf8Fetch,
});
