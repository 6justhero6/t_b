-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "edited" BOOLEAN NOT NULL DEFAULT false;
