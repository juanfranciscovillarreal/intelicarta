<template>
  <v-container class="background">

    <Logo></Logo>

    <v-card class="mx-auto px-6 py-8" max-width="400" color="rgb(0, 0, 0, 0)" variant="text">

      <v-btn v-for="(boton, index) in botones" :key="index" color="primary" size="large" variant="elevated" block
        rounded="xl" class="mb-4" @click="goTo(boton.path)">
        {{ boton.text }}
      </v-btn>

      <v-row justify="center" dense>
        <v-col v-for="(contacto, i) in contactoStore.contactos" :key="i" cols="auto">
          <v-card :href="contacto.href" class="pa-2" rel="noopener noreferer" target="_blank" flat
            color="rgb(0, 0, 0, 0)" variant="text">
            <v-avatar :icon="contacto.Social.icono"></v-avatar>
          </v-card>
        </v-col>
      </v-row>

    </v-card>

    <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
    </Dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
// Components
import Carousel from '@/components/Carousel.vue';
import Sugerencias from '@/components/Sugerencias.vue';
import Dialog from '@/components/Dialog.vue';
import Logo from '@/components/Logo.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useAplicacion } from '@/composables/aplicacion';
// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";

const router = useRouter()
const dialogShow = ref(false);
const dialogTitulo = ref('');
const dialogMensaje = ref('');
const logo = ref('')
const botones = [
  { text: 'Menú', icon: 'mdi-folder', path: 'Principal/Menu' },
  { text: 'Sugerencias', icon: 'mdi-account-multiple', path: 'Sugerencias' },
  { text: 'Reservas', icon: 'mdi-star', path: 'Reservas' },
  { text: 'Pedidos', icon: 'mdi-history', path: 'Pedidos' },
  { text: 'Contacto', icon: 'mdi-check-circle', path: 'Contacto' },
]

// Composables
const { nombreApp } = useAplicacion();
// Stores
const categoriasStore = useCategoriasStore()
const empresaStore = useEmpresaStore()
const contactoStore = useContactoStore()

onMounted(async () => {
  logo.value = empresaStore.empresa.logo;
})

function goTo(opcion) {
  let empresa = empresaStore.empresa.nombre;
  let root = `/${nombreApp.value}/${empresa}`;
  router.push(`${root}/${opcion}`);
}

</script>

<style scoped>
.background {
  background-image: url('../../assets/fondo.jpg');
  background-size: cover;
  height: 100%;
}
</style>