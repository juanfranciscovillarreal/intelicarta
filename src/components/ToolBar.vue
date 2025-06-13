<template>
    <v-app-bar color="primary">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" @click="navegar()"></v-btn>
        </template>

        <v-toolbar-title>{{ props.titulo }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-slot:extension v-if="nuevo">
            <v-fab class="mr-4" color="cyan-accent-2" icon="mdi-plus" location="bottom right" size="40" absolute offset
                @click="$emit('verDialogo')">
            </v-fab>
        </template>

        <!-- Opción Ver Pedido -->
        <v-btn @click="verPedido()" icon v-if="route.path.includes('Menu')">
            <v-badge v-if="menuStore.total > 0" color="success" dot>
                <v-icon>mdi-receipt-text-outline</v-icon>
            </v-badge>
            <v-icon v-else="menuStore.total = 0">mdi-receipt-text-outline</v-icon>
        </v-btn>

        <v-btn v-if="props.icono != null" :icon="props.icono" @click="$emit('evento_click')"></v-btn>

        <v-btn icon>
            <v-icon @click.stop="drawer = !drawer">mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary>
        <v-list density="compact" nav>
            <v-list-subheader>Expandir / Contraer categorías</v-list-subheader>
            <v-list-item>
                <v-switch @click="menuStore.expandirContraerMenu()"
                    :label="`Expandido: ${menuStore.expandir.length > 0 ? 'Si' : 'No'}`" hide-details inset></v-switch>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item>
                <v-list-subheader>Ver menú como...</v-list-subheader>
                <v-radio-group v-model="tipoMenu">
                    <v-radio label="Texto" value="0"></v-radio>
                    <v-radio label="Lista" value="1"></v-radio>
                    <v-radio label="Fotos" value="2"></v-radio>
                </v-radio-group>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Components
import Buscar from '@/components/Buscar.vue';
// Composables
import { useHelper } from '@/composables/helper';
// Stores
import { useMenuStore } from "@/stores/menu";

const router = useRouter()
const route = useRoute()

// Stores
const menuStore = useMenuStore()

const drawer = ref(false)
const tipoMenu = ref('0')

// Composables
const { goTo } = useHelper();

const props = defineProps({
    titulo: String,
    ruta: String,
    icono: String,
    nuevo: Boolean,
    esApp: Boolean
})

watch(tipoMenu, (newValue, oldValue) => {
    menuStore.id_tipo = newValue;
})

function navegar() {
    if (props.esApp == true) {
        goTo(props.ruta);
    } else {
        router.push(props.ruta);
    }
}

function verPedido() {
    goTo('Principal/Pedido');
}

function selected(text) {
    drawer.value = false;
}

</script>