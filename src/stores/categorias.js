import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useCategoriasStore = defineStore('categorias', () => {
    // Estados
    const categorias = ref([])
    const seleccionada = ref(0)
    const index = ref(0)

    // Getters

    // Actions

    return {
        categorias,
        seleccionada,
        index
    }
})