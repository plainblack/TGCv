drop trigger IF EXISTS trig_maintenanceticket;


DELIMITER $$ 
CREATE TRIGGER `trig_maintenanceticket` 
    BEFORE INSERT ON maintenancetickets FOR EACH ROW 
    BEGIN
        update `seq` set val=last_insert_id(val+1) where name='maintenanceticket';
        SET NEW.ticketNumber = last_insert_id();
        IF NEW.ticketNumber = 0 THEN 
            SET NEW.ticketNumber = 1;
        END IF;
        IF NEW.ticketNumber = 1 THEN 
            insert into `seq` (name,val) values ('maintenanceticket', 1);
        END IF;
    END;$$
DELIMITER ;

insert into seq select 'maintenanceticket', ifnull(max(ticketNumber),0) from maintenancetickets;
