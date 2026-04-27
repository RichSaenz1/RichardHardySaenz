export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      tenants: {
        Row: {
          id: string;
          business_name: string;
          business_type: string;
          city: string | null;
          country: string | null;
          timezone: string | null;
          status: string | null;
          plan: string | null;
          owner_user_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          business_type: string;
          city?: string | null;
          country?: string | null;
          timezone?: string | null;
          status?: string | null;
          plan?: string | null;
          owner_user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tenants"]["Insert"]>;
        Relationships: [];
      };
      tenant_memberships: {
        Row: {
          tenant_id: string;
          user_id: string;
          role: "owner" | "admin" | "staff" | null;
          created_at: string;
        };
        Insert: {
          tenant_id: string;
          user_id: string;
          role: "owner" | "admin" | "staff";
          created_at?: string;
        };
        Update: {
          role?: "owner" | "admin" | "staff";
          created_at?: string;
        };
        Relationships: [];
      };
      tenant_settings: {
        Row: {
          tenant_id: string;
          languages: string[] | null;
          whatsapp_number: string | null;
          vapi_phone_number_id: string | null;
          human_fallback_number: string | null;
          booking_url: string | null;
          tone: string | null;
          greeting: string | null;
          hours: Json | null;
          services: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          tenant_id: string;
          languages?: string[] | null;
          whatsapp_number?: string | null;
          vapi_phone_number_id?: string | null;
          human_fallback_number?: string | null;
          booking_url?: string | null;
          tone?: string | null;
          greeting?: string | null;
          hours?: Json | null;
          services?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tenant_settings"]["Insert"]>;
        Relationships: [];
      };
      channel_bindings: {
        Row: {
          id: string;
          tenant_id: string | null;
          channel: "voice" | "whatsapp" | null;
          provider: string | null;
          external_id: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          channel?: "voice" | "whatsapp" | null;
          provider?: string | null;
          external_id?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["channel_bindings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_tenant_member: {
        Args: { target_tenant: string };
        Returns: boolean;
      };
      tenant_member_role: {
        Args: { target_tenant: string };
        Returns: string | null;
      };
      is_tenant_admin: {
        Args: { target_tenant: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tenant = Database["public"]["Tables"]["tenants"]["Row"];
export type TenantSettings = Database["public"]["Tables"]["tenant_settings"]["Row"];
export type TenantRole = "owner" | "admin" | "staff";
