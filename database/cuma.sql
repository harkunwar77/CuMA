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

--
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_id_seq OWNER TO postgres;

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
-- Name: course_alignments_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_alignments_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_alignments_seq OWNER TO postgres;

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
-- Name: faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.faculty OWNER TO postgres;

--
-- Name: faculty_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.faculty ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.faculty_id_seq
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: learning_outcome_level_suffix; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_outcome_level_suffix (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.learning_outcome_level_suffix OWNER TO postgres;

--
-- Name: learning_outcome_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_outcome_levels (
    id bigint NOT NULL,
    legend text,
    level text
);


ALTER TABLE public.learning_outcome_levels OWNER TO postgres;

--
-- Name: login_uwin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_uwin (
    id integer NOT NULL,
    uwinid character varying NOT NULL,
    password character varying NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL
);


ALTER TABLE public.login_uwin OWNER TO postgres;

--
-- Name: login_uwin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.login_uwin ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.login_uwin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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
-- Name: program_alignments_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_alignments_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.program_alignments_seq OWNER TO postgres;

--
-- Name: program_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_alignments (
    id bigint DEFAULT nextval('public.program_alignments_seq'::regclass) NOT NULL,
    program_id bigint NOT NULL,
    legend text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.program_alignments OWNER TO postgres;

--
-- Name: program_course_dim_xref_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_course_dim_xref_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.program_course_dim_xref_seq OWNER TO postgres;

--
-- Name: program_course_xref_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_course_xref_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.program_course_xref_seq OWNER TO postgres;

--
-- Name: program_course_outcome_xref; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_course_outcome_xref (
    id bigint DEFAULT nextval('public.program_course_xref_seq'::regclass) NOT NULL,
    program_id bigint NOT NULL,
    course_id bigint NOT NULL,
    learning_outcome_description text NOT NULL,
    uga_id bigint NOT NULL,
    uga_level_id bigint NOT NULL,
    uga_level_suffix_id bigint NOT NULL,
    plo_id bigint NOT NULL,
    multy_learning_outcome bigint
);


ALTER TABLE public.program_course_outcome_xref OWNER TO postgres;

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
-- Name: program_learning_outcome; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_learning_outcome (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.program_learning_outcome OWNER TO postgres;

--
-- Name: program_xref_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_xref_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.program_xref_seq OWNER TO postgres;

--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying NOT NULL,
    owner text NOT NULL,
    default_read boolean DEFAULT true NOT NULL,
    default_read_write boolean DEFAULT false NOT NULL
);


ALTER TABLE public.project OWNER TO postgres;

--
-- Name: project_course_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_course_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_course_seq OWNER TO postgres;

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
-- Name: project_course_alignments_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_course_alignments_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_course_alignments_seq OWNER TO postgres;

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
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.project ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: project_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_permissions_id_seq OWNER TO postgres;

--
-- Name: project_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_permissions (
    id bigint DEFAULT nextval('public.project_permissions_id_seq'::regclass) NOT NULL,
    project_id bigint NOT NULL,
    user_id text NOT NULL,
    read boolean NOT NULL,
    read_write boolean NOT NULL
);


ALTER TABLE public.project_permissions OWNER TO postgres;

--
-- Name: project_program_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_program_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_program_seq OWNER TO postgres;

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
-- Name: project_program_alignments_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_program_alignments_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_program_alignments_seq OWNER TO postgres;

--
-- Name: project_program_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_program_alignments (
    id bigint DEFAULT nextval('public.project_program_alignments_seq'::regclass) NOT NULL,
    program_id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.project_program_alignments OWNER TO postgres;

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
-- Name: project_program_course_xref_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_program_course_xref_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_program_course_xref_seq OWNER TO postgres;

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
-- Name: uga_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uga_alignments (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.uga_alignments OWNER TO postgres;

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
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty (id, name) FROM stdin;
1	Arts, Humanities And Social Sciences
2	Business
4	Engineering
7	Nursing
8	Science
6	Law
3	Education
5	Human Kinetics
11	testFacultynew
12	testFacultyhello
\.


--
-- Data for Name: learning_outcome_level_suffix; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_outcome_level_suffix (id, legend, description) FROM stdin;
1	A	assessments indicated
2	H	high-impact assessments indicated
\.


--
-- Data for Name: learning_outcome_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_outcome_levels (id, legend, level) FROM stdin;
1	I	Introduction
2	R	Reinforcement
3	M	Mastery
\.


--
-- Data for Name: login_uwin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_uwin (id, uwinid, password, firstname, lastname) FROM stdin;
1	patel4r4@uwindsor.ca	preet	Preet	Patel\n
2	test@uwindsor.ca	test	test	test
\.


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
-- Data for Name: program_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_alignments (id, program_id, legend, description) FROM stdin;
1	2	D	test alignment
2	2	DH	test alignment DH
\.


--
-- Data for Name: program_course_outcome_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_course_outcome_xref (id, program_id, course_id, learning_outcome_description, uga_id, uga_level_id, uga_level_suffix_id, plo_id, multy_learning_outcome) FROM stdin;
\.


--
-- Data for Name: program_course_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_course_xref (id, program_id, couurse_id, core) FROM stdin;
\.


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
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (id, name, owner, default_read, default_read_write) FROM stdin;
2	test	test@uwindsor.ca	t	f
3	test	test@uwindsor.ca	t	f
13	pname	test@uwindsor.ca	t	f
14	testproject	test@uwindsor.ca	f	f
15	lol	test@uwindsor.ca	f	f
16	lol	test@uwindsor.ca	f	f
4	pname	test@uwindsor.ca	f	f
17	lol	test@uwindsor.ca	f	f
18	lol	test@uwindsor.ca	f	f
19	latest	test@uwindsor.ca	f	f
12	pname	test@uwindsor.ca	f	t
\.


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
-- Data for Name: project_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_permissions (id, project_id, user_id, read, read_write) FROM stdin;
3	2	1	t	t
4	4	user1	t	f
5	4	user2	t	t
10	12	user1@uwindsor	t	t
11	12	user4@uwindsor.ca	t	t
12	12	user2@uwindsor.ca	t	f
13	12	user3@uwindsor.ca	t	f
15	13	user4@uwindsor.ca	t	t
17	13	user3@uwindsor.ca	t	f
18	14	user1@uwindsor	t	t
20	14	user2@uwindsor.ca	t	f
21	14	user3@uwindsor.ca	t	f
16	13	test@uwindsor.ca	t	f
14	13	test@uwindsor.ca	t	t
19	14	test@uwindsor.ca	t	t
22	15	test@uwindsor.ca	t	t
23	16	test@uwindsor.ca	t	t
24	16	test@uwindsor.ca	t	t
52	18	test@uwindsor.ca	t	t
53	18	test@uwindsor.ca	t	f
60	19	user2@uwindsor.ca	t	t
61	19	test@uwindsor.ca	t	t
62	19	user1@uwindsor.ca	t	f
63	19	test@uwindsor.ca	t	f
\.


--
-- Data for Name: project_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program (id, project_id, name, academic_level, faculty_id, document_id, latest_modified, revision_start_date, state, parent_program_id) FROM stdin;
3	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
4	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
5	19	MFA in Visual Arts	graduate	1	\N	2022-01-17	2023-07-03	published	2
6	19	MFA in Visual Arts	graduate	1	\N	2023-07-03	2023-07-03	draft	2
\.


--
-- Data for Name: project_program_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_alignments (id, program_id, legend, description) FROM stdin;
7	6	D	test alignment
8	6	DH	test alignment DH
\.


--
-- Data for Name: project_program_course_outcome_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_course_outcome_xref (id, project_id, program_id, course_id, learning_outcome_description, uga_id, uga_level_id, uga_level_suffix_id, plo_id, multy_learning_outcome) FROM stdin;
1	4	2	2	test des	1	1	1	1	1
\.


--
-- Data for Name: project_program_course_xref; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_program_course_xref (id, project_id, program_id, course_id, core) FROM stdin;
\.


--
-- Data for Name: uga_alignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uga_alignments (id, legend, description) FROM stdin;
1	A	the acquisition, application and integration of knowledge
2	B	research skills, including the ability to define problems and access, retrieve and evaluate information (information literacy)
3	C	critical thinking and problem-solving skills
4	D	literacy and numeracy skills
5	E	responsible behaviour to self, others and society
6	F	interpersonal and communications skills
7	G	teamwork, and personal and group leadership skills
8	H	creativity and aesthetic appreciation
9	I	the ability and desire for continuous learning
\.


--
-- Name: course_alignments_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_alignments_seq', 5, true);


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_id_seq', 11, true);


--
-- Name: faculty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculty_id_seq', 12, true);


--
-- Name: login_uwin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_uwin_id_seq', 2, true);


--
-- Name: program_alignments_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_alignments_seq', 2, true);


--
-- Name: program_course_dim_xref_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_course_dim_xref_seq', 1, false);


--
-- Name: program_course_xref_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_course_xref_seq', 1, false);


--
-- Name: program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_id_seq', 9, true);


--
-- Name: program_xref_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_xref_seq', 1, true);


--
-- Name: project_course_alignments_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_course_alignments_seq', 32, true);


--
-- Name: project_course_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_course_seq', 15, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 19, true);


--
-- Name: project_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_permissions_id_seq', 63, true);


--
-- Name: project_program_alignments_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_program_alignments_seq', 8, true);


--
-- Name: project_program_course_xref_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_program_course_xref_seq', 15, true);


--
-- Name: project_program_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_program_seq', 6, true);


--
-- Name: projectuga_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projectuga_id_seq', 20, true);


--
-- Name: course_alignments course_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_alignments
    ADD CONSTRAINT course_alignments_pkey PRIMARY KEY (id);


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
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (id);


--
-- Name: learning_outcome_levels learning_outcoms_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_outcome_levels
    ADD CONSTRAINT learning_outcoms_levels_pkey PRIMARY KEY (id);


--
-- Name: learning_outcome_level_suffix learning_outcoms_levels_suffix_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_outcome_level_suffix
    ADD CONSTRAINT learning_outcoms_levels_suffix_pkey PRIMARY KEY (id);


--
-- Name: uga_alignments learning_outcoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uga_alignments
    ADD CONSTRAINT learning_outcoms_pkey PRIMARY KEY (id);


--
-- Name: login_uwin login_uwin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_uwin
    ADD CONSTRAINT login_uwin_pkey PRIMARY KEY (id);


--
-- Name: program_alignments program_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_alignments
    ADD CONSTRAINT program_alignments_pkey PRIMARY KEY (id);


--
-- Name: program_course_outcome_xref program_course_outcome_xref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT program_course_outcome_xref_pkey PRIMARY KEY (id);


--
-- Name: program_course_xref program_course_xref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT program_course_xref_pkey PRIMARY KEY (id);


--
-- Name: program_learning_outcome program_learning_outcome_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_learning_outcome
    ADD CONSTRAINT program_learning_outcome_pkey PRIMARY KEY (id);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);


--
-- Name: project_course_alignments project_course_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course_alignments
    ADD CONSTRAINT project_course_alignments_pkey PRIMARY KEY (id);


--
-- Name: project_course project_course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT project_course_pkey PRIMARY KEY (id);


--
-- Name: project_permissions project_permissions_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_permissions
    ADD CONSTRAINT project_permissions_id PRIMARY KEY (id);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: project_program_alignments project_program_alignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_alignments
    ADD CONSTRAINT project_program_alignments_pkey PRIMARY KEY (id);


--
-- Name: project_program_course_outcome_xref project_program_course_outcome_xref_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT project_program_course_outcome_xref_pkey PRIMARY KEY (id);


--
-- Name: project_program project_program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT project_program_pkey PRIMARY KEY (id);


--
-- Name: fki_faculty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_faculty_id ON public.program USING btree (faculty_id);


--
-- Name: project_program_course_outcome_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- Name: program_course_outcome_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- Name: course_alignments course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_alignments
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.course(id);


--
-- Name: program_course_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT course_id FOREIGN KEY (couurse_id) REFERENCES public.course(id);


--
-- Name: project_program_course_xref course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.project_course(id) NOT VALID;


--
-- Name: program faculty_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT faculty_id FOREIGN KEY (faculty_id) REFERENCES public.faculty(id) NOT VALID;


--
-- Name: project_program faculty_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT faculty_id FOREIGN KEY (faculty_id) REFERENCES public.faculty(id);


--
-- Name: project_course parent_course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT parent_course_id FOREIGN KEY (parent_course_id) REFERENCES public.course(id) NOT VALID;


--
-- Name: project_program parent_program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT parent_program_id FOREIGN KEY (parent_program_id) REFERENCES public.program(id);


--
-- Name: project_program_course_outcome_xref plo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT plo_id FOREIGN KEY (plo_id) REFERENCES public.program_learning_outcome(id) NOT VALID;


--
-- Name: program_course_outcome_xref plo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT plo_id FOREIGN KEY (plo_id) REFERENCES public.program_learning_outcome(id);


--
-- Name: project_program_course_outcome_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- Name: program_course_outcome_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- Name: program_alignments program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_alignments
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- Name: program_course_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id);


--
-- Name: project_program_alignments program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_alignments
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.project_program(id);


--
-- Name: project_program_course_xref program_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.project_program(id);


--
-- Name: project_course_alignments project_course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course_alignments
    ADD CONSTRAINT project_course_id FOREIGN KEY (course_id) REFERENCES public.project_course(id);


--
-- Name: project_program_course_outcome_xref project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: project_course project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_course
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: project_program project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: project_program_course_xref project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_xref
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: project_permissions project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_permissions
    ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: project_program_course_outcome_xref uga_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_id FOREIGN KEY (uga_id) REFERENCES public.uga_alignments(id) NOT VALID;


--
-- Name: program_course_outcome_xref uga_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT uga_id FOREIGN KEY (uga_id) REFERENCES public.uga_alignments(id);


--
-- Name: project_program_course_outcome_xref uga_level_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_level_id FOREIGN KEY (uga_level_id) REFERENCES public.learning_outcome_levels(id) NOT VALID;


--
-- Name: program_course_outcome_xref uga_level_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT uga_level_id FOREIGN KEY (uga_level_id) REFERENCES public.learning_outcome_levels(id);


--
-- Name: project_program_course_outcome_xref uga_level_suffix_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_program_course_outcome_xref
    ADD CONSTRAINT uga_level_suffix_id FOREIGN KEY (uga_level_suffix_id) REFERENCES public.learning_outcome_level_suffix(id) NOT VALID;


--
-- Name: program_course_outcome_xref uga_level_suffix_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_course_outcome_xref
    ADD CONSTRAINT uga_level_suffix_id FOREIGN KEY (uga_level_suffix_id) REFERENCES public.learning_outcome_level_suffix(id);


--
-- PostgreSQL database dump complete
--

