import { redirect } from "next/navigation";

import { routes } from "@/contracts/routes";

export default function OperationsPage() {
  redirect(routes.opsRequests);
}
