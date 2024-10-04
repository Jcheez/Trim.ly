# ------------------------------------------------------------
# MongoDB
# ------------------------------------------------------------
variable "project_name" {
  description = "Name of Project"
  type        = string
}

variable "cluster_name" {
  description = "Name of Cluster in Project"
  type        = string
}

variable "mongodb_username" {
  description = "Username for database authentication"
  type        = string
}

variable "mongodb_password" {
  description = "Password for database authentication"
  type        = string
}

variable "application_ip_address" {
  description = "IP address used to access MongoDB"
  type        = string
}
