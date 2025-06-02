<template>
    <div v-if="route.path.includes('Pedido')">
        <!-- Generar QR -->
        <v-btn icon>
            <v-icon @click="generarQR()">mdi-share</v-icon>
        </v-btn>

        <!-- Leer QR -->
        <v-btn icon>
            <v-icon @click="leerQR()">mdi-qrcode-scan</v-icon>
        </v-btn>
    </div>

    <div class="text-center pa-4">
        <v-dialog v-model="verQR" width="auto" color="error">
            <v-card max-width="400" class="text-center">

                <v-card-title v-if="menuStore.pedido.length > 0" class="bg-green-lighten-2">
                    Comparta su pedido
                </v-card-title>

                <v-card-title v-else class="bg-red-lighten-2">
                    Pedido vacío
                </v-card-title>

                <!--vue-qrcode v-if="menuStore.pedido.length > 0" :value="qrValue" :width="300" type="image/png"
          :color="{ dark: '#000000ff' }" :margin="6" :scale="4" /-->
                <v-card-text v-else="menuStore.pedido.length = 0">
                    Seleccione algún item del menú
                </v-card-text>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Cerrar" @click="verQR = false"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
//import VueQrcode from 'vue-qrcode';
// Composables
import { useHelper } from '@/composables/helper';
// Stores
import { useMenuStore } from "@/stores/menu";

const router = useRouter()
const route = useRoute()

const verQR = ref(false)
const qrValue = ref('')
// Composables
const { goTo } = useHelper();
// Stores
const menuStore = useMenuStore()

function leerQR() {
    goTo('Principal/LeerQR');
}

function generarQR() {
    qrValue.value = JSON.stringify(menuStore.pedido.map(({ id, cantidad }) => ({ id, cantidad })));
    verQR.value = true;
}
</script>