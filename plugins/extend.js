/**
 * @file Vue extends / ES module
 * @module plugins/vue-extends
 **/

import Vue from 'vue'
// import filters from '~/filters'
// import apiConfig from '~/config/api.config'
import i18nConfig from '~/config/i18n.config'
import i18nTransfer  from '~/utils/i18nTransform'




import EmptyBox from '~/components/common/empty'
import LoadingBox from '~/components/common/loading'
import CommentBox from '~/components/common/comment'
import SkeletonBox from '~/components/common/skeleton'


// filters
// Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.component(EmptyBox.name, EmptyBox)
Vue.component(LoadingBox.name, LoadingBox)
Vue.use(CommentBox)
Vue.use(SkeletonBox)



// mixins
Vue.mixin({
  computed: {
    $i18n() {
      return i18nTransfer(i18nConfig,this.$store.state.global.language)
    }
  }
})

