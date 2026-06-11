INSERT INTO vehicles (vin, make, model, year, plates, color, engine, transmission) VALUES
('LSGKB54H3MV116841', 'Chevrolet', 'Cavalier', 2021, 'JUB8253', 'Azul', '1.5L', 'Automática')
ON DUPLICATE KEY UPDATE plates = VALUES(plates);
