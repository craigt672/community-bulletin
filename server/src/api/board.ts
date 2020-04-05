import { Request, Response } from 'express';
import { Document } from 'mongoose';
import isEmpty from 'lodash.isempty';

import postSchema from '../db/models';
import db from '../db';

interface IPost extends Document {
  title: string;
  body: string;
  votes: number;
  tags: string[];
  createdAt: number,
  updatedAt: number
}

const Post = db.setCollection('Post', postSchema);

export async function getAll(req: Request, res: Response, next: Function) {
  try {
    const posts = await Post.getAll();

    return res.json(posts);
  } catch (error) {
    return next(error);
  }
}

export async function getById(req: Request, res: Response, next: Function) {
  const { params } = req;
  const { id } = params;

  try {
    const post = await Post.get(id);

    //Not Valid
    if (!post) {
      return res.sendStatus(404);
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
}

export async function create(req: Request, res: Response, next: Function) {
  const { body } = req;
  const newEntry: IPost = { ...body };

  try {
    const post: any = await Post.save(newEntry);

    const meta: any = {
      status: 'Post has been successfully created.',
      uploadTime: post.updatedAt
    };

    return res.status(201).json(meta);
  } catch (error) {
    return next(error);
  }
}

export async function remove(req: Request, res: Response, next: Function) {
  const { params } = req;
  const { id } = params;

  try {
    const post = await Post.get(id);

    //Not Valid
    if (!post) {
      return res.sendStatus(404);
    }

    const { operationTime, deletedCount }: any = await Post.deleteOne(id);

    const meta: any = {
      status: `Post #${id} has been successfully removed.`,
      meta: { operationTime, deletedCount } 
    };

    return res.status(201).json(meta);
  } catch (error) {
    return next(error);
  }
}

export async function update(req: Request, res: Response, next: Function) {
  const { params, body } = req;
  const { id } = params;
  const updatedPost: IPost = { ...body };

  try {
    // No Content
    if (isEmpty(updatedPost)) {
      return res.sendStatus(406);
    }

    const post = await Post.get(id);

    // Not Found
    if (!post) {
      return res.sendStatus(404);
    }

    const modifiedPost = await Post.updateOne(id, updatedPost);

    return res.status(201).json(modifiedPost);
  } catch (error) {
    return next(error);
  }
}

export function error(serviceError: Error, req: Request, res: Response, next: Function) {
  console.log(serviceError);
  res.sendStatus(500);
}
