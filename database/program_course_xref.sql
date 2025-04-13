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
-- Name: program_course_xref; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_course_xref (
    id bigint DEFAULT nextval('public.program_course_dim_xref_seq'::regclass) NOT NULL,
    program_id bigint NOT NULL,
    couurse_id bigint NOT NULL,
    core boolean
);


ALTER TABLE public.program_course_xref OWNER TO postgres;

--
-- Data for Name: program_course_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_course_xref (id, program_id, couurse_id, core) FROM stdin;
\.


--
-- Name: program_course_xref program_course_xref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT program_course_xref_pkey PRIMARY KEY (id);


--
-- Name: program_course_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT course_id FOREIGN KEY (couurse_id) REFERENCES public.course(id);


--
-- Name: program_course_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- PostgreSQL database dump complete
--

