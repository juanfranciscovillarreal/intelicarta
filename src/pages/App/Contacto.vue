<template>
  <v-container>
    <ToolBar titulo="Acerca..." ruta="Inicio" :esApp="true"></ToolBar>
    <Logo></Logo>

    <!-- Dirección -->
    <v-list>
      <v-list-subheader class="font-weight-bold">Dirección</v-list-subheader>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-map-marker"></v-icon>
        </template>

        <template v-slot:append>
          <v-btn color="black" icon="mdi-map-search-outline" variant="text" @click="verMapa"></v-btn>
        </template>

        <v-list-item-title>{{ empresaStore.empresa.direccion }}</v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- Horarios -->
    <v-list>
      <v-list-subheader class="font-weight-bold">Horario de atención</v-list-subheader>

      <v-list-item v-for="(horario, i) in horarioStore.horarios" :key="i">
        <template v-slot:prepend>
          <v-icon icon="mdi-clock"></v-icon>
        </template>

        <v-list-item-title v-text="horario.Dia.nombre"></v-list-item-title>
        <v-list-item-subtitle v-text="horario.horario"></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- Contacto / RedesSociales -->
    <v-list>
      <v-list-subheader class="font-weight-bold">Contacto / Redes Sociales</v-list-subheader>
      <v-list-item v-for="(contacto, i) in contactoStore.contactos" :key="i">
        <template v-slot:prepend>
          <v-icon :icon="contacto.Social.icono"></v-icon>
        </template>
        <v-list-item-title>{{ contacto.Social.nombre }}</v-list-item-title>
        <v-list-item-subtitle>{{ contacto.href }}</v-list-item-subtitle>

        <template v-slot:append>
          <!-- <v-icon :icon="contacto.Social.icono" @click="clickUrl(contacto.href)"></v-icon> -->
          <v-icon icon="mdi-content-copy" @click="copyText(contacto.href)"></v-icon>
        </template>

      </v-list-item>
    </v-list>

  </v-container>

  <!-- Mapa -->
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" height="400">
      <v-card>
        <Mapa></Mapa>
      </v-card>
    </v-dialog>
  </div>

  <!-- Snackbar -->
  <v-sheet class="d-flex flex-column">
    <v-snackbar v-model="snackbar" min-width="100" color="primary">
      {{ snackbarText }} copiado
    </v-snackbar>
  </v-sheet>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
// Stores
import { useHorarioStore } from "@/stores/horario";
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";
// Components
import Logo from '@/components/Logo.vue';
import Mapa from '@/components/Mapa.vue';
import ToolBar from '@/components/ToolBar.vue';
// Composables
import { useAplicacion } from '@/composables/aplicacion';

// Stores
const contactoStore = useContactoStore()
const empresaStore = useEmpresaStore()
const horarioStore = useHorarioStore()
// Composables
const { nombreApp } = useAplicacion();

const dialog = ref(false)
const router = useRouter()
const snackbar = ref(false)
const snackbarText = ref('')

function verMapa() {
  dialog.value = true;
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  snackbar.value = true;
  snackbarText.value = text;
}

</script>