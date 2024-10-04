terraform {
  required_version = "~> 1.9.2"

  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.17.4"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.59.0"
    }
  }
}
