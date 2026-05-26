--
-- PostgreSQL database dump
--

\restrict mknLJIZueyUxTHxl48iX4iRibDDkfTNe5NkQHrnajADbmugkR7C4KhnVzjpeQTz

-- Dumped from database version 17.2
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: prisma_postgres; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS prisma_postgres WITH SCHEMA public;


--
-- Name: EXTENSION prisma_postgres; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION prisma_postgres IS 'prisma_postgres';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Match; Type: TABLE; Schema: public; Owner: prisma_migration
--

CREATE TABLE public."Match" (
    id text NOT NULL,
    "group" text,
    stage text NOT NULL,
    date timestamp(3) without time zone,
    venue text,
    home text NOT NULL,
    away text NOT NULL,
    "homeScore" integer,
    "awayScore" integer,
    "penaltyWinner" text,
    status text DEFAULT 'programado'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Match" OWNER TO prisma_migration;

--
-- Name: MatchPrediction; Type: TABLE; Schema: public; Owner: prisma_migration
--

CREATE TABLE public."MatchPrediction" (
    id text NOT NULL,
    "predictionId" text NOT NULL,
    "matchId" text NOT NULL,
    "homeScore" integer NOT NULL,
    "awayScore" integer NOT NULL,
    "penaltyWinner" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MatchPrediction" OWNER TO prisma_migration;

--
-- Name: Participant; Type: TABLE; Schema: public; Owner: prisma_migration
--

CREATE TABLE public."Participant" (
    id text NOT NULL,
    name text NOT NULL,
    contact text NOT NULL,
    "accessCode" text NOT NULL,
    status text DEFAULT 'pendiente'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Participant" OWNER TO prisma_migration;

--
-- Name: Prediction; Type: TABLE; Schema: public; Owner: prisma_migration
--

CREATE TABLE public."Prediction" (
    id text NOT NULL,
    "participantId" text NOT NULL,
    locked boolean DEFAULT true NOT NULL,
    champion text,
    semifinalists jsonb NOT NULL,
    "topScorer" text,
    mvp text,
    "groupWinners" jsonb NOT NULL,
    "groupQualified" jsonb NOT NULL,
    "bestThirds" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "reopenRequested" boolean DEFAULT false NOT NULL,
    "verificationCode" text
);


ALTER TABLE public."Prediction" OWNER TO prisma_migration;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: prisma_migration
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO prisma_migration;

--
-- Data for Name: Match; Type: TABLE DATA; Schema: public; Owner: prisma_migration
--

COPY public."Match" (id, "group", stage, date, venue, home, away, "homeScore", "awayScore", "penaltyWinner", status, "createdAt", "updatedAt") FROM stdin;
g-f-3	F	Grupo	2026-06-20 00:00:00	Houston	Netherlands	Sweden	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.083
g-e-4	E	Grupo	2026-06-21 00:00:00	Kansas City	Ecuador	Curacao	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.114
m101	\N	Semifinal	2026-07-14 00:00:00	Dallas	Ganador M97	Ganador M98	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:57.07
m102	\N	Semifinal	2026-07-15 00:00:00	Atlanta	Ganador M99	Ganador M100	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:57.101
m79	\N	Ronda de 32	2026-06-30 00:00:00	Mexico City	1A	3C/E/F/H/I	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.757
m80	\N	Ronda de 32	2026-07-01 00:00:00	Atlanta	1L	3E/H/I/J/K	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.788
m81	\N	Ronda de 32	2026-07-01 00:00:00	San Francisco Bay Area	1G	3A/E/H/I/J	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.819
m82	\N	Ronda de 32	2026-07-01 00:00:00	Seattle	1D	3B/E/F/I/J	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.85
m83	\N	Ronda de 32	2026-07-02 00:00:00	Toronto	1H	2J	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.881
m97	\N	Cuartos	2026-07-09 00:00:00	Boston	Ganador M89	Ganador M90	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.519
m98	\N	Cuartos	2026-07-10 00:00:00	Los Angeles	Ganador M91	Ganador M92	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.554
m100	\N	Cuartos	2026-07-11 00:00:00	Kansas City	Ganador M95	Ganador M96	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.585
m99	\N	Cuartos	2026-07-11 00:00:00	Miami	Ganador M93	Ganador M94	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.617
m104	\N	Final	2026-07-19 00:00:00	New York/New Jersey	Ganador M101	Ganador M102	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.649
g-l-3	L	Grupo	2026-06-23 00:00:00	Foxborough	England	Ghana	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.457
g-l-4	L	Grupo	2026-06-24 00:00:00	Toronto	Panama	Croatia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.646
g-l-5	L	Grupo	2026-06-27 00:00:00	East Rutherford	Panama	England	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.122
g-l-6	L	Grupo	2026-06-27 00:00:00	Philadelphia	Croatia	Ghana	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.154
m89	\N	Octavos	2026-07-04 00:00:00	Philadelphia	Ganador M74	Ganador M75	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.314
m90	\N	Octavos	2026-07-04 00:00:00	Houston	Ganador M76	Ganador M73	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.346
m91	\N	Octavos	2026-07-05 00:00:00	New York/New Jersey	Ganador M78	Ganador M77	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.378
m92	\N	Octavos	2026-07-05 00:00:00	Mexico City	Ganador M79	Ganador M80	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.41
m93	\N	Octavos	2026-07-06 00:00:00	Dallas	Ganador M83	Ganador M84	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.442
m94	\N	Octavos	2026-07-06 00:00:00	Seattle	Ganador M81	Ganador M82	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.474
m95	\N	Octavos	2026-07-07 00:00:00	Atlanta	Ganador M85	Ganador M86	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.506
m96	\N	Octavos	2026-07-07 00:00:00	Vancouver	Ganador M87	Ganador M88	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.537
m73	\N	Ronda de 32	2026-06-28 00:00:00	Los Angeles	2A	2B	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.568
m74	\N	Ronda de 32	2026-06-29 00:00:00	Boston	1E	3A/B/C/D/F	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.599
m75	\N	Ronda de 32	2026-06-29 00:00:00	Monterrey	1F	2C	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.63
m76	\N	Ronda de 32	2026-06-29 00:00:00	Houston	1C	2F	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.662
m77	\N	Ronda de 32	2026-06-30 00:00:00	New York/New Jersey	2E	2I	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.694
m78	\N	Ronda de 32	2026-06-30 00:00:00	Dallas	1I	3C/D/F/G/H	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.725
m84	\N	Ronda de 32	2026-07-02 00:00:00	Los Angeles	2K	2L	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.912
m85	\N	Ronda de 32	2026-07-02 00:00:00	Vancouver	1B	3E/F/G/I/J	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.943
m86	\N	Ronda de 32	2026-07-03 00:00:00	Miami	1K	3D/E/I/J/L	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.975
m87	\N	Ronda de 32	2026-07-03 00:00:00	Kansas City	2D	2G	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:57.007
m88	\N	Ronda de 32	2026-07-03 00:00:00	Dallas	1J	2H	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:57.039
g-a-3	A	Grupo	2026-06-18 00:00:00	Atlanta	Czechia	South Africa	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.768
g-b-3	B	Grupo	2026-06-18 00:00:00	Inglewood	Switzerland	Bosnia and Herzegovina	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.801
g-b-4	B	Grupo	2026-06-18 00:00:00	Vancouver	Canada	Qatar	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.833
g-k-2	K	Grupo	2026-06-18 00:00:00	Mexico City	Uzbekistan	Colombia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.864
g-a-4	A	Grupo	2026-06-19 00:00:00	Guadalajara	Mexico	South Korea	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.895
g-a-1	A	Grupo	2026-06-11 00:00:00	Mexico City	Mexico	South Africa	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.68
g-a-2	A	Grupo	2026-06-12 00:00:00	Guadalajara	South Korea	Czechia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.711
g-b-1	B	Grupo	2026-06-12 00:00:00	Toronto	Canada	Bosnia and Herzegovina	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.743
g-b-2	B	Grupo	2026-06-13 00:00:00	Santa Clara	Qatar	Switzerland	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:53.775
g-c-2	C	Grupo	2026-06-13 00:00:00	East Rutherford	Brazil	Morocco	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.152
g-d-1	D	Grupo	2026-06-13 00:00:00	Inglewood	United States	Paraguay	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.184
g-c-1	C	Grupo	2026-06-14 00:00:00	Foxborough	Haiti	Scotland	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.216
g-d-2	D	Grupo	2026-06-14 00:00:00	Vancouver	Australia	Turkiye	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.247
g-e-2	E	Grupo	2026-06-14 00:00:00	Houston	Germany	Curacao	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.279
g-f-1	F	Grupo	2026-06-14 00:00:00	Arlington	Netherlands	Japan	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.31
g-e-1	E	Grupo	2026-06-15 00:00:00	Philadelphia	Ivory Coast	Ecuador	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.351
g-f-2	F	Grupo	2026-06-15 00:00:00	Monterrey	Sweden	Tunisia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.382
g-g-1	G	Grupo	2026-06-15 00:00:00	Seattle	Belgium	Egypt	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.415
g-h-1	H	Grupo	2026-06-15 00:00:00	Atlanta	Spain	Cape Verde	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.448
g-h-2	H	Grupo	2026-06-15 00:00:00	Miami Gardens	Saudi Arabia	Uruguay	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.48
g-g-2	G	Grupo	2026-06-16 00:00:00	Inglewood	Iran	New Zealand	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.513
g-i-1	I	Grupo	2026-06-16 00:00:00	East Rutherford	France	Senegal	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.545
g-i-2	I	Grupo	2026-06-16 00:00:00	Foxborough	Iraq	Norway	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.577
g-j-1	J	Grupo	2026-06-17 00:00:00	Kansas City	Argentina	Algeria	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.608
g-j-2	J	Grupo	2026-06-17 00:00:00	Santa Clara	Austria	Jordan	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.641
g-k-1	K	Grupo	2026-06-17 00:00:00	Houston	Portugal	DR Congo	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.672
g-l-1	L	Grupo	2026-06-17 00:00:00	Toronto	Ghana	Panama	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.703
g-l-2	L	Grupo	2026-06-17 00:00:00	Arlington	England	Croatia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.736
g-c-4	C	Grupo	2026-06-19 00:00:00	Foxborough	Scotland	Morocco	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.927
g-d-4	D	Grupo	2026-06-19 00:00:00	Seattle	United States	Australia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.959
g-c-3	C	Grupo	2026-06-20 00:00:00	Philadelphia	Brazil	Haiti	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:54.99
g-d-3	D	Grupo	2026-06-20 00:00:00	Santa Clara	Turkiye	Paraguay	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.021
g-e-3	E	Grupo	2026-06-20 00:00:00	Toronto	Germany	Ivory Coast	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.052
g-f-4	F	Grupo	2026-06-21 00:00:00	Monterrey	Tunisia	Japan	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.145
g-h-3	H	Grupo	2026-06-21 00:00:00	Atlanta	Spain	Saudi Arabia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.176
g-h-4	H	Grupo	2026-06-21 00:00:00	Miami Gardens	Uruguay	Cape Verde	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.207
g-g-3	G	Grupo	2026-06-22 00:00:00	Inglewood	Belgium	Iran	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.238
g-g-4	G	Grupo	2026-06-22 00:00:00	Vancouver	New Zealand	Egypt	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.269
g-i-4	I	Grupo	2026-06-22 00:00:00	Philadelphia	France	Iraq	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.3
g-j-3	J	Grupo	2026-06-22 00:00:00	Arlington	Argentina	Austria	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.331
g-i-3	I	Grupo	2026-06-23 00:00:00	East Rutherford	Norway	Senegal	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.362
g-j-4	J	Grupo	2026-06-23 00:00:00	Santa Clara	Jordan	Algeria	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.394
g-k-3	K	Grupo	2026-06-23 00:00:00	Houston	Portugal	Uzbekistan	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.426
g-b-5	B	Grupo	2026-06-24 00:00:00	Vancouver	Switzerland	Canada	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.489
g-b-6	B	Grupo	2026-06-24 00:00:00	Seattle	Bosnia and Herzegovina	Qatar	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.52
g-c-5	C	Grupo	2026-06-24 00:00:00	Miami Gardens	Scotland	Brazil	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.551
g-c-6	C	Grupo	2026-06-24 00:00:00	Atlanta	Morocco	Haiti	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.582
g-k-4	K	Grupo	2026-06-24 00:00:00	Guadalajara	Colombia	DR Congo	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.614
g-a-5	A	Grupo	2026-06-25 00:00:00	Mexico City	Czechia	Mexico	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.678
g-a-6	A	Grupo	2026-06-25 00:00:00	Monterrey	South Africa	South Korea	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.709
g-e-5	E	Grupo	2026-06-25 00:00:00	Philadelphia	Curacao	Ivory Coast	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.741
g-e-6	E	Grupo	2026-06-25 00:00:00	East Rutherford	Ecuador	Germany	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.772
g-d-5	D	Grupo	2026-06-26 00:00:00	Inglewood	Turkiye	United States	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.804
g-d-6	D	Grupo	2026-06-26 00:00:00	Santa Clara	Paraguay	Australia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.835
g-f-5	F	Grupo	2026-06-26 00:00:00	Arlington	Japan	Sweden	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.866
g-f-6	F	Grupo	2026-06-26 00:00:00	Kansas City	Tunisia	Netherlands	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.898
g-h-6	H	Grupo	2026-06-26 00:00:00	Houston	Cape Verde	Saudi Arabia	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.93
g-i-5	I	Grupo	2026-06-26 00:00:00	Foxborough	Norway	France	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.963
g-i-6	I	Grupo	2026-06-26 00:00:00	Toronto	Senegal	Iraq	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:55.995
g-g-5	G	Grupo	2026-06-27 00:00:00	Seattle	Egypt	Iran	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.027
g-g-6	G	Grupo	2026-06-27 00:00:00	Vancouver	New Zealand	Belgium	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.059
g-h-5	H	Grupo	2026-06-27 00:00:00	Guadalajara	Uruguay	Spain	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.09
g-j-5	J	Grupo	2026-06-28 00:00:00	Kansas City	Algeria	Austria	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.186
g-j-6	J	Grupo	2026-06-28 00:00:00	Arlington	Jordan	Argentina	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.219
g-k-5	K	Grupo	2026-06-28 00:00:00	Miami Gardens	Colombia	Portugal	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.251
g-k-6	K	Grupo	2026-06-28 00:00:00	Atlanta	DR Congo	Uzbekistan	\N	\N	\N	programado	2026-05-21 17:30:50.33	2026-05-26 09:49:56.283
\.


--
-- Data for Name: MatchPrediction; Type: TABLE DATA; Schema: public; Owner: prisma_migration
--

COPY public."MatchPrediction" (id, "predictionId", "matchId", "homeScore", "awayScore", "penaltyWinner", "createdAt", "updatedAt") FROM stdin;
cmpk949z3002204jsiux1mzak	cmph3vkqv002104jv9xjoils7	g-i-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002304jssk2j5s0f	cmph3vkqv002104jv9xjoils7	g-i-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002404jso9e29sne	cmph3vkqv002104jv9xjoils7	g-j-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002504jsxxdzyraj	cmph3vkqv002104jv9xjoils7	g-j-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002604js75dbnmpr	cmph3vkqv002104jv9xjoils7	g-j-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002704js33uj7j4y	cmph3vkqv002104jv9xjoils7	g-j-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002804js9sivpasl	cmph3vkqv002104jv9xjoils7	g-j-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002904js6ehfi0pa	cmph3vkqv002104jv9xjoils7	g-j-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002a04jshoutylml	cmph3vkqv002104jv9xjoils7	g-k-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002b04jsdhro6hxq	cmph3vkqv002104jv9xjoils7	g-k-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002c04jsgwnt1dyk	cmph3vkqv002104jv9xjoils7	g-k-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002d04jsoaays3af	cmph3vkqv002104jv9xjoils7	g-k-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002e04js2jaxicuv	cmph3vkqv002104jv9xjoils7	g-k-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002f04js39b5vduc	cmph3vkqv002104jv9xjoils7	g-k-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002g04js7eyfmaqa	cmph3vkqv002104jv9xjoils7	g-l-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002h04jsot3y8se7	cmph3vkqv002104jv9xjoils7	g-l-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002i04js4v2qnq1k	cmph3vkqv002104jv9xjoils7	g-l-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002j04jsd3fmlvn0	cmph3vkqv002104jv9xjoils7	g-l-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002k04jsn7y53rj1	cmph3vkqv002104jv9xjoils7	g-l-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002l04js69v0z8nt	cmph3vkqv002104jv9xjoils7	g-l-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002m04jscjo4mdvz	cmph3vkqv002104jv9xjoils7	g-a-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002n04jsw5qqe7gd	cmph3vkqv002104jv9xjoils7	g-a-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002o04js3r4w90a2	cmph3vkqv002104jv9xjoils7	g-a-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002p04jscuhjp20s	cmph3vkqv002104jv9xjoils7	g-a-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002q04js92il072f	cmph3vkqv002104jv9xjoils7	g-a-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002r04jsmpen1dxh	cmph3vkqv002104jv9xjoils7	g-a-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002s04jsom9c5nty	cmph3vkqv002104jv9xjoils7	g-b-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002t04jsyr5rq8sd	cmph3vkqv002104jv9xjoils7	g-b-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002u04js8ay7d3sg	cmph3vkqv002104jv9xjoils7	g-b-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002v04jsacpqi12l	cmph3vkqv002104jv9xjoils7	g-b-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002w04jsmu9t72o3	cmph3vkqv002104jv9xjoils7	g-b-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002x04jsx0l7afr1	cmph3vkqv002104jv9xjoils7	g-b-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002y04jssua93gyr	cmph3vkqv002104jv9xjoils7	g-c-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4002z04jsf6uybxoj	cmph3vkqv002104jv9xjoils7	g-c-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003004jsugxymi7k	cmph3vkqv002104jv9xjoils7	g-c-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003104js4sdxoiah	cmph3vkqv002104jv9xjoils7	g-c-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003204js7dluu3yk	cmph3vkqv002104jv9xjoils7	g-c-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003304jslzns805p	cmph3vkqv002104jv9xjoils7	g-c-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003404js2syzxa55	cmph3vkqv002104jv9xjoils7	g-d-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003504jskpfhilj1	cmph3vkqv002104jv9xjoils7	g-d-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003604jsesg480r7	cmph3vkqv002104jv9xjoils7	g-d-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003704jsyy3vjzgf	cmph3vkqv002104jv9xjoils7	g-d-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003804jscu1x306z	cmph3vkqv002104jv9xjoils7	g-d-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003904js92fgw3d0	cmph3vkqv002104jv9xjoils7	g-d-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003a04jssuywhecq	cmph3vkqv002104jv9xjoils7	g-e-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003b04js7td8ec81	cmph3vkqv002104jv9xjoils7	g-e-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003c04js6tsb4zif	cmph3vkqv002104jv9xjoils7	g-e-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003d04js45xknr7e	cmph3vkqv002104jv9xjoils7	g-e-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z4003e04jsuhre8ns3	cmph3vkqv002104jv9xjoils7	g-e-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003f04js3vuxn8k1	cmph3vkqv002104jv9xjoils7	g-e-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003g04js1igjmvs0	cmph3vkqv002104jv9xjoils7	g-f-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003h04jss208vopi	cmph3vkqv002104jv9xjoils7	g-f-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003i04jszh3dhpa3	cmph3vkqv002104jv9xjoils7	g-f-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003j04jsda2klq8a	cmph3vkqv002104jv9xjoils7	g-f-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003k04js81r55s7b	cmph3vkqv002104jv9xjoils7	g-f-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003l04js82qnxnp0	cmph3vkqv002104jv9xjoils7	g-f-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003m04jsy5kjvafx	cmph3vkqv002104jv9xjoils7	g-g-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003n04jsn9l2qg2h	cmph3vkqv002104jv9xjoils7	g-g-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003o04jsgvlr6uc7	cmph3vkqv002104jv9xjoils7	g-g-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003p04jsd7wbfyi7	cmph3vkqv002104jv9xjoils7	g-g-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003q04jslh1lx2ue	cmph3vkqv002104jv9xjoils7	g-g-5	3	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003r04js77g31af7	cmph3vkqv002104jv9xjoils7	g-g-6	2	3	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003s04jsabvtcwxp	cmph3vkqv002104jv9xjoils7	g-h-1	1	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003t04js9nxbr3mf	cmph3vkqv002104jv9xjoils7	g-h-2	0	1	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003u04jsfh5ijy7g	cmph3vkqv002104jv9xjoils7	g-h-3	0	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003v04jspeguz2hr	cmph3vkqv002104jv9xjoils7	g-h-4	1	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003w04jsm9dlrpnp	cmph3vkqv002104jv9xjoils7	g-h-5	3	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003x04jshbd3mfaf	cmph3vkqv002104jv9xjoils7	g-h-6	0	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003y04js3cjp4slf	cmph3vkqv002104jv9xjoils7	g-i-1	4	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5003z04jsc3ied9oy	cmph3vkqv002104jv9xjoils7	g-i-2	2	0	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5004004jsuxd4ntwc	cmph3vkqv002104jv9xjoils7	g-i-3	2	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpk949z5004104jsrfvnlhg5	cmph3vkqv002104jv9xjoils7	g-i-4	1	2	\N	2026-05-24 20:50:08.128	2026-05-24 20:50:08.128
cmpmi24nf01gr04l5ieskaj1l	cmph3vkgw000004jv26dloav1	g-a-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gs04l5vxc5xy9w	cmph3vkgw000004jv26dloav1	g-a-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gt04l5xhry877h	cmph3vkgw000004jv26dloav1	g-a-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gu04l5epk757rq	cmph3vkgw000004jv26dloav1	g-a-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gv04l584k9po0h	cmph3vkgw000004jv26dloav1	g-a-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gw04l50lysp9fx	cmph3vkgw000004jv26dloav1	g-a-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gx04l52yo6jmt8	cmph3vkgw000004jv26dloav1	g-b-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gy04l5tntm12wt	cmph3vkgw000004jv26dloav1	g-b-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01gz04l551x108u4	cmph3vkgw000004jv26dloav1	g-b-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h004l5jaaprajr	cmph3vkgw000004jv26dloav1	g-b-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h104l5viwa6ho9	cmph3vkgw000004jv26dloav1	g-b-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h204l55yw0ft2e	cmph3vkgw000004jv26dloav1	g-b-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h304l5hd5jjmvz	cmph3vkgw000004jv26dloav1	g-c-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h404l53lc7c29i	cmph3vkgw000004jv26dloav1	g-c-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h504l5y8cmyg2c	cmph3vkgw000004jv26dloav1	g-c-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h604l5pujvhiwj	cmph3vkgw000004jv26dloav1	g-c-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h704l5vg9ho94h	cmph3vkgw000004jv26dloav1	g-c-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h804l5ydy162xt	cmph3vkgw000004jv26dloav1	g-c-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01h904l5my1cg3z2	cmph3vkgw000004jv26dloav1	g-d-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ha04l5ys7n229t	cmph3vkgw000004jv26dloav1	g-d-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hb04l570ysiipc	cmph3vkgw000004jv26dloav1	g-d-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hc04l5eeenl8rh	cmph3vkgw000004jv26dloav1	g-d-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hd04l5z3gycl6g	cmph3vkgw000004jv26dloav1	g-d-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01he04l5i8a68t98	cmph3vkgw000004jv26dloav1	g-d-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hf04l50oiwvi52	cmph3vkgw000004jv26dloav1	g-e-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hg04l5npgvvp2p	cmph3vkgw000004jv26dloav1	g-e-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hh04l5x0dcwljt	cmph3vkgw000004jv26dloav1	g-e-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hi04l57kyh274a	cmph3vkgw000004jv26dloav1	g-e-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hj04l5hlt3vujp	cmph3vkgw000004jv26dloav1	g-e-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hk04l5crnx5x9m	cmph3vkgw000004jv26dloav1	g-e-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hl04l5vzenu0ry	cmph3vkgw000004jv26dloav1	g-f-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hm04l5eihd0ldk	cmph3vkgw000004jv26dloav1	g-f-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hn04l5voh2yi28	cmph3vkgw000004jv26dloav1	g-f-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ho04l51r1urscq	cmph3vkgw000004jv26dloav1	g-f-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hp04l5r8xhi4io	cmph3vkgw000004jv26dloav1	g-f-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hq04l5bgjmtuf7	cmph3vkgw000004jv26dloav1	g-f-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hr04l5ty27nl9t	cmph3vkgw000004jv26dloav1	g-g-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hs04l559361vv5	cmph3vkgw000004jv26dloav1	g-g-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ht04l5n2acj21p	cmph3vkgw000004jv26dloav1	g-g-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hu04l59q3bn9uz	cmph3vkgw000004jv26dloav1	g-g-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hv04l58a26o9uf	cmph3vkgw000004jv26dloav1	g-g-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hw04l55g9j6mdy	cmph3vkgw000004jv26dloav1	g-g-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hx04l541ctnr78	cmph3vkgw000004jv26dloav1	g-h-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hy04l5jxv9qtzq	cmph3vkgw000004jv26dloav1	g-h-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01hz04l5lqa7bwaz	cmph3vkgw000004jv26dloav1	g-h-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i004l52ktul9a3	cmph3vkgw000004jv26dloav1	g-h-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i104l5rtr8zy9g	cmph3vkgw000004jv26dloav1	g-h-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i204l5ksdrk2fu	cmph3vkgw000004jv26dloav1	g-h-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i304l5rnfty1xc	cmph3vkgw000004jv26dloav1	g-i-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i404l560oi63x7	cmph3vkgw000004jv26dloav1	g-i-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i504l5mrsqp324	cmph3vkgw000004jv26dloav1	g-i-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i604l57su5hcnx	cmph3vkgw000004jv26dloav1	g-i-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i704l5gvw554yt	cmph3vkgw000004jv26dloav1	g-i-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i804l5mupk2juu	cmph3vkgw000004jv26dloav1	g-i-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01i904l5yiuu5as2	cmph3vkgw000004jv26dloav1	g-j-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ia04l5dafupjzk	cmph3vkgw000004jv26dloav1	g-j-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ib04l5x8d7twip	cmph3vkgw000004jv26dloav1	g-j-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ic04l5zfyu278g	cmph3vkgw000004jv26dloav1	g-j-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01id04l5fweg0w1c	cmph3vkgw000004jv26dloav1	g-j-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ie04l5bp30w5t3	cmph3vkgw000004jv26dloav1	g-j-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01if04l53u8eyrtl	cmph3vkgw000004jv26dloav1	g-k-1	4	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ig04l58c5qoqm7	cmph3vkgw000004jv26dloav1	g-k-2	2	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ih04l5pxrpz0oj	cmph3vkgw000004jv26dloav1	g-k-3	2	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ii04l53z8257bv	cmph3vkgw000004jv26dloav1	g-k-4	1	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ij04l55769c45q	cmph3vkgw000004jv26dloav1	g-k-5	3	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ik04l5jx9qnd0a	cmph3vkgw000004jv26dloav1	g-k-6	2	3	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01il04l5o88yje8u	cmph3vkgw000004jv26dloav1	g-l-1	1	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01im04l55k83f2xz	cmph3vkgw000004jv26dloav1	g-l-2	0	1	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01in04l5rsw0phjg	cmph3vkgw000004jv26dloav1	g-l-3	0	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01io04l5m4ytg4dn	cmph3vkgw000004jv26dloav1	g-l-4	1	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01ip04l5dcsy5hr4	cmph3vkgw000004jv26dloav1	g-l-5	3	0	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi24nf01iq04l5ph4r0x88	cmph3vkgw000004jv26dloav1	g-l-6	0	2	\N	2026-05-26 10:35:56.811	2026-05-26 10:35:56.811
cmpmi253m01is04l5jj6l9gcw	cmpjngmms0084dccfd1x946cu	g-l-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01it04l5ba6y5cdn	cmpjngmms0084dccfd1x946cu	g-l-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01iu04l5ulg2p15x	cmpjngmms0084dccfd1x946cu	g-l-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01iv04l5y8qefbh1	cmpjngmms0084dccfd1x946cu	g-l-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01iw04l5xe7u3qhl	cmpjngmms0084dccfd1x946cu	g-a-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ix04l5h63829jv	cmpjngmms0084dccfd1x946cu	g-a-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01iy04l5bc0ud3cs	cmpjngmms0084dccfd1x946cu	g-a-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01iz04l5aku7pq2u	cmpjngmms0084dccfd1x946cu	g-a-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j004l5k53zyc2c	cmpjngmms0084dccfd1x946cu	g-a-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j104l5o5qzf3rz	cmpjngmms0084dccfd1x946cu	g-a-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j204l5g46q4wr6	cmpjngmms0084dccfd1x946cu	g-b-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j304l5eovyjwc9	cmpjngmms0084dccfd1x946cu	g-b-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j404l52z30qerb	cmpjngmms0084dccfd1x946cu	g-b-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j504l5f8hl3ahe	cmpjngmms0084dccfd1x946cu	g-b-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j604l5gw5dpcnb	cmpjngmms0084dccfd1x946cu	g-b-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j704l5fklzc78d	cmpjngmms0084dccfd1x946cu	g-b-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j804l5oxlhl2li	cmpjngmms0084dccfd1x946cu	g-c-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01j904l5p3rcbwye	cmpjngmms0084dccfd1x946cu	g-c-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ja04l5zs8ly9mf	cmpjngmms0084dccfd1x946cu	g-c-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jb04l5v5k03kui	cmpjngmms0084dccfd1x946cu	g-c-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jc04l5kjr5pby7	cmpjngmms0084dccfd1x946cu	g-c-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jd04l5joc9f4uy	cmpjngmms0084dccfd1x946cu	g-c-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01je04l5y620gaqq	cmpjngmms0084dccfd1x946cu	g-d-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jf04l5yihwmsqj	cmpjngmms0084dccfd1x946cu	g-d-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jg04l5hc67iwns	cmpjngmms0084dccfd1x946cu	g-d-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jh04l57z3rdilp	cmpjngmms0084dccfd1x946cu	g-d-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ji04l5yvddy4qc	cmpjngmms0084dccfd1x946cu	g-d-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jj04l5int3gay2	cmpjngmms0084dccfd1x946cu	g-d-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jk04l5bzjg9tp6	cmpjngmms0084dccfd1x946cu	g-e-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jl04l5dndw788v	cmpjngmms0084dccfd1x946cu	g-e-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jm04l5qy5as0sn	cmpjngmms0084dccfd1x946cu	g-e-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jn04l5g95fwfsr	cmpjngmms0084dccfd1x946cu	g-e-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jo04l5avapmbhb	cmpjngmms0084dccfd1x946cu	g-e-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jp04l5rzuubl6h	cmpjngmms0084dccfd1x946cu	g-e-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jq04l5dzztkoy4	cmpjngmms0084dccfd1x946cu	g-f-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jr04l52ttc9nvl	cmpjngmms0084dccfd1x946cu	g-f-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01js04l5878y3m7y	cmpjngmms0084dccfd1x946cu	g-f-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jt04l5tdw25sz8	cmpjngmms0084dccfd1x946cu	g-f-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ju04l54v4xrxuu	cmpjngmms0084dccfd1x946cu	g-f-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jv04l5haosfby8	cmpjngmms0084dccfd1x946cu	g-f-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jw04l5f4bsi2vv	cmpjngmms0084dccfd1x946cu	g-g-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jx04l5vy0a0w1n	cmpjngmms0084dccfd1x946cu	g-g-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jy04l5kyuxdofd	cmpjngmms0084dccfd1x946cu	g-g-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01jz04l5f5hkorjp	cmpjngmms0084dccfd1x946cu	g-g-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k004l5x6p3087f	cmpjngmms0084dccfd1x946cu	g-g-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k104l52u6leqpn	cmpjngmms0084dccfd1x946cu	g-g-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k204l5tv6hycta	cmpjngmms0084dccfd1x946cu	g-h-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k304l5d59c4f4l	cmpjngmms0084dccfd1x946cu	g-h-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k404l5htwq9vdp	cmpjngmms0084dccfd1x946cu	g-h-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k504l5ni7jbcau	cmpjngmms0084dccfd1x946cu	g-h-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k604l517ct4jp2	cmpjngmms0084dccfd1x946cu	g-h-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k704l5fxnrvien	cmpjngmms0084dccfd1x946cu	g-h-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k804l57lfcwv7f	cmpjngmms0084dccfd1x946cu	g-i-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01k904l5s1xd91xe	cmpjngmms0084dccfd1x946cu	g-i-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ka04l57q57ps2c	cmpjngmms0084dccfd1x946cu	g-i-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kb04l507smuxsy	cmpjngmms0084dccfd1x946cu	g-i-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kc04l5izes4mvi	cmpjngmms0084dccfd1x946cu	g-i-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kd04l5f6pqvcxz	cmpjngmms0084dccfd1x946cu	g-i-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ke04l5wwtgbsc3	cmpjngmms0084dccfd1x946cu	g-j-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kf04l5oxhndwun	cmpjngmms0084dccfd1x946cu	g-j-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kg04l5wj02detg	cmpjngmms0084dccfd1x946cu	g-j-3	0	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kh04l53eooosjq	cmpjngmms0084dccfd1x946cu	g-j-4	0	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ki04l5mmyflb9m	cmpjngmms0084dccfd1x946cu	g-j-5	1	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kj04l5q6ekjhyu	cmpjngmms0084dccfd1x946cu	g-j-6	3	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kk04l5nl7enwbr	cmpjngmms0084dccfd1x946cu	g-k-1	0	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kl04l5d73c7uf5	cmpjngmms0084dccfd1x946cu	g-k-2	4	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01km04l5mv1lsw8v	cmpjngmms0084dccfd1x946cu	g-k-3	2	0	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kn04l5gdx898mu	cmpjngmms0084dccfd1x946cu	g-k-4	2	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01ko04l5yat8mdga	cmpjngmms0084dccfd1x946cu	g-k-5	1	2	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kp04l5ub1c2xdu	cmpjngmms0084dccfd1x946cu	g-k-6	3	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kq04l5px1u1yn5	cmpjngmms0084dccfd1x946cu	g-l-1	2	3	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi253n01kr04l5v4hifnwn	cmpjngmms0084dccfd1x946cu	g-l-2	1	1	\N	2026-05-26 10:35:57.394	2026-05-26 10:35:57.394
cmpmi25d901kt04l5irw0z2wy	cmpl6easr000004l4gm2ndmr2	g-l-4	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ku04l5tsnevas6	cmpl6easr000004l4gm2ndmr2	g-l-5	0	4	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901kv04l5oo0b01oy	cmpl6easr000004l4gm2ndmr2	g-l-6	2	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901kw04l5lbrw48ys	cmpl6easr000004l4gm2ndmr2	g-a-1	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901kx04l5cmehmulq	cmpl6easr000004l4gm2ndmr2	g-a-2	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ky04l5ou2i3z09	cmpl6easr000004l4gm2ndmr2	g-a-3	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901kz04l5lmv8nd0t	cmpl6easr000004l4gm2ndmr2	g-a-4	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l004l5iw8pyf4s	cmpl6easr000004l4gm2ndmr2	g-a-6	1	3	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l104l57vxuzilj	cmpl6easr000004l4gm2ndmr2	g-a-5	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l204l52h67ox41	cmpl6easr000004l4gm2ndmr2	g-b-1	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l304l56ydjdv5k	cmpl6easr000004l4gm2ndmr2	g-b-2	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l404l5rciq5wff	cmpl6easr000004l4gm2ndmr2	g-b-3	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l504l52aokr6z3	cmpl6easr000004l4gm2ndmr2	g-b-4	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l604l5sthp6ad0	cmpl6easr000004l4gm2ndmr2	g-b-5	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l704l5tjjttok3	cmpl6easr000004l4gm2ndmr2	g-b-6	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l804l5ga56bgz6	cmpl6easr000004l4gm2ndmr2	g-c-2	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901l904l5lakkx3y4	cmpl6easr000004l4gm2ndmr2	g-c-1	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901la04l55sxie9rh	cmpl6easr000004l4gm2ndmr2	g-c-4	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lb04l5acmjh6ey	cmpl6easr000004l4gm2ndmr2	g-c-3	4	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lc04l5vwrbi2a3	cmpl6easr000004l4gm2ndmr2	g-c-5	1	3	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ld04l59xx53rmd	cmpl6easr000004l4gm2ndmr2	g-c-6	4	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901le04l5a7qg1cqu	cmpl6easr000004l4gm2ndmr2	g-d-1	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lf04l5eqvsgmjt	cmpl6easr000004l4gm2ndmr2	g-d-2	1	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lg04l5zyym6swj	cmpl6easr000004l4gm2ndmr2	g-d-4	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lh04l5d9k9i3i3	cmpl6easr000004l4gm2ndmr2	g-d-3	2	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901li04l51bfgwifa	cmpl6easr000004l4gm2ndmr2	g-d-5	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lj04l5xl9ki560	cmpl6easr000004l4gm2ndmr2	g-d-6	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lk04l5a18ia1ek	cmpl6easr000004l4gm2ndmr2	g-e-2	4	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ll04l5alqpyeu8	cmpl6easr000004l4gm2ndmr2	g-e-1	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lm04l584xoylq3	cmpl6easr000004l4gm2ndmr2	g-e-3	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ln04l5hmsfdxt9	cmpl6easr000004l4gm2ndmr2	g-e-4	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lo04l5yrm7lq45	cmpl6easr000004l4gm2ndmr2	g-e-5	0	3	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lp04l5dx1lczac	cmpl6easr000004l4gm2ndmr2	g-e-6	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lq04l5f5kbv8gk	cmpl6easr000004l4gm2ndmr2	g-f-1	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lr04l50gw0ygw7	cmpl6easr000004l4gm2ndmr2	g-f-2	1	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ls04l51ui4fllm	cmpl6easr000004l4gm2ndmr2	g-f-3	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lt04l5qdx5eiys	cmpl6easr000004l4gm2ndmr2	g-f-4	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lu04l56j4x6bl9	cmpl6easr000004l4gm2ndmr2	g-f-5	2	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lv04l5wglkch96	cmpl6easr000004l4gm2ndmr2	g-f-6	0	3	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lw04l5oojph7lb	cmpl6easr000004l4gm2ndmr2	g-g-1	3	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lx04l5d626dkgk	cmpl6easr000004l4gm2ndmr2	g-g-2	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ly04l5e1q3eia0	cmpl6easr000004l4gm2ndmr2	g-g-3	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901lz04l5bwgb8hae	cmpl6easr000004l4gm2ndmr2	g-g-4	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m004l589r61lxz	cmpl6easr000004l4gm2ndmr2	g-g-5	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m104l5w7y4vqip	cmpl6easr000004l4gm2ndmr2	g-g-6	0	4	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m204l5i83h33px	cmpl6easr000004l4gm2ndmr2	g-h-1	4	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m304l5p355jjp4	cmpl6easr000004l4gm2ndmr2	g-h-2	1	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m404l5mfemscsy	cmpl6easr000004l4gm2ndmr2	g-h-3	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m504l5nl1vx5z1	cmpl6easr000004l4gm2ndmr2	g-h-4	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m604l54fpyb9re	cmpl6easr000004l4gm2ndmr2	g-h-6	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m704l5sfuqe559	cmpl6easr000004l4gm2ndmr2	g-h-5	1	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m804l5uzshta2s	cmpl6easr000004l4gm2ndmr2	g-i-1	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901m904l5dou68iog	cmpl6easr000004l4gm2ndmr2	g-i-2	0	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901ma04l53rv8qpwq	cmpl6easr000004l4gm2ndmr2	g-i-4	4	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901mb04l5wp2z7dcc	cmpl6easr000004l4gm2ndmr2	g-i-3	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901mc04l5w8beggvr	cmpl6easr000004l4gm2ndmr2	g-i-5	2	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901md04l5nmm8k52x	cmpl6easr000004l4gm2ndmr2	g-i-6	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901me04l5uyr2712p	cmpl6easr000004l4gm2ndmr2	g-j-1	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901mf04l5lum09zh2	cmpl6easr000004l4gm2ndmr2	g-j-2	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901mg04l5rvqbarjy	cmpl6easr000004l4gm2ndmr2	g-j-3	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25d901mh04l52kquo8zr	cmpl6easr000004l4gm2ndmr2	g-j-4	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mi04l5p9b9sjl7	cmpl6easr000004l4gm2ndmr2	g-j-5	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mj04l5enwu0slh	cmpl6easr000004l4gm2ndmr2	g-j-6	0	4	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mk04l5sd85djal	cmpl6easr000004l4gm2ndmr2	g-k-1	3	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01ml04l5yzougzz4	cmpl6easr000004l4gm2ndmr2	g-k-2	1	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mm04l5ascvqrye	cmpl6easr000004l4gm2ndmr2	g-k-3	3	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mn04l5t3sez8so	cmpl6easr000004l4gm2ndmr2	g-k-4	2	0	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mo04l5tgsxwu3u	cmpl6easr000004l4gm2ndmr2	g-k-5	2	2	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mp04l5b703y5nl	cmpl6easr000004l4gm2ndmr2	g-k-6	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mq04l5rin80m7u	cmpl6easr000004l4gm2ndmr2	g-l-1	1	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01mr04l5hpv0h2ik	cmpl6easr000004l4gm2ndmr2	g-l-2	2	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25da01ms04l5y2a44lee	cmpl6easr000004l4gm2ndmr2	g-l-3	3	1	\N	2026-05-26 10:35:57.741	2026-05-26 10:35:57.741
cmpmi25mx01mu04l5qy3c23t0	cmplcmk23004204jp5rzexew5	g-a-1	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01mv04l53f5oww2s	cmplcmk23004204jp5rzexew5	g-a-2	1	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01mw04l5wpmzhqy8	cmplcmk23004204jp5rzexew5	g-a-3	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01mx04l5m853wdpj	cmplcmk23004204jp5rzexew5	g-a-4	1	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01my04l5pukwhcwn	cmplcmk23004204jp5rzexew5	g-a-5	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01mz04l5dsnypk10	cmplcmk23004204jp5rzexew5	g-a-6	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n004l5g8a24naf	cmplcmk23004204jp5rzexew5	g-b-1	1	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n104l5evh78tgi	cmplcmk23004204jp5rzexew5	g-b-2	1	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n204l54somf1am	cmplcmk23004204jp5rzexew5	g-b-3	3	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n304l57gqaiuvn	cmplcmk23004204jp5rzexew5	g-b-4	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n404l5a0fjxc01	cmplcmk23004204jp5rzexew5	g-b-5	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n504l52jg0eido	cmplcmk23004204jp5rzexew5	g-b-6	1	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n604l5hb3uz4sl	cmplcmk23004204jp5rzexew5	g-d-1	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n704l5svaasha6	cmplcmk23004204jp5rzexew5	g-d-4	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n804l5qgu63m0d	cmplcmk23004204jp5rzexew5	g-d-2	0	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01n904l5o9tn7ura	cmplcmk23004204jp5rzexew5	g-d-3	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01na04l5dzh8upnb	cmplcmk23004204jp5rzexew5	g-d-5	3	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nb04l513yzgvzd	cmplcmk23004204jp5rzexew5	g-d-6	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nc04l5j4slybbs	cmplcmk23004204jp5rzexew5	g-c-2	3	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nd04l5a3xsk0px	cmplcmk23004204jp5rzexew5	g-c-1	0	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01ne04l5m6lj0o3z	cmplcmk23004204jp5rzexew5	g-c-4	1	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nf04l5kf7pdtjt	cmplcmk23004204jp5rzexew5	g-c-3	5	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01ng04l53gykp5gb	cmplcmk23004204jp5rzexew5	g-c-5	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nh04l5qezo4hq4	cmplcmk23004204jp5rzexew5	g-c-6	4	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01ni04l58vjqjmxv	cmplcmk23004204jp5rzexew5	g-e-2	5	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nj04l5vm5avjhj	cmplcmk23004204jp5rzexew5	g-e-1	1	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nk04l50rv7t6a1	cmplcmk23004204jp5rzexew5	g-e-3	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nl04l52lkyaju8	cmplcmk23004204jp5rzexew5	g-e-4	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nm04l507kg6nso	cmplcmk23004204jp5rzexew5	g-e-5	0	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nn04l5qq52i9b4	cmplcmk23004204jp5rzexew5	g-e-6	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01no04l5n4f1vzzz	cmplcmk23004204jp5rzexew5	g-f-1	3	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01np04l5f24os2c3	cmplcmk23004204jp5rzexew5	g-f-2	1	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nq04l51u2pbbex	cmplcmk23004204jp5rzexew5	g-f-3	4	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nr04l5w4qchqxq	cmplcmk23004204jp5rzexew5	g-f-4	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01ns04l5pekxn93h	cmplcmk23004204jp5rzexew5	g-f-5	1	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nt04l5er7mb1hy	cmplcmk23004204jp5rzexew5	g-f-6	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nu04l5jmqu2miq	cmplcmk23004204jp5rzexew5	g-g-1	3	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nv04l5xgntrvli	cmplcmk23004204jp5rzexew5	g-g-2	0	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nw04l56hv8whk3	cmplcmk23004204jp5rzexew5	g-g-3	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nx04l5ue1k5jjf	cmplcmk23004204jp5rzexew5	g-g-4	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01ny04l5eah9hk2e	cmplcmk23004204jp5rzexew5	g-g-5	1	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01nz04l52nsgs2zp	cmplcmk23004204jp5rzexew5	g-g-6	0	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o004l5hdw4a5vm	cmplcmk23004204jp5rzexew5	g-h-1	5	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o104l5ojrxz09s	cmplcmk23004204jp5rzexew5	g-h-2	1	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o204l5hx381jq7	cmplcmk23004204jp5rzexew5	g-h-3	3	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o304l5gvfz98p5	cmplcmk23004204jp5rzexew5	g-h-4	3	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o404l5lyafvlyb	cmplcmk23004204jp5rzexew5	g-h-6	1	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o504l5h64vf8ck	cmplcmk23004204jp5rzexew5	g-h-5	1	4	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o604l5afotoiet	cmplcmk23004204jp5rzexew5	g-j-1	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o704l51wkih4xx	cmplcmk23004204jp5rzexew5	g-j-2	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o804l5dtd6aslj	cmplcmk23004204jp5rzexew5	g-j-3	1	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25mx01o904l52pmgwtrl	cmplcmk23004204jp5rzexew5	g-j-4	0	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oa04l5r2ghljei	cmplcmk23004204jp5rzexew5	g-j-5	2	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01ob04l5ul2wkjoo	cmplcmk23004204jp5rzexew5	g-j-6	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oc04l5kp0ndi0k	cmplcmk23004204jp5rzexew5	g-i-1	4	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01od04l5vhyg10z6	cmplcmk23004204jp5rzexew5	g-i-2	0	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oe04l5or93uqlr	cmplcmk23004204jp5rzexew5	g-i-4	5	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01of04l5qzbcbmpp	cmplcmk23004204jp5rzexew5	g-i-3	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01og04l5i10x0sac	cmplcmk23004204jp5rzexew5	g-i-5	2	5	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oh04l5b7qmbj51	cmplcmk23004204jp5rzexew5	g-i-6	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oi04l5ear4gwfa	cmplcmk23004204jp5rzexew5	g-k-1	3	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oj04l50b6grx9k	cmplcmk23004204jp5rzexew5	g-k-2	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01ok04l59v5uui9l	cmplcmk23004204jp5rzexew5	g-k-3	3	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01ol04l5sptx1mps	cmplcmk23004204jp5rzexew5	g-k-4	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01om04l5ggioj3o2	cmplcmk23004204jp5rzexew5	g-k-5	1	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01on04l5tr5o2asi	cmplcmk23004204jp5rzexew5	g-k-6	1	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oo04l5zqhbem56	cmplcmk23004204jp5rzexew5	g-l-1	2	0	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01op04l5amh1b3uu	cmplcmk23004204jp5rzexew5	g-l-2	2	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01oq04l5xq8c8kn1	cmplcmk23004204jp5rzexew5	g-l-3	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01or04l5ssq22k49	cmplcmk23004204jp5rzexew5	g-l-4	0	2	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01os04l5uyidrdqh	cmplcmk23004204jp5rzexew5	g-l-5	0	3	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25my01ot04l58g5za5w3	cmplcmk23004204jp5rzexew5	g-l-6	2	1	\N	2026-05-26 10:35:58.089	2026-05-26 10:35:58.089
cmpmi25wj01ov04l5rpc28zop	cmplduq6h004304jvhp7rh930	g-a-1	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01ow04l52grz5x3w	cmplduq6h004304jvhp7rh930	g-a-2	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01ox04l5eofu5tag	cmplduq6h004304jvhp7rh930	g-a-3	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01oy04l50qmn2xy8	cmplduq6h004304jvhp7rh930	g-a-4	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01oz04l5koy6cpvh	cmplduq6h004304jvhp7rh930	g-a-5	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p004l5k3wjcf3m	cmplduq6h004304jvhp7rh930	g-a-6	2	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p104l5v6l2ddx6	cmplduq6h004304jvhp7rh930	g-b-1	0	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p204l5ih8dd4z1	cmplduq6h004304jvhp7rh930	g-b-2	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p304l5uv9o3lbk	cmplduq6h004304jvhp7rh930	g-b-3	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p404l5m1u2emsh	cmplduq6h004304jvhp7rh930	g-b-4	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p504l5jgy7c6ox	cmplduq6h004304jvhp7rh930	g-b-5	3	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p604l5ah25uf4r	cmplduq6h004304jvhp7rh930	g-b-6	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p704l5ryebedga	cmplduq6h004304jvhp7rh930	g-c-2	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p804l5ej2q1yj7	cmplduq6h004304jvhp7rh930	g-c-1	0	4	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01p904l5btdyjsey	cmplduq6h004304jvhp7rh930	g-c-4	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pa04l57yp75cbn	cmplduq6h004304jvhp7rh930	g-c-3	6	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pb04l513n50tnz	cmplduq6h004304jvhp7rh930	g-c-5	0	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pc04l5zq1jhxg4	cmplduq6h004304jvhp7rh930	g-c-6	4	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pd04l5tcqgjtz9	cmplduq6h004304jvhp7rh930	g-d-1	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pe04l5tt327xkh	cmplduq6h004304jvhp7rh930	g-d-2	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pf04l594q9i4qy	cmplduq6h004304jvhp7rh930	g-d-4	2	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pg04l5bugtpty2	cmplduq6h004304jvhp7rh930	g-d-3	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01ph04l5emoqn1nv	cmplduq6h004304jvhp7rh930	g-d-5	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pi04l54eajbfen	cmplduq6h004304jvhp7rh930	g-d-6	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pj04l522xhpk12	cmplduq6h004304jvhp7rh930	g-e-2	4	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pk04l5eov4h5dm	cmplduq6h004304jvhp7rh930	g-e-1	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pl04l5oawk9abc	cmplduq6h004304jvhp7rh930	g-e-3	3	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pm04l5t8o6wxws	cmplduq6h004304jvhp7rh930	g-e-4	3	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pn04l5jpi5u47d	cmplduq6h004304jvhp7rh930	g-e-5	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01po04l5ppn462zd	cmplduq6h004304jvhp7rh930	g-e-6	1	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pp04l5xvakdq3y	cmplduq6h004304jvhp7rh930	g-f-1	3	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pq04l5nydn0l6z	cmplduq6h004304jvhp7rh930	g-f-2	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pr04l5o3p9w8km	cmplduq6h004304jvhp7rh930	g-f-3	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01ps04l5z66o7b8k	cmplduq6h004304jvhp7rh930	g-f-4	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pt04l5tkkju2td	cmplduq6h004304jvhp7rh930	g-f-5	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pu04l56d2zp3db	cmplduq6h004304jvhp7rh930	g-f-6	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pv04l59rpr9u6o	cmplduq6h004304jvhp7rh930	g-g-1	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pw04l5i6rku9t0	cmplduq6h004304jvhp7rh930	g-g-2	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01px04l5nl8kqglt	cmplduq6h004304jvhp7rh930	g-g-3	4	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01py04l5hli4ewz6	cmplduq6h004304jvhp7rh930	g-g-4	0	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01pz04l50jphs12l	cmplduq6h004304jvhp7rh930	g-g-5	2	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q004l5jee2237d	cmplduq6h004304jvhp7rh930	g-g-6	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q104l595sf1aa7	cmplduq6h004304jvhp7rh930	g-h-1	6	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q204l5rg6ggq5t	cmplduq6h004304jvhp7rh930	g-h-2	1	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q304l5nre2bdzu	cmplduq6h004304jvhp7rh930	g-h-3	4	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q404l5y5opdofl	cmplduq6h004304jvhp7rh930	g-h-4	4	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q504l5gf4mwonp	cmplduq6h004304jvhp7rh930	g-h-6	0	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q604l5whdk89hf	cmplduq6h004304jvhp7rh930	g-h-5	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q704l5sqst71cs	cmplduq6h004304jvhp7rh930	g-i-1	3	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q804l5rer9ntmq	cmplduq6h004304jvhp7rh930	g-i-2	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01q904l5w83a0tqy	cmplduq6h004304jvhp7rh930	g-i-4	3	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qa04l5eu6lzuna	cmplduq6h004304jvhp7rh930	g-i-3	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qb04l58quau9t1	cmplduq6h004304jvhp7rh930	g-i-5	1	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qc04l56i1rwoww	cmplduq6h004304jvhp7rh930	g-i-6	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qd04l5z8zdm2ho	cmplduq6h004304jvhp7rh930	g-j-1	2	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qe04l5v8bxnain	cmplduq6h004304jvhp7rh930	g-j-2	2	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qf04l5957vd5yh	cmplduq6h004304jvhp7rh930	g-j-3	3	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qg04l58gsylk70	cmplduq6h004304jvhp7rh930	g-j-4	0	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qh04l5xar1zia3	cmplduq6h004304jvhp7rh930	g-j-5	1	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qi04l5i3lq7smw	cmplduq6h004304jvhp7rh930	g-j-6	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qj04l5i9g96h1s	cmplduq6h004304jvhp7rh930	g-k-1	5	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qk04l5jefgzjoj	cmplduq6h004304jvhp7rh930	g-k-2	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01ql04l5cv4hmr0i	cmplduq6h004304jvhp7rh930	g-k-3	3	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qm04l5qbocriui	cmplduq6h004304jvhp7rh930	g-k-4	3	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wj01qn04l5yw30fbfe	cmplduq6h004304jvhp7rh930	g-k-5	1	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qo04l5iwyy6247	cmplduq6h004304jvhp7rh930	g-k-6	1	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qp04l56cdej03q	cmplduq6h004304jvhp7rh930	g-l-1	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qq04l5zc8mz301	cmplduq6h004304jvhp7rh930	g-l-2	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qr04l5jkxggkff	cmplduq6h004304jvhp7rh930	g-l-3	2	0	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qs04l54lgq4pji	cmplduq6h004304jvhp7rh930	g-l-4	0	2	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qt04l5cexkuoyb	cmplduq6h004304jvhp7rh930	g-l-5	0	3	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmi25wk01qu04l5rvfwc4d8	cmplduq6h004304jvhp7rh930	g-l-6	2	1	\N	2026-05-26 10:35:58.435	2026-05-26 10:35:58.435
cmpmgpcad02hltwcfgcpc6cpy	cmpmf8sdo00ka04lafculwres	g-a-1	2	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hmtwcf7u09ixp0	cmpmf8sdo00ka04lafculwres	g-a-2	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hntwcfd8mfavyu	cmpmf8sdo00ka04lafculwres	g-a-3	3	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hotwcfgcudsfrq	cmpmf8sdo00ka04lafculwres	g-a-4	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hptwcf7hjc7ng7	cmpmf8sdo00ka04lafculwres	g-a-5	2	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hqtwcf1ozsap8h	cmpmf8sdo00ka04lafculwres	g-a-6	0	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hrtwcfodsopxi7	cmpmf8sdo00ka04lafculwres	g-b-1	2	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hstwcf1xf7asxf	cmpmf8sdo00ka04lafculwres	g-b-2	1	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02httwcfr4wytl8l	cmpmf8sdo00ka04lafculwres	g-b-3	0	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hutwcf8vluj4g7	cmpmf8sdo00ka04lafculwres	g-b-4	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hvtwcf9oqk6idv	cmpmf8sdo00ka04lafculwres	g-b-5	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hwtwcf0gcjzw1v	cmpmf8sdo00ka04lafculwres	g-b-6	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hxtwcfq8sr50s9	cmpmf8sdo00ka04lafculwres	g-c-2	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hytwcfcndjjfpf	cmpmf8sdo00ka04lafculwres	g-c-1	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02hztwcfzuprkbq3	cmpmf8sdo00ka04lafculwres	g-c-4	1	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02i0twcf7f2h8qe1	cmpmf8sdo00ka04lafculwres	g-c-3	4	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02i1twcfzj3ix4xg	cmpmf8sdo00ka04lafculwres	g-c-5	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcad02i2twcffg43uhuz	cmpmf8sdo00ka04lafculwres	g-c-6	3	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i3twcfsiaj26r3	cmpmf8sdo00ka04lafculwres	g-d-1	1	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i4twcfeqrnh3yj	cmpmf8sdo00ka04lafculwres	g-d-2	0	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i5twcffpqy8ii6	cmpmf8sdo00ka04lafculwres	g-d-4	1	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i6twcf3ngqc0l0	cmpmf8sdo00ka04lafculwres	g-d-3	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i7twcfrcic8sur	cmpmf8sdo00ka04lafculwres	g-d-5	1	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i8twcfa8f49hzg	cmpmf8sdo00ka04lafculwres	g-d-6	0	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02i9twcf84cisand	cmpmf8sdo00ka04lafculwres	g-e-2	4	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iatwcfvrps85tr	cmpmf8sdo00ka04lafculwres	g-e-1	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ibtwcf7ypvwtl2	cmpmf8sdo00ka04lafculwres	g-e-3	5	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ictwcfiytzfvrp	cmpmf8sdo00ka04lafculwres	g-e-4	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02idtwcf5cvoq80b	cmpmf8sdo00ka04lafculwres	g-e-5	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ietwcfhi7yyv4n	cmpmf8sdo00ka04lafculwres	g-e-6	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iftwcfuy8d4vsx	cmpmf8sdo00ka04lafculwres	g-f-1	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02igtwcfzpe2pp94	cmpmf8sdo00ka04lafculwres	g-f-2	2	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ihtwcfkitu8f63	cmpmf8sdo00ka04lafculwres	g-f-3	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iitwcfy6fda6tj	cmpmf8sdo00ka04lafculwres	g-f-4	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ijtwcfjff7z0tu	cmpmf8sdo00ka04lafculwres	g-f-5	0	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iktwcf0b6m85bm	cmpmf8sdo00ka04lafculwres	g-f-6	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iltwcfefu1gkh8	cmpmf8sdo00ka04lafculwres	g-g-1	3	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02imtwcfgh0vejx1	cmpmf8sdo00ka04lafculwres	g-g-2	0	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02intwcfurt1sjab	cmpmf8sdo00ka04lafculwres	g-g-3	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iotwcfd3ie5zzw	cmpmf8sdo00ka04lafculwres	g-g-4	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iptwcfvujj8b8z	cmpmf8sdo00ka04lafculwres	g-g-5	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iqtwcfv7l4oztl	cmpmf8sdo00ka04lafculwres	g-g-6	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02irtwcf9r52cxax	cmpmf8sdo00ka04lafculwres	g-h-1	4	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02istwcfhmnzpwaj	cmpmf8sdo00ka04lafculwres	g-h-2	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ittwcfg2ej9mk7	cmpmf8sdo00ka04lafculwres	g-h-3	3	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iutwcfrkvmiydc	cmpmf8sdo00ka04lafculwres	g-h-4	3	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ivtwcft7lljyp7	cmpmf8sdo00ka04lafculwres	g-h-6	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iwtwcf2e31fxwp	cmpmf8sdo00ka04lafculwres	g-h-5	2	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02ixtwcf78zicig8	cmpmf8sdo00ka04lafculwres	g-i-1	3	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iytwcf71v6m63k	cmpmf8sdo00ka04lafculwres	g-i-2	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02iztwcf82rm8je6	cmpmf8sdo00ka04lafculwres	g-i-4	4	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02j0twcfbrg133zy	cmpmf8sdo00ka04lafculwres	g-i-3	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02j1twcf4xo0ozr4	cmpmf8sdo00ka04lafculwres	g-i-5	0	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcae02j2twcf0qjlsmpa	cmpmf8sdo00ka04lafculwres	g-i-6	4	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j3twcf5gz9o8eq	cmpmf8sdo00ka04lafculwres	g-j-1	2	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j4twcfdk02z7ri	cmpmf8sdo00ka04lafculwres	g-j-2	1	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j5twcfve9q8g0a	cmpmf8sdo00ka04lafculwres	g-j-3	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j6twcfat66kkl1	cmpmf8sdo00ka04lafculwres	g-j-4	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j7twcf0smefap2	cmpmf8sdo00ka04lafculwres	g-j-5	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j8twcfu2qmfkol	cmpmf8sdo00ka04lafculwres	g-j-6	0	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02j9twcfhdo1s3qi	cmpmf8sdo00ka04lafculwres	g-k-1	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jatwcf5d4x1reh	cmpmf8sdo00ka04lafculwres	g-k-2	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jbtwcfv1txj7gk	cmpmf8sdo00ka04lafculwres	g-k-3	3	0	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jctwcfmy3kcyed	cmpmf8sdo00ka04lafculwres	g-k-4	2	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jdtwcfpf5spqsy	cmpmf8sdo00ka04lafculwres	g-k-5	1	3	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jetwcfp9eyaj16	cmpmf8sdo00ka04lafculwres	g-k-6	1	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jftwcfoi4pl1gt	cmpmf8sdo00ka04lafculwres	g-l-1	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jgtwcfxx5def9q	cmpmf8sdo00ka04lafculwres	g-l-2	2	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jhtwcfkr45qd21	cmpmf8sdo00ka04lafculwres	g-l-3	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jitwcfvkvzo4n8	cmpmf8sdo00ka04lafculwres	g-l-4	0	2	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jjtwcfb4u4brpo	cmpmf8sdo00ka04lafculwres	g-l-5	0	4	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
cmpmgpcaf02jktwcft58d1g33	cmpmf8sdo00ka04lafculwres	g-l-6	2	1	\N	2026-05-26 09:58:00.565	2026-05-26 09:58:00.565
\.


--
-- Data for Name: Participant; Type: TABLE DATA; Schema: public; Owner: prisma_migration
--

COPY public."Participant" (id, name, contact, "accessCode", status, "createdAt", "updatedAt") FROM stdin;
f777cd32-4a9e-4376-8e2d-19c89246b83a	Pepe Aparicio	699728359	Paparicio1188	validado	2026-05-25 11:29:22.397	2026-05-26 10:35:56.701
8c5bbc60-a85f-4b2a-a7f1-902bc46aa1d8	Juan Gabriel Aguilar	677426314	Juan6417	validado	2026-05-25 15:14:30.988	2026-05-26 10:35:56.863
42a6cc9f-baf4-4864-8827-ca2f10923972	Gloria	67	Gloria3946	validado	2026-05-22 10:52:55.095	2026-05-26 10:35:56.376
c4c5f2eb-4838-43ed-9dee-8a9f5ca81dbd	Prueba	6	Prueba6235	retirado	2026-05-23 13:32:46.377	2026-05-26 10:35:56.457
af5a8dd2-0361-4a00-b762-9c81f76b3634	José Sánchez	661357643	Jsanchez9520	validado	2026-05-25 11:25:53.37	2026-05-26 10:35:56.538
dbfa639a-02f0-4178-b54e-08cdf3fcf338	Javi Martin	660471131	Jmasca5801	validado	2026-05-25 11:27:59.095	2026-05-26 10:35:56.619
67fcef70-59fa-4a29-829c-15faf0601440	Jose Manuel Martín	222	Jose8041	validado	2026-05-22 10:52:55.013	2026-05-26 10:35:56.293
466fc0bd-ba2d-4612-b9e1-bca11a91ffc5	José Díez	659597024	Jdiez7903	validado	2026-05-25 11:32:09.376	2026-05-26 10:35:56.782
\.


--
-- Data for Name: Prediction; Type: TABLE DATA; Schema: public; Owner: prisma_migration
--

COPY public."Prediction" (id, "participantId", locked, champion, semifinalists, "topScorer", mvp, "groupWinners", "groupQualified", "bestThirds", "createdAt", "updatedAt", "reopenRequested", "verificationCode") FROM stdin;
cmplduq6h004304jvhp7rh930	466fc0bd-ba2d-4612-b9e1-bca11a91ffc5	f	France	["England", "Spain", "France", "Brazil"]	mbape	pedri	{}	{"A": ["Mexico", "Czechia", "South Africa"], "B": ["Switzerland", "Bosnia and Herzegovina", "Canada"], "C": ["Brazil", "Morocco", "Scotland"], "D": ["United States", "Paraguay", "Turkiye"], "E": ["Germany", "Ivory Coast", "Ecuador"], "F": ["Netherlands", "Sweden", "Tunisia"], "G": ["Belgium", "Egypt", "New Zealand"], "H": ["Spain", "Saudi Arabia", "Uruguay"], "I": ["France", "Norway", "Senegal"], "J": ["Argentina", "Austria", "Algeria"], "K": ["Portugal", "Colombia", "Uzbekistan"], "L": ["Ghana", "England", "Croatia"]}	["Japan", "South Africa", "Scotland", "Paraguay", "Canada", "Ivory Coast", "New Zealand", "Saudi Arabia"]	2026-05-25 15:50:26.825	2026-05-26 10:35:58.262	f	\N
cmph3vkqv002104jv9xjoils7	42a6cc9f-baf4-4864-8827-ca2f10923972	t	Argentina	["Argentina", "Canada", "DR Congo", "Ghana"]	Kylian Mbappe	Pedri	{"A": "South Korea", "B": "Switzerland", "C": "Haiti", "D": "Turkiye", "E": "Germany", "F": "Tunisia", "G": "Belgium", "H": "Uruguay", "I": "Iraq", "J": "Jordan", "K": "Uzbekistan", "L": "Panama"}	{"A": ["South Korea", "Czechia", "Mexico"], "B": ["Switzerland", "Canada", "Qatar"], "C": ["Haiti", "Brazil"], "D": ["Turkiye", "United States", "Australia"], "E": ["Germany", "Curacao", "Ivory Coast"], "F": ["Tunisia", "Netherlands", "Japan"], "G": ["Belgium", "Egypt", "Iran"], "H": ["Uruguay", "Saudi Arabia"], "I": ["Iraq", "Norway", "France"], "J": ["Jordan", "Argentina", "Algeria"], "K": ["Uzbekistan", "Portugal"], "L": ["Panama", "Ghana"]}	["Algeria", "Japan", "Ivory Coast", "Iran", "Australia", "Qatar", "France", "Mexico"]	2026-05-22 16:00:05.575	2026-05-26 10:35:57.057	f	PORRA-2026-CCC5AB85
cmpjngmms0084dccfd1x946cu	c4c5f2eb-4838-43ed-9dee-8a9f5ca81dbd	f	Brazil	["Brazil", "Czechia", "Germany", "Japan"]	Harry Kane	Lionel Messi	{"A": "South Africa", "B": "Bosnia and Herzegovina", "C": "Brazil", "D": "Paraguay", "E": "Ecuador", "F": "Japan", "G": "Iran", "H": "Cape Verde", "I": "Senegal", "J": "Algeria", "K": "DR Congo", "L": "Panama"}	{"A": ["South Africa", "South Korea", "Mexico"], "B": ["Bosnia and Herzegovina", "Switzerland"], "C": ["Brazil", "Scotland", "Morocco"], "D": ["Paraguay", "Turkiye"], "E": ["Ecuador", "Germany"], "F": ["Japan", "Tunisia", "Sweden"], "G": ["Iran", "Egypt", "New Zealand"], "H": ["Cape Verde", "Uruguay", "Saudi Arabia"], "I": ["Senegal", "Iraq", "France"], "J": ["Jordan", "Austria", "Argentina"], "K": ["DR Congo", "Portugal", "Uzbekistan"], "L": ["Panama", "Croatia"]}	["Morocco", "New Zealand", "Austria", "Sweden", "France", "Mexico", "Saudi Arabia", "Uzbekistan"]	2026-05-24 10:43:52.852	2026-05-26 10:35:57.221	f	PORRA-2026-5FF4F108
cmph3vkgw000004jv26dloav1	67fcef70-59fa-4a29-829c-15faf0601440	t	Argentina	["Argentina", "Canada", "DR Congo", "Ghana"]	Jose 26.005.2026	Pedri	{"A": "South Korea", "B": "Switzerland", "C": "Haiti", "D": "Turkiye", "E": "Germany", "F": "Tunisia", "G": "Belgium", "H": "Uruguay", "I": "Iraq", "J": "Jordan", "K": "Uzbekistan", "L": "Panama"}	{"A": ["South Korea", "Czechia", "Mexico"], "B": ["Switzerland", "Canada", "Qatar"], "C": ["Haiti", "Brazil", "Morocco"], "D": ["Turkiye", "United States", "Australia"], "E": ["Germany", "Curacao", "Ivory Coast"], "F": ["Tunisia", "Netherlands", "Japan"], "G": ["Belgium", "Egypt", "Iran"], "H": ["Uruguay", "Saudi Arabia", "Cape Verde"], "I": ["Iraq", "Norway", "France"], "J": ["Jordan", "Argentina", "Algeria"], "K": ["Uzbekistan", "Portugal", "DR Congo"], "L": ["Panama", "Ghana", "England"]}	["Algeria", "Japan", "Ivory Coast", "Iran", "Australia", "Qatar", "France", "Mexico"]	2026-05-22 16:00:05.216	2026-05-26 10:35:56.635	f	PORRA-2026-9C70E32A
cmplcmk23004204jp5rzexew5	8c5bbc60-a85f-4b2a-a7f1-902bc46aa1d8	f	Spain	["Spain", "Portugal", "France", "England"]	Mbappé	Lamine Yamal	{"A": "Mexico", "B": "Switzerland", "C": "Brazil", "D": "Turkiye", "E": "Germany", "F": "Netherlands", "G": "Belgium", "H": "Spain", "I": "France", "J": "Argentina", "K": "Portugal", "L": "England"}	{"A": ["Mexico", "South Korea", "Czechia"], "B": ["Bosnia and Herzegovina", "Canada", "Switzerland"], "C": ["Morocco", "Scotland", "Brazil"], "D": ["Turkiye", "Paraguay", "United States"], "E": ["Germany", "Ivory Coast", "Ecuador"], "F": ["Netherlands", "Tunisia", "Japan"], "G": ["Belgium", "Egypt", "Iran"], "H": ["Spain", "Saudi Arabia", "Uruguay"], "I": ["France", "Senegal", "Norway"], "J": ["Argentina", "Algeria", "Austria"], "K": ["Portugal", "Colombia", "DR Congo"], "L": ["England", "Croatia", "Ghana"]}	["Senegal", "South Korea", "Tunisia", "Scotland", "United States", "Saudi Arabia", "Ghana", "Ivory Coast"]	2026-05-25 15:16:06.027	2026-05-26 10:35:57.916	f	\N
cmpmf8sdo00ka04lafculwres	dbfa639a-02f0-4178-b54e-08cdf3fcf338	t	Germany	["Brazil", "Argentina", "France", "Spain"]	jju	ilo	{"A": "Mexico", "B": "Switzerland", "C": "Brazil", "D": "United States", "E": "Germany", "F": "Netherlands", "G": "Belgium", "H": "Spain", "I": "France", "J": "Argentina", "K": "Portugal", "L": "England"}	{"A": ["South Africa", "South Korea", "Czechia"], "B": ["Bosnia and Herzegovina", "Canada", "Switzerland"], "C": ["Haiti", "Morocco", "Brazil"], "D": ["Paraguay", "Australia", "Turkiye"], "E": ["Ivory Coast", "Curacao", "Germany"], "F": ["Japan", "Sweden", "Netherlands"], "G": ["Belgium", "Egypt", "Iran"], "H": ["Spain", "Uruguay", "Saudi Arabia"], "I": ["France", "Senegal", "Norway"], "J": ["Argentina", "Austria", "Algeria"], "K": ["Portugal", "Colombia", "DR Congo"], "L": ["Ghana", "England", "Croatia"]}	["Spain", "Portugal", "France", "Brazil", "Argentina", "Germany", "Belgium", "Morocco"]	2026-05-26 09:17:08.652	2026-05-26 10:35:58.608	f	PORRA-2026-9BAD4092
cmpl6easr000004l4gm2ndmr2	f777cd32-4a9e-4376-8e2d-19c89246b83a	f	Spain	["Brazil", "England", "France", "Spain"]	Kylian Mbappé 	Lamine Yamal	{"A": "Mexico", "B": "Canada", "C": "Brazil", "D": "United States", "E": "Germany", "F": "Netherlands", "G": "Belgium", "H": "Spain", "I": "France", "J": "Argentina", "K": "Portugal", "L": "England"}	{"A": ["Mexico", "Czechia", "South Korea"], "B": ["Canada", "Switzerland", "Bosnia and Herzegovina"], "C": ["Brazil", "Morocco", "Scotland"], "D": ["United States", "Turkiye", "Paraguay"], "E": ["Germany", "Ecuador", "Ivory Coast"], "F": ["Netherlands", "Japan", "Sweden"], "G": ["Belgium", "Iran", "Egypt"], "H": ["Spain", "Uruguay", "Saudi Arabia"], "I": ["France", "Senegal", "Norway"], "J": ["Argentina", "Austria", "Algeria"], "K": ["Portugal", "Colombia", "Uzbekistan"], "L": ["Ghana", "England", "Croatia"]}	["Norway", "Egypt", "South Korea", "Sweden", "Ivory Coast", "Paraguay", "Scotland", "Bosnia and Herzegovina"]	2026-05-25 12:21:43.083	2026-05-26 10:35:57.567	f	PORRA-2026-B3D1381D
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: prisma_migration
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Name: MatchPrediction MatchPrediction_pkey; Type: CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."MatchPrediction"
    ADD CONSTRAINT "MatchPrediction_pkey" PRIMARY KEY (id);


--
-- Name: Match Match_pkey; Type: CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "Match_pkey" PRIMARY KEY (id);


--
-- Name: Participant Participant_pkey; Type: CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_pkey" PRIMARY KEY (id);


--
-- Name: Prediction Prediction_pkey; Type: CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."Prediction"
    ADD CONSTRAINT "Prediction_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: MatchPrediction_predictionId_matchId_key; Type: INDEX; Schema: public; Owner: prisma_migration
--

CREATE UNIQUE INDEX "MatchPrediction_predictionId_matchId_key" ON public."MatchPrediction" USING btree ("predictionId", "matchId");


--
-- Name: Participant_accessCode_key; Type: INDEX; Schema: public; Owner: prisma_migration
--

CREATE UNIQUE INDEX "Participant_accessCode_key" ON public."Participant" USING btree ("accessCode");


--
-- Name: Prediction_participantId_key; Type: INDEX; Schema: public; Owner: prisma_migration
--

CREATE UNIQUE INDEX "Prediction_participantId_key" ON public."Prediction" USING btree ("participantId");


--
-- Name: MatchPrediction MatchPrediction_matchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."MatchPrediction"
    ADD CONSTRAINT "MatchPrediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES public."Match"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MatchPrediction MatchPrediction_predictionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."MatchPrediction"
    ADD CONSTRAINT "MatchPrediction_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES public."Prediction"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Prediction Prediction_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: prisma_migration
--

ALTER TABLE ONLY public."Prediction"
    ADD CONSTRAINT "Prediction_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict mknLJIZueyUxTHxl48iX4iRibDDkfTNe5NkQHrnajADbmugkR7C4KhnVzjpeQTz

