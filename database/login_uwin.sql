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
-- Data for Name: login_uwin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login_uwin (id, uwinid, password, firstname, lastname) FROM stdin;
1	patel4r4@uwindsor.ca	preet	Preet	Patel\n
2	test@uwindsor.ca	test	test	test
\.


--
-- Name: login_uwin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.login_uwin_id_seq', 2, true);


--
-- Name: login_uwin login_uwin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_uwin
    ADD CONSTRAINT login_uwin_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

