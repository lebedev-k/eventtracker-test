# @eventtracker-test/server

Здесь расположена вся логика по тестовому заданию.

Всё написано на TypeScript и собирается в три разных бандла:
- `server` - сервер, слушающий `/track` и отдающий .js файл с `/tracker`
- `tracker` - файл, отдающийся с `/tracker`
- `snippet` - сниппет для загрузки `/tracker` по образу и подобию google analytics