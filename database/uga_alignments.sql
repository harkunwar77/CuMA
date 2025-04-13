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
-- Name: uga_alignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uga_alignments (
    id bigint NOT NULL,
    legend text,
    description text
);


ALTER TABLE public.uga_alignments OWNER TO postgres;

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
-- Name: uga_alignments learning_outcoms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uga_alignments
    ADD CONSTRAINT learning_outcoms_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

