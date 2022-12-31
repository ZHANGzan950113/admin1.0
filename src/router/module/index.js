import permission from "./permission";
import testRoute from "./testRoute";

export default [
  ...testRoute,
  ...permission
].flat()