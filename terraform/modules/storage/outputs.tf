output "mongodb_url" {
  value = "${replace(mongodbatlas_cluster.trimly_cluster.connection_strings[0].standard_srv, "mongodb+srv://", "mongodb+srv://${var.mongodb_username}:${coalesce(nonsensitive(var.mongodb_password), "null")}@")}/${lower(var.project_name)}"
  sensitive = true
}
