CREATE TABLE `cronjobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`schedule` varchar(60) NOT NULL DEFAULT '* * * * *',
	`handler` varchar(60) NOT NULL DEFAULT 'Test',
	`params` json NOT NULL DEFAULT ('{}'),
	`enabled` boolean NOT NULL DEFAULT true,
	`note` text NOT NULL,
	CONSTRAINT `cronjobs_id` PRIMARY KEY(`id`)
);
