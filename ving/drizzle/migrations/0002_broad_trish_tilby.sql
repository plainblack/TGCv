CREATE TABLE `maintenanceitems` (
	`id` varchar(36) NOT NULL DEFAULT 'uuid-will-be-generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	`maintenanceItemSetId` varchar(36) NOT NULL,
	CONSTRAINT `maintenanceitems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceitemsets` (
	`id` varchar(36) NOT NULL DEFAULT 'uuid-will-be-generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	CONSTRAINT `maintenanceitemsets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceschedules` (
	`id` varchar(36) NOT NULL DEFAULT 'uuid-will-be-generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`recurrence` enum('yearly','monthly','weekly','daily') NOT NULL DEFAULT 'monthly',
	`months` int NOT NULL DEFAULT 0,
	`weeks` int NOT NULL DEFAULT 0,
	`days` int NOT NULL DEFAULT 0,
	`maintenanceItemSetId` varchar(36) NOT NULL,
	`maintenanceTaskId` varchar(36) NOT NULL,
	CONSTRAINT `maintenanceschedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenancetasks` (
	`id` varchar(36) NOT NULL DEFAULT 'uuid-will-be-generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`maintenanceItemSetId` varchar(36) NOT NULL,
	CONSTRAINT `maintenancetasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenancetickets` (
	`id` varchar(36) NOT NULL DEFAULT 'uuid-will-be-generated',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`type` enum('routine','needs_help') NOT NULL DEFAULT 'routine',
	`severity` enum('working','intermittent','down') NOT NULL DEFAULT 'working',
	`status` enum('resolved','unresolved') NOT NULL DEFAULT 'resolved',
	`resolutionMinutes` int NOT NULL DEFAULT 0,
	`metadata` json NOT NULL DEFAULT ('{}'),
	`isCool` boolean NOT NULL DEFAULT false,
	`userId` varchar(36) NOT NULL,
	`startedAt` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
	CONSTRAINT `maintenancetickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `maintenanceitems` ADD CONSTRAINT `maintenanceitems_maintenanceItemSetId_maintenanceitemsets_id_fk` FOREIGN KEY (`maintenanceItemSetId`) REFERENCES `maintenanceitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_maintenanceItemSetId_maintenanceitemsets_id_fk` FOREIGN KEY (`maintenanceItemSetId`) REFERENCES `maintenanceitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_maintenanceTaskId_maintenancetasks_id_fk` FOREIGN KEY (`maintenanceTaskId`) REFERENCES `maintenancetasks`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancetasks` ADD CONSTRAINT `maintenancetasks_maintenanceItemSetId_maintenanceitemsets_id_fk` FOREIGN KEY (`maintenanceItemSetId`) REFERENCES `maintenanceitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancetickets` ADD CONSTRAINT `maintenancetickets_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;