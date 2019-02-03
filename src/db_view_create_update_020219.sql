use discord;
CREATE OR REPLACE VIEW aggregated_ragequit
AS select `discord`.`ragequit`.`player` AS `player`
, count(`discord`.`ragequit`.`player`) AS `counter`
, max(`discord`.`ragequit`.`reported_on`) AS `reported_on`
from `discord`.`ragequit`
group by `discord`.`ragequit`.`player`
order by count(`discord`.`ragequit`.`player`) desc;