CREATE TABLE service_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visit_id INT NOT NULL,
  item_type ENUM('labor','part','operation') NOT NULL,
  part_number VARCHAR(50) DEFAULT NULL,
  description VARCHAR(500) NOT NULL,
  quantity DECIMAL(8,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_items_visit FOREIGN KEY (visit_id) REFERENCES service_visits(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
