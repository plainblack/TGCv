CREATE TABLE `apikeys` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`url` text NOT NULL,
	`reason` text NOT NULL,
	`privateKey` varchar(39) NOT NULL DEFAULT '',
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `apikeys_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenancefiles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`s3FileId` bigint unsigned NOT NULL,
	`maintenanceTicketId` bigint unsigned NOT NULL,
	CONSTRAINT `maintenancefiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceitems` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	`maintenanceItemSetId` bigint unsigned NOT NULL,
	CONSTRAINT `maintenanceitems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceitemsets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`itemCount` int NOT NULL DEFAULT 0,
	`taskCount` int NOT NULL DEFAULT 0,
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	CONSTRAINT `maintenanceitemsets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceremarks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`resolution` enum('resolved','unresolved','n_a') NOT NULL DEFAULT 'n_a',
	`resolutionMinutes` int NOT NULL DEFAULT 0,
	`submittedBy` varchar(64) NOT NULL DEFAULT '',
	`maintenanceTicketId` bigint unsigned NOT NULL,
	CONSTRAINT `maintenanceremarks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenanceschedules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`recurrence` enum('yearly','monthly','weekly','daily') NOT NULL DEFAULT 'monthly',
	`months` int NOT NULL DEFAULT 0,
	`weeks` int NOT NULL DEFAULT 0,
	`days` int NOT NULL DEFAULT 0,
	`maintenanceItemId` bigint unsigned NOT NULL,
	`maintenanceTaskId` bigint unsigned NOT NULL,
	`description` mediumtext NOT NULL,
	`jobsId` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `maintenanceschedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenancetasks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`maintenanceItemSetId` bigint unsigned NOT NULL,
	CONSTRAINT `maintenancetasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenancetickets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`ticketNumber` int NOT NULL DEFAULT 0,
	`description` mediumtext NOT NULL,
	`type` enum('routine','needs_help') NOT NULL DEFAULT 'routine',
	`severity` enum('working','intermittent','down') NOT NULL DEFAULT 'working',
	`status` enum('resolved','unresolved') NOT NULL DEFAULT 'unresolved',
	`resolutionMinutes` int NOT NULL DEFAULT 0,
	`submittedBy` varchar(64) NOT NULL DEFAULT '',
	`maintenanceTaskId` bigint unsigned NOT NULL,
	`maintenanceItemId` bigint unsigned NOT NULL,
	CONSTRAINT `maintenancetickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `s3files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`filename` varchar(256) NOT NULL DEFAULT '',
	`extension` varchar(10) NOT NULL DEFAULT '',
	`contentType` varchar(256) NOT NULL DEFAULT '',
	`s3folder` varchar(256) NOT NULL DEFAULT '',
	`sizeInBytes` int NOT NULL DEFAULT 0,
	`metadata` json NOT NULL DEFAULT ('{}'),
	`status` enum('pending','ready','postProcessingFailed','verifyFailed') NOT NULL DEFAULT 'pending',
	`icon` enum('pending','thumbnail','extension','self') NOT NULL DEFAULT 'pending',
	`userId` bigint unsigned NOT NULL,
	CONSTRAINT `s3files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`username` varchar(60) NOT NULL DEFAULT '',
	`email` varchar(256) NOT NULL DEFAULT '',
	`realName` varchar(60) NOT NULL DEFAULT '',
	`password` varchar(256) NOT NULL DEFAULT 'no-password-specified',
	`passwordType` enum('bcrypt') NOT NULL DEFAULT 'bcrypt',
	`useAsDisplayName` enum('username','email','realName') NOT NULL DEFAULT 'username',
	`verifiedEmail` boolean NOT NULL DEFAULT false,
	`admin` boolean NOT NULL DEFAULT false,
	`maintenanceManager` boolean NOT NULL DEFAULT false,
	`productionManager` boolean NOT NULL DEFAULT false,
	`developer` boolean NOT NULL DEFAULT false,
	`avatarType` enum('robot','uploaded') NOT NULL DEFAULT 'robot',
	`bio` mediumtext NOT NULL,
	`avatarId` bigint unsigned DEFAULT null,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `usernameIndex` UNIQUE(`username`),
	CONSTRAINT `emailIndex` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `apikeys` ADD CONSTRAINT `apikeys_user_90ada4_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancefiles` ADD CONSTRAINT `maintenancefiles_s3file_bc83f09_fk` FOREIGN KEY (`s3FileId`) REFERENCES `s3files`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancefiles` ADD CONSTRAINT `maintenancefiles_ticket_71bc799_fk` FOREIGN KEY (`maintenanceTicketId`) REFERENCES `maintenancetickets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceitems` ADD CONSTRAINT `maintenanceitems_itemSet_5f29c163_fk` FOREIGN KEY (`maintenanceItemSetId`) REFERENCES `maintenanceitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceremarks` ADD CONSTRAINT `maintenanceremarks_ticket_7bde9655_fk` FOREIGN KEY (`maintenanceTicketId`) REFERENCES `maintenancetickets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_item_7745e177_fk` FOREIGN KEY (`maintenanceItemId`) REFERENCES `maintenanceitems`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenanceschedules` ADD CONSTRAINT `maintenanceschedules_task_77412705_fk` FOREIGN KEY (`maintenanceTaskId`) REFERENCES `maintenancetasks`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancetasks` ADD CONSTRAINT `maintenancetasks_itemSet_75c8db95_fk` FOREIGN KEY (`maintenanceItemSetId`) REFERENCES `maintenanceitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancetickets` ADD CONSTRAINT `maintenancetickets_task_1206e190_fk` FOREIGN KEY (`maintenanceTaskId`) REFERENCES `maintenancetasks`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maintenancetickets` ADD CONSTRAINT `maintenancetickets_item_120b9c02_fk` FOREIGN KEY (`maintenanceItemId`) REFERENCES `maintenanceitems`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `s3files` ADD CONSTRAINT `s3files_user_40cb3d4d_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_avatar_39d62890_fk` FOREIGN KEY (`avatarId`) REFERENCES `s3files`(`id`) ON DELETE set null ON UPDATE no action;