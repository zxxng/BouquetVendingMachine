import BouquetGenerator from './BouquetGenerator.js';
import BouquetMachineEvents from './BouquetMachineEvents.js';

const generator = new BouquetGenerator();
const machineEvents = new BouquetMachineEvents();

(async function () {
  await generator.setup();
  machineEvents.bindEvent();
})();
