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
CREATE TABLE `hardwareitems` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	`hardwareItemSetId` bigint unsigned NOT NULL,
	CONSTRAINT `hardwareitems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwareitemsets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(60) NOT NULL DEFAULT '',
	`itemCount` int NOT NULL DEFAULT 0,
	`taskCount` int NOT NULL DEFAULT 0,
	`status` enum('in_use','retired') NOT NULL DEFAULT 'in_use',
	CONSTRAINT `hardwareitemsets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwareschedules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`recurrence` enum('yearly','monthly','weekly','daily') NOT NULL DEFAULT 'monthly',
	`months` int NOT NULL DEFAULT 0,
	`weeks` int NOT NULL DEFAULT 0,
	`days` int NOT NULL DEFAULT 0,
	`hardwareItemId` bigint unsigned NOT NULL,
	`hardwareTaskId` bigint unsigned NOT NULL,
	`description` mediumtext NOT NULL,
	`jobsId` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `hardwareschedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwaretasks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`hardwareItemSetId` bigint unsigned NOT NULL,
	CONSTRAINT `hardwaretasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwaretickets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`type` enum('routine','needs_help') NOT NULL DEFAULT 'routine',
	`severity` enum('working','intermittent','down') NOT NULL DEFAULT 'working',
	`status` enum('resolved','unresolved') NOT NULL DEFAULT 'unresolved',
	`resolutionMinutes` int NOT NULL DEFAULT 0,
	`submittedBy` varchar(64) NOT NULL DEFAULT '',
	`hardwareTaskId` bigint unsigned NOT NULL,
	`hardwareItemId` bigint unsigned NOT NULL,
	CONSTRAINT `hardwaretickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwareticketfiles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`s3FileId` bigint unsigned NOT NULL,
	`hardwareTicketId` bigint unsigned NOT NULL,
	CONSTRAINT `hardwareticketfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardwareticketremarks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` mediumtext NOT NULL,
	`resolution` enum('resolved','unresolved','n_a') NOT NULL DEFAULT 'n_a',
	`resolutionMinutes` int NOT NULL DEFAULT 0,
	`submittedBy` varchar(64) NOT NULL DEFAULT '',
	`hardwareTicketId` bigint unsigned NOT NULL,
	CONSTRAINT `hardwareticketremarks_id` PRIMARY KEY(`id`)
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
	`tgcUserId` char(36) DEFAULT null,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `usernameIndex` UNIQUE(`username`),
	CONSTRAINT `emailIndex` UNIQUE(`email`),
	CONSTRAINT `tgcUserIdIndex` UNIQUE(`tgcUserId`)
);
--> statement-breakpoint
ALTER TABLE `apikeys` ADD CONSTRAINT `apikeys_user_90ada4_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareitems` ADD CONSTRAINT `hardwareitems_itemSet_fef4de8_fk` FOREIGN KEY (`hardwareItemSetId`) REFERENCES `hardwareitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareschedules` ADD CONSTRAINT `hardwareschedules_item_33d0762_fk` FOREIGN KEY (`hardwareItemId`) REFERENCES `hardwareitems`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareschedules` ADD CONSTRAINT `hardwareschedules_task_3384cf0_fk` FOREIGN KEY (`hardwareTaskId`) REFERENCES `hardwaretasks`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwaretasks` ADD CONSTRAINT `hardwaretasks_itemSet_6afcc4a_fk` FOREIGN KEY (`hardwareItemSetId`) REFERENCES `hardwareitemsets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwaretickets` ADD CONSTRAINT `hardwaretickets_task_652b79c5_fk` FOREIGN KEY (`hardwareTaskId`) REFERENCES `hardwaretasks`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwaretickets` ADD CONSTRAINT `hardwaretickets_item_6526bf53_fk` FOREIGN KEY (`hardwareItemId`) REFERENCES `hardwareitems`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareticketfiles` ADD CONSTRAINT `hardwareticketfiles_s3file_77c6b8a8_fk` FOREIGN KEY (`s3FileId`) REFERENCES `s3files`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareticketfiles` ADD CONSTRAINT `hardwareticketfiles_ticket_731a4138_fk` FOREIGN KEY (`hardwareTicketId`) REFERENCES `hardwaretickets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `hardwareticketremarks` ADD CONSTRAINT `hardwareticketremarks_ticket_1ddadbcc_fk` FOREIGN KEY (`hardwareTicketId`) REFERENCES `hardwaretickets`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `s3files` ADD CONSTRAINT `s3files_user_40cb3d4d_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_avatar_39d62890_fk` FOREIGN KEY (`avatarId`) REFERENCES `s3files`(`id`) ON DELETE set null ON UPDATE no action;