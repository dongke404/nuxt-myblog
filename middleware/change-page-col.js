import { Route } from '~/constants/system'

export default ({ route, store }) => {
  // columns
  const isTwoColumns = [
    Route.About,
    Route.Timeline
  ].includes(route.name || '')
  const isThreeColumns = [
    Route.Music,
    Route.Photo
  ].includes(route.name || '')
  // set columns
  if (store.state.global.isTwoColumns !== isTwoColumns) {
    store.commit('global/updateTwoColumnsState', isTwoColumns)
  }

  if (store.state.global.isThreeColumns !== isThreeColumns) {
    store.commit('global/updateThreeColumnsState', isThreeColumns)
  }
}
