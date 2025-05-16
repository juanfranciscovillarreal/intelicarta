<template>

    <v-sheet class="mx-auto" elevation="0" max-width="800">
        <v-slide-group v-model="model" selected-class="bg-primary" :show-arrows="true" :mobile="true" center-active>
            <v-slide-group-item v-for="item in itemsStore.sugeridos" :key="item.id">

                <v-card class="mx-auto" max-width="200" min-height="80" elevation="0">
                    <v-card-item>
                        <v-img height="70" width="70" :src="item.foto" cover @click="seleccionar(item)">
                            <template v-slot:placeholder>
                                <v-container class="fill-height" fluid>
                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <div class="text-center">
                                                <v-progress-circular color="grey-lighten-5" indeterminate>
                                                </v-progress-circular>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>

                            <template v-slot:error>
                                <v-img cover aspect-ratio="1" src="https://picsum.photos/500/300?image=232">
                                </v-img>
                            </template>
                        </v-img>

                        <div class="text-caption">{{ item.nombre }}</div>
                        <div class="text-caption">
                            {{ item.descripcion }}
                        </div>
                        <div class="text-subtitle-1">$ {{ item.precio }}</div>
                    </v-card-item>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </v-sheet>

</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

// Constants
const model = ref(null)
const loading = ref(false)
// Composables
import { useAplicacion } from '@/composables/aplicacion';
// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useItemsStore } from "@/stores/items";
import { useEmpresaStore } from "@/stores/empresa";
import { useMenuStore } from "@/stores/menu";

// Stores
const itemsStore = useItemsStore()
// Composables
const router = useRouter()
const { nombreApp } = useAplicacion();
// Stores
const categoriasStore = useCategoriasStore()
const empresaStore = useEmpresaStore()
const menuStore = useMenuStore()


function seleccionar(item) {
    const categoria = categoriasStore.categorias.find((categoria) => categoria.id === item.id_categoria);
    //categoriasStore.seleccionada = { ...categoria };
    const categoriaMenu = menuStore.menuCompleto.find((categoria) => categoria.id === item.id_categoria);
    const itemMenu = categoriaMenu.Item.find((itemMenu) => itemMenu.id === item.id);
    itemMenu.favorito = true;
    itemMenu.cantidad = 1;
    itemMenu.subtotal = itemMenu.precio * itemMenu.cantidad;

    menuStore.pedido.push(itemMenu);
    menuStore.totalizar();

    let root = `/${nombreApp.value}/${empresaStore.empresa.nombre}`;
    router.push(`${root}/Principal/Menu`);
}

</script>