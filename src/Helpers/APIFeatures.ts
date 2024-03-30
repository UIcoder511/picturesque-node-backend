import mongoose from 'mongoose';

interface QueryParamsType {
  sort?: string; // Add sort property to QueryParams interface
  page?: string;
  limit?: string;
  fields?: string;

  [key: string]: any; // Allow other properties dynamically
}

export class APIFeatures<Document, QueryParams extends QueryParamsType> {
  queryOb: QueryParams;
  query: mongoose.Query<Document | Document[], Document>;

  constructor(query: mongoose.Query<Document, Document>, queryOb: QueryParams) {
    this.query = query;
    this.queryOb = queryOb;
  }

  filter() {
    const queryParams = { ...this.queryOb };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((field) => delete queryParams[field]);

    let queryStr = JSON.stringify(queryParams);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => '$' + match);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //by1,by2,...
    if (this.queryOb.sort) {
      const queryObSortBys = this.queryOb.split(',').join(' ');
      this.query = this.query.sort(queryObSortBys);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    //by1,by2,...
    if (this.queryOb.fields) {
      const queryObSortBys = this.queryOb.split(',').join(' ');
      this.query = this.query.select(queryObSortBys);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    if (this.queryOb.page) {
      const page = Number(this.queryOb.page) || 1;
      const limit = Number(this.queryOb.limit) || 100;
      const skip = limit * (page - 1);

      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }
}
