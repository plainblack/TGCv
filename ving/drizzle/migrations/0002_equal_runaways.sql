ALTER TABLE `hardwareschedules` RENAME COLUMN `jobsId` TO `cronJobId`;--> statement-breakpoint
ALTER TABLE `hardwareschedules` MODIFY COLUMN `cronJobId` bigint unsigned;--> statement-breakpoint
ALTER TABLE `hardwareschedules` MODIFY COLUMN `cronJobId` bigint unsigned DEFAULT null;--> statement-breakpoint
ALTER TABLE `hardwareschedules` ADD CONSTRAINT `hardwareschedules_cronjob_1b3e3efc_fk` FOREIGN KEY (`cronJobId`) REFERENCES `cronjobs`(`id`) ON DELETE set null ON UPDATE no action;