--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: project_program_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_program_alignments (
    id bigint DEFAULT nextval('public.project_program_alignments_seq'::regclass) NOT NULL,
    program_id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.project_program_alignments OWNER TO postgres;

--
-- Data for Name: project_program_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_alignments (id, program_id, legend, description) FROM stdin;
9	6		test alignment
10	6		test alignment DH
11	6		
\.


--
-- Name: project_program_alignments project_program_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_alignments
    ADD CONSTRAINT project_program_alignments_pkey PRIMARY KEY (id);


--
-- Name: project_program_alignments program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_alignments
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.project_program(id);


--
-- PostgreSQL database dump complete
--

