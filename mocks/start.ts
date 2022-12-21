import { setupServer } from "msw/node";

import { deliveryApiHandlers } from "./handlers";

const server = setupServer(...deliveryApiHandlers);

server.listen({ onUnhandledRequest: "bypass" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
