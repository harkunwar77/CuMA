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
-- Name: program_learning_outcome; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_learning_outcome (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.program_learning_outcome OWNER TO postgres;

--
-- Name: projectuga_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.program_learning_outcome ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.projectuga_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: program_learning_outcome; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_learning_outcome (id, legend, description) FROM stdin;
1	PLO 1	Critically appraise, and apply advanced concepts in computer science.
2	PLO 2	Design and implement software, using current technologies in different areas of computer science (e.g. databases, networks, operating systems etc) for application development.
3	PLO 3	Explain and employ concepts of financial analysis and planning, marketing and communication and human resource management for completing software projects.
6	PLO 4	Critically evaluate the accuracy, validity, and applicability of technological information such as (but not limited to) archived research papers, technical forums, and newsgroups.
7	PLO 5	Critically evaluate relevant current research in computer science, available in journal and
8	PLO 6	Critically analyze software requirements, including resource requirements and risk analysis, for complex projects.
9	PLO 7	Design and develop software architecture, and implement solutions to meet application needs. Also applies to H.
10	PLO 8	Apply formal computational models to evaluate and compare the efficiency of different algorithms.
11	PLO 9	Create and analyze technical documentation and detailed financial plans for software projects.
12	PLO 10	Discuss ethical issues such as copyright/licensing violations, plagiarism, and unauthorized access to private information.
13	PLO 11	Recognize and communicate the role of computing in society as well as broader implications of technological advances, and both positive and negative effects.
14	PLO 12	Achieve stakeholder buy-in by communicating their ideas, identifying key issues,and expressing both alternatives and recommendations clearly.
15	PLO 13	Clearly communicate ideas and information in the form of technical reports and/or user manuals.
16	PLO 14	Work collaboratively as a member of software development teams to complete complex projects.
17	PLO 15	Demonstrate responsibility and accountability in complex decision making, for example balancing the need to produce high-quality work under strict time and resource constraints.
18	PLO 16	Develop user friendly computer applications that are necessary for employment.
19	PLO 17	Explain the fast pace of ongoing technological advances and the importance of continuously updating their knowledge and skills.
20	PLO 18	Critically evaluate, interpret and use new techniques to meet application needs.
\.


--
-- Name: projectuga_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projectuga_id_seq', 20, true);


--
-- Name: program_learning_outcome program_learning_outcome_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_learning_outcome
    ADD CONSTRAINT program_learning_outcome_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

