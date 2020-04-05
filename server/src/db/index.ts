import dotenv from 'dotenv';
import mongoose, { Model, Document, Schema } from 'mongoose';

//Import DB credentials from env
dotenv.config();
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_URI
} = process.env;

class Database {
  private collection = {} as Model<Document>

  constructor() {
    this._connect();
  }
  
  private async _connect() {
    try {
      await mongoose.connect(`${DB_HOST}://${DB_USER}:${DB_PASS}@${DB_URI}`);
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error')
    }
  }

  setCollection(collectionName: string, schema: Schema<any>) {
    this.collection = mongoose.model(collectionName, schema);
    return this;
  }

  save = (document: Document) => {
    const newEntry = new this.collection(document);
    return newEntry.save();
  }
  
  getAll = () => {
    return this.collection.find({}).exec();
  };

  get = (id: string) => {
    return this.collection.findOne({_id: id}).exec();
  };

  deleteOne = (id: string) => {
    return this.collection.deleteOne({_id: id}).exec();
  }

  updateOne = (id: string, update: any) => {
    return this.collection.findOneAndUpdate({_id: id}, update, { new: true }).exec();
  }
};

export default new Database();
