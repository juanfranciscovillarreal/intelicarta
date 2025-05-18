<template>
    <!-- Map -->
    <div id="map" style="height:25%;"></div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
// Stores
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";
// Components

// Stores
const contactoStore = useContactoStore()
const empresaStore = useEmpresaStore()

import "leaflet/dist/leaflet.css";
import * as L from 'leaflet/dist/leaflet';
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