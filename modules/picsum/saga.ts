import { delay, put, takeLatest } from 'redux-saga/effects'

import { PicsumReducerAction } from './action-creators'
import { PicsumActionType } from './action-types'
import { PicsumLoadingState } from './state'

function* loadPicsumWorker() {
  yield put(PicsumReducerAction.setLoadingState(PicsumLoadingState.LOADING))

  yield delay(1000)

  try {
    const res = yield fetch('https://picsum.photos/v2/list')

    const pics = yield res.json()

    yield put(PicsumReducerAction.setPics(pics))
  } catch (err) {
    yield put(PicsumReducerAction.setError(err.message))
  } finally {
    yield put(PicsumReducerAction.setLoadingState(PicsumLoadingState.LOADED))
  }
}

export function* loadPicsumWatcher() {
  yield takeLatest(PicsumActionType.LOAD_PICS, loadPicsumWorker)
}
