<template>
  <v-container class="backgroun pa-0">
    <!-- Logo -->
    <Logo></Logo>

    <!-- Links -->
    <v-card class="mx-auto px-6 py-8" max-width="400" color="rgb(0, 0, 0, 0)" variant="text">
      <v-btn v-for="(boton, index) in links" :key="index" color="primary" density="default" variant="elevated" block
        rounded="xl" class="mb-4" @click="goTo(boton.path)">
        {{ boton.text }}
      </v-btn>
    </v-card>

    <!-- WiFi -->
    <div class="d-flex align-center justify-space-around">
      <v-card v_if="empresaStore.empresa.wifi_usuario != ''" class="mx-auto" prepend-icon="mdi-wifi"
        :title="empresaStore.empresa.wifi_usuario" :subtitle="empresaStore.empresa.wifi_clave">
      </v-card>
    </div>


  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Components
import Logo from '@/components/Logo.vue';
// Composables
import { useHelper } from '@/composables/helper';
// Stores
import { useEmpresaStore } from "@/stores/empresa";

const logo = ref('')
const links = [
  { text: 'Menú', icon: 'mdi-folder', path: 'Principal/Menu' },
  { text: 'Sugerencias', icon: 'mdi-account-multiple', path: 'Sugerencias' },
  // { text: 'Reservas', icon: 'mdi-star', path: 'Reservas' },
  // { text: 'Pedidos', icon: 'mdi-history', path: 'Pedidos' },
  { text: 'Contacto', icon: 'mdi-check-circle', path: 'Contacto' },
]

// Composables
const { goTo } = useHelper();
// Stores
const empresaStore = useEmpresaStore()

onMounted(async () => {
  logo.value = empresaStore.empresa.logo;
})

</script>

<style scoped>
.background {
  background-image: url('../../assets/fondo.jpg');
  background-size: cover;
  height: 100%;
}
</style>