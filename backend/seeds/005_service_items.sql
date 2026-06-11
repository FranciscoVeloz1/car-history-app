-- Visit 1: Servicio Mayor $1,800
INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount) VALUES
(1, 'operation', 'Servicio Mayor', 1, 1800.00, 1800.00);

-- Visit 2: Servicio Menor $850
INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount) VALUES
(2, 'operation', 'Servicio Menor', 1, 850.00, 850.00);

-- Visit 3: Servillantas - montajes, balanceos, alineación
INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount) VALUES
(3, 'operation', 'Montaje de llantas', 4, 50.00, 200.00),
(3, 'operation', 'Balanceo', 4, 50.00, 200.00),
(3, 'operation', 'Alineación', 1, 180.00, 180.00);

-- Visit 4: Servicio Mayor $1,850
INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount) VALUES
(4, 'operation', 'Servicio Mayor', 1, 1850.00, 1850.00);

-- Visit 5: Lavado inyectores + cuerpo aceleración + reseteo
INSERT INTO service_items (visit_id, item_type, description, quantity, unit_price, amount) VALUES
(5, 'operation', 'Lavado de inyectores, cuerpo de aceleración, reseteo', 1, 800.00, 800.00);

-- Visit 6: Factura FSC6493 - Mantenimiento 48,000 km en agencia
INSERT INTO service_items (visit_id, item_type, part_number, description, quantity, unit_price, amount) VALUES
(6, 'labor', '548CAVALIER21', 'Servicio de mantenimiento 48000 km para Cavalier 21', 1, 2593.97, 2593.97),
(6, 'operation', NULL, 'Rotación de ruedas', 1, 0.00, 0.00),
(6, 'operation', NULL, 'Reemplazo de filtro de aire', 1, 0.00, 0.00),
(6, 'part', '4026770', 'Reemplazo de filtro de combustible', 1, 0.00, 0.00),
(6, 'operation', NULL, 'Cambio de aceite y filtro de motor', 1, 0.00, 0.00),
(6, 'operation', '600808', 'Lavado de cortesía', 1, 0.00, 0.00),
(6, 'part', '19363517', 'Filtro de aceite para Cavalier 2018+', 1, 0.00, 0.00),
(6, 'part', '19425967', 'Filtro de aire para Cavalier 2018+', 1, 0.00, 0.00),
(6, 'part', '19434095', 'Aceite sintético 5W30 DEXOSGEN3 BULK', 4, 0.00, 0.00),
(6, 'part', '19476020', 'Filtro de combustible', 1, 0.00, 0.00),
(6, 'part', NULL, 'Limpieza de cámara de combustión', 1, 460.00, 460.00);

-- Visit 7: Factura FSC6492 - Batería y convertidor catalítico
INSERT INTO service_items (visit_id, item_type, part_number, description, quantity, unit_price, amount) VALUES
(7, 'part', '2022310', 'Reemplazo de batería', 3, 500.00, 1500.00),
(7, 'part', '2022310', 'Diagnóstico de convertidor', 2, 500.00, 1000.00),
(7, 'part', '19391258', 'Batería para vehículo', 1, 4742.10, 4742.10),
(7, 'part', NULL, 'Convertidor catalítico tipo original', 1, 10000.00, 10000.00);
