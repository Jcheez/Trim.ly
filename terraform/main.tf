module "storage" {
  source = "./modules/storage"

  project_name     = var.mongodbatlas_project_name
  cluster_name     = var.mongodbatlas_cluster_name
  mongodb_username = var.mongodb_username
  mongodb_password = var.mongodb_password
  application_ip_address = module.application.application_ip_address
}

module "application" {
  source       = "./modules/application"
  region       = var.region
  account_id   = var.account_id
  mondo_db_url = module.storage.mongodb_url
}
