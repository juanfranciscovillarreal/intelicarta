import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useCategoriasStore = defineStore('categorias', () => {
    // Estados
    const categorias = ref([])
    const seleccionada = ref(0)
    const index = ref(0)
    const soloTexto = ref(true)

    // Getters

    // Actions

    return {
        categorias,
        seleccionada,
        index,
        soloTexto
    }
})