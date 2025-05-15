CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.clients (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    document_id character varying(20) NOT NULL,
    document_type character varying(10) NOT NULL,
    plan_type character varying(10) NOT NULL,
    balance numeric(10,2) DEFAULT 0,
    "limit" numeric(10,2) DEFAULT 0,
    active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_admin boolean DEFAULT false,
    CONSTRAINT clients_document_type_check CHECK (
      ((document_type)::text = ANY (
        (ARRAY['CPF'::character varying, 'CNPJ'::character varying])::text[]
      ))
    ),
    CONSTRAINT clients_plan_type_check CHECK (
      ((plan_type)::text = ANY (
        (ARRAY['prepaid'::character varying, 'postpaid'::character varying])::text[]
      ))
    )
);