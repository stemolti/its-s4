// api/index.ts  (unica lambda)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

let cached = global.mongooseConn as typeof mongoose | undefined;

async function dbConnect() {
  if (cached) return cached;                    // hot-start
  cached = await mongoose.connect(process.env.MONGO_URI as string, {
    // allunga, se vuoi, il server-selection timeout
    serverSelectionTimeoutMS: 30000,
  });
  console.log('🟢 MongoDB connected');
  return cached;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();                            // 👉 attendo SEMPRE
  return app(req, res);                         // delego ad Express
}
