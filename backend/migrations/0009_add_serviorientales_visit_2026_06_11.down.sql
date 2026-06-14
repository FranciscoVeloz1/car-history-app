-- Migration DOWN: 0009_add_serviorientales_visit_2026_06_11

DELETE sv FROM service_visits sv
INNER JOIN vehicles v ON v.id = sv.vehicle_id
INNER JOIN workshops w ON w.id = sv.workshop_id
WHERE v.vin = 'LSGKB54H3MV116841'
  AND w.name = 'Serviorientales Lagos'
  AND sv.service_date = '2026-06-11'
  AND sv.odometer_km = 51458
  AND sv.service_type = 'servicio_mayor';
