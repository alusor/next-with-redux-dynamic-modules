import { COUNT_MODULE_NAME } from './index'
import { CountAwareState } from './state'

export const countSelector = (state: CountAwareState): number => {
  return state[COUNT_MODULE_NAME].count
}
