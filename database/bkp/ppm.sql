PGDMP     ,                    {           cuma    15.2    15.2     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    cuma    DATABASE     w   CREATE DATABASE cuma WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE cuma;
                postgres    false            �            1259    16459    ppm    TABLE     \   CREATE TABLE public.ppm (
    project_id bigint NOT NULL,
    program_id bigint NOT NULL
);
    DROP TABLE public.ppm;
       public         heap    postgres    false                      0    16459    ppm 
   TABLE DATA                 public          postgres    false    224   B       w           2606    16464    ppm program_id    FK CONSTRAINT     |   ALTER TABLE ONLY public.ppm
    ADD CONSTRAINT program_id FOREIGN KEY (program_id) REFERENCES public.program(id) NOT VALID;
 8   ALTER TABLE ONLY public.ppm DROP CONSTRAINT program_id;
       public          postgres    false    224            x           2606    16469    ppm project_id    FK CONSTRAINT     |   ALTER TABLE ONLY public.ppm
    ADD CONSTRAINT project_id FOREIGN KEY (project_id) REFERENCES public.project(id) NOT VALID;
 8   ALTER TABLE ONLY public.ppm DROP CONSTRAINT project_id;
       public          postgres    false    224               
   x���         