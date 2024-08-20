import { Request, Response } from 'express';
import asyncErrorWrapper from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '@/exceptions/NotFoundError';
import { prisma } from '@/lib/prisma';
import { CreateUserSchema } from '@/validations/create-user.schema';

export const currentUser = asyncErrorWrapper(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: 'asd' },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.status(StatusCodes.OK).json(user);
});

export const createUser = asyncErrorWrapper(async (req: Request, res: Response) => {
  const userInput = req.body as CreateUserSchema;

  const user = await prisma.user.create({
    data: userInput,
  });

  res.status(StatusCodes.CREATED).json(user);
});
