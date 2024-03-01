export const getDBURL = () => {
  const USER = process.env.MONGODB_USER || '';
  const PASS = process.env.MONGODB_PASS || '';
  const CLUSTER_URL = process.env.MONGODB_CLUSTER_URL || '';
  const DB = process.env.DATABASE || '';
  return DB?.replace(/<PASSWORD>/, PASS)
    .replace(/<USER>/, USER)
    .replace(/<CLUSTER>/, CLUSTER_URL);
};
