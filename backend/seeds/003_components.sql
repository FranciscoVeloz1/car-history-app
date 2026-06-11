INSERT INTO components (id, code, name, category) VALUES
-- Puntos básicos de seguridad (checklist Serviorientales)
( 1, 'NEUMATICOS',          'Neumáticos',                         'safety'),
( 2, 'BALATAS_DEL',         'Balatas de freno delantero',         'safety'),
( 3, 'BALATAS_TRAS',        'Balatas de freno trasero',           'safety'),
( 4, 'DISCOS_FRENO',        'Discos de freno delantero y trasero','safety'),
( 5, 'TAMBOR_FRENO_TRAS',   'Tambor de freno trasero',           'safety'),
( 6, 'FLUIDO_FRENOS',       'Nivel de fluido de frenos',         'safety'),
( 7, 'AMORTIGUADORES',      'Amortiguadores',                    'safety'),
-- Puntos menores (checklist Serviorientales)
( 8, 'SUSPENSION_TRAS',     'Suspensión trasera',                'minor'),
( 9, 'DIRECCION',           'Dirección',                         'minor'),
(10, 'BANDAS_MANGUERAS',    'Bandas y mangueras',                'minor'),
(11, 'ESCAPE_MOFLE',        'Sistema de escape y mofle',         'minor'),
(12, 'FLUIDOS_MOTOR_TRANS',  'Nivel de fluidos motor y transmisión','fluids'),
(13, 'ELECTRICO_LUCES',     'Sistema eléctrico y luces',         'electrical'),
(14, 'LIMPIADORES',         'Limpiadores',                       'minor'),
-- Diagnóstico Servillantas
(15, 'LLANTAS',             'Llantas (estado general)',           'tires'),
(16, 'ALINEACION',          'Alineación',                        'tires'),
(17, 'AFINACION',           'Afinación',                         'minor'),
(18, 'PRESION_LLANTAS',     'Presión de llantas',                'tires'),
(19, 'LLANTA_REFACCION',    'Llanta de refacción',               'tires'),
(20, 'BALANCEO',            'Balanceo',                          'tires'),
(21, 'FRENOS_DIAG',         'Frenos (diagnóstico)',              'safety'),
(22, 'SUSPENSION_DIAG',     'Suspensión (diagnóstico)',          'safety'),
-- Del manual / facturas
(23, 'BATERIA',             'Batería',                           'electrical'),
(24, 'FILTRO_AIRE_MOTOR',   'Filtro de aire del motor',          'minor'),
(25, 'FILTRO_AIRE_HABIT',   'Filtro de aire del habitáculo',     'minor'),
(26, 'FILTRO_ACEITE',       'Filtro de aceite',                  'fluids'),
(27, 'FILTRO_COMBUSTIBLE',  'Filtro de combustible',             'fluids'),
(28, 'PLUMAS_LIMPIAPARABRISAS','Plumas limpiaparabrisas',        'minor'),
(29, 'CONVERTIDOR_CAT',     'Convertidor catalítico',           'minor')
ON DUPLICATE KEY UPDATE name = VALUES(name);
