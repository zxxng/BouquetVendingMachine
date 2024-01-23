import BouquetGenerator from './classes/BouquetGenerator.js';
import BouquetMachineEvents from './classes/BouquetMachineEvents.js';

const generator = new BouquetGenerator();
const machineEvents = new BouquetMachineEvents();

(async function () {
  await generator.setup();
  machineEvents.bindEvent();
})();
