CREATE TABLE tire_checks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visit_id INT NOT NULL,
  position ENUM('front_left','front_right','rear_left','rear_right','spare') NOT NULL,
  pressure_kpa DECIMAL(6,1) DEFAULT NULL,
  tread_depth_mm DECIMAL(4,1) DEFAULT NULL,
  status ENUM('good','requires_service','requires_immediate_attention','not_checked') NOT NULL DEFAULT 'not_checked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tire_checks_visit FOREIGN KEY (visit_id) REFERENCES service_visits(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
