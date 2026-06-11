CREATE TABLE component_inspections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visit_id INT NOT NULL,
  component_id INT NOT NULL,
  status ENUM('good','requires_service','requires_immediate_attention','not_checked') NOT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inspections_visit FOREIGN KEY (visit_id) REFERENCES service_visits(id) ON DELETE CASCADE,
  CONSTRAINT fk_inspections_component FOREIGN KEY (component_id) REFERENCES components(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
