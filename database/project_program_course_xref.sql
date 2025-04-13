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
-- Name: project_program_course_xref; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_program_course_xref (
    id bigint DEFAULT nextval('public.project_program_course_xref_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    program_id bigint NOT NULL,
    course_id bigint NOT NULL,
    core boolean
);


ALTER TABLE public.project_program_course_xref OWNER TO postgres;

--
-- Data for Name: project_program_course_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_course_xref (id, project_id, program_id, course_id, core) FROM stdin;
24	19	3	9	t
25	19	3	10	f
26	19	4	9	t
\.


--
-- Name: project_program_course_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.project_course(id) NOT VALID;


--
-- Name: project_program_course_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.project_program(id);


--
-- Name: project_program_course_xref project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- PostgreSQL database dump complete
--

