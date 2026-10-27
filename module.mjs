// @ts-check
import { module } from "@prisma/composer";
import eparvService from "./service.mjs";

export default module("eparv", ({ provision }) => {
  provision(eparvService);
});
