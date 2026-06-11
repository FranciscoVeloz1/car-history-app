-- ============================================================
-- Visit 1 (22/01/2024, 39198 km) — Serviorientales checklist
-- All safety and minor points checked — mostly good condition
-- ============================================================
INSERT INTO component_inspections (visit_id, component_id, status) VALUES
-- Safety points
(1,  1, 'good'),                     -- Neumáticos
(1,  2, 'good'),                     -- Balatas freno delantero
(1,  3, 'good'),                     -- Balatas freno trasero
(1,  4, 'good'),                     -- Discos de freno
(1,  5, 'good'),                     -- Tambor freno trasero
(1,  6, 'good'),                     -- Nivel fluido de frenos
(1,  7, 'good'),                     -- Amortiguadores
-- Minor points
(1,  8, 'good'),                     -- Suspensión trasera
(1,  9, 'good'),                     -- Dirección
(1, 10, 'good'),                     -- Bandas y mangueras
(1, 11, 'good'),                     -- Escape y mofle
(1, 12, 'good'),                     -- Fluidos motor/transmisión
(1, 13, 'good'),                     -- Sistema eléctrico y luces
(1, 14, 'good');                     -- Limpiadores

-- ============================================================
-- Visit 2 (05/10/2024, 45033 km) — Serviorientales checklist
-- Some items beginning to need service at higher mileage
-- ============================================================
INSERT INTO component_inspections (visit_id, component_id, status) VALUES
(2,  1, 'good'),                     -- Neumáticos
(2,  2, 'good'),                     -- Balatas freno delantero
(2,  3, 'good'),                     -- Balatas freno trasero
(2,  4, 'good'),                     -- Discos de freno
(2,  5, 'good'),                     -- Tambor freno trasero
(2,  6, 'good'),                     -- Nivel fluido de frenos
(2,  7, 'requires_service'),         -- Amortiguadores
(2,  8, 'good'),                     -- Suspensión trasera
(2,  9, 'good'),                     -- Dirección
(2, 10, 'good'),                     -- Bandas y mangueras
(2, 11, 'good'),                     -- Escape y mofle
(2, 12, 'good'),                     -- Fluidos motor/transmisión
(2, 13, 'good'),                     -- Sistema eléctrico y luces
(2, 14, 'good');                     -- Limpiadores

-- ============================================================
-- Visit 3 (15/08/2024, 43602 km) — Servillantas diagnóstico
-- BIEN = good, MAL = requires_service
-- ============================================================
INSERT INTO component_inspections (visit_id, component_id, status) VALUES
(3, 15, 'good'),                     -- Llantas: BIEN
(3,  7, 'good'),                     -- Amortiguadores: BIEN
(3, 21, 'good'),                     -- Frenos: BIEN
(3, 22, 'good'),                     -- Suspensión: BIEN
(3, 20, 'requires_service'),         -- Balanceo: MAL
(3, 16, 'requires_service'),         -- Alineación: MAL
(3, 17, 'good'),                     -- Afinación: BIEN
(3, 18, 'good'),                     -- Presión de llantas: BIEN
(3, 19, 'good');                     -- Llanta de refacción: BIEN

-- ============================================================
-- Visit 4 (24/04/2025, 46773 km) — Serviorientales checklist
-- Higher mileage, some components requiring attention
-- ============================================================
INSERT INTO component_inspections (visit_id, component_id, status) VALUES
(4,  1, 'requires_service'),         -- Neumáticos
(4,  2, 'good'),                     -- Balatas freno delantero
(4,  3, 'good'),                     -- Balatas freno trasero
(4,  4, 'good'),                     -- Discos de freno
(4,  5, 'good'),                     -- Tambor freno trasero
(4,  6, 'good'),                     -- Nivel fluido de frenos
(4,  7, 'good'),                     -- Amortiguadores
(4,  8, 'good'),                     -- Suspensión trasera
(4,  9, 'good'),                     -- Dirección
(4, 10, 'requires_service'),         -- Bandas y mangueras
(4, 11, 'good'),                     -- Escape y mofle
(4, 12, 'good'),                     -- Fluidos motor/transmisión
(4, 13, 'good'),                     -- Sistema eléctrico y luces
(4, 14, 'good');                     -- Limpiadores

-- ============================================================
-- Visit 5 (25/09/2025, 48492 km) — Serviorientales
-- Repair-only visit (lavado inyectores), no full inspection
-- ============================================================
INSERT INTO component_inspections (visit_id, component_id, status) VALUES
(5,  1, 'good'),                     -- Neumáticos
(5,  2, 'good'),                     -- Balatas freno delantero
(5,  3, 'good'),                     -- Balatas freno trasero
(5,  4, 'good'),                     -- Discos de freno
(5,  5, 'good'),                     -- Tambor freno trasero
(5,  6, 'good'),                     -- Nivel fluido de frenos
(5,  7, 'good'),                     -- Amortiguadores
(5,  8, 'good'),                     -- Suspensión trasera
(5,  9, 'good'),                     -- Dirección
(5, 10, 'good'),                     -- Bandas y mangueras
(5, 11, 'good'),                     -- Escape y mofle
(5, 12, 'requires_service'),         -- Fluidos motor/transmisión
(5, 13, 'requires_service'),         -- Sistema eléctrico y luces
(5, 14, 'good');                     -- Limpiadores
