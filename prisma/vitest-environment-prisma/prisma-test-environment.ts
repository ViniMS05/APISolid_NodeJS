import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Setup"); // Before test

    return {
      teardown() {
        console.log("Teardown");
      }, // After test
    };
  },
};
