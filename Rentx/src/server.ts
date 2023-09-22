import 'express-async-errors';
import 'reflect-metadata';
import './shared/container';

import app from './app';
import { ConnectDB } from './database';

ConnectDB();

app.listen(3333, () => console.log('Server running on port 3333'));
