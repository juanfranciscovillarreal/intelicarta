import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

export const useMenuStore = defineStore('menu', () => {
  // Estados
  const count = ref(0)
  const total = ref(0)
  const id_tipo = ref(0)

  const menuFiltrado = ref([])
  const menuCompleto = ref([])
  const pedido = ref([])
  const expandir = ref([])
  const menu = ref([])

  // Getters
  const duplicar = computed(() => count.value * 2)

  // Actions
  function incrementar() {
    count.value++
  }

  function totalizar() {
    total.value = pedido.value.reduce(function (prev, cur) {
      return parseFloat(prev) + parseFloat(cur.subtotal);
    }, 0).toFixed(2);
  }

  function expandirContraerMenu() {
    if (expandir.value.length > 0) {
      contraerMenu();
    } else {
      expandirMenu();
    }
  }

  function expandirMenu() {
    for (let index = 0; index < menuCompleto.value.length; index++) {
      expandir.value.push(index);
    }
  }

  function contraerMenu() {
    expandir.value = [];
  }

  return {
    count,
    total,
    id_tipo,
    menuFiltrado,
    menuCompleto,
    menu,
    expandir,
    pedido,
    totalizar,
    duplicar,
    incrementar,
    expandirContraerMenu,
    expandirMenu,
    contraerMenu,
  }
})