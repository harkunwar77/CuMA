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
-- Name: course_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_alignments (
    id bigint DEFAULT nextval('public.course_alignments_seq'::regclass) NOT NULL,
    course_id bigint NOT NULL,
    legend text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.course_alignments OWNER TO postgres;

--
-- Data for Name: course_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_alignments (id, course_id, legend, description) FROM stdin;
1	2	C	Interpret mathematically about basic (discrete) structures used in Computer Science.
2	2	CA	Explain the concepts of formal proof, soundness and completeness.
3	2	F	Explain how a solution to a computational problem was derived.
4	3	I	Identify new problems from geometric domains and employ theoretical and practical knowledge to design efficient solutions.
5	3	A	Use geometrical properties of geometric data to design efficient algorithms and apply them to practical problems.
\.


--
-- Name: course_alignments course_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_alignments
    ADD CONSTRAINT course_alignments_pkey PRIMARY KEY (id);


--
-- Name: course_alignments course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_alignments
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- PostgreSQL database dump complete
--

