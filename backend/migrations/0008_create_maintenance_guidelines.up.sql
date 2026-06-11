CREATE TABLE maintenance_guidelines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  interval_km INT DEFAULT NULL,
  interval_months INT DEFAULT NULL,
  spec VARCHAR(255) DEFAULT NULL,
  CONSTRAINT fk_guidelines_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
