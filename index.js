import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import db from './db.js';
import fuelConsumptionRoutes from './routes/fuel-consumption-routes.js';


const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption)
const fuelConsumptionRoute = fuelConsumptionRoutes(fuelConsumption)

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup handlebars engine

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//public static
app.use(express.static('public'));

//route handlers
app.get('/', fuelConsumptionRoute.showIndex)
app.get('/vehicles', fuelConsumptionRoute.getVehicles)
app.post('/vehicle', fuelConsumption.addVehicle)

app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

