# discord trollbot 
##### Currently just a ragequit tracker

## Run the troll bot:
- From src/ => npm run start-dev (for development, obviously) or npm run start (for prod)
  - These can be run simultaneously on the same discord server.
  - Prod uses '!' as the prefix, dev uses '('
- Ensure that a mysql server is running and has the following:
  - Appropriate tables built (run all of the sql files in order in src/db)
  - Root access without a password (we'll rely on server security to protect the db)
- From server => nodemon server.js

## PM2
- I use PM2 for process management on production
- For Discordbot (in /src):
```
pm2 start npm -- start

```
- For the server (/server):
```
pm2 start server.js --watch
```
