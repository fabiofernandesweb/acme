import {PrismaClient, InvoiceStatus} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando população do banco de dados...');

  const password = await bcrypt.hash('password', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@acme.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@acme.com',
      password: password
    }
  });

  console.log('Usuário criado com sucesso.');

  const customer_data = [{
    name: 'Fabio Fernandes',
    email: 'fabio@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome:Fabio+Fernandes&background=random'
  }, {
    name: 'Adriana Fernandes',
    email: 'adriana@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome:Adriana+Fernandes&background=random'
  }, {
    name: 'Livia Fernandes',
    email: 'livia@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome:Livia+Fernandes&background=random'
  }]; 

  const customers = [];
  
  for (const data of customer_data) {
    const customer = await prisma.customer.upsert({
      where: { email: data.email },
      update: {},
      create: data
    });

    customers.push(customer);
    console.log(`Cliente criado: ${customer.name}`);
  };

  const invoicesData = [{
    amount: 15785,
    status: InvoiceStatus.PENDENTE,
    date: '2026-15-05',
    customer: customers[0]
  }, {
    amount: 5785,
    status: InvoiceStatus.PENDENTE,
    date: '2026-19-05',
    customer: customers[1]
  }, {
    amount: 1578,
    status: InvoiceStatus.PAGO,
    date: '2026-03-05',
    customer: customers[2]
  }, {
    amount: 785,
    status: InvoiceStatus.PENDENTE,
    date: '2026-22-05',
    customer: customers[0]
  }, {
    amount: 20945,
    status: InvoiceStatus.PAGO,
    date: '2026-01-05',
    customer: customers[1]
  }, {
    amount: 45890,
    status: InvoiceStatus.PAGO,
    date: '2026-08-05',
    customer: customers[2]
  }, {
    amount: 8503,
    status: InvoiceStatus.PENDENTE,
    date: '2026-15-05',
    customer: customers[0]
  }, {
    amount: 69783,
    status: InvoiceStatus.PAGO,
    date: '2026-02-05',
    customer: customers[1]
  }, {
    amount: 54832,
    status: InvoiceStatus.PENDENTE,
    date: '2026-17-05',
    customer: customers[2]
  }, {
    amount: 17483,
    status: InvoiceStatus.PENDENTE,
    date: '2026-18-05',
    customer: customers[0]
  }, {
    amount: 39876,
    status: InvoiceStatus.PAGO,
    date: '2026-04-05',
    customer: customers[1]
  }, {
    amount: 12345,
    status: InvoiceStatus.PENDENTE,
    date: '2026-21-05',
    customer: customers[2]
  }];

  for (const data of invoicesData) {
    await prisma.invoice.create({
      data: {
        amount: data.amount,
        status: data.status,
        date:new Date(data.date),
        customerId: data.customer.id
      }
    });
  };

  console.log(`$(invoicesData.length) faturas criadas.`);

  const revenueData = [{
    month: 'Jan',
    revenue: 151554
  }, {
    month: 'Fev',
    revenue: 567386
  }, {
    month: 'Mar',
    revenue: 354286
  }, {
    month: 'Abr',
    revenue: 198234
  }, {
    month: 'Mai',
    revenue: 123456
  }, {
    month: 'Jun',
    revenue: 987654
  }, {
    month: 'Jul',
    revenue: 654321
  }, {
    month: 'Ago',
    revenue: 678908
  }, {
    month: 'Set',
    revenue: 148904
  }, {
    month: 'Out',
    revenue: 151554
  }, {
    month: 'Nov',
    revenue: 328499
  }, {
    month: 'Dez',
    revenue: 391563
  }];

  for (const data of revenueData) {
    await prisma.revenue.update({
      where: { month: data.month },

    });
  }
};
