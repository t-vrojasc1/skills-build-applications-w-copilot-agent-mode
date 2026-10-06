import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCollectionRouter<T>(collection: Model<T>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const documents = await collection.find().lean().exec();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  return router;
}