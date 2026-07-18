import type { LucideIcon } from "lucide-react";

export interface PublicServiceCategory {
  description: string;
  icon: LucideIcon;
  label: string;
  slug: string;
}

// This remains empty until staff-owned service configuration is connected.
// Public pages must never imply that an unconfigured category is available.
export const publicServiceCategories: readonly PublicServiceCategory[] = [];
