# Creates the AWS Instance Profile Role
resource "aws_iam_role" "ebn-ec2-trimly-role" {
  name               = "ebn-ec2-trimly-role"
  assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "",
          "Effect": "Allow",
          "Principal": {
            "Service": [
              "ec2.amazonaws.com"
            ]
          },
          "Action": [
            "sts:AssumeRole"
          ],
          "Condition": {
            "StringEquals": {
              "aws:SourceAccount": ${var.account_id}
            }
			    }
        }
      ]
    }
  EOF
}

# Atach the following AWS managed policies
resource "aws_iam_role_policy_attachment" "role-policy-attachment" {
  for_each = toset([
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier",
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier",
    "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker"
  ])

  role       = aws_iam_role.ebn-ec2-trimly-role.id
  policy_arn = each.value
}

# Create the instance profile
resource "aws_iam_instance_profile" "ebn-ec2-instance-profile" {
  name = "ebn-ec2-trimly-instance-profile"
  role = aws_iam_role.ebn-ec2-trimly-role.name
}
