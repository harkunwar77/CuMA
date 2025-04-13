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
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    id bigint NOT NULL,
    name text,
    academic_level text,
    faculty_id bigint,
    document_id text,
    latest_modified date,
    state text
);


ALTER TABLE public.program OWNER TO postgres;

--
-- Name: program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.program ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program (id, name, academic_level, faculty_id, document_id, latest_modified, state) FROM stdin;
1	Master of Applied Computing	Graduate	8	sljfnfk	2000-11-05	published
2	MFA in Visual Arts	graduate	1	\N	2022-01-17	published
3	Master of Management (MOM)	graduate	2	\N	2020-05-22	published
4	Master of Education	graduate	3	\N	2018-04-13	published
5	Master of Education with Second Language Acquisition, Culture and Society Concentration	graduate	3	\N	2013-04-12	published
6	Master of Applied Science in Civil Engineering	graduate	4	\N	2016-06-10	published
7	Master of Laws (LLM)	graduate	6	\N	2014-02-14	published
8	Master of Materials Chemistry and Engineering (MMCE)	graduate	8	\N	2020-03-13	published
9	Computer Science	Bachelor's	2	DOC001	2023-06-01	published
\.


--
-- Name: program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_id_seq', 9, true);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);


--
-- Name: fki_faculty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_faculty_id ON public.program USING btree (faculty_id);


--
-- Name: program faculty_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT faculty_id FOREIGN KEY (faculty_id) REFERENCES public.faculty(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

