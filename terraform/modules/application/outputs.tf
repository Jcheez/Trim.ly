output "application_ip_address" {
  value = data.aws_instance.application.public_ip
}
