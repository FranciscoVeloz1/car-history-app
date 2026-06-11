-- Vehicle ID 1 = Cavalier 2021, Workshop IDs: 1=Serviorientales, 2=Servillantas, 3=Chevrolet del Parque

-- Visit 1: 22/01/2024, 39198 km, Serviorientales, Servicio Mayor $1,800
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, technician_name, total, notes) VALUES
(1, 1, 1, '2024-01-22', 39198, 'servicio_mayor', 'Norberto Murguía Cuevas', 1800.00, 'Servicio mayor');

-- Visit 2: 05/10/2024, 45033 km, Serviorientales, Servicio Menor $850
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, technician_name, total, notes) VALUES
(2, 1, 1, '2024-10-05', 45033, 'servicio_menor', 'Norberto Murguía Cuevas', 850.00, 'Servicio menor');

-- Visit 3: 15/08/2024, 43602 km, Servillantas, Llantas $580
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, fuel_level_pct, payment_method, total, notes) VALUES
(3, 1, 2, '2024-08-15', 43602, 'llantas', 50, 'Efectivo', 580.00, '4 montajes de llantas, 4 balanceos, 1 alineación');

-- Visit 4: 24/04/2025, 46773 km, Serviorientales, Servicio Mayor $1,850
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, technician_name, total, notes) VALUES
(4, 1, 1, '2025-04-24', 46773, 'servicio_mayor', 'Norberto Murguía Cuevas', 1850.00, 'Servicio mayor');

-- Visit 5: 25/09/2025, 48492 km, Serviorientales, Reparación $800
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, technician_name, total, notes) VALUES
(5, 1, 1, '2025-09-25', 48492, 'reparacion', 'Norberto Murguía Cuevas', 800.00, 'Lavado de inyectores, cuerpo de aceleración, reseteo');

-- Visit 6: 02/12/2025, 49326 km, Chevrolet del Parque, Agencia FSC6493
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, order_number, invoice_folio, advisor_name, payment_method, parts_cost, subtotal, tax, total) VALUES
(6, 1, 3, '2025-12-02', 49326, 'agencia', '303206', 'FSC6493', 'Luis Eduardo Camacho', 'Tarjeta de crédito', 460.00, 3091.97, 0, 3091.97);

-- Visit 7: 02/12/2025, 49326 km, Chevrolet del Parque, Agencia FSC6492
INSERT INTO service_visits (id, vehicle_id, workshop_id, service_date, odometer_km, service_type, order_number, invoice_folio, advisor_name, payment_method, parts_cost, subtotal, tax, total) VALUES
(7, 1, 3, '2025-12-02', 49326, 'agencia', '303207', 'FSC6492', 'Luis Eduardo Camacho', 'Tarjeta de crédito', 4742.10, 17242.10, 2758.74, 20000.84);
