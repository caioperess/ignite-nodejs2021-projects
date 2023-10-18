import 'express-async-errors';
import 'reflect-metadata';
import './shared/container';

import { ConnectDB } from '@shared/infra/typeorm';

import app from './shared/infra/http/app';

ConnectDB();

app.listen(3333, () => console.log('Server running on port 3333'));
