import { call, delay, put, takeLatest } from 'redux-saga/effects'

import { ChuckNorrisReducerAction } from './action-creators'
import { ChuckNorrisActionType } from './action-types'
import { ChuckNorrisLoadingState } from './contracts/state'
import { fetchAsJson } from '../../utils/fetchAsJson'
import { JokeResponse } from './contracts/api-response'

function* loadChuckNorrisJokeWorker() {
  yield put(ChuckNorrisReducerAction.setLoadingState(ChuckNorrisLoadingState.LOADING))

  yield delay(1000)

  try {
    const joke: JokeResponse = yield call(fetchAsJson, 'https://api.chucknorris.io/jokes/random')

    yield put(ChuckNorrisReducerAction.setJoke(joke.value))
  } catch (err) {
    yield put(ChuckNorrisReducerAction.setError(err.message))
  } finally {
    yield put(ChuckNorrisReducerAction.setLoadingState(ChuckNorrisLoadingState.LOADED))
  }
}

export function* loadChuckNorrisJokeWatcher() {
  yield takeLatest(ChuckNorrisActionType.LOAD_JOKE, loadChuckNorrisJokeWorker)
}
