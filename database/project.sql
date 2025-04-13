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
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 19, true);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

