locals {
  table_prefix = "littleurl-"
}

resource "aws_dynamodb_table" "shortlinks" {
  name = "${locals.table_prefix}shortlinks"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "domain"
  range_key = "slug"

  attribute = {
    name = "domain"
    type = "S"
  }

  attribute = {
    name = "slug",
    type = "S"
  }

  tags = var.default_tags
}

resource "aws_dynamodb_table" "admin" {
  name = "${locals.table_prefix}admin"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "entity"
  range_key = "identifier"

  attribute = {
    name = "entity"
    type = "S"
  }

  attribute = {
    name = "identifier",
    type = "S"
  }

  tags = var.default_tags
}
