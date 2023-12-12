import { ConnectDB } from '@shared/infra/typeorm';
import 'dotenv/config';

import app from './app';

ConnectDB();

app.listen(process.env.APP_PORT, () =>
  console.log(`Server running on port ${process.env.APP_PORT}`),
);
