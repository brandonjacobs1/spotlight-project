-- CreateTable
CREATE TABLE "spotlight" (
    "id" SERIAL NOT NULL,
    "last_name" VARCHAR(20),
    "first_name_husband" VARCHAR(20),
    "first_name_wife" VARCHAR(20),
    "date_asked" DATE,
    "date_ready" DATE,
    "date_planned" DATE,
    "date_slacked" DATE,
    "date_joined" DATE,
    "member_type" VARCHAR(1),
    "bio" TEXT,
    "image" VARCHAR(100),
    "status" VARCHAR(2),

    CONSTRAINT "spotlight_spotlight_pkey" PRIMARY KEY ("id")
);

