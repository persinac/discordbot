truncate ragequit;
alter table ragequit drop column counter;
alter table ragequit drop column last_rage_quit;
alter table ragequit add column reporter varchar(255);
alter table ragequit add column reported_on datetime;

create view `aggregated_ragequit` as select player, count(player) as counter, max(reported_on) as reported_on from ragequit group by player;

/* test data */
insert into ragequit values (null,'nutcrunch','Tenacious.Tom',now()), (null,'nutcrunch','Tenacious.Tom',now());