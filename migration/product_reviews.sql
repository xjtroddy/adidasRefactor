/******************************************/
/*   DatabaseName = product   */
/*   TableName = product_reviews   */
/******************************************/
CREATE TABLE `product_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `product_id` char(40) NOT NULL DEFAULT '' COMMENT 'product id',
  `avg_review_score` int unsigned NOT NULL COMMENT 'average review score',
  `num_of_reviews` int unsigned NOT NULL COMMENT 'number of reviews',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'create time',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update time',
  `delete_time` datetime DEFAULT NULL COMMENT 'delete time',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='product review table'
;
