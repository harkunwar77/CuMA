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
-- Name: project_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_program (
    id bigint DEFAULT nextval('public.project_program_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    name text NOT NULL,
    academic_level text,
    faculty_id bigint NOT NULL,
    document_id text,
    latest_modified date,
    revision_start_date date,
    state text,
    parent_program_id bigint
);


ALTER TABLE public.project_program OWNER TO postgres;

--
-- Data for Name: project_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program (id, project_id, name, academic_level, faculty_id, document_id, latest_modified, revision_start_date, state, parent_program_id) FROM stdin;
3	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
4	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
5	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
6	19	MFA in Visual Arts	graduate	1	\N	2023-07-14	2023-07-03	draft	\N
\.


--
-- Name: project_program project_program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT project_program_pkey PRIMARY KEY (id);


--
-- Name: project_program faculty_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT faculty_id FOREIGN KEY (faculty_id) REFERENCES public.faculty(id);


--
-- Name: project_program parent_program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT parent_program_id FOREIGN KEY (parent_program_id) REFERENCES public.program(id);


--
-- Name: project_program project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- PostgreSQL database dump complete
--

