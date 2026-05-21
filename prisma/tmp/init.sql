-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "group" TEXT,
    "stage" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "venue" TEXT,
    "home" TEXT NOT NULL,
    "away" TEXT NOT NULL,
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "penaltyWinner" TEXT,
    "status" TEXT NOT NULL DEFAULT 'programado',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT true,
    "champion" TEXT,
    "semifinalists" JSONB NOT NULL,
    "topScorer" TEXT,
    "mvp" TEXT,
    "groupWinners" JSONB NOT NULL,
    "groupQualified" JSONB NOT NULL,
    "bestThirds" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPrediction" (
    "id" TEXT NOT NULL,
    "predictionId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "penaltyWinner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_accessCode_key" ON "Participant"("accessCode");

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_participantId_key" ON "Prediction"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPrediction_predictionId_matchId_key" ON "MatchPrediction"("predictionId", "matchId");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPrediction" ADD CONSTRAINT "MatchPrediction_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPrediction" ADD CONSTRAINT "MatchPrediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
