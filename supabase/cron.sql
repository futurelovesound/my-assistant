-- Расписание push-напоминаний: каждые 5 минут вызывает функцию send-reminders.
-- Перед запуском замени PROJECT_REF и CRON_SECRET на свои значения.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.unschedule('assistant-reminders') where exists (select 1 from cron.job where jobname = 'assistant-reminders');
select cron.schedule('assistant-reminders', '*/5 * * * *', $$
  select net.http_post(
    url := 'https://PROJECT_REF.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', 'CRON_SECRET'),
    body := '{}'::jsonb
  );
$$);
