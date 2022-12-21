import App from './App';
import { PrimaryDB } from '@core/db/PrimaryDB';

PrimaryDB.client;

const app = new App();

app.listen();
