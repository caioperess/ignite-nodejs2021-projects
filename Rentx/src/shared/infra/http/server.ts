import { ConnectDB } from '@shared/infra/typeorm';
import 'dotenv/config';

import app from './app';

ConnectDB();

app.listen(3333, () => console.log('Server running on port 3333'));
