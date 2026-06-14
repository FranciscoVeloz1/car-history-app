-- Migration UP: 0009_add_serviorientales_visit_2026_06_11
-- Serviorientales Lagos — 2026-06-11, 51,458 km, bujías y revisión general ($900)
-- Natural keys only (VIN, workshop name, date, odometer); visit id via AUTO_INCREMENT

DELETE sv FROM service_visits sv
INNER JOIN vehicles v ON v.id = sv.vehicle_id
INNER JOIN workshops w ON w.id = sv.workshop_id
WHERE v.vin = 'LSGKB54H3MV116841'
  AND w.name = 'Serviorientales Lagos'
  AND sv.service_date = '2026-06-11'
  AND sv.odometer_km = 51458
  AND sv.service_type = 'servicio_mayor';

INSERT INTO service_visits (
  vehicle_id, workshop_id, service_date, odometer_km,
  service_type, technician_name, total, notes
)
SELECT
  v.id, w.id, '2026-06-11', 51458,
  'servicio_mayor', 'Norberto Murguía Cuevas', 900.00,
  'Bujías y revisión general'
FROM vehicles v
CROSS JOIN workshops w
WHERE v.vin = 'LSGKB54H3MV116841'
  AND w.name = 'Serviorientales Lagos';

INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount)
SELECT sv.id, 'operation', 'Bujías y revisión general', 1, 900.00, 900.00
FROM service_visits sv
INNER JOIN vehicles v ON v.id = sv.vehicle_id
INNER JOIN workshops w ON w.id = sv.workshop_id
WHERE v.vin = 'LSGKB54H3MV116841'
  AND w.name = 'Serviorientales Lagos'
  AND sv.service_date = '2026-06-11'
  AND sv.odometer_km = 51458
  AND sv.service_type = 'servicio_mayor';

INSERT INTO component_inspections (visit_id, component_id, status)
SELECT sv.id, c.id, 'good'
FROM service_visits sv
INNER JOIN vehicles v ON v.id = sv.vehicle_id
INNER JOIN workshops w ON w.id = sv.workshop_id
INNER JOIN components c ON c.code IN (
  'NEUMATICOS', 'BALATAS_DEL', 'BALATAS_TRAS', 'DISCOS_FRENO',
  'TAMBOR_FRENO_TRAS', 'FLUIDO_FRENOS', 'AMORTIGUADORES',
  'SUSPENSION_TRAS', 'DIRECCION', 'BANDAS_MANGUERAS', 'ESCAPE_MOFLE',
  'FLUIDOS_MOTOR_TRANS', 'ELECTRICO_LUCES', 'LIMPIADORES',
  'AFINACION'
)
WHERE v.vin = 'LSGKB54H3MV116841'
  AND w.name = 'Serviorientales Lagos'
  AND sv.service_date = '2026-06-11'
  AND sv.odometer_km = 51458
  AND sv.service_type = 'servicio_mayor';
