import { DataFactory } from "ldkit/rdf";

const dataFactory = new DataFactory();

export const n = (value: string) => dataFactory.namedNode(value);
export const l = (value: string) => dataFactory.literal(value);
