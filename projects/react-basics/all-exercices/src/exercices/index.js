const get = name => ({
  [name]: import(`./${name}`)
});

export default {
  ...get("00-intro"),
  ...get("01-elements"),
  ...get("02-social-media"),
  ...get("03-more-on-props"),
  ...get("04-smart-components")
};
