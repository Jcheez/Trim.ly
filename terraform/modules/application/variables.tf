variable "region" {
  description = "Region to deploy the infrastrcture"
  type        = string
}

variable "account_id" {
  description = "AWS Account ID"
  type        = string
}

# Environment Variables for Elastic Beanstalk
variable "mondo_db_url" {
  description = "Mongo DB URL String"
  type        = string
}

variable "certbot_domains" {
  description = "Domain to provide TSL Certificate"
  type        = string
}

variable "certbot_email" {
  description = "Certbot email"
  type        = string
}
