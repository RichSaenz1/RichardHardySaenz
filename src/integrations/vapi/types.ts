import type { IntakeLead, LeadSummary } from "../../types/intake";

export type VapiLeadToolName =
  | "createLead"
  | "sendWhatsAppSummary"
  | "checkAvailability"
  | "transferToHuman";

export type VapiLeadToolPayload = {
  toolName: VapiLeadToolName;
  lead?: IntakeLead;
  summary?: LeadSummary;
  requestedTimeWindow?: string;
};

export type VapiLeadToolResponse = {
  ok: boolean;
  message: string;
  leadId?: string;
};

// TODO: Connect these types to Vapi tool calls once the assistant ID, public key,
// backend endpoint, and secure lead storage approach are available.
