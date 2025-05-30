<template>
    <div v-if="route.path.includes('Menu')">
        <!-- Opción Ver Pedido -->
        <v-btn @click="verPedido()" icon>
            <v-badge v-if="menuStore.total > 0" color="success" dot>
                <v-icon>mdi-receipt-text-outline</v-icon>
            </v-badge>
            <v-icon v-else="menuStore.total = 0">mdi-receipt-text-outline</v-icon>
        </v-btn>

        <!-- Opción Expandir / Contraer -->
        <v-btn icon>
            <v-icon @click="menuStore.expandirContraerMenu()">
                {{ menuStore.expandir.length > 0 ? 'mdi-minus-box-multiple-outline' : 'mdi-expand-all' }}
            </v-icon>
        </v-btn>

        <!-- Opción Menú Vertical -->
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list density="compact">
                <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary"
                    @click="mostrarMenu(item.id_tipo)">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>

        </v-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Composables
import { useHelper } from '@/composables/helper';
// Stores
import { useMenuStore } from "@/stores/menu";

const router = useRouter()
const route = useRoute()
// Composables
const { goTo } = useHelper();
// Stores
const menuStore = useMenuStore()

const items = ref([
    { id_tipo: 0, text: 'Texto', icon: 'mdi-text-long' },
    { id_tipo: 1, text: 'Lista', icon: 'mdi-list-box-outline' },
    { id_tipo: 2, text: 'Fotos', icon: 'mdi-view-grid-outline' },
])

function mostrarMenu(id_tipo) {
    menuStore.id_tipo = id_tipo;
}

function verPedido() {
    goTo('Principal/Pedido');
}
</script>