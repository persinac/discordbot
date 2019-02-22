use discord;
CREATE TABLE game_list (
  id int(11) NOT NULL AUTO_INCREMENT,
  game_long varchar(255) NOT NULL,
  game_short varchar(4) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

/* insert common games to get started */
insert into game_list (game_long, game_short)
values ('Player Unknowns Battlegrounds', 'PUBG'), ('Apex Legends', 'APX'), ('Destiny', 'DSNY'), ('Black Ops 4', 'BO4');

/* add game id into ragequit */
alter table ragequit add column game_id int(11);
alter table ragequit add constraint fk_game_id foreign key (game_id) references game_list(id);

/* Create aggregated view by game */
CREATE OR REPLACE VIEW aggregated_ragequit_by_game
AS select rq.player AS player
, count(rq.player) AS counter
, max(rq.reported_on) AS reported_on
, gl.game_long AS game_name
from ragequit rq
join game_list gl ON gl.id = rq.game_id
group by rq.player, gl.game_long
order by count(rq.player) desc;

/* create view for game list */
CREATE OR REPLACE VIEW game_list_vw
AS select gl.game_long AS game_name
, gl.game_short as abbreviation
from game_list gl

/* test values */
/* insert into ragequit values (null,'nutcrunch','Tenacious.Tom',now(), 2), (null,'nutcrunch','Tenacious.Tom',now(),2); */
