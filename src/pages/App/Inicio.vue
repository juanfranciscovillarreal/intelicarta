<template>
  <v-container class="backgroun pa-0">

    <Logo></Logo>

    <!-- Links -->
    <v-card class="mx-auto px-6 py-8" max-width="400" color="rgb(0, 0, 0, 0)" variant="text">
      <v-btn v-for="(boton, index) in links" :key="index" color="primary" size="large" variant="elevated" block
        rounded="xl" class="mb-4" @click="goTo(boton.path)">
        {{ boton.text }}
      </v-btn>
    </v-card>

    <!-- Social -->
    <Social></Social>

  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
// Components
import Logo from '@/components/Logo.vue';
import Social from '@/components/Social.vue';
// Composables
import { useAplicacion } from '@/composables/aplicacion';
// Stores
import { useEmpresaStore } from "@/stores/empresa";

const router = useRouter()
const logo = ref('')
const links = [
  { text: 'Menú', icon: 'mdi-folder', path: 'Principal/Menu' },
  { text: 'Sugerencias', icon: 'mdi-account-multiple', path: 'Sugerencias' },
  { text: 'Reservas', icon: 'mdi-star', path: 'Reservas' },
  { text: 'Pedidos', icon: 'mdi-history', path: 'Pedidos' },
  { text: 'Contacto', icon: 'mdi-check-circle', path: 'Contacto' },
]

// Composables
const { nombreApp } = useAplicacion();
// Stores
const empresaStore = useEmpresaStore()

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