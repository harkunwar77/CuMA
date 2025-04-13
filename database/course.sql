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
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id bigint DEFAULT nextval('public.course_id_seq'::regclass) NOT NULL,
    course_code text NOT NULL,
    also_known_as text,
    formerly_known_as text,
    name text NOT NULL,
    document_id text,
    latest_modified date NOT NULL,
    state text
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, course_code, also_known_as, formerly_known_as, name, document_id, latest_modified, state) FROM stdin;
2	COMP-1000	\N	\N	Key Concepts in Computer Science	\N	2021-06-11	published
3	COMP-8570	\N	\N	Computational Geometry and Its Applications	\N	2021-04-12	published
5	test	\N	\N	test	test	2021-04-12	published
6	CSE101	Intro to Computer Science	CS101	Computer Science Fundamentals	DOC001	2023-06-01	published
1	COMP-08	Intro to Computer Science	CS101	Computer Science Fundamentals	DOC001	2023-06-01	published
\.


--
-- Name: course course_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_name_unique UNIQUE (course_code);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

