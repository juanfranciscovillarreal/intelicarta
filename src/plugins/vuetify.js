/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Dates
// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import svSE from 'date-fns/locale/sv'

// Translations provided by Vuetify

import es from '@/locales/es'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'dark',
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          primary: "#ad1c3d",
          "page-header-background": "#d7d7ce",
          "page-background": "#cdcdc1",
          "table-header": "#cdcdc1",
          background: "#c0c0b5",
          "header-background": "#b5b5a6",
          "info-text": "#666660",
        },
      },
      darkTheme: {
        dark: true,
        colors: {
          primary: "#52E3C2",
          "page-header-background": "#282831",
          "page-background": "#32323E",
          "table-header": "#2e2e2e",
          background: "#3F3F4A",
          "header-background": "#4a4a59",
          "info-text": "#99999F",
        },
      },
    },
  },
  locale: {
    locale: 'es',
    messages: { es },
  },
})
