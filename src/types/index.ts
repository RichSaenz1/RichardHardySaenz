import type { Tenant, TenantRole, TenantSettings } from "./database";

export type TenantContext = {
  tenant: Tenant;
  settings: TenantSettings | null;
  role: TenantRole;
};

export type ActionState = {
  error?: string;
  success?: string;
};
