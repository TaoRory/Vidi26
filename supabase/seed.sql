-- ── VIDI26 Seed Data ──

-- Stations (7 trạm)
insert into stations (slug, name_vi, name_en, day, order_index, description) values
  ('khoi-hanh', 'Khởi Hành',  'Departure',     1, 1, 'Bắt đầu hành trình tại VinUni — Trạm soát vé, Opening Ceremony'),
  ('kham-pha',  'Khám Phá',   'Discover',      1, 2, 'Khám phá bản thân và cộng đồng VinUni'),
  ('tri-thuc',  'Tri Thức',   'Knowledge',     2, 3, 'Demo Class & Workshop — Mental Health, IKIGAI, Entrepreneurship'),
  ('but-pha',   'Bứt Phá',    'Breakthrough',  1, 4, 'Team Building và thử thách vượt giới hạn'),
  ('luu-dau',   'Lưu Dấu',    'Memory',        2, 5, 'Vlog Challenge và Reflection Session'),
  ('toa-sang',  'Tỏa Sáng',   'Shine',         2, 6, 'Gala Dinner — Final Round, trao giải, tổng kết hành trình'),
  ('tiep-buoc', 'Tiếp Bước',  'Next Step',     3, 7, 'Hành trình mới bắt đầu tại VinUni')
on conflict (slug) do nothing;

-- 24 teams placeholder
insert into teams (team_number, name, color_hex)
select gs, 'Team ' || gs,
  ('#' || lpad(to_hex(((gs * 14753) % 16777215)::int), 6, '0'))
from generate_series(1, 24) gs
on conflict (team_number) do nothing;

-- Sample challenges (will be customized by admin)
insert into challenges (station_id, name, description, max_score, weight)
select
  s.id,
  'Vlog Challenge',
  'Quay vlog ghi lại hành trình tại VIDI26. Video nộp trước 12:00 ngày 10/7.',
  100,
  1.5
from stations s where s.slug = 'luu-dau'
on conflict do nothing;

insert into challenges (station_id, name, description, max_score, weight)
select
  s.id,
  'Team Building Round',
  'Thử thách đồng đội — tăng tinh thần phối hợp và năng lượng nhóm.',
  100,
  1.0
from stations s where s.slug = 'but-pha'
on conflict do nothing;

insert into challenges (station_id, name, description, max_score, weight)
select
  s.id,
  'Opening Spirit',
  'Tinh thần tham gia Opening Ceremony và check-in trạm Khởi Hành.',
  50,
  1.0
from stations s where s.slug = 'khoi-hanh'
on conflict do nothing;
