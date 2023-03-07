const { PrismaClient } = require('@prisma/client');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}