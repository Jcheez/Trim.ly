resource "aws_elastic_beanstalk_application" "application" {
  name        = "Trimly"
  description = "This contains the backend and frontend of Trimly"
}

resource "aws_elastic_beanstalk_environment" "devenv" {
  name                = "development"
  application         = aws_elastic_beanstalk_application.application.name
  cname_prefix        = "trimly"
  description         = "This is the development environment for Trimly"
  tier                = "WebServer"
  solution_stack_name = "64bit Amazon Linux 2023 v4.3.6 running Docker"

  // Define an instance profile
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_iam_instance_profile.ebn-ec2-instance-profile.arn
  }

  // EC2 configuration for t2.micro
  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = "t2.micro"
  }

  // Define a single Instance
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  // Setting Health Check to Basic
  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "basic"
  }

  // Setting Environment Variables
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MONGO_DB_URL"
    value     = var.mondo_db_url
  }
}

data "aws_instance" "application" {
  filter {
    name   = "tag:elasticbeanstalk:environment-name"
    values = [aws_elastic_beanstalk_environment.devenv.name]
  }
}
