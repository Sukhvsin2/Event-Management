import VuexPersistence from 'vuex-persist'
 
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: window.localStorage,
      reducer: (state) => ({
        settings: {
          ...state.settings,
          restored: true,
        },
      }).plugin(store)
    })
  })
}
