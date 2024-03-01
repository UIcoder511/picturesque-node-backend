import express, { Express, Router } from 'express';
import { PhotoRoutes } from './components/photos';
import { PhotographerRoutes } from './components/photographers';

const app: Express = express();

app.use(express.json());

// Versioning using Router
const appV1Router: Router = Router();
app.use('/api/v1', appV1Router);

//Routes
appV1Router.use('/photos', PhotoRoutes);
appV1Router.use('/photographers', PhotographerRoutes);

export default app;
