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
-- Name: learning_outcomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_outcomes (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.learning_outcomes OWNER TO postgres;

--
-- Data for Name: learning_outcomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_outcomes (id, legend, description) FROM stdin;
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
-- Name: learning_outcomes learning_outcoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_outcomes
    ADD CONSTRAINT learning_outcoms_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

