export const encodeNormalizedName = (uri: string) => {
  const index = uri.lastIndexOf("/") + 1;
  const name = uri.substr(index);
  return encodeURIComponent(name);
};

export const getNamespaceUri = (uri: string) => {
  const index = uri.lastIndexOf("/");
  return uri.substr(0, index);
};
