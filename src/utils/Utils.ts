const Utils = {
  encodeNormalizedName(uri: string) {
    const index = uri.lastIndexOf("/") + 1;
    const name = uri.substr(index);
    return encodeURIComponent(name);
  },
};

export default Utils;
