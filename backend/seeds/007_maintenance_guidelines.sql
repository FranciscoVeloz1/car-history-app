-- Maintenance guidelines from Cavalier 2021 owner manual

INSERT INTO maintenance_guidelines (vehicle_id, name, description, interval_km, interval_months, spec) VALUES
(1, 'Revisión de aceite de motor',
    'Verificar nivel de aceite del motor regularmente, especialmente antes de un viaje prolongado. Usar varilla de medición.',
    650, NULL,
    'Aceite dexos1 totalmente sintético SAE 5W-30 (ACDelco recomendado)'),

(1, 'Cambio de aceite de motor',
    'Cambiar aceite del motor a los intervalos adecuados según condiciones de manejo.',
    8000, 6,
    'Aceite dexos1 totalmente sintético SAE 5W-30'),

(1, 'Líquido de frenos',
    'Verificar nivel de líquido de frenos hidráulico. Rellenar según necesidad.',
    NULL, 12,
    'Fluido de frenos hidráulicos DOT 4'),

(1, 'Refrigerante del motor',
    'El refrigerante DEX-COOL está diseñado para permanecer en el vehículo por 5 años o 240,000 km, lo que ocurra primero. Mezcla 50/50 agua potable y refrigerante.',
    240000, 60,
    'DEX-COOL 50/50'),

(1, 'Líquido de transmisión automática',
    'Verificar nivel de líquido de transmisión automática según programa de mantenimiento.',
    NULL, NULL,
    'DEXRON-VI'),

(1, 'Rotación de llantas',
    'Las llantas deben tener rotación a los intervalos especificados. La primera rotación es la más importante. No incluir llanta de refacción compacta.',
    10000, NULL,
    'Patrón de rotación estándar, ajustar presión después de rotación'),

(1, 'Presión de inflado de llantas',
    'Revisar presión de inflado en frío. Llantas 205/55R16 o 195/65R15 a 240 kPa. Llanta de refacción T125/70D15 a 420 kPa.',
    650, NULL,
    '240 kPa (refacción: 420 kPa)'),

(1, 'Alineación y balanceo',
    'Revisar alineación ante desgaste irregular de llantas. Rotar y balancear según desgaste observado.',
    NULL, NULL,
    'Revisar ante desgaste irregular'),

(1, 'Batería del vehículo',
    'Inspeccionar batería periódicamente. Mantener terminales limpios.',
    NULL, 12,
    NULL),

(1, 'Filtro de aire del habitáculo',
    'Reemplazar filtro de aire del habitáculo según intervalos. No operar sistema de clima sin filtro instalado.',
    15000, 12,
    NULL),

(1, 'Plumas limpiaparabrisas',
    'Mantener el equipo limpiaparabrisas en buenas condiciones. Reemplazar cuando la limpieza sea deficiente.',
    NULL, 6,
    NULL),

(1, 'Filtro de aire del motor',
    'Reemplazar filtro de aire del motor a los intervalos del programa de mantenimiento.',
    15000, 12,
    NULL),

(1, 'Filtro de combustible',
    'Reemplazar filtro de combustible según programa de mantenimiento del distribuidor.',
    48000, NULL,
    NULL);
