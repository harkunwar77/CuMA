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
-- Name: project_program_course_outcome_xref; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_program_course_outcome_xref (
    id bigint DEFAULT nextval('public.program_xref_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    program_id bigint NOT NULL,
    course_id bigint NOT NULL,
    learning_outcome_description text NOT NULL,
    uga_id bigint NOT NULL,
    uga_level_id bigint NOT NULL,
    uga_level_suffix_id bigint NOT NULL,
    plo_id bigint NOT NULL,
    multy_learning_outcome bigint
);


ALTER TABLE public.project_program_course_outcome_xref OWNER TO postgres;

--
-- Data for Name: project_program_course_outcome_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_course_outcome_xref (id, project_id, program_id, course_id, learning_outcome_description, uga_id, uga_level_id, uga_level_suffix_id, plo_id, multy_learning_outcome) FROM stdin;
1	4	2	2	test des	1	1	1	1	1
\.


--
-- Name: project_program_course_outcome_xref project_program_course_outcome_xref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT project_program_course_outcome_xref_pkey PRIMARY KEY (id);


--
-- Name: project_program_course_outcome_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- Name: project_program_course_outcome_xref plo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT plo_id FOREIGN KEY (plo_id) REFERENCES public.program_learning_outcome(id) NOT VALID;


--
-- Name: project_program_course_outcome_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- Name: project_program_course_outcome_xref project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: project_program_course_outcome_xref uga_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_id FOREIGN KEY (uga_id) REFERENCES public.uga_alignments(id) NOT VALID;


--
-- Name: project_program_course_outcome_xref uga_level_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_level_id FOREIGN KEY (uga_level_id) REFERENCES public.learning_outcome_levels(id) NOT VALID;


--
-- Name: project_program_course_outcome_xref uga_level_suffix_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_level_suffix_id FOREIGN KEY (uga_level_suffix_id) REFERENCES public.learning_outcome_level_suffix(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

