<template>
  <v-sheet class="mt-2 mb-2">

    <v-slide-group :show-arrows="false" :mobile="true" mobile-breakpoint="xs" center-active
      v-model="categoriasStore.index">

      <v-slide-group-item v-for="categoria in categoriasStore.categorias" v-slot="{ isSelected = true, toggle }">

        <v-card class="mx-auto" max-width="80" elevation="0" variant="text">
          <v-avatar :image="categoria.foto != null ? categoria.foto : empresaStore.empresa.logo" size="80"
            :border="isSelected ? 'xl' : 'md'" @click="filtrarPorCategoria(toggle, categoria)">
          </v-avatar>

          <v-card-title class="d-flex justify-center text-subtitle-2">
            {{ categoria.nombre }}
          </v-card-title>
        </v-card>

      </v-slide-group-item>

    </v-slide-group>
  </v-sheet>
</template>

<script setup>
// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useEmpresaStore } from "@/stores/empresa";
import { useMenuStore } from "@/stores/menu";

// Stores
const categoriasStore = useCategoriasStore()
const empresaStore = useEmpresaStore()
const menuStore = useMenuStore()

function filtrarPorCategoria(toggle, categoria) {
  if (toggle) {
    toggle();
  }

  menuStore.menuFiltrado = menuStore.menuCompleto;
  if (categoria.id != 0) {
    menuStore.menuFiltrado = menuStore.menuCompleto.filter((item) => {
      return item.id == categoria.id;
    })
  }
  categoriasStore.seleccionada = categoria;
}

</script>