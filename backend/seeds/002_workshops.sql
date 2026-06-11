INSERT INTO workshops (id, name, type, address, phone) VALUES
(1, 'Serviorientales Lagos', 'general', 'Jesús Pérez 1104A, Col. San Miguel II, Lagos de Moreno, Jal.', '4747386909'),
(2, 'Servillantas Lagos', 'tire_shop', 'Blvd. Félix Ramírez Rentería No. 1494, Col. Las Ceibas C.P. 47430, Lagos de Moreno, Jal.', '474.742.2402'),
(3, 'Chevrolet del Parque', 'dealer', 'Blvd. José Ma. Morelos Poniente 1725, La Medalla C.P. 37120, León, Gto.', '4772141900')
ON DUPLICATE KEY UPDATE name = VALUES(name);
