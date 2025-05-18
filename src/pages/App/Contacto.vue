<template>
  <v-container>
    <Logo></Logo>

    <!-- Dirección -->
    <v-list>
      <v-list-subheader class="font-weight-bold">Dirección</v-list-subheader>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-map-marker"></v-icon>
        </template>

        <template v-slot:append>
          <v-btn color="black" icon="mdi-map-search-outline" variant="text"></v-btn>
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

        <template v-slot:append>
          <v-btn color="black" icon="mdi-link" variant="text"></v-btn>
        </template>

        <v-list-item-title>{{ contacto.Social.nombre }}</v-list-item-title>
        <v-list-item-subtitle>{{ contacto.href }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
// Stores
import { useHorarioStore } from "@/stores/horario";
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";
// Components
import Logo from '@/components/Logo.vue';

// Stores
const contactoStore = useContactoStore()
const empresaStore = useEmpresaStore()
const horarioStore = useHorarioStore()

</script>