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
-- Name: project_permissions project_permissions_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_permissions
    ADD CONSTRAINT project_permissions_id PRIMARY KEY (id);


--
-- Name: project_permissions project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_permissions
    ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES public.project(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

