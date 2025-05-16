<template>

  <Logo></Logo>

  <!-- Nombre / Descripción -->
  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-card-item>
        <v-card-title class="text-center">
          {{ empresaStore.empresa.nombre }}
        </v-card-title>

        <v-card-subtitle class="text-center">
          {{ empresaStore.empresa.descripcion }}
        </v-card-subtitle>
      </v-card-item>

    </v-card>
  </div>

  <!-- Horarios -->
  <div class="d-flex align-center justify-space-around">
    <v-list elevation="0" variant="text">
      <v-list-item v-for="(horario, i) in horarioStore.horarios" :key="i">
        <v-list-item-title v-text="horario.dia" class="mr-4"></v-list-item-title>

        <template v-slot:append>
          {{ horario.Dia.nombre }} {{ horario.horario }}
        </template>
      </v-list-item>
    </v-list>
  </div>

  <!-- Map -->
  <div id="map" style="height:30vh;"></div>

  <!-- Social -->
  <v-card elevation="0" rounded="0" class="position-absolute bottom-0 w-100" theme="dark">
    <v-container>
      <v-row justify="center" dense>
        <v-col v-for="(contacto, i) in contactoStore.contactos" :key="i" cols="auto">
          <v-card :href="contacto.href" class="pa-2" rel="noopener noreferer" target="_blank" width="50" flat>
            <v-avatar :icon="contacto.Social.icono" class="mb-2" color="white" variant="tonal"></v-avatar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
// Stores
import { useContactoStore } from "@/stores/contacto";
import { useHorarioStore } from "@/stores/horario";
import { useEmpresaStore } from "@/stores/empresa";
// Components
import Logo from '@/components/Logo.vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet/dist/leaflet';

const empresaStore = useEmpresaStore()
const contactoStore = useContactoStore()
const horarioStore = useHorarioStore()

const initialMap = ref(null);

onMounted(() => {
  initialMap.value = L.map('map', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true })
    .setView([-34.448107, -58.53841], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);

  L.marker([-34.448107, -58.53841]).addTo(initialMap.value);
  //.bindPopup(`<strong> Hello! </strong> <br> I am a popup`);

  // latitude: -34.448107 and longitude: -58.53841

  initialMap.value.on('click',
    function (e) {
      var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
      console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);
    });

});

</script>