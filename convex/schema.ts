import { defineSchema } from "convex/server";

// Wave 1 owns the durable product schema. Keeping this explicit empty schema
// lets the bootstrap validate and generate types before feature branches start.
export default defineSchema({});
