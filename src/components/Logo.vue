<template>
    <div class="d-flex align-center justify-space-around mt-2">
        <v-img aspect-ratio="16/9" :src="getImage()" max-height="125">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey" indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>
    </div>

</template>

<script setup>
// Stores
import { useEmpresaStore } from "@/stores/empresa";
// Assets
// import imgUrl from '@/assets/InteliCarta.png'

// Stores
const empresaStore = useEmpresaStore()

function getImage() {
    // if (empresaStore.empresa.logo == '') {
    //     empresaStore.empresa.logo = imgUrl;
    // }

    return empresaStore.empresa.logo;
}

</script>