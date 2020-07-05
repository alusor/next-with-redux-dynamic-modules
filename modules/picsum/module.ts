import { SagaModule } from '../../store/saga-extension/contracts'
import { PicsumActionsUnion, PicsumPublicAction } from './action-creators'
import { PICSUM_MODULE_NAME } from './index'
import { picsumReducer } from './reducer'
import { loadPicsumWatcher } from './saga'
import { PicsumAwareState } from './contracts/state'

export const getPicsumModule = (): SagaModule<PicsumAwareState, PicsumActionsUnion> => {
  return {
    id: PICSUM_MODULE_NAME,
    reducerMap: {
      [PICSUM_MODULE_NAME]: picsumReducer,
    },
    initialActions: [PicsumPublicAction.loadPics()],
    sagas: [loadPicsumWatcher],
  }
}
