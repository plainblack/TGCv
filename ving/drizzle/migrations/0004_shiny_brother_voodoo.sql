ALTER TABLE `maintenancetickets` MODIFY COLUMN `status` enum('resolved','unresolved') NOT NULL DEFAULT 'unresolved';--> statement-breakpoint
ALTER TABLE `maintenancetickets` DROP COLUMN `name`;