ALTER TABLE `maintenanceschedules` ADD `description` mediumtext NOT NULL;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD `jobsId` varchar(255) DEFAULT '' NOT NULL;