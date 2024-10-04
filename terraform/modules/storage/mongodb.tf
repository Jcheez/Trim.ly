# Data to obtain org ID of Access Key
data "mongodbatlas_roles_org_id" "personal" {
}

# Resource which creates the project
resource "mongodbatlas_project" "trimly" {
  name   = var.project_name
  org_id = data.mongodbatlas_roles_org_id.personal.org_id

  is_collect_database_specifics_statistics_enabled = true
  is_data_explorer_enabled                         = true
  is_extended_storage_sizes_enabled                = true
  is_performance_advisor_enabled                   = true
  is_realtime_performance_panel_enabled            = true
  is_schema_advisor_enabled                        = true
}

# Resource which adds the ip address to allowed list
resource "mongodbatlas_project_ip_access_list" "anywhere_access" {
  project_id = mongodbatlas_project.trimly.id
  ip_address = var.application_ip_address
}

resource "mongodbatlas_database_user" "admin" {
  username           = var.mongodb_username
  password           = var.mongodb_password
  project_id         = mongodbatlas_project.trimly.id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = lower(var.project_name)
  }
}

# Resource which creates the cluster
resource "mongodbatlas_cluster" "trimly_cluster" {
  project_id                  = mongodbatlas_project.trimly.id
  provider_name               = "TENANT"
  name                        = var.cluster_name
  provider_instance_size_name = "M0"
  backing_provider_name       = "AWS"
  provider_region_name        = "AP_SOUTHEAST_1"
}
