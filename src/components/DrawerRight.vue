<template>
    <v-btn icon>
        <v-icon @click.stop="drawer = !drawer">mdi-cog</v-icon>
    </v-btn>

    <v-navigation-drawer v-model="drawer" location="right" temporary>
        <v-list density="compact" nav>
            <v-list-item v-for="[text, icon] in links" :key="icon" :prepend-icon="icon" :title="text" :value="text"
                @click="selected(text)">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const links = ref([
    ["Inicio", "mdi-home", `Inicio`],
    ["Menu", "mdi-library", `Principal`],
    ["Contacto", "mdi-map-marker", `Contacto`],
    ["Reservas", "mdi-account-clock-outline", `Reserva`],
    ["Galería", "mdi-image-multiple-outline", `Galeria`],
    ["Delivery", "mdi-moped", `Delivery`],
])
const drawer = ref(false)

function selected(text) {
    // switch (text) {
    //     case value:
            
    //         break;
    
    //     default:
    //         break;
    // }
    drawer.value = false;
}
</script>