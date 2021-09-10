const Utils = {
  encodeNormalizedName(uri: string) {
    const index = uri.lastIndexOf("/") + 1;
    const name = uri.substr(index);
    return encodeURIComponent(name);
  },
  getNamespaceUri(uri: string) {
    const index = uri.lastIndexOf("/");
    return uri.substr(0, index);
  },
};

export default Utils;
