import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCollectionRouter<T>(collection: Model<T>, populatePaths: string[] = []) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const query = collection.find();
      if (populatePaths.length > 0) {
        query.populate(populatePaths);
      }
      const documents = await query.lean().exec();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
        response.status(400).json({ error: 'Expected a JSON object.' });
        return;
      }

      const document = await collection.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}