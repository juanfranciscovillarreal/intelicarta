<template>
    <v-toolbar color="primary" extension-height="0">
        <template v-slot:prepend>
            <v-btn icon="mdi-arrow-left" @click="navegar()"></v-btn>
        </template>

        <v-toolbar-title>{{ props.titulo }}</v-toolbar-title>

        <v-spacer></v-spacer>

       <MenuOpciones></MenuOpciones>
       <PedidoOpciones></PedidoOpciones>

        <v-btn v-if="props.icono != null" :icon="props.icono" @click="$emit('evento_click')"></v-btn>

        <template v-slot:extension v-if="nuevo">
            <v-fab class="mr-4" color="cyan-accent-2" icon="mdi-plus" location="bottom right" size="40" absolute offset
                @click="$emit('verDialogo')">
            </v-fab>
        </template>
    </v-toolbar>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
// Components
import MenuOpciones from '@/components/MenuOpciones'
import PedidoOpciones from '@/components/PedidoOpciones'
// Composables
import { useHelper } from '@/composables/helper';

const router = useRouter()
const route = useRoute()
// Composables
const { goTo } = useHelper();

const props = defineProps({
    titulo: String,
    ruta: String,
    icono: String,
    nuevo: Boolean,
    esApp: Boolean
})

function navegar() {
    if (props.esApp == true) {
        goTo(props.ruta);
    } else {
        router.push(props.ruta);
    }
}

</script>