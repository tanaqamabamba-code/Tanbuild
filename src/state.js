import { SEED_ITEMS, SEED_BATCHES, SEED_AGENTS } from './constants';

export function initialState() {
  return {
    items: SEED_ITEMS.map((i) => ({ ...i })),
    batches: SEED_BATCHES.map((b) => ({ ...b })),
    sales: [],
    agents: SEED_AGENTS.slice(),
    expenses: [],
    capital: 0,
    cashOpeningBalances: {},
    ledger: [],
    staff: [],
    payroll: [],
    stockAdjustments: [],
    drawings: [],
  };
}
