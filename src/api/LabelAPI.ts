import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../app/variables";

const getLabel = async (iri: string) => {
  const { data } = await axios.get(`${API}/data/label`, {
    params: { iri: iri },
  });
  return data;
};

export const useLabel = (iri: string) => {
  return useQuery(["label", iri], () => getLabel(iri), {
    enabled: !!iri,
  });
};
