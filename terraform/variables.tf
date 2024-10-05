# ------------------------------------------------------------
# MongoDB
# ------------------------------------------------------------
variable "mongodbatlas_public_key" {
  description = "Public Key used for access to MongoDB Organisation"
  type        = string
}

variable "mongodbatlas_private_key" {
  description = "Private Key used for access to MongoDB Organisation"
  type        = string
}

variable "mongodbatlas_project_name" {
  description = "Project Name for mongodb"
  type        = string
}

variable "mongodbatlas_cluster_name" {
  description = "Cluster Name for mongodb project"
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

# ------------------------------------------------------------
# AWS
# ------------------------------------------------------------
variable "aws_access_key" {
  description = "Access Key for AWS User"
  type        = string
}

variable "aws_secret_key" {
  description = "Secret Key for AWS User"
  type        = string
}

variable "region" {
  description = "Region to deploy the infrastrcture"
  type        = string
}

variable "account_id" {
  description = "AWS Account ID"
  type        = string
}

# ------------------------------------------------------------
# Certbot
# ------------------------------------------------------------
variable "certbot_domains" {
  description = "Domain to provide TSL Certificate"
  type        = string
}

variable "certbot_email" {
  description = "Certbot email"
  type        = string
}
