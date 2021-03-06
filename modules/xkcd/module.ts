import { SagaModule } from '../../store/saga-extension/contracts'
import { XkcdActionsUnion } from './action-creators'
import { XkcdAwareState } from './contracts/state'
import { XKCD_MODULE_NAME } from './index'
import { xkcdReducer } from './reducer'
import { loadXkcdInfoWatcher } from './saga'

export const getXkcdModule = (): SagaModule<XkcdAwareState, XkcdActionsUnion> => {
  return {
    id: XKCD_MODULE_NAME,
    reducerMap: {
      [XKCD_MODULE_NAME]: xkcdReducer,
    },
    sagas: [loadXkcdInfoWatcher],
    retained: true,
  }
}
