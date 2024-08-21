# Backend Test Task

## Описание

Это проект веб-сервера на `Fastify` с использованием базы данных `PostgreSQL` для выполнения тестового задания.

## Требования

- Node.js (версия 14 и выше)
- PostgreSQL
- Docker (опционально)
- Docker Compose (опционально)
- Git

## Установка

1. Склонируйте репозиторий:

   ```bash
   git clone https://github.com/yourusername/backend-test-task.git
   cd backend-test-task
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте файл `.env` в корне проекта и укажите в нем переменные окружения:

   ```env
    PORT=3000
    DATABASE_URL=postgres://user:password@localhost:5432/database
   ```

4. Запустите сервер:

   ```bash
   npm run start:dev
   ```

## Использование

### Эндпоинты

- GET /skins - Получение списка предметов с API Skinport.
- POST /users/:id/deduct - Списание баланса пользователя.

### Примеры запросов

- GET /skins

```bash
curl -X GET http://localhost:3000/skins
```

- POST /users/:id/deduct

```bash
curl -X POST http://localhost:3000/users/1/deduct -H "Content-Type: application/json" -d '{"amount": 100}'
```

## Валидация

- id пользователя должен быть числом.
- amount для списания должен быть положительным числом.

# Запуск POSTGRES в Docker

```bash
docker-compose up -d
```
