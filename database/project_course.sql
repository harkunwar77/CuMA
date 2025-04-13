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
-- Name: project_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_course (
    id bigint DEFAULT nextval('public.project_course_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    course_code text NOT NULL,
    also_known_as text,
    formerly_known_as text,
    name text NOT NULL,
    document_id text,
    revision_start_date date NOT NULL,
    latest_modified date,
    state text,
    parent_course_id bigint
);


ALTER TABLE public.project_course OWNER TO postgres;

--
-- Data for Name: project_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_course (id, project_id, course_code, also_known_as, formerly_known_as, name, document_id, revision_start_date, latest_modified, state, parent_course_id) FROM stdin;
9	19	CSE101	Intro to Computer Science	CS101	Computer Science Fundamentals	DOC001	2023-06-01	2023-06-01	draft	\N
10	19	CSE101	Intro to Computer Science	CS101	Computer Science Fundamentals	DOC001	2023-06-01	2023-06-01	draft	\N
11	19	CSE101	Intro to Computer Science	CS101	Computer Science Fundamentals	DOC001	2023-06-01	2023-06-01	draft	\N
1	19	test-100			test course	\N	2021-06-11	\N	draft	\N
2	19	CSE101	CS101	\N	Introduction to Computer Science	DOC001	2022-01-01	2023-07-03	draft	\N
15	19	COMP-1000	\N	\N	Key Concepts in Computer Science	\N	2023-07-03	2023-07-03	draft	2
\.


--
-- Name: project_course project_course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT project_course_pkey PRIMARY KEY (id);


--
-- Name: project_course parent_course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT parent_course_id FOREIGN KEY (parent_course_id) REFERENCES public.course(id) NOT VALID;


--
-- Name: project_course project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- PostgreSQL database dump complete
--

