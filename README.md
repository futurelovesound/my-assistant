# Мой ассистент (PWA)

Личное приложение: сон, питание с БЖУ, задачи, спорт, здоровье и финансы в тенге. Ставится на телефон и компьютер, работает без интернета и присылает push-напоминания.

## Из чего состоит

| Часть | Где живёт | Цена |
|---|---|---|
| Само приложение (`index.html`, `app.js`, `sw.js`) | GitHub Pages | бесплатно |
| Вход, база данных, синхронизация | Supabase | бесплатно |
| Push-напоминания каждые 5 минут | Supabase: `pg_cron` + функция `send-reminders` | бесплатно |
| ИИ: КБЖУ по фото и тексту, разбор недели | Supabase: функция `ai` + ключ Anthropic | по факту, около $1–5 в месяц |

## Настройка

1. **Supabase → SQL Editor:** выполнить `supabase/schema.sql`.
2. **Supabase → Authentication → Providers → Email:** выключить «Confirm email», если не хочется подтверждать почту.
3. **Ключи VAPID** для push: сгенерировать один раз (`npx web-push generate-vapid-keys`).
4. **Supabase → Edge Functions → Secrets:** `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` (`mailto:твоя@почта`), `CRON_SECRET` (любая длинная случайная строка), по желанию `ANTHROPIC_API_KEY`.
5. **Функции:** задеплоить `send-reminders` (без проверки JWT) и `ai` (с проверкой JWT):
   ```
   supabase functions deploy send-reminders --no-verify-jwt
   supabase functions deploy ai
   ```
6. **Расписание:** в `supabase/cron.sql` подставить `PROJECT_REF` и `CRON_SECRET`, выполнить в SQL Editor.
7. **`config.js`:** вписать URL проекта Supabase, anon-ключ и публичный VAPID-ключ.
8. **GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / root. Сайт откроется по адресу `https://futurelovesound.github.io/my-assistant/`.

## Установка

- **iPhone:** Safari → адрес приложения → «Поделиться» → «На экран Домой». Открыть с иконки → Профиль → «Включить уведомления» (iOS 16.4+).
- **Android:** Chrome → меню → «Установить приложение».
- **Компьютер:** Chrome или Edge → значок «Установить» в адресной строке.

## Перенос данных из версии в Claude

В старой версии: Профиль → «Скачать резервную копию». В новой: Профиль → «Загрузить из копии».
