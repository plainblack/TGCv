ALTER TABLE `maintenanceschedules` RENAME COLUMN `maintenanceItemSetId` TO `maintenanceItemId`;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` DROP FOREIGN KEY `maintenanceschedules_maintenanceItemSet_2bb27d4e_fk`;
--> statement-breakpoint
ALTER TABLE `maintenanceschedules` DROP FOREIGN KEY `maintenanceschedules_maintenanceTask_48169202_fk`;
--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_item_7745e177_fk` FOREIGN KEY (`maintenanceItemId`) REFERENCES `maintenanceitems`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_task_77412705_fk` FOREIGN KEY (`maintenanceTaskId`) REFERENCES `maintenancetasks`(`id`) ON DELETE cascade ON UPDATE cascade;