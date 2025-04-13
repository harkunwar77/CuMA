--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: learning_outcome_level_suffix; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_outcome_level_suffix (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.learning_outcome_level_suffix OWNER TO postgres;

--
-- Data for Name: learning_outcome_level_suffix; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_outcome_level_suffix (id, legend, description) FROM stdin;
1	A	assessments indicated
2	H	high-impact assessments indicated
\.


--
-- Name: learning_outcome_level_suffix learning_outcoms_levels_suffix_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_outcome_level_suffix
    ADD CONSTRAINT learning_outcoms_levels_suffix_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

