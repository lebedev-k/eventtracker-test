# Тестовое на вакансию Fullstack Node.js Developer

## Описание
Приложение состоит из трёх пакетов:
- `/packages/database` - конфиг для запуска mongodb в докер-образе, можно не использовать (см. ниже)
- `/packages/example-client` - сервер для тестовых `1.html`, `2.html`, `3.html`
- `/packages/server` - вся логика

Что тут намеренно опущенно:
- тесты (я и так много времени потратил на задание)
- какое-либо доведение этого до стадии "готово к деплою на прод": нет контейнеров (как и просили), секреты хранятся в репозитории и т.д.
- CI/CD - хотел изначально сделать пару гитхаб-экшнов, но потом уже не хватило времени

Сложности были в основном с требованием тротлинга уходящих запросов, ну и со всей
сборочной мишурой и настройкой окружения проекта

## Запуск

### Требования
- NodeJS >= 20.0.0 (на меньших не тестировал, но должно работать, думаю)
- (Docker / Podman) compose если хочется запустить mongodb в этом проекте
- Unix (скорее всего, на windows сам сервер тоже будет работать, но точно будут проблемы с запуском yarn-скриптов (env-переменные))

### Установка
```bash
yarn
```

### Сборка
```bash
yarn build
```

### Запуск
```bash
yarn start
```

Или, если mongodb своя, то
```bash
yarn start:no-db
```
См. креды для mongodb, которые ожидает приложение, в `.env.defaults`

