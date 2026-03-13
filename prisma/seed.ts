import { PrismaClient, InvoiceStatus } from '@prisma/client';
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
    imageUrl: 'https://ui-avatars.com/api/?name:Fabio+Fernandes&background=random'
  }, {
    name: 'Adriana Fernandes',
    email: 'adriana@email.com',
    imageUrl: 'https://ui-avatars.com/api/?name:Adriana+Fernandes&background=random'
  }, {
    name: 'Livia Fernandes',
    email: 'livia@email.com',
    imageUrl: 'https://ui-avatars.com/api/?name:Livia+Fernandes&background=random'
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
    date: '2026-05-15',
    customer: customers[0]
  }, {
    amount: 5785,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-19',
    customer: customers[1]
  }, {
    amount: 1578,
    status: InvoiceStatus.PAGO,
    date: '2026-05-03',
    customer: customers[2]
  }, {
    amount: 785,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-22',
    customer: customers[0]
  }, {
    amount: 20945,
    status: InvoiceStatus.PAGO,
    date: '2026-05-01',
    customer: customers[1]
  }, {
    amount: 45890,
    status: InvoiceStatus.PAGO,
    date: '2026-05-08',
    customer: customers[2]
  }, {
    amount: 8503,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-15',
    customer: customers[0]
  }, {
    amount: 69783,
    status: InvoiceStatus.PAGO,
    date: '2026-05-02',
    customer: customers[1]
  }, {
    amount: 54832,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-17',
    customer: customers[2]
  }, {
    amount: 17483,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-18',
    customer: customers[0]
  }, {
    amount: 39876,
    status: InvoiceStatus.PAGO,
    date: '2026-05-04',
    customer: customers[1]
  }, {
    amount: 12345,
    status: InvoiceStatus.PENDENTE,
    date: '2026-05-21',
    customer: customers[2]
  }];

  for (const data of invoicesData) {
    await prisma.invoice.create({
      data: {
        amount: data.amount,
        status: data.status,
        date: new Date(data.date),
        customerId: data.customer.id
      }
    });
  };

  console.log(`${invoicesData.length} faturas criadas.`);

  const revenueData = [
    { month: 'Jan', revenue: 15155461 },
    { month: 'Fev', revenue: 45155461 },
    { month: 'Mar', revenue: 67479281 },
    { month: 'Abr', revenue: 98765940 },
    { month: 'Mai', revenue: 45687698 },
    { month: 'Jun', revenue: 97865743 },
    { month: 'Jul', revenue: 27619846 },
    { month: 'Ago', revenue: 45399299 },
    { month: 'Set', revenue: 99974777 },
    { month: 'Out', revenue: 77546351 },
    { month: 'Nov', revenue: 43255657 },
    { month: 'Dez', revenue: 58856754 },
  ];

  for (const data of revenueData) {
    await prisma.revenue.upsert({
      where: { month: data.month },
      update: { revenue: data.revenue },
      create: data
    });
  };

  console.log('Dados de receita mensal criados.')

  console.log('Populção concluída com sucesso.')
};

main()
  .catch((erro) => {
    console.log('Erro ao popular o banco:', erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

