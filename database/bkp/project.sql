PGDMP     8                    {           cuma    15.2    15.2 	               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    cuma    DATABASE     w   CREATE DATABASE cuma WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE cuma;
                postgres    false            �            1259    16408    project    TABLE     �   CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying NOT NULL,
    owner text NOT NULL,
    member text,
    guests text
);
    DROP TABLE public.project;
       public         heap    postgres    false            �            1259    16426    project_id_seq    SEQUENCE     �   ALTER TABLE public.project ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215                      0    16408    project 
   TABLE DATA           B   COPY public.project (id, name, owner, member, guests) FROM stdin;
    public          postgres    false    215   �                  0    0    project_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.project_id_seq', 1, true);
          public          postgres    false    218            x           2606    16414    project project_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.project DROP CONSTRAINT project_pkey;
       public            postgres    false    215                  x�3�L��J�ɄR��ɥ��`�+F��� � 	�     