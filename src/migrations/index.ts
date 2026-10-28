import * as migration_20261027_070541 from './20261027_070541';
import * as migration_20261028_094643 from './20261028_094643';

export const migrations = [
  {
    up: migration_20261027_070541.up,
    down: migration_20261027_070541.down,
    name: '20261027_070541',
  },
  {
    up: migration_20261028_094643.up,
    down: migration_20261028_094643.down,
    name: '20261028_094643'
  },
];
