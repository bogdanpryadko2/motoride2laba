# MotoRide: полный контекст для продолжения в другом чате

Этот документ — передача контекста уже выполненной работы, требований пользователя и текущего состояния проекта. Его можно целиком приложить в новый чат. Это не задание создать новый проект и не разрешение сбросить существующие изменения. Исходники на диске остаются главным источником истины; снимки кода в приложениях отражают момент подготовки документа.

Пароли, JWT_SECRET, access/refresh tokens, содержимое backend `.env` и другие секреты намеренно не включены.

## 1. Короткий вводный текст для нового чата

> Продолжаем работу над MotoRide — лабораторная работа №6 по web-программированию. Frontend уже интегрирован с готовым Spring Boot backend. Прочитай этот файл и текущие исходники, не начинай заново. Frontend: `/Users/bogdan/PycharmProjects/motoride2laba`. Backend: `/Users/bogdan/project/MotoRideLab3Api`, ветка `feature/backend-lab5`. Backend не меняй без отдельной необходимости и обсуждения: пользователь считает его готовым и просил работать с frontend. Сохраняй существующий Vue 3 / TypeScript / Vite и дизайн, делай простой интерфейс, покрывающий все реальные API. В коде не должно быть комментариев, демонстрационных данных, придуманных endpoint и произвольного бизнес-хардкода. Существующие изменения не закоммичены; не потеряй их. Push в main без отдельного разрешения запрещён. Последняя техническая тема: PyCharm показывает Vue как обычный текст, в настройках отключён модуль Pro. Передача контекста не означает, что надо автоматически что-либо переделывать: сначала учти новый конкретный запрос пользователя.

## 2. Пользователь, окружение, пути и Git

- Пользователь общается по-русски; ответы и интерфейс преимущественно на русском.
- ОС: macOS, shell zsh, часовой пояс Europe/Moscow.
- Рабочий frontend: `/Users/bogdan/PycharmProjects/motoride2laba`.
- Frontend remote, названный пользователем: `https://github.com/bogdanpryadko2/motoride2laba`.
- Фактическая ветка frontend при подготовке передачи: `main`.
- Все выполненные изменения frontend находятся в рабочем дереве; есть modified и untracked файлы. Commit и push в рамках этой работы не выполнялись.
- Backend: `/Users/bogdan/project/MotoRideLab3Api`, также `~/project/MotoRideLab3Api`.
- Backend remote, обнаруженный локально: `git@github.com:bogdanpryadko2/MotoRideLab3Api.git`.
- Backend ветка: `feature/backend-lab5`.
- Проверенный backend commit: `3464435`, сообщение `feat: expand MotoRide backend with secure auth, CRUD and social feed`.
- Backend рабочее дерево было чистым и осталось без наших правок.
- В первоначальном задании фигурировали `https://github.com/bogdanpryadko2/MotoRideApi` и `/project/MotoRideApi`. Локального `/project/MotoRideApi` не было. Позже пользователь явно подтвердил правильный `~/project/MotoRideLab3Api`. Использовать подтверждённый локальный проект, а не клонировать другой backend.
- Frontend уже был в корне рабочего репозитория, а не в `frontend/`. Принято сохранить его на месте. Второй Vue-проект не создавался, исходный frontend не импортировался заново.
- Документ задания: `/Users/bogdan/Downloads/Лабораторная работа №6.docx`.
- Последняя полная проверка реализации проведена 13 ноября 2026 года. Долгоживущие процессы, Docker и `/tmp` после смены сессии надо проверять заново.

## 3. Последние уточнения пользователя — особенно важны

Пользователь сообщил:

> «у меня есть проект бэкенд ~/project/MotoRideLab3Api … feature/backend-lab5 … там бэкенд вроде полностью готовый и ничего там поправлять не нужно … пришла задача для лабораторной работы номер 6 … изучи ее и скажи что нужно сделать. Самое главное код без комментариев. Красивый структурированный код. Без выдуманных штук и хардкода. Нужно это все организовать чтобы бэк работал с фронтом. Фронт не нагружай особо главное чтобы покрывал весь функционал и достаточно».

Практические следствия:

1. Не добавлять декоративную сложность и ненужные функции.
2. Не переделывать готовый backend ради удобства frontend.
3. Код писать без поясняющих комментариев. Объяснения держать в README/docs.
4. Нельзя делать фиктивную авторизацию, локальные демонстрационные каталоги и успешные результаты вместо серверных ошибок.
5. Не вводить произвольные бизнес-значения в формы. Например, новая форма мотоцикла теперь открывается с пустыми engineCc, horsepower, price, а не с предзаданными 600/100/0.
6. Технические ограничения DTO, enum реакций, названия полей, маршруты, подписи интерфейса и настройки порта не являются демонстрационными бизнес-данными.
7. Fixture-данные разрешены в тестах и не подключаются к production.
8. Никакого push в main без отдельного разрешения.

## 4. Что реально написано в лабораторной №6

Документ был прочитан через ZIP/XML DOCX, не по догадкам. Содержание:

**Лабораторная работа №6. Технологии web-программирования. «Работа с HTTP запросами.»**

Цель: изучить принципы отправки Ajax-запросов, работу синхронных и асинхронных запросов в Vue JS, получить навыки работы с промисами.

Задание:

1. Изучить возможности Vue.js для отправки HTTP-запросов.
2. Выбрать подходящую библиотеку для работы с запросами.
3. Реализовать взаимодействие frontend с REST API, спроектированным в прошлой лабораторной работе.
4. Продемонстрировать взаимодействие frontend-приложения с REST API.

Документ не требует нового дизайна, нового backend, отдельной аналитики или дополнительных функций за пределами существующего REST API. Детальная интеграция MotoRide ниже происходит из первоначального задания пользователя, которое значительно шире короткого текста лабораторной.

Выбран Axios. Используются Promise, async/await, try/catch, Promise.all для независимых запросов. `await` не делает HTTP синхронным и не блокирует UI. Блокирующий synchronous XMLHttpRequest не добавлялся: отдельного требования реализовать такой вызов в практической части нет.

## 5. Первоначальная цель и правила реализации

Превратить существующий frontend MotoRide в полноценное приложение, использующее текущий backend, с сохранением существующего дизайна, архитектуры и работающих компонентов.

Перед реализацией требовалось изучить:

- App.vue, main.ts, router/index.ts, AppNavbar.vue, MotoCard.vue;
- все существующие views и src/assets/css;
- package.json, vite.config.ts, tsconfig;
- все REST-контроллеры backend, request/response DTO;
- Spring Security, JWT, CSRF, права доступа;
- фактические маршруты, пагинацию, ошибки и `/v3/api-docs`;
- составить матрицу endpoint → страница/действие → доступ → покрытие.

Это сделано. Матрица находится в `docs/API-AUDIT.md`, её полная копия включена дальше.

### Стек и запреты

Сохранить Vue 3, TypeScript, Vite, Vue Router, SFC, Composition API, `<script setup lang="ts">`, существующий CSS.

Обоснованно добавлены Axios, Pinia, ESLint, eslint-plugin-vue, typescript-eslint, Prettier, Vitest, Vue Test Utils. Happy DOM служит средой компонентных тестов.

Не внедрять React, Nuxt, Redux, Tailwind, Bootstrap, PrimeVue, Vuetify и крупные UI-фреймворки. Не писать новый код на Options API. Не создавать лишние классы, фабрики, repository/use-case слои. Не использовать any и подавления TypeScript ради обхода ошибок.

Разделять представление, запросы и состояние. Контракты отдельно, сессия в Pinia, повторяемая реактивная логика в composables. Локальные данные оставлять в компонентах, если глобальность не нужна. Не выполнять HTTP прямо в HTML-шаблонах. Не переставлять все файлы только ради идеальной структуры.

### Дизайн

Исходные CSS-переменные:

- `--color-bg: #080a0e`
- `--color-bg-soft: #0f1219`
- `--color-surface: rgba(16, 19, 26, 0.88)`
- `--color-text: #e8ecf1`
- `--color-accent: #e63a2a`
- `--color-accent-soft: #ff6b35`
- Шрифты Inter и Orbitron.

Сохранить тёмный фон, красно-оранжевые акценты, навигацию, скруглённые карточки, кнопки и поля, композицию, типографику, hover/focus.

Не добавлять 3D, тяжёлые анимации, анимационные библиотеки, чрезмерные градиенты и свечения, новую громоздкую дизайн-систему. Малые адаптивные и accessibility-улучшения допустимы.

### UX

Для асинхронных сценариев нужны loading/error/empty/success, блокировка отправляемых форм, ошибки рядом с полями, подтверждение удаления, клавиатурная навигация, label, aria, видимый focus.

Не использовать window.alert как имитацию результата. Не оставлять фиктивную ссылку «Забыли пароль?». Не добавлять изменение email, аватар, загрузку изображений или восстановление пароля, если API отсутствует.

Обрабатывать 400, 401, 403, 404, 409, 429 и сетевые ошибки. Все URL API централизованы. Credentials/cookies учитывать при запросах.

## 6. Функциональный объём, который требовал пользователь

### Публичные страницы

- Главная с реальными motorcycle summary и топом мощности, структура HomeView сохранена.
- Каталог `/motorcycles`: бренд/модель, category slug, sort, pagination, параметры в query string.
- `/motorcycles/:id`: фото, бренд/модель, характеристики, цена, категория, описание, технологии, отзывы, реакции, избранное.
- `/news` и `/news/:id`: список и статья, изображения, опубликованная дата, текст, pagination.
- `/community`: лента публикаций, чтение поста и комментариев гостем.
- `/about`: исходный информационный текст, реальные топ мотоциклов и технологии.
- Дополнительно простые `/categories/:slug` и `/technologies/:id` для GET конкретного справочного ресурса.

### Авторизованный пользователь

- Регистрация с email, password, displayName. ADMIN через регистрацию не создаётся.
- Вход, восстановление после reload, корректный refresh, выход и logout-all.
- Избранное: список, добавление/удаление, синхронизация интерфейса и привязка к пользователю.
- Создание/редактирование/удаление собственных отзывов, rating 1–5 и text.
- Создание поста: title/content/imageUrl и nullable motorcycleId; выбор реального мотоцикла с поиском.
- Редактирование/удаление собственного поста с подтверждением удаления.
- Создание, редактирование, удаление собственных комментариев.
- LIKE/LOVE/HELPFUL на posts/comments/reviews: количество публично, собственная реакция после входа, установка/замена/удаление.
- Профиль: текущий user, редактирование displayName, смена пароля, logout, logout-all.
- Безопасное возвращение после login на исходный внутренний route.

### ADMIN

- `/admin` с простыми разделами мотоциклов, категорий, технологий и новостей.
- POST/PUT/DELETE через реальные контроллеры.
- MotorcycleRequest: brand/model/engineCc/horsepower/badge/shortDescription/description/imageUrl/price/categoryId/technologyIds.
- Категории и технологии берутся из backend, отправляются ID, а не выдуманные названия.
- Ошибки уникальности и связанных ресурсов отображаются, удаление подтверждается.
- ADMIN может редактировать и удалять пользовательские posts/comments/reviews согласно backend.
- USER не получает доступ в админку.

### Навигация

Гость видит главную, каталог, новости, сообщество, информацию о мотоциклах, вход/регистрацию. После входа — профиль, избранное, создание поста и выход, без постоянных ссылок входа/регистрации. ADMIN дополнительно видит управление.

## 7. API и сессия: детали, которые нельзя потерять

### Auth

Пути:

- GET /api/auth/csrf
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout
- POST /api/auth/logout-all
- POST /api/auth/change-password
- GET /api/users/me
- PUT /api/users/me

Login/register/refresh возвращают `{accessToken, tokenType, expiresIn, user}`. Refresh cookie называется `refresh_token`, HttpOnly, Path `/api/auth`. JS не читает cookie и не сохраняет refresh token в переменные/storage. Access хранится только в памяти Pinia.

Все изменяющие `/api/auth/*`, включая login/register, требуют CSRF. GET csrf возвращает `{token,headerName}`; используется именно headerName из ответа, обычно `X-XSRF-TOKEN`. Axios настроен с withCredentials:true.

Bearer не передаётся на csrf/login/register/refresh/logout. Logout-all/change-password требуют Bearer. Истёкший access заранее обновляется; одновременно полученные 401 используют один Promise refresh. Повтор исходного запроса не больше одного раза. Поздний 401 от старого access должен переиспользовать уже полученный новый token, а не запускать новую ротацию.

Неверный currentPassword также даёт 401: change-password не надо автоматически повторять как запрос с истёкшим JWT. Этот случай обработан отдельно.

При refresh 401 состояние становится guest; при сетевой/серверной ошибке — unavailable, а не ложное «вы не авторизованы». Guards ожидают initialize. Защищённый UI не показывается до окончания восстановления. Есть `/session-unavailable` и `/forbidden`.

Logout ждёт уже запущенный refresh. Версия сессии защищает от запоздалого восстановления состояния после изменения сессии. После успешного logout/password change token удаляется из памяти. Ошибка logout не подменяется успешным выходом.

Backend logout-all/change-password отзывают refresh-сессии, но уже выданные JWT принимаются до истечения TTL. Это ограничение backend, не обещать мгновенный глобальный отзыв access tokens.

### Pagination

- GET motorcycles возвращает **массив**, totals — заголовки `X-Total-Count` и `X-Total-Pages`.
- Category filter — slug.
- Sort: newest, hp_desc, price_asc, price_desc. Backend также принимает hp, UI использует основной hp_desc.
- page начинается с 0, size 1–100.
- News/reviews/favorites возвращают массивы с page/size, без общего количества.
- Posts/comments возвращают PageResponse: content/page/size/totalElements/totalPages.
- Нельзя превращать один формат в другой на основании догадок.
- В новостях и отзывах «Далее» возможно при полной странице, последняя страница может быть пустой.
- Избранное загружается пакетами по 100 до конца, поскольку отдельного membership endpoint нет. Store очищается при смене пользователя; frontend-список отображается страницами.

### DTO и validation

- MotorcycleSummary не имеет description. Карточка не должна читать несуществующее поле.
- Motorcycle detail содержит categoryId/technologyIds и массив имён technologies.
- Review имеет authorId/authorName, а Post/Comment — вложенный author `{id,displayName}`.
- ReviewRequest: `{rating,text}`. CommentRequest: `{text}`.
- PostRequest: `{title,content,imageUrl,motorcycleId}`; необязательные значения null.
- Реакции: LIKE/LOVE/HELPFUL. Own reaction возвращает `{kind:null}`, когда реакции нет. Counts может не содержать ключи с нулём.
- Error: `{status,message,details,path,timestamp,fieldErrors}`. 429 имеет Retry-After.
- Пароль: минимум 8 Unicode code points, максимум 72 UTF-8 bytes; login/currentPassword допускают минимум 1.
- DisplayName максимум 100, email максимум 254.
- URL изображения должен соответствовать backend: http(s) с `/` после hostname или `/images/...`. Nullable imageUrl отправляется null, не пустой строкой.
- News publishedAt — LocalDateTime; frontend трактует backend-время как UTC, админское поле подписано UTC.
- Backend включает fail-on-unknown-properties. В POST/PUT нельзя отправлять response DTO целиком. При редактировании мотоцикла явно перечислены только request-поля: id/categoryName/categorySlug/technologies не уходят в запрос.

Полные TS-контракты и endpoint-матрица включены в приложения.

## 8. Что уже реализовано и как устроен код

В начале были только Home/Auth/Register/About, статические мотоциклы, demo email/password и window.alert. Сейчас это удалено из основных сценариев.

Важные файлы:

- `src/api/http.ts`: единый Axios, cookies/CSRF, Bearer, single-flight refresh, replay-once.
- `src/api/auth.ts`: auth/user API.
- Остальные `src/api/*.ts`: motorcycles/categories/technologies/news/favorites/reviews/posts/reactions.
- `src/api/errors.ts`: нормализация ошибок и fieldErrors.
- `src/types/api.ts`: все DTO.
- `src/stores/auth.ts`: сессия, login/register/logout/password/profile, права.
- `src/stores/favorites.ts`: пользовательское избранное, загрузка всех страниц, сброс при смене account.
- `src/router/guards.ts`: восстановление, auth/admin/guest guards, unavailable.
- `src/router/index.ts`: routes, lazy views, scroll behavior.
- `src/composables/useRequest.ts`: loading/data/error, защита от устаревших async результатов, mutation state.
- `src/composables/usePageQuery.ts`: page из query и navigation.
- `src/utils/format.ts`: цена/дата, safeRedirect, password validation, safe image URL.
- `src/App.vue`: оболочка, восстановление сессии, блокировка protected UI, skip link.
- `src/components/AppNavbar.vue` и `MotoCard.vue`: адаптация исходных компонентов.
- `FavoriteButton.vue`, `MotorcyclePicker.vue`: реальные избранное и выбор мотоцикла.
- `components/social`: ReactionBar, TextEntryForm, ReviewsSection, CommentsSection.
- `components/admin`: AdminMotorcycles/MotorcycleForm/AdminDictionary/AdminNews.
- `components/ui`: RequestState, FormNotice, FormField, PageNav, ConfirmDelete, ContentImage.
- `ContentImage` показывает «Фото недоступно», если URL отсутствует/ошибочен/изображение не загрузилось.
- `ConfirmDelete` использует dialog, возврат focus, отмену и отключение кнопок на время запроса.
- `src/assets/css/components/application.css`: общие стили новых элементов и адаптивности; исходные CSS сохранены.

Не добавлены React/UI-фреймворки, блокирующие запросы, upload/reset password/email editing. Не требуется новый проект или ещё один frontend directory.

## 9. Проверки и доказательства

Последняя итоговая проверка:

- ESLint — успешно, без предупреждений.
- TypeScript — успешно, включая тесты.
- Vitest — **44 теста в 3 файлах**, успешно.
- Production build — успешно.
- Prettier check изменённых исходников и документации — успешно.
- git diff --check — успешно.
- Реальный backend health — UP.
- **21 браузерный этап** Chromium с настоящими Spring Boot/PostgreSQL — успешно, без runtime ошибок браузера.

Тесты:

- `tests/auth.test.ts`: restore, CSRF/credentials/no-storage, guest vs unavailable, concurrent refresh, late 401, replay once, failed refresh cleanup, proactive expiry, неверный currentPassword, logout/logout-all, password change, logout vs active refresh.
- `tests/guards.test.ts`: guest/public/protected, unavailable, USER/ADMIN, ownership, safeRedirect, Unicode password byte limits.
- `tests/ui.test.ts`: Login/Register, validation у поля, catalog/query/history/pagination headers, loading/error/empty/retry, favorites account isolation и >100 записей, review/comment create/edit, post edit/foreign access, реакции, exact MotorcycleRequest, конфликт dictionary, news DTO.
- `tests/helpers.ts`: fixtures и test-only Axios adapter.
- `tsconfig.tests.json`: type-check тестов.

Реальная браузерная проверка: `scripts/browser-smoke.mjs`. Она не подменяет API. Playwright устанавливался во временную папку вне dependencies frontend. Проверяется полноценный путь от создания контента ADMIN, регистрации USER и действий с контентом до удаления ресурсов и выхода. Все 21 этап перечислены в приложении с отчётом.

Важные пределы доказательств:

- Chromium, desktop 1280×720, mobile viewport 390×844.
- Мобильные публичные страницы проверены на горизонтальное переполнение.
- Safari/Firefox, production HTTPS/reverse proxy, нагрузочные тесты не проверялись.
- Реальную длительную экспирацию JWT по таймеру не нужно выдавать за браузерный тест: логика истечения/401/single-flight проверяется автоматическими тестами, а restore/rotation через cookie — реальным браузером.
- Тестовый контент удалён после успешного smoke. Два аккаунта на каждый полный smoke остаются, потому что API удаления пользователя отсутствует. Не удалять чужие данные или БД ради уборки.
- `/tmp/motoride-smoke/report.json`, mobile-catalog.png, desktop-catalog.png — временные артефакты, могут исчезнуть. Устойчивое описание результата в `docs/VERIFICATION.md`.
- Первоначальный smoke был раньше; актуальный повтор выполнен 13 ноября 2026, в отчёте timestamp `2026-11-13T19:31:07.639Z`.

## 10. Известное ограничение с изображениями

В текущей backend БД есть мотоциклы со ссылками вроде `/images/bikes/yzf-r1.png`. Прямой проверенный GET этой картинки вернул **401**, файлов изображений в `backend/src/main/resources` не найдено.

Frontend действительно использует imageUrl из backend, но не может нарисовать отсутствующее/недоступное изображение. Поэтому показан аккуратный fallback «Фото недоступно». Это не замена каталога mock-данными.

Варианты решения, если пользователь попросит:

1. Через ADMIN указать реальные доступные URL изображений.
2. Отдельно обеспечить раздачу `/images` и ресурсов через reverse proxy/static storage.
3. Изменение backend security/static resources обсуждать отдельно, поскольку пользователь просил backend не править.

Не генерировать случайные «настоящие фото модели», не подменять ошибку выдуманными данными, не обещать, что все картинки работают. На desktop screenshot многие картинки имеют fallback именно по этой причине.

## 11. Запуск и конфигурация

Frontend и backend оставлены запущенными по окончании проверки; это историческое состояние, после переноса чата надо проверить порты и процессы.

Backend:

```bash
cd ~/project/MotoRideLab3Api
COOKIE_SECURE=false docker compose up -d --build
```

Используется существующий `.env` backend. Не показывать его содержимое, не копировать секреты в frontend, не коммитить `.env`. PostgreSQL и API запускаются существующим docker-compose. ADMIN создаётся bootstrap-механизмом backend при соответствующей конфигурации; frontend не выдаёт роль ADMIN при регистрации.

Frontend из корня `/Users/bogdan/PycharmProjects/motoride2laba`:

```bash
npm ci
npm run dev
```

- UI `http://localhost:5173`.
- API `http://localhost:8080`.
- OpenAPI `http://localhost:8080/v3/api-docs`.
- Health `http://localhost:8080/actuator/health`.
- Vite strictPort 5173.
- `/api` и `/images` проксируются в localhost:8080.
- `.env.example`: `VITE_API_BASE_URL=`. Пустое значение — same-origin через proxy. При отдельном origin указывается origin без `/api`.
- COOKIE_SECURE=false только для локального HTTP. Production HTTPS — true, CORS origins по конфигурации backend.
- Refresh cookie Path=/api/auth, CSRF header X-XSRF-TOKEN.
- Node engines: `^22.18.0 || >=24.12.0`.

В инструментальной shell однажды docker не находился или credential helper отсутствовал в PATH. Рабочая форма для этой macOS:

```bash
PATH=/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin COOKIE_SECURE=false docker compose up -d
```

Это особенность PATH окружения инструмента, не необходимость менять проект.

Production: собранный dist раздаётся reverse proxy, API — Spring Boot, SPA fallback на index.html, HTTPS, корректный Set-Cookie, отсутствие кэширования auth/profile. `vite preview` не заменяет production reverse proxy.

Браузерный smoke:

```bash
npm install --prefix /tmp/motoride-browser-tools --no-save playwright
/tmp/motoride-browser-tools/node_modules/.bin/playwright install chromium
PLAYWRIGHT_MODULE=/tmp/motoride-browser-tools/node_modules/playwright/index.mjs node scripts/browser-smoke.mjs
```

Нужны MOTORIDE_ADMIN_EMAIL/MOTORIDE_ADMIN_PASSWORD через environment, никаких значений в этом файле нет. Скрипт также понимает MOTORIDE_FRONTEND_URL и MOTORIDE_SMOKE_OUTPUT. Запускать против локальной тестовой БД. Не превращать временный инструмент Playwright в обязательную runtime dependency Vue-приложения.

## 12. Последняя тема: PyCharm показывает Vue как обычные текстовые файлы

Пользователь спросил, почему проект Vue некорректно отображается в PyCharm.

Проверено локально:

- `/Applications/PyCharm.app/Contents/Resources/product-info.json`: PyCharm **2025.3.5**, build **253.33514.19**, productCode PY.
- Есть конфигурационные директории:
  - `~/Library/Application Support/JetBrains/PyCharm2025.3`
  - `~/Library/Application Support/JetBrains/PyCharm2026.1`
- В `disabled_plugins.txt` обеих найденных конфигураций присутствует **com.intellij.modules.ultimate**.
- В проверенных `options/filetypes.xml` не найдено назначения `.vue` типу обычного текста; там только ignoreFiles.
- Отдельные пользовательские plugin-папки с Vue/JavaScript по проверенному списку не обнаружены. Это не является полным аудитом всех bundled plugins.
- Не установлено, есть ли у пользователя действующая Pro-лицензия и какая конфигурация фактически загружена в открытом окне IDE. Не утверждать, что лицензии нет, только что модуль отключён в найденных настройках.

Проверена официальная документация JetBrains:

- https://www.jetbrains.com/help/pycharm/vue-js.html
- https://plugins.jetbrains.com/plugin/9442-vue-js

По документации поддержка Vue требует PyCharm Pro, включённого JavaScript and TypeScript и Vue.js plugin от JetBrains.

Пользователю предложено:

1. Settings через Cmd+, → Plugins.
2. Проверить JavaScript and TypeScript.
3. Marketplace → Vue.js от JetBrains → установить/включить.
4. При требовании Pro активировать доступную лицензию.
5. Перезапустить IDE.

Настройки IDE фактически не менялись, плагины не устанавливались, проблема пользователем ещё не подтверждена как исправленная. Проект компилируется корректно; пересоздавать проект, переименовывать .vue или переписывать код для этой проблемы не надо. Не отключать проверки лицензии и не обходить лицензирование.

## 13. Что делать следующему ассистенту

- Сначала понять новый запрос пользователя. Интеграция уже выполнена, а не только спланирована.
- Проверить git status и исходники перед правками. Не сбрасывать существующие uncommitted/untracked файлы.
- При работе над IDE продолжать диагностику Plugins/Pro/File Types, не ломать Vue-проект.
- При работе над функциональностью сверять код backend и OpenAPI, а не выдумывать endpoint/DTO.
- Не добавлять backend изменения без новой необходимости и обсуждения.
- Поддерживать код без поясняющих комментариев. Не возвращать demo credentials, alerts, hardcoded arrays.
- Не запускать полную батарею тестов многократно без изменений, но проверить затронутые сценарии после реальной правки.
- Не выдавать прошлые результаты за свежезапущенные проверки. Не обещать работоспособность остановленных процессов.
- Не добавлять сложность UI и новые неподдержанные API-функции.
- Не делать push в main без отдельного разрешения. Коммит тоже не был выполнен ранее; не предполагать, что изменения уже сохранены в истории Git.

## 14. Что находится в приложениях ниже

Для автономности переноса в этот файл включены:

1. Текущие README, лабораторная записка, аудит API, проверочный отчёт.
2. Текущее дерево исходников/тестов и git status.
3. Полные основные конфигурации.
4. TS-контракты, auth/HTTP, API-модули, stores, guards/router, composables и утилиты.
5. Список названий автоматических тестов.

Полные Vue-шаблоны всех страниц намеренно не дублируются: они уже лежат в проекте, а их обязанности и пути перечислены. Это контекст, а не архив файлов. Если новый чат не имеет доступа к рабочей папке, кроме этого файла нужно прикрепить сам проект или diff вместе с untracked файлами. Обычный `git diff` не включает untracked файлы — без них новая реализация будет неполной.

---


# Приложение: README.md

# MotoRide — лабораторная работа №6

Существующее Vue 3 приложение подключено к REST API из лабораторной №5. Сохранены дизайн, CSS-переменные, Inter/Orbitron, карточки и навигация. Backend не изменён.

## Запуск

Нужны Node.js `^22.18.0` или `>=24.12.0`, npm и запущенный Docker Desktop.

В первом терминале запустите существующий backend:

```bash
cd ~/project/MotoRideLab3Api
COOKIE_SECURE=false docker compose up -d --build
```

Используется существующий backend `.env`. Если окружение создаётся впервые, подготовьте его по `.env.example` backend: задайте пароль PostgreSQL и JWT_SECRET. Секреты относятся только к backend. Пользователь ADMIN создаётся предусмотренным backend bootstrap-механизмом, а не через frontend.

`COOKIE_SECURE=false` нужен для локального HTTP. Для production с HTTPS используйте `COOKIE_SECURE=true`. Разрешённый CORS origin для локального запуска: `http://localhost:5173`.

Во втором терминале, из корня этого frontend-репозитория:

```bash
npm ci
npm run dev
```

Открыть **http://localhost:5173**. API: **http://localhost:8080**. OpenAPI: **http://localhost:8080/v3/api-docs**.

Frontend уже расположен в корне репозитория — дополнительной папки с копией Vue-проекта нет. `.env` создавать необязательно: по умолчанию запросы `/api` и изображения `/images` идут через Vite proxy на `localhost:8080`. `.env.example` содержит `VITE_API_BASE_URL`; при необходимости это origin API без суффикса `/api`. После изменения переменной перезапустите Vite.

Если каталог пуст, войдите существующим ADMIN и добавьте категорию, технологии и мотоцикл в `/admin`. Приложение не подставляет демонстрационные данные.

## Функциональность

| Раздел            | Возможности                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Главная и каталог | Реальные мотоциклы, топ мощности, поиск, категория, сортировка, страницы, параметры в URL |
| Мотоцикл          | Характеристики, описание, технологии, избранное, отзывы и реакции                         |
| Новости           | Список со страницами, полная статья                                                       |
| Сообщество        | Публикации, комментарии, создание, изменение, удаление с подтверждением                   |
| Реакции           | LIKE, LOVE, HELPFUL для публикаций, комментариев, отзывов                                 |
| Профиль           | displayName, смена пароля, выход, выход на всех устройствах                               |
| Управление        | CRUD мотоциклов, категорий, технологий, новостей для ADMIN                                |

Публичное чтение доступно гостю. Создание контента требует входа. Изменять и удалять пользовательский контент может автор или ADMIN. Проверки интерфейса дополняют серверную авторизацию.

Состояния загрузки, пустого результата, успешной операции и ошибки разделены. Ошибки валидации показаны у полей; сетевые ошибки не подменяются успешными ответами.

## Организация кода

- `src/api` — единый Axios-клиент и функции реальных API-запросов.
- `src/types/api.ts` — request/response DTO по коду backend.
- `src/stores` — Pinia для сессии и избранного текущего пользователя.
- `src/composables` — загрузка, изменения и пагинация.
- `src/views` — страницы Vue Router.
- `src/components` — существующие карточка и навигация, формы и повторяющиеся элементы.
- `src/assets/css` — исходные стили и общие правила новых страниц.
- `tests` — Vitest и Vue Test Utils; подмена транспорта используется только в тестах.

Код написан без поясняющих комментариев. Описание контрактов и решений вынесено в документацию.

## Сессия

Access token хранится только в памяти. Refresh token остаётся в HttpOnly cookie backend с Path `/api/auth`; JavaScript его не читает и не сохраняет. Перед auth POST клиент получает CSRF token через `/api/auth/csrf` и использует возвращённый `headerName`.

При перезагрузке выполняется восстановление сессии. Одновременные 401 используют один refresh; исходный запрос повторяется максимум один раз. На refresh просроченный Bearer не передаётся. Отсутствие сессии отличается от недоступности сервера. Защищённые страницы ожидают результат восстановления.

## Проверки

```bash
npm run lint
npm run type-check
npm run test
npm run build
npm run format
```

`format` запускается при редактировании; для проверки без изменений используйте `npx prettier --check` с нужными путями. Production-сборка находится в `dist`.

Тесты проверяют сессию, CSRF, single-flight refresh, поздние 401, guards, регистрацию и вход, query-фильтры, загрузку и ошибки, избранное, отзывы, публикации, комментарии, реакции, права и административные формы. TypeScript проверяет также тестовые файлы.

### Необязательная проверка в реальном браузере

`scripts/browser-smoke.mjs` проверяет запущенные frontend, Spring Boot и PostgreSQL. Playwright используется как внешний инструмент проверки и не включён в зависимости приложения:

```bash
npm install --prefix /tmp/motoride-browser-tools --no-save playwright
/tmp/motoride-browser-tools/node_modules/.bin/playwright install chromium
```

Перед запуском задайте `MOTORIDE_ADMIN_EMAIL` и `MOTORIDE_ADMIN_PASSWORD` через окружение терминала. Используйте администратора локальной тестовой базы, не production.

```bash
PLAYWRIGHT_MODULE=/tmp/motoride-browser-tools/node_modules/playwright/index.mjs node scripts/browser-smoke.mjs
```

Сценарий создаёт собственные временные ресурсы и удаляет их в конце, проверяет регистрацию, профиль, CRUD, права, cookies, реакции, выход, смену пароля и мобильное отображение. Отчёт и снимки сохраняются в `/tmp/motoride-smoke`. Два тестовых пользователя остаются в локальной базе: backend не предоставляет API удаления пользователей. Существующий контент сценарий не изменяет. При прерванном процессе очистка может не завершиться.

## Production

Раздавайте `dist` через reverse proxy с HTTPS. Маршруты `/api` направляйте в Spring Boot, `/images` — в источник изображений, остальные пути — в `index.html` для Vue Router. Для одного origin оставьте `VITE_API_BASE_URL` пустым. Не кэшируйте ответы auth/profile и не удаляйте заголовки Set-Cookie. `npm run preview` проверяет только сборку, production reverse proxy он не заменяет.

## Ограничения реального API

- Новости и отзывы возвращают массивы без total: кнопка «Далее» определяется размером страницы; последняя страница может оказаться пустой.
- Избранное загружается порциями по 100 записей: отдельного endpoint проверки принадлежности мотоцикла избранному нет.
- Logout-all и смена пароля отзывают refresh-сессии. Уже выданные JWT backend принимает до истечения их срока; frontend удаляет свой access token сразу после успешной операции.
- Предзаполненные backend пути `/images/bikes/...` сейчас не отдаются (проверенный запрос — 401, файлов в ресурсах backend нет). Показывается «Фото недоступно». Можно задать рабочие URL через админку или настроить раздачу изображений отдельно.
- Upload изображений, восстановление пароля и изменение email не предусмотрены API и не имитируются.
- Автоматическая проверка интерфейса использует Chromium. Safari и Firefox отдельно не проверены; production-развёртывание и HTTPS не выполнялись.

Матрица API: [docs/API-AUDIT.md](docs/API-AUDIT.md). Требования и сценарий сдачи: [docs/LAB6.md](docs/LAB6.md).

Результаты проверок: [docs/VERIFICATION.md](docs/VERIFICATION.md).



# Приложение: docs/LAB6.md

# Лабораторная работа №6: работа с HTTP-запросами

Источник: предоставленный документ «Лабораторная работа №6.docx».

## Что требует задание

1. Изучить возможности Vue для отправки HTTP-запросов.
2. Выбрать подходящую библиотеку запросов.
3. Реализовать взаимодействие frontend с REST API предыдущей лабораторной.
4. Продемонстрировать взаимодействие frontend и REST API.

В целях также указаны Ajax, синхронные/асинхронные запросы и промисы. Практическая реализация использует асинхронные запросы. `await` задаёт порядок операций внутри функции, но не блокирует интерфейс и не превращает HTTP-запрос в синхронный. Блокирующий XMLHttpRequest для этого задания не нужен.

## Принятое решение

Vue 3 + TypeScript + Vue Router сохраняются. Axios выбран для общего base URL, credentials, заголовков и обработки ответов. Promise представлен результатом запроса, async/await — способом дождаться ответа, try/catch — обработкой отказа. Promise.all применяется к независимым запросам, например категориям и технологиям.

Backend — существующий `~/project/MotoRideLab3Api`, ветка `feature/backend-lab5`. Контроллеры, DTO, JWT, CSRF и права уже реализованы. Изменения backend для этой работы не потребовались.

Frontend использует реальные данные. Никаких встроенных учётных записей, заранее заполненных паролей, демонстрационного каталога, фиктивных alert-уведомлений или придуманного API нет. Фиксированные подписи, значения enum и ограничения полей соответствуют интерфейсу и DTO backend. Тестовые данные находятся только в тестах.

## Что показать преподавателю

| Шаг | Действие в браузере                                | HTTP и наблюдаемый результат                                                |
| --- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | Открыть DevTools → Network, затем каталог          | GET /api/motorcycles, данные из БД, X-Total-Count/X-Total-Pages             |
| 2   | Поиск, категория, сортировка, переход страницы     | Query-параметры меняются в адресе и запросе                                 |
| 3   | Зарегистрироваться или войти                       | GET /api/auth/csrf, POST register/login, cookie и сессия                    |
| 4   | Обновить страницу                                  | POST refresh с CSRF, сессия восстанавливается                               |
| 5   | Добавить мотоцикл в избранное, затем удалить       | POST и DELETE /api/favorites/{id}; после перезагрузки результат сохраняется |
| 6   | Создать и изменить отзыв                           | POST /motorcycles/{id}/reviews, PUT /reviews/{id}                           |
| 7   | Создать публикацию, комментарий, поставить реакцию | POST /posts, POST comments, PUT reaction; изменения видны после обновления  |
| 8   | Войти другим USER и открыть чужую публикацию       | Чтение доступно, изменение скрыто; backend запрещает прямой запрос          |
| 9   | Войти ADMIN и создать/изменить/удалить ресурс      | POST/PUT/DELETE; используются настоящие ID справочников                     |
| 10  | Показать некорректный запрос или отключить backend | Ошибка отображается в интерфейсе, успех не имитируется                      |
| 11  | Изменить displayName, выйти                        | PUT /users/me, POST /auth/logout; приватные страницы требуют входа          |

Для короткой демонстрации достаточно шагов 1–5 и 9–11: они показывают GET/POST/PUT/DELETE, промисы, сессию и обработку ошибок. Остальные страницы покрывают социальные возможности backend.

## Соответствие требованиям

- Существующий frontend и дизайн сохранены.
- Запросы отделены от компонентов и DTO.
- Composition API и script setup используются в новом коде.
- Авторизация и избранное принадлежат текущему пользователю.
- Гость, USER и ADMIN получают соответствующие возможности.
- Есть loading/error/empty/success, поля ошибок и подтверждение удаления.
- Нет поясняющих комментариев в исходном коде; объяснения вынесены в документацию.
- Совместный запуск описан в README; секретов backend в frontend нет.

Проверять «покрывает весь функционал» следует по [матрице endpoint → интерфейс → права](API-AUDIT.md), а не только по внешнему виду страниц.



# Приложение: docs/API-AUDIT.md

# Аудит MotoRide

Frontend: существующий проект в корне motoride2laba; App, main, router, Navbar, MotoCard, все четыре views, CSS и конфигурация изучены. Сохраняем корень проекта, компоненты и CSS, не создаём второй Vue-проект.

Backend: локальный `/Users/bogdan/project/MotoRideLab3Api` (remote `bogdanpryadko2/MotoRideLab3Api`). Подтверждён пользователем; ветка `feature/backend-lab5`, commit `3464435`. Изучены все 12 контроллеров, DTO, сервисы проверки владельца, SecurityConfig, AuthService, обработчик ошибок. OpenAPI `/v3/api-docs` проверен при совместном запуске с PostgreSQL; контракты совпали. Backend не изменялся.

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



# Приложение: docs/VERIFICATION.md

# Итоговая проверка

Дата: 13 ноября 2026. Backend: `~/project/MotoRideLab3Api`, ветка `feature/backend-lab5`, commit `3464435`. Исходники backend не изменены.

## Команды

| Проверка                                                    | Результат                     |
| ----------------------------------------------------------- | ----------------------------- |
| `npm run lint`                                              | Успешно, без предупреждений   |
| `npm run type-check`                                        | Успешно, включая тесты        |
| `npm run test`                                              | 44 теста, 3 файла, все прошли |
| `npm run build`                                             | Успешно, сборка в dist        |
| `prettier --check` для изменённых исходников и документации | Успешно                       |
| `git diff --check`                                          | Успешно                       |
| GET /actuator/health                                        | UP                            |
| Браузерный сценарий с настоящим API                         | 21 этап, 0 ошибок             |

## Реальный браузер и PostgreSQL

1. OpenAPI доступен, реальный ADMIN входит через CSRF/cookie.
2. ADMIN создаёт категорию через интерфейс.
3. ADMIN создаёт технологию через интерфейс.
4. ADMIN создаёт мотоцикл с categoryId и technologyIds.
5. ADMIN редактирует мотоцикл без response-only полей.
6. ADMIN создаёт и редактирует новость.
7. Гость читает каталог и сохраняет фильтры в URL.
8. Регистрация через форму создаёт USER и возвращает к мотоциклу.
9. Избранное сохраняется в PostgreSQL и удаляется через интерфейс.
10. Отзыв создаётся, редактируется и получает реакцию.
11. Публикация создаётся и редактируется через форму.
12. Комментарий создаётся, редактируется; реакции заменяются и удаляются.
13. Перезагрузка восстанавливает сессию; токенов нет в web storage.
14. USER не получает админку и не может менять чужой контент.
15. Профиль обновляет displayName.
16. Мобильные публичные страницы не имеют горизонтального переполнения.
17. Комментарий и публикация удаляются с подтверждением.
18. Отзыв удаляется с подтверждением.
19. Logout-all отзывает refresh-сессии; повторный login работает.
20. Смена пароля завершает сессию и позволяет войти с новым паролем.
21. ADMIN удаляет новость, мотоцикл, категорию и технологию через UI.

Сценарий: `scripts/browser-smoke.mjs`. Никаких подмен HTTP в нём нет. Playwright установлен вне приложения. Отчёт текущего прогона: `/tmp/motoride-smoke/report.json`; снимки: `mobile-catalog.png` и `desktop-catalog.png` в той же временной папке.

## Изменения

- `src/api/*`, `src/types/api.ts`: HTTP-клиент и реальные контракты.
- `src/stores/*`, `src/router/*`, `src/composables/*`, `src/utils/*`: сессия, права, избранное, загрузка и форматирование.
- Существующие App, main, Navbar, MotoCard и views: подключение реального API с сохранением оформления.
- Новые views каталога, мотоцикла, новостей, сообщества, профиля, избранного, справочников и управления.
- `src/components/admin/*`, `social/*`, `ui/*`: формы, реакции, подтверждение удаления, состояния запроса.
- `src/assets/css/components/application.css`: общие адаптивные правила.
- package.json/lock, Vite, ESLint, Prettier, Vitest, tsconfig: конфигурация и проверки.
- README, `.env.example`, `docs/API-AUDIT.md`, `docs/LAB6.md`: запуск, матрица и демонстрация лабораторной.

## Границы проверки

Проверялся локальный HTTP через Vite proxy и Chromium. Production reverse proxy, HTTPS, Safari и Firefox не проверены. Мобильная проверка использовала viewport 390×844, настольная — 1280×720.

Временные категории, технологии, мотоцикл, новость и социальный контент удалены после теста. Два созданных тестовых пользователя остались в локальной базе; API удаления пользователей отсутствует. Их адреса записаны только в локальном отчёте. Существующий контент не изменялся.

Backend и frontend оставлены запущенными на 8080 и 5173. Push и commit не выполнялись.

Обнаружено ограничение исходных изображений: каталог backend возвращает `/images/bikes/yzf-r1.png` и похожие пути, но запрос проверенного изображения получает HTTP 401; файлов изображений в `src/main/resources` backend нет. Frontend показывает «Фото недоступно». Для фотографий нужно указать рабочие URL в административной форме либо отдельно обеспечить раздачу изображений. Backend в рамках этой работы не менялся.



# Приложение: состояние Git при подготовке

```text
 M .gitignore
 M README.md
 M env.d.ts
 M index.html
 M package-lock.json
 M package.json
 M src/App.vue
 M src/components/AppNavbar.vue
 M src/components/MotoCard.vue
 M src/main.ts
 M src/router/index.ts
 M src/views/AboutView.vue
 M src/views/AuthView.vue
 M src/views/HomeView.vue
 M src/views/RegisterView.vue
 M tsconfig.app.json
 M tsconfig.json
 M tsconfig.node.json
 M vite.config.ts
?? .env.example
?? .prettierignore
?? .prettierrc.json
?? docs/
?? eslint.config.js
?? scripts/
?? src/api/
?? src/assets/css/components/application.css
?? src/components/FavoriteButton.vue
?? src/components/MotorcyclePicker.vue
?? src/components/admin/
?? src/components/social/
?? src/components/ui/
?? src/composables/
?? src/router/guards.ts
?? src/stores/
?? src/types/
?? src/utils/
?? src/views/AdminView.vue
?? src/views/CatalogView.vue
?? src/views/CommunityView.vue
?? src/views/FavoritesView.vue
?? src/views/MotorcycleView.vue
?? src/views/NewsDetailView.vue
?? src/views/NewsView.vue
?? src/views/PostFormView.vue
?? src/views/PostView.vue
?? src/views/ProfileView.vue
?? src/views/ReferenceView.vue
?? src/views/StatusView.vue
?? tests/
?? tsconfig.tests.json
?? vitest.config.ts
```


# Приложение: дерево файлов

```text
scripts/browser-smoke.mjs
src/App.vue
src/api/auth.ts
src/api/categories.ts
src/api/errors.ts
src/api/favorites.ts
src/api/http.ts
src/api/motorcycles.ts
src/api/news.ts
src/api/posts.ts
src/api/reactions.ts
src/api/reviews.ts
src/api/technologies.ts
src/assets/css/base/global.css
src/assets/css/base/reset.css
src/assets/css/base/variables.css
src/assets/css/components/application.css
src/assets/css/components/buttons.css
src/assets/css/components/cards.css
src/assets/css/components/forms.css
src/assets/css/components/nav.css
src/assets/css/layout/sidebar.css
src/assets/css/pages/about.css
src/assets/css/pages/auth.css
src/assets/css/pages/home.css
src/assets/css/pages/register.css
src/components/AppNavbar.vue
src/components/FavoriteButton.vue
src/components/MotoCard.vue
src/components/MotorcyclePicker.vue
src/components/admin/AdminDictionary.vue
src/components/admin/AdminMotorcycles.vue
src/components/admin/AdminNews.vue
src/components/admin/MotorcycleForm.vue
src/components/social/CommentsSection.vue
src/components/social/ReactionBar.vue
src/components/social/ReviewsSection.vue
src/components/social/TextEntryForm.vue
src/components/ui/ConfirmDelete.vue
src/components/ui/ContentImage.vue
src/components/ui/FormField.vue
src/components/ui/FormNotice.vue
src/components/ui/PageNav.vue
src/components/ui/RequestState.vue
src/composables/usePageQuery.ts
src/composables/useRequest.ts
src/main.ts
src/router/guards.ts
src/router/index.ts
src/stores/auth.ts
src/stores/favorites.ts
src/types/api.ts
src/utils/format.ts
src/views/AboutView.vue
src/views/AdminView.vue
src/views/AuthView.vue
src/views/CatalogView.vue
src/views/CommunityView.vue
src/views/FavoritesView.vue
src/views/HomeView.vue
src/views/MotorcycleView.vue
src/views/NewsDetailView.vue
src/views/NewsView.vue
src/views/PostFormView.vue
src/views/PostView.vue
src/views/ProfileView.vue
src/views/ReferenceView.vue
src/views/RegisterView.vue
src/views/StatusView.vue
tests/auth.test.ts
tests/guards.test.ts
tests/helpers.ts
tests/ui.test.ts
```


# Снимок файла: package.json

```json
{
  "name": "moto-ride",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "lint": "eslint . --max-warnings 0",
    "format": "prettier --write src tests docs *.ts *.js *.json *.md .env.example index.html --ignore-unknown",
    "test": "vitest run"
  },
  "dependencies": {
    "axios": "^1.21.0",
    "pinia": "^4.1.0",
    "vue": "^3.5.40",
    "vue-router": "^4.6.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tsconfig/node24": "^24.0.4",
    "@types/node": "^24.13.3",
    "@vitejs/plugin-vue": "^6.0.8",
    "@vue/test-utils": "^2.5.1",
    "@vue/tsconfig": "^0.9.1",
    "eslint": "^10.13.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-vue": "^10.12.0",
    "happy-dom": "^21.0.4",
    "npm-run-all2": "^9.0.2",
    "prettier": "^3.9.10",
    "typescript": "~6.0.0",
    "typescript-eslint": "^8.72.1",
    "vite": "^8.1.5",
    "vite-plugin-vue-devtools": "^8.1.5",
    "vitest": "^5.0.5",
    "vue-tsc": "^3.3.7"
  },
  "engines": {
    "node": "^22.18.0 || >=24.12.0"
  }
}
```


# Снимок файла: vite.config.ts

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/images': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
})
```


# Снимок файла: vitest.config.ts

```typescript
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: { environment: 'happy-dom', include: ['tests/**/*.test.ts'], clearMocks: true },
  }),
)
```


# Снимок файла: eslint.config.js

```javascript
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
export default ts.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        document: 'readonly',
        innerWidth: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
      },
    },
  },
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: ts.parser } },
    rules: { 'no-undef': 'off' },
  },
  { rules: { 'vue/multi-word-component-names': 'off', 'no-console': 'error' } },
  prettier,
)
```


# Снимок файла: .prettierrc.json

```json
{ "semi": false, "singleQuote": true, "trailingComma": "all", "printWidth": 100 }
```


# Снимок файла: .env.example

```text
VITE_API_BASE_URL=
```


# Снимок файла: tsconfig.json

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.tests.json"
    }
  ]
}
```


# Снимок файла: tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,

    "paths": {
      "@/*": ["./src/*"]
    },

    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
  }
}
```


# Снимок файла: tsconfig.node.json

```json
{
  "extends": "@tsconfig/node24/tsconfig.json",
  "include": [
    "vite.config.*",
    "vitest.config.*",
    "cypress.config.*",
    "playwright.config.*",
    "eslint.config.*"
  ],
  "compilerOptions": {
    "module": "preserve",
    "moduleResolution": "bundler",

    "types": ["node"],

    "noEmit": true,
    "allowImportingTsExtensions": true,

    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  }
}
```


# Снимок файла: tsconfig.tests.json

```json
{
  "extends": "./tsconfig.app.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "tests/**/*.ts"],
  "exclude": [],
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tests.tsbuildinfo",
    "types": ["node"]
  }
}
```


# Снимок файла: env.d.ts

```typescript
import 'vite/client'
```


# Снимок файла: src/types/api.ts

```typescript
export interface User {
  id: number
  email: string
  displayName: string
  role: 'USER' | 'ADMIN'
  enabled: boolean
  createdAt: string
  updatedAt: string
}
export interface Tokens {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: User
}
export interface LoginRequest {
  email: string
  password: string
}
export interface RegisterRequest extends LoginRequest {
  displayName: string
}
export interface PasswordChange {
  currentPassword: string
  newPassword: string
}
export interface ApiError {
  status: number
  message: string
  fieldErrors: Record<string, string>
}
export interface Page<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
export interface Technology {
  id: number
  name: string
  description: string | null
}
export interface Category extends Technology {
  slug: string
}
export type TechnologyRequest = Omit<Technology, 'id'>
export type CategoryRequest = Omit<Category, 'id'>
export interface MotorcycleSummary {
  id: number
  brand: string
  model: string
  engineCc: number
  horsepower: number
  badge: string | null
  imageUrl: string
  price: number
  categorySlug: string
  categoryName: string
}
export interface Motorcycle extends MotorcycleSummary {
  shortDescription: string | null
  description: string
  technologies: string[]
  categoryId: number
  technologyIds: number[]
}
export interface MotorcycleRequest {
  brand: string
  model: string
  engineCc: number
  horsepower: number
  badge: string | null
  shortDescription: string | null
  description: string
  imageUrl: string
  price: number
  categoryId: number
  technologyIds: number[]
}
export interface CatalogQuery {
  category?: string
  search?: string
  sort?: string
  page: number
  size: number
}
export interface News {
  id: number
  title: string
  content: string
  imageUrl: string | null
  publishedAt: string
}
export type NewsRequest = Omit<News, 'id'>
export interface Favorite {
  id: number
  motorcycle: MotorcycleSummary
  createdAt: string
}
export interface ReviewRequest {
  rating: number
  text: string
}
export interface Review extends ReviewRequest {
  id: number
  createdAt: string
  authorId: number | null
  authorName: string
}
export interface Author {
  id: number
  displayName: string
}
export interface PostRequest {
  title: string
  content: string
  imageUrl: string | null
  motorcycleId: number | null
}
export interface Post extends PostRequest {
  id: number
  author: Author
  createdAt: string
  updatedAt: string
}
export interface Comment {
  id: number
  postId: number
  text: string
  author: Author
  createdAt: string
  updatedAt: string
}
export type ReactionKind = 'LIKE' | 'LOVE' | 'HELPFUL'
export type ReactionTarget = 'posts' | 'comments' | 'reviews'
export type ReactionCounts = Record<ReactionKind, number>
export interface OwnReaction {
  kind: ReactionKind | null
}
```


# Снимок файла: src/api/http.ts

```typescript
import axios, { AxiosHeaders } from 'axios'
import type { Tokens } from '@/types/api'

declare module 'axios' {
  interface AxiosRequestConfig {
    anonymous?: boolean
    retried?: boolean
    sentToken?: string | null
  }
}

export const http = axios.create({
  baseURL: `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api`,
  withCredentials: true,
  timeout: 15000,
  xsrfCookieName: undefined,
})
interface Session {
  token: () => string | null
  expired: () => boolean
  accept: (tokens: Tokens) => void
  fail: (error: unknown) => void
}
let session: Session | undefined
export function bindSession(value: Session) {
  session = value
}
let refreshFlight: Promise<Tokens> | null = null
let sessionVersion = 0
export function invalidateSessionRequests() {
  sessionVersion++
}
export async function waitForRefresh() {
  await refreshFlight?.catch(() => undefined)
}

export async function authPost<T>(
  path: string,
  body?: unknown,
  protectedRequest = false,
): Promise<T> {
  const { data: csrf } = await http.get<{ token: string; headerName: string }>('/auth/csrf', {
    anonymous: true,
  })
  const { data } = await http.post<T>(`/auth/${path}`, body, {
    anonymous: !protectedRequest,
    retried: path === 'change-password',
    headers: { [csrf.headerName]: csrf.token },
  })
  return data
}

export function refreshSession(): Promise<Tokens> {
  if (!refreshFlight) {
    const version = sessionVersion
    refreshFlight = authPost<Tokens>('refresh')
      .then((tokens) => {
        if (version !== sessionVersion) throw new Error('Сессия уже изменена.')
        session?.accept(tokens)
        return tokens
      })
      .catch((error: unknown) => {
        if (version === sessionVersion) session?.fail(error)
        throw error
      })
      .finally(() => {
        refreshFlight = null
      })
  }
  return refreshFlight
}

http.interceptors.request.use(async (config) => {
  config.headers = AxiosHeaders.from(config.headers)
  if (config.anonymous) {
    config.headers.delete('Authorization')
    return config
  }
  if (session?.token() && session.expired()) await refreshSession()
  const token = session?.token() ?? null
  config.sentToken = token
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  else config.headers.delete('Authorization')
  return config
})
http.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) throw error
    const config = error.config
    if (
      error.response?.status !== 401 ||
      !config ||
      config.anonymous ||
      config.retried ||
      !config.sentToken
    )
      throw error
    config.retried = true
    if (session?.token() === config.sentToken) await refreshSession()
    if (!session?.token()) throw error
    return http.request(config)
  },
)
```


# Снимок файла: src/api/errors.ts

```typescript
import axios from 'axios'
import type { ApiError } from '@/types/api'
const messages: Record<number, string> = {
  400: 'Проверьте заполнение полей.',
  401: 'Неверные данные входа или сессия истекла.',
  403: 'Недостаточно прав или не удалось проверить защиту запроса.',
  404: 'Ресурс не найден.',
  409: 'Конфликт: запись уже существует или связана с другими данными.',
  429: 'Слишком много запросов. Повторите позже.',
}
export function apiError(error: unknown): ApiError {
  if (axios.isAxiosError<Partial<ApiError>>(error)) {
    const status = error.response?.status ?? 0
    return {
      status,
      message:
        error.response?.data?.message ||
        messages[status] ||
        (status
          ? 'Ошибка сервера. Попробуйте позже.'
          : 'Сервер недоступен. Проверьте соединение и повторите.'),
      fieldErrors: error.response?.data?.fieldErrors ?? {},
    }
  }
  return {
    status: 0,
    message: error instanceof Error ? error.message : 'Не удалось выполнить операцию.',
    fieldErrors: {},
  }
}
```


# Снимок файла: src/api/auth.ts

```typescript
import { authPost, http } from './http'
import type { LoginRequest, RegisterRequest, PasswordChange, Tokens, User } from '@/types/api'
export const authApi = {
  login: (body: LoginRequest) => authPost<Tokens>('login', body),
  register: (body: RegisterRequest) => authPost<Tokens>('register', body),
  logout: () => authPost<void>('logout'),
  logoutAll: () => authPost<void>('logout-all', undefined, true),
  changePassword: (body: PasswordChange) => authPost<void>('change-password', body, true),
  me: async () => (await http.get<User>('/users/me')).data,
  update: async (displayName: string) => (await http.put<User>('/users/me', { displayName })).data,
}
```


# Снимок файла: src/stores/auth.ts

```typescript
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import { bindSession, refreshSession, invalidateSessionRequests, waitForRefresh } from '@/api/http'
import { apiError } from '@/api/errors'
import type { LoginRequest, RegisterRequest, PasswordChange, Tokens, User } from '@/types/api'
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const expiresAt = ref(0)
  const status = ref<'pending' | 'authenticated' | 'guest' | 'unavailable'>('pending')
  const sessionError = ref('')
  const busy = ref(false)
  const authenticated = computed(() => status.value === 'authenticated' && !!user.value)
  const isAdmin = computed(() => authenticated.value && user.value?.role === 'ADMIN')
  let initialization: Promise<void> | null = null
  function clear() {
    invalidateSessionRequests()
    user.value = null
    accessToken.value = null
    expiresAt.value = 0
    status.value = 'guest'
    sessionError.value = ''
  }
  function accept(tokens: Tokens) {
    user.value = tokens.user
    accessToken.value = tokens.accessToken
    expiresAt.value = Date.now() + tokens.expiresIn * 1000
    status.value = 'authenticated'
    sessionError.value = ''
  }
  function fail(error: unknown) {
    clear()
    const problem = apiError(error)
    if (problem.status !== 401) {
      status.value = 'unavailable'
      sessionError.value = problem.message
    }
  }
  bindSession({
    token: () => accessToken.value,
    expired: () => Date.now() >= expiresAt.value - 5000,
    accept,
    fail,
  })
  async function initialize(force = false) {
    if (initialization) return initialization
    if (!force && status.value !== 'pending') return
    status.value = 'pending'
    initialization = refreshSession()
      .then(() => undefined)
      .catch(() => undefined)
      .finally(() => {
        initialization = null
      })
    return initialization
  }
  async function exclusive<T>(operation: () => Promise<T>): Promise<T> {
    if (busy.value) throw new Error('Дождитесь завершения операции.')
    busy.value = true
    try {
      if (initialization) await initialization
      await waitForRefresh()
      return await operation()
    } finally {
      busy.value = false
    }
  }
  async function login(body: LoginRequest) {
    await exclusive(async () => {
      invalidateSessionRequests()
      accept(await authApi.login(body))
    })
  }
  async function register(body: RegisterRequest) {
    await exclusive(async () => {
      invalidateSessionRequests()
      accept(await authApi.register(body))
    })
  }
  async function logout(all = false) {
    await exclusive(async () => {
      if (all && accessToken.value && Date.now() >= expiresAt.value - 5000) await refreshSession()
      await (all ? authApi.logoutAll() : authApi.logout())
      clear()
    })
  }
  async function changePassword(body: PasswordChange) {
    await exclusive(async () => {
      await authApi.changePassword(body)
      clear()
    })
  }
  async function loadProfile() {
    user.value = await authApi.me()
  }
  async function updateProfile(displayName: string) {
    user.value = await authApi.update(displayName)
  }
  function canEdit(authorId: number | null) {
    return authenticated.value && (isAdmin.value || user.value?.id === authorId)
  }
  return {
    user,
    accessToken,
    status,
    sessionError,
    busy,
    authenticated,
    isAdmin,
    initialize,
    login,
    register,
    logout,
    changePassword,
    loadProfile,
    updateProfile,
    canEdit,
  }
})
```


# Снимок файла: src/stores/favorites.ts

```typescript
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { favoritesApi } from '@/api/favorites'
import { useAuthStore } from './auth'
import type { Favorite } from '@/types/api'
export const useFavoritesStore = defineStore('favorites', () => {
  const auth = useAuthStore()
  const items = ref<Favorite[]>([])
  const loaded = ref(false)
  let flight: Promise<void> | null = null
  let revision = 0
  watch(
    () => auth.user?.id,
    () => {
      revision++
      items.value = []
      loaded.value = false
      flight = null
    },
    { flush: 'sync' },
  )
  async function load(force = false) {
    if (!auth.authenticated) return
    if (flight) return flight
    if (loaded.value && !force) return
    const current = revision
    flight = (async () => {
      const all: Favorite[] = []
      for (let page = 0; ; page++) {
        const batch = await favoritesApi.list(page, 100)
        if (current !== revision) return
        all.push(...batch)
        if (batch.length < 100) break
      }
      items.value = all
      loaded.value = true
    })().finally(() => {
      if (current === revision) flight = null
    })
    return flight
  }
  function has(id: number) {
    return items.value.some((item) => item.motorcycle.id === id)
  }
  async function toggle(id: number) {
    const current = revision
    if (has(id)) {
      await favoritesApi.remove(id)
      if (current === revision)
        items.value = items.value.filter((item) => item.motorcycle.id !== id)
    } else {
      const result = await favoritesApi.add(id)
      if (current === revision && !has(id)) items.value.push(result)
    }
  }
  return { items, loaded, load, has, toggle }
})
```


# Снимок файла: src/router/guards.ts

```typescript
import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { safeRedirect } from '@/utils/format'
export const authGuard: NavigationGuard = async (to) => {
  const auth = useAuthStore()
  await auth.initialize()
  if (to.meta.auth && !auth.authenticated) {
    if (auth.status === 'unavailable')
      return { path: '/session-unavailable', query: { redirect: to.fullPath } }
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.admin && !auth.isAdmin) return '/forbidden'
  if (to.meta.guest && auth.authenticated) return safeRedirect(to.query.redirect)
  return true
}
```


# Снимок файла: src/router/index.ts

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { authGuard } from './guards'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (_to, _from, saved) => saved || { top: 0 },
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: () => import('@/views/AboutView.vue') },
    { path: '/login', component: () => import('@/views/AuthView.vue'), meta: { guest: true } },
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guest: true },
    },
    { path: '/motorcycles', component: () => import('@/views/CatalogView.vue') },
    { path: '/motorcycles/:id(\\d+)', component: () => import('@/views/MotorcycleView.vue') },
    {
      path: '/favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: { auth: true },
    },
    { path: '/news', component: () => import('@/views/NewsView.vue') },
    { path: '/news/:id(\\d+)', component: () => import('@/views/NewsDetailView.vue') },
    { path: '/community', component: () => import('@/views/CommunityView.vue') },
    {
      path: '/community/new',
      component: () => import('@/views/PostFormView.vue'),
      meta: { auth: true },
    },
    {
      path: '/community/:id(\\d+)/edit',
      component: () => import('@/views/PostFormView.vue'),
      meta: { auth: true },
    },
    { path: '/community/:id(\\d+)', component: () => import('@/views/PostView.vue') },
    { path: '/profile', component: () => import('@/views/ProfileView.vue'), meta: { auth: true } },
    {
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { auth: true, admin: true },
    },
    {
      path: '/categories/:slug',
      component: () => import('@/views/ReferenceView.vue'),
      meta: { reference: 'category' },
    },
    {
      path: '/technologies/:id(\\d+)',
      component: () => import('@/views/ReferenceView.vue'),
      meta: { reference: 'technology' },
    },
    {
      path: '/session-unavailable',
      component: () => import('@/views/StatusView.vue'),
      meta: { status: 'unavailable' },
    },
    {
      path: '/forbidden',
      component: () => import('@/views/StatusView.vue'),
      meta: { status: 'forbidden' },
    },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/StatusView.vue') },
  ],
})
router.beforeEach(authGuard)
export default router
```


# Снимок файла: src/composables/useRequest.ts

```typescript
import { ref, shallowRef, onScopeDispose } from 'vue'
import { apiError } from '@/api/errors'
import type { ApiError } from '@/types/api'
export function useRequest<T>(request: () => Promise<T>) {
  const data = shallowRef<T>()
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  let revision = 0
  onScopeDispose(() => {
    revision++
  })
  async function load() {
    const current = ++revision
    loading.value = true
    error.value = null
    data.value = undefined
    try {
      const result = await request()
      if (current === revision) data.value = result
    } catch (e) {
      if (current === revision) error.value = apiError(e)
    } finally {
      if (current === revision) loading.value = false
    }
  }
  return { data, loading, error, load }
}
export function useMutation() {
  const busy = ref(false)
  const error = ref<ApiError | null>(null)
  const success = ref('')
  async function run(operation: () => Promise<void>, message = 'Сохранено.') {
    if (busy.value) return false
    busy.value = true
    error.value = null
    success.value = ''
    try {
      await operation()
      success.value = message
      return true
    } catch (e) {
      error.value = apiError(e)
      return false
    } finally {
      busy.value = false
    }
  }
  return { busy, error, success, run }
}
```


# Снимок файла: src/composables/usePageQuery.ts

```typescript
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export function usePageQuery() {
  const route = useRoute()
  const router = useRouter()
  const page = computed(() => {
    const value = Number(route.query.page)
    return Number.isSafeInteger(value) && value >= 0 ? value : 0
  })
  function changePage(value: number) {
    return router.push({ query: { ...route.query, page: value || undefined } })
  }
  return { page, changePage }
}
```


# Снимок файла: src/utils/format.ts

```typescript
export const price = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(value)
export function date(value: string) {
  return new Date(/Z$|[+-]\d\d:\d\d$/.test(value) ? value : `${value}Z`).toLocaleString('ru-RU')
}
export function safeRedirect(value: unknown): string {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !/[\\\r\n]/.test(value) &&
    !/^\/(login|register)([/?#]|$)/.test(value)
    ? value
    : '/profile'
}
export function passwordError(value: string): string {
  if ([...value].length < 8) return 'Минимум 8 символов.'
  if (new TextEncoder().encode(value).length > 72)
    return 'Не более 72 байт UTF-8 (кириллица занимает больше одного байта).'
  return ''
}
export function imageUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  if (value.startsWith('/images/'))
    return `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}${value}`
  return /^https?:\/\//i.test(value) ? value : undefined
}
```


# Снимок файла: src/api/categories.ts

```typescript
import { http } from './http'
import type { Category, CategoryRequest } from '@/types/api'
export const categoriesApi = {
  list: async () => (await http.get<Category[]>('/categories')).data,
  get: async (slug: string) =>
    (await http.get<Category>(`/categories/${encodeURIComponent(slug)}`)).data,
  create: async (body: CategoryRequest) => (await http.post<Category>('/categories', body)).data,
  update: async (id: number, body: CategoryRequest) =>
    (await http.put<Category>(`/categories/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/categories/${id}`)
  },
}
```


# Снимок файла: src/api/favorites.ts

```typescript
import { http } from './http'
import type { Favorite } from '@/types/api'
export const favoritesApi = {
  list: async (page = 0, size = 20) =>
    (await http.get<Favorite[]>('/favorites', { params: { page, size } })).data,
  add: async (id: number) => (await http.post<Favorite>(`/favorites/${id}`)).data,
  remove: async (id: number) => {
    await http.delete(`/favorites/${id}`)
  },
}
```


# Снимок файла: src/api/motorcycles.ts

```typescript
import { http } from './http'
import type {
  CatalogQuery,
  Motorcycle,
  MotorcycleRequest,
  MotorcycleSummary,
  Page,
} from '@/types/api'
export const motorcyclesApi = {
  async list(params: CatalogQuery): Promise<Page<MotorcycleSummary>> {
    const response = await http.get<MotorcycleSummary[]>('/motorcycles', { params })
    return {
      content: response.data,
      page: params.page,
      size: params.size,
      totalElements: Number(response.headers['x-total-count']),
      totalPages: Number(response.headers['x-total-pages']),
    }
  },
  top: async () => (await http.get<MotorcycleSummary[]>('/motorcycles/top')).data,
  get: async (id: number) => (await http.get<Motorcycle>(`/motorcycles/${id}`)).data,
  create: async (body: MotorcycleRequest) =>
    (await http.post<Motorcycle>('/motorcycles', body)).data,
  update: async (id: number, body: MotorcycleRequest) =>
    (await http.put<Motorcycle>(`/motorcycles/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/motorcycles/${id}`)
  },
}
```


# Снимок файла: src/api/news.ts

```typescript
import { http } from './http'
import type { News, NewsRequest } from '@/types/api'
export const newsApi = {
  list: async (page = 0, size = 12) =>
    (await http.get<News[]>('/news', { params: { page, size } })).data,
  get: async (id: number) => (await http.get<News>(`/news/${id}`)).data,
  create: async (body: NewsRequest) => (await http.post<News>('/news', body)).data,
  update: async (id: number, body: NewsRequest) => (await http.put<News>(`/news/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/news/${id}`)
  },
}
```


# Снимок файла: src/api/posts.ts

```typescript
import { http } from './http'
import type { Post, PostRequest, Page, Comment } from '@/types/api'
export const postsApi = {
  list: async (page = 0, size = 12) =>
    (await http.get<Page<Post>>('/posts', { params: { page, size } })).data,
  get: async (id: number) => (await http.get<Post>(`/posts/${id}`)).data,
  create: async (body: PostRequest) => (await http.post<Post>('/posts', body)).data,
  update: async (id: number, body: PostRequest) =>
    (await http.put<Post>(`/posts/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/posts/${id}`)
  },
  comments: async (id: number, page = 0, size = 10) =>
    (await http.get<Page<Comment>>(`/posts/${id}/comments`, { params: { page, size } })).data,
  comment: async (id: number) => (await http.get<Comment>(`/comments/${id}`)).data,
  addComment: async (id: number, text: string) =>
    (await http.post<Comment>(`/posts/${id}/comments`, { text })).data,
  updateComment: async (id: number, text: string) =>
    (await http.put<Comment>(`/comments/${id}`, { text })).data,
  removeComment: async (id: number) => {
    await http.delete(`/comments/${id}`)
  },
}
```


# Снимок файла: src/api/reactions.ts

```typescript
import { http } from './http'
import type { OwnReaction, ReactionCounts, ReactionKind, ReactionTarget } from '@/types/api'
export const reactionsApi = {
  counts: async (target: ReactionTarget, id: number) =>
    (await http.get<Partial<ReactionCounts>>(`/${target}/${id}/reactions`)).data,
  own: async (target: ReactionTarget, id: number) =>
    (await http.get<OwnReaction>(`/${target}/${id}/reaction`)).data,
  set: async (target: ReactionTarget, id: number, kind: ReactionKind) => {
    await http.put(`/${target}/${id}/reaction`, { kind })
  },
  remove: async (target: ReactionTarget, id: number) => {
    await http.delete(`/${target}/${id}/reaction`)
  },
}
```


# Снимок файла: src/api/reviews.ts

```typescript
import { http } from './http'
import type { Review, ReviewRequest } from '@/types/api'
export const reviewsApi = {
  list: async (id: number, page = 0, size = 10) =>
    (await http.get<Review[]>(`/motorcycles/${id}/reviews`, { params: { page, size } })).data,
  get: async (id: number) => (await http.get<Review>(`/reviews/${id}`)).data,
  create: async (id: number, body: ReviewRequest) =>
    (await http.post<Review>(`/motorcycles/${id}/reviews`, body)).data,
  update: async (id: number, body: ReviewRequest) =>
    (await http.put<Review>(`/reviews/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/reviews/${id}`)
  },
}
```


# Снимок файла: src/api/technologies.ts

```typescript
import { http } from './http'
import type { Technology, TechnologyRequest } from '@/types/api'
export const technologiesApi = {
  list: async () => (await http.get<Technology[]>('/technologies')).data,
  get: async (id: number) => (await http.get<Technology>(`/technologies/${id}`)).data,
  create: async (body: TechnologyRequest) =>
    (await http.post<Technology>('/technologies', body)).data,
  update: async (id: number, body: TechnologyRequest) =>
    (await http.put<Technology>(`/technologies/${id}`, body)).data,
  remove: async (id: number) => {
    await http.delete(`/technologies/${id}`)
  },
}
```


# Приложение: названия тестов

```text

tests/auth.test.ts

describe('session and HTTP', () => {

  it('restores once, sends CSRF and cookies without Bearer, never persists tokens', async () => {

  it.each([401, 403, 429, 500, 0])(

  it('refreshes simultaneous 401 only once and retries with the new token', async () => {

  it('late 401 for an old token uses the existing refresh result', async () => {

  it('retries an original request at most once', async () => {

  it('clears the session when refresh fails', async () => {

  it('proactively refreshes an expired token before dispatch', async () => {

  it('does not refresh/replay invalid login or current password', async () => {

  it.each([false, true])(

  it('failed logout stays visible and does not simulate success', async () => {

  it('successful password change clears the session', async () => {

  it('direct refresh calls share a flight', async () => {

it('logout waits for an active refresh and cannot be undone by its response', async () => {

tests/guards.test.ts

it('guests can browse but protected routes preserve the destination', async () => {

it('technical failure does not send the visitor to login', async () => {

it('USER cannot enter admin; ADMIN can; signed-in users leave login', async () => {

it('ownership and administrator privileges are enforced in the UI', async () => {

it.each([

it('keeps a safe route including query and checks backend password byte limits', () => {

tests/ui.test.ts

it('login starts empty, sends the exact request and returns to the destination', async () => {

it('registration checks confirmation and sends displayName without extra fields', async () => {

it('server validation appears beside the corresponding field', async () => {

it('catalog reads header pagination, preserves filters in query and supports history', async () => {

it('loading, empty and network errors are distinct and retry works', async () => {

it('favorites add/remove synchronize state and account changes clear it', async () => {

it('favorite membership is loaded beyond the first backend page', async () => {

it('creates and edits own reviews with rating/text and hides foreign controls', async () => {

it('creates and edits comments using the comment endpoint', async () => {

it('post editing keeps the exact DTO and blocks a different author', async () => {

it('reaction toggles, replaces and removes without optimistic fake counts', async () => {

it('admin motorcycle form excludes response-only fields and uses real IDs', async () => {

it('admin dictionary reports uniqueness errors without closing the form', async () => {

it('admin news creates nullable image URL and ISO LocalDateTime', async () => {

it('request state never renders empty before loading finishes', () => {

```
