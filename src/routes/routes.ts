import { Router } from "express";

const routes = Router();

import AuthRoutes from './auth.routes';
import ContributorsRoutes from './contributors.routes';
import BasicsRoutes from './csv.routes';
import UnitsRoutes from './units.routes';
import SectorsRoutes from './sectors.routes';
import FunctionsRoutes from './functions.routes';
import UserRoutes from './users.routes';

new AuthRoutes(routes);
new ContributorsRoutes(routes);
new BasicsRoutes(routes);
new UnitsRoutes(routes);
new SectorsRoutes(routes);
new FunctionsRoutes(routes);
new UserRoutes(routes);


export {routes};
