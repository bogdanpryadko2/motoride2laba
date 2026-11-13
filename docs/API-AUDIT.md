# Аудит MotoRide

Frontend: существующий проект в корне motoride2laba; App, main, router, Navbar, MotoCard, все четыре views, CSS и конфигурация изучены. Сохраняем корень проекта, компоненты и CSS, не создаём второй Vue-проект.

Backend: локальный `/Users/bogdan/project/MotoRideLab3Api` (remote `bogdanpryadko2/MotoRideLab3Api`). Подтверждён пользователем; ветка `feature/backend-lab5`, commit `3464435`. Изучены все 12 контроллеров, DTO, сервисы проверки владельца, SecurityConfig, AuthService, обработчик ошибок. OpenAPI `/v3/api-docs` проверен при совместном запуске с PostgreSQL; контракты совпали. При первоначальной интеграции backend не изменялся. Позже по запросу пользователя добавлены MinIO, POST /api/images, публичный GET /images/{key} и реакция DISLIKE.

На начало аудита ни один API-сценарий не реализован: Home содержит статический массив, login/register вызывают alert, About содержит статический топ. Темная палитра, Inter/Orbitron, карточки и навигация сохранены.

## Матрица маршрутов

Все пути ниже начинаются с `/api`. Начальное состояние всех строк — **не реализовано**. Итоговое покрытие описано в последней колонке.

| Backend endpoint                                                                       | Frontend page/action                          | Access                             | Реализация                          |
| -------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------- | ----------------------------------- |
| GET /auth/csrf                                                                         | Перед каждой auth-операцией                   | Все                                | Axios CSRF                          |
| POST /auth/register, /auth/login                                                       | /register, /login                             | Все                                | Pinia session                       |
| POST /auth/refresh                                                                     | Восстановление и повтор 401                   | Cookie + CSRF                      | Single-flight                       |
| POST /auth/logout                                                                      | Навигация, профиль                            | Cookie + CSRF                      | Выход                               |
| POST /auth/logout-all, /auth/change-password                                           | /profile                                      | USER, ADMIN + CSRF                 | Формы профиля                       |
| GET, PUT /users/me                                                                     | /profile                                      | USER, ADMIN                        | Просмотр, displayName               |
| GET /motorcycles                                                                       | /, /motorcycles, /admin                       | Все                                | Поиск, фильтр, сортировка, страницы |
| GET /motorcycles/top                                                                   | /, /about                                     | Все                                | Топ мощности                        |
| GET /motorcycles/{id}                                                                  | /motorcycles/:id                              | Все                                | Подробности                         |
| POST /motorcycles; PUT, DELETE /motorcycles/{id}                                       | /admin                                        | ADMIN                              | CRUD                                |
| GET /categories; GET /categories/{slug}                                                | Каталог, /categories/:slug                    | Все                                | Справочник и категория              |
| POST /categories; PUT, DELETE /categories/{id}                                         | /admin                                        | ADMIN                              | CRUD                                |
| GET /technologies; GET /technologies/{id}                                              | /about, /technologies/:id                     | Все                                | Справочник и технология             |
| POST /technologies; PUT, DELETE /technologies/{id}                                     | /admin                                        | ADMIN                              | CRUD                                |
| GET /news; GET /news/{id}                                                              | /news, /news/:id                              | Все                                | Список и статья                     |
| POST /news; PUT, DELETE /news/{id}                                                     | /admin                                        | ADMIN                              | CRUD                                |
| GET /favorites; POST, DELETE /favorites/{motorcycleId}                                 | /favorites, мотоцикл                          | USER, ADMIN                        | Избранное                           |
| GET, POST /motorcycles/{id}/reviews                                                    | Мотоцикл, отзывы                              | Чтение всем, создание USER/ADMIN   | Список и форма                      |
| GET, PUT, DELETE /reviews/{id}                                                         | Отзывы: просмотр/редактирование/удаление      | Чтение всем; изменения автор/ADMIN | CRUD                                |
| GET, POST /posts                                                                       | /community, /community/new                    | Чтение всем, создание USER/ADMIN   | Лента и форма                       |
| GET, PUT, DELETE /posts/{id}                                                           | /community/:id, /community/:id/edit           | Чтение всем; изменения автор/ADMIN | CRUD                                |
| GET, POST /posts/{id}/comments                                                         | Под публикацией                               | Чтение всем, создание USER/ADMIN   | Список и форма                      |
| GET, PUT, DELETE /comments/{id}                                                        | Комментарии: просмотр/редактирование/удаление | Чтение всем; изменения автор/ADMIN | CRUD                                |
| GET /posts/{id}/reactions, /comments/{id}/reactions, /reviews/{id}/reactions           | Кнопки реакций                                | Все                                | Количество                          |
| GET, PUT, DELETE /posts/{id}/reaction, /comments/{id}/reaction, /reviews/{id}/reaction | Кнопки реакций                                | USER, ADMIN                        | Своя реакция, установка, удаление   |

## Существенные контракты

- `GET motorcycles`: массив; `X-Total-Count`, `X-Total-Pages`; category — slug; sort: newest, hp_desc, price_asc, price_desc. page с нуля, size 1–100.
- Новости, избранное, отзывы: массивы, page/size, **без total**. Кнопка следующей страницы доступна при полной странице; возможна последняя пустая страница. Не выдумываем количество.
- Posts/comments: PageResponse `{content,page,size,totalElements,totalPages}`.
- Review: `rating`, `text`, `authorId`, `authorName`. Post/comment: вложенный `author`. Отсутствие своей реакции — `{kind:null}`.
- Motorcycle detail содержит `categoryId`, `technologyIds`, `technologies` (имена). Summary не содержит description.
- News publishedAt — LocalDateTime. Значения времени backend трактуются как UTC.
- imageUrl: http(s) URL с `/` после хоста или `/images/...`; optional imageUrl отправляется null, не пустая строка.
- Ошибки: `{status,message,details,path,timestamp,fieldErrors}`. 429 имеет Retry-After.
- CSRF cookie HttpOnly, Path=/api/auth; JS получает токен только через GET /auth/csrf. Ответ имеет token и headerName. Access только в памяти; refresh только HttpOnly cookie.
- Все auth POST требуют CSRF. Refresh/login/register/logout выполняются без Bearer. Logout-all/change-password требуют Bearer.
- Автор/ADMIN может изменять и удалять posts/comments/reviews. Регистрация создаёт только USER.
- Смена пароля отзывает refresh-сессии и очищает cookie: интерфейс предлагает повторный вход. Уже выпущенные JWT backend не отзывает до их истечения.
- Пароль: минимум 8 Unicode code points, максимум 72 UTF-8 bytes; login/currentPassword допускают минимум 1.

## Дополнение: фотографии и реакции

| Endpoint          | Интерфейс                     | Доступ | Контракт                                             |
| ----------------- | ----------------------------- | ------ | ---------------------------------------------------- |
| POST /api/images  | Файл в форме мотоцикла        | ADMIN  | multipart `file`, PNG/JPEG до 5 МБ; 201 `{imageUrl}` |
| GET /images/{key} | Карточка и страница мотоцикла | Все    | Байты фотографии из закрытого bucket MinIO           |

`imageUrl` мотоцикла по-прежнему строка. Новый upload возвращает стабильный путь `/images/{UUID}.jpg` или `.png`; frontend использует существующее отображение изображений. Реакции теперь LOVE (сердечко), LIKE (Класс), DISLIKE (Не нравится). Миграция V15 переводит прежний HELPFUL в LIKE, сохраняя автора и цель реакции.
