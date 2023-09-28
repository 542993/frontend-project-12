### Hexlet tests and linter status:
[![Actions Status](https://github.com/542993/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/542993/frontend-project-12/actions)

### Описание проекта
Учебный проект, в рамках которого разрабатывается фронтенд-часть приложения. Приложение представляет собой чат (наподобие Slack). В данном проекте используется такие библиотеки как:  React, Redux, Redux toolkit.

В качестве бекэнда используется готовая реализация от Hexlet https://github.com/hexlet-components/project-js-chat-backend

По умолчанию в системе уже зарегистрирован один пользователь, имя пользоваталя - admin, пароль - admin.

Системные требования
Node.js v18.17.0

# Установка проекта:
1. Склонировать репозиторий проекта: git clone https://github.com/542993/frontend-project-12.git
2. Запустить команду make install (установка зависимостей)
# Запуск проекта
## В режиме разработки:
1. Запустить команду npm run start в корне проекта (бекенд)
2. Запустить команду npm run start в директории frontend проекта (фронтенд)
3. Открыть приложение в браузере по адресу http://localhost:3000
## В режиме 'product':
### Предусловие: произвести сборку приложения командой npm run build в корне проекта
1. Запустить приложение командой npm run start в корне проекта (бекенд)
2. Открыть приложение в браузере по адресу http://localhost:5001
3. Деплой приложения на платформе render.com
https://chat-like-slack.onrender.com