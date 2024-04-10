drop table IF EXISTS seq;

create table
    seq (
        name varchar(20) not null,
        val int(10) unsigned not null,
        primary key (name, val)
    );