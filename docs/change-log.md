---
outline: deep
---
# Change Log

## 2024-04-09
* Fixed: no type int example in ving schema #82
* Fixed: record delete generator not generating correctly #81
* Fixed: if you misspell a schema when running record -w or record -r it should say no schema, not create an error #80
* Added CopyToClipboard component.
* Implemented: add clipboard button for copying an id to clipboard from view and edit pages #79
* Fixed: displaying cache objects from CLI shows [object Object] instead of the actual object #78
* Fixed: isRoleOrDie not documented correctly #77
* Implemented: document Nuxt stuff #76
* Implemented: add --bare as an option in generators that gets rid of the boiler plate #75
* Implemented: cli improvements #83
* Implemented: document the ving structure #84
* Removed client-only wrapper from Datatables because the upgrade to PrimeVue 3.51.0 fixed the problem it was masking.

## 2024-04-08
* Breaking change: Refactored VingRecord isOwner(), canEdit(), and propsOptions() to be async.
* Added skipOwnerCheck as a ving schema prop relation option.
* Added a whole new section to the Ving Schema documentation defining all the fields that go into ving schema props.
* Added UserProfileLink component.
* Automatically link id/name in generated index pages.
* Update page generator to mark enum options as optional.

## 2024-04-07
* Made the MenuBar in the default layout client only until PrimeVue fixes #5541.
* useVingKind().mint() now carries forward the query params into the new record.
* Updated zodString(), zodText(), and zodMediumText() schema helper to allow for 0 length strings.
* Fixed useVingKind() not settings propsOptions.
* Added enum2label() composable.

## 2024-04-06
* Added VING_SITE_URL to install instructions.
* Fixed API generator missing a slash.
* Fixed API options cassing problem.
* Upgraded to PrimeVue 3.51.0 from 3.47.2.
* Fixed undefined session in delete api.
* Fixed record page generator capitalization.

## 2024-04-05
* Changed the way foreign keys are generated due to the possibility of creating keynames that were too long.
* Added a migration status to the drizzle CLI.

## 2024-04-04
* Provided a little more documentation about virtual columns
* Fixed camelCasing of schema names in the schema generator
* Added mediumtext fields to schema and drizzle generation

## 2024-03-16
* Created a function for fetching ving config in `ving/config.mjs`
* Added a Rest versioning system for API breakages

## 2024-03-15
* Added pseudo props to Records so that in addition to `user.set('admin', true)` you can also do `user.admin = true` for both setters and getters.

## 2024-03-12
* Fixed a security bug where passwords created via the CLI were stored incorrectly.