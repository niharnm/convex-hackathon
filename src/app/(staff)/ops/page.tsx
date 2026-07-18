import { redirect } from "next/navigation";

import { routes } from "@/contracts/routes";
import { requireStaff } from "@/lib/server-auth";

export default async function OperationsPage() {
  await requireStaff();
  redirect(routes.opsRequests);
}
