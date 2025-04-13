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
-- Name: project_course_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_course_alignments (
    id bigint DEFAULT nextval('public.project_course_alignments_seq'::regclass) NOT NULL,
    course_id bigint NOT NULL,
    legend text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.project_course_alignments OWNER TO postgres;

--
-- Data for Name: project_course_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_course_alignments (id, course_id, legend, description) FROM stdin;
1	1	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
2	1	CA	Calculate the computational time complexity of algorithms (also relevant to Section A).\n
12	9	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
13	9	CA	Calculate the computational time complexity of algorithms (also relevant to Section A).\n
14	10	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
15	10	CA	Calculate the computational time complexity of algorithms (also relevant to Section A).\n
16	11	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
17	11	CA	Calculate the computational time complexity of algorithms (also relevant to Section A).\n
30	15	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
31	15	CA	Explain the concepts of formal proof, soundness and completeness.
32	15	F	Explain how a solution to a computational problem was derived.
\.


--
-- Name: project_course_alignments project_course_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course_alignments
    ADD CONSTRAINT project_course_alignments_pkey PRIMARY KEY (id);


--
-- Name: project_course_alignments project_course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course_alignments
    ADD CONSTRAINT project_course_id FOREIGN KEY (course_id) REFERENCES public.project_course(id);


--
-- PostgreSQL database dump complete
--

