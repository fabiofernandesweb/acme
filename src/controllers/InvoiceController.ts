import { z } from 'zod';
import {
  findAllInvoices,
  findInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
} from '@/services/InvoiceService';
import { ApiError, SortOrder } from '@/types';

export const CreateInvoiceSchema = z.object({
  customerId: z
    .string({ required_error: 'O campo é obrigatório.' })
    .uuid('O campo deve ser um UUID válido.'),
  amount: z
    .number({ required_error: 'O campo é obrigatório.' })
    .int('O valor deve ser um número inteiro.')
    .positive('O valor deve ser maior que zero.'),
  date: z.coerce
    .date({ required_error: 'O campo é obrigatório.' }),
  status: z.enum(
    ['PENDENTE', 'PAGO'],
    {
      required_error: 'O campo é obrigatório.',
      message: 'O estado deve ser '
    }
    
});

export const UpdateInvoiceSchema = CreateInvoiceSchema.partial();

export type CreateInvoiceDTO = z.infer<typeof <CreateCustomerSchema>;
export type CreateInvoiceDTO = z.infer<typeof <UpdateInvoiceSchema>;