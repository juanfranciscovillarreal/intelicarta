<template>
    <div class="text-center pa-4">
        <!-- Diálogo Categoría -->
        <!-- <v-dialog v-model="props.show" transition="dialog-bottom-transition" max-width="800">
            <v-form v-model="formCategoria" @submit.prevent="onSubmitCategoria">
                <v-card>
                    <v-card-title class="bg-surface-light">
                        {{ getDialogTitle("Categoría") }}
                    </v-card-title>

                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-text-field v-model="recordCategoria.nombre" :rules="[rules.required, rules.max50]"
                                    label="Nombre" variant="underlined" clearable prepend-icon="mdi-tag-text">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="bg-surface-light">
                        <v-btn text="Cancelar" variant="plain" @click="$emit('dialogCategoriaCerrar')"></v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" text="Aceptar" color="primary"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog> -->

        <v-dialog v-model="props.show" transition="dialog-bottom-transition" fullscreen>
         
            <v-card>
                <v-form v-model="formCategoria" @submit.prevent="onSubmitCategoria">
                    <v-toolbar>
                        <v-btn icon="mdi-close" @click="$emit('dialogCategoriaCerrar')"></v-btn>

                        <v-toolbar-title>{{ getDialogTitle("categoría") }}</v-toolbar-title>

                        <v-toolbar-items>
                            <v-btn type="submit" text="Aceptar" variant="text"></v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-card-text>
                        <!-- Avatar -->
                        <v-row no-gutters>
                            <v-col cols="12">
                                <Avatar :avatar="recordCategoria.foto" @onUpdateAvatar="updateAvatar"></Avatar>
                            </v-col>
                        </v-row>     
                        <!--Nombre-->                  
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="recordCategoria.nombre" 
                                    :rules="[rules.required, rules.max50]"
                                    label="Nombre" 
                                    variant="underlined" 
                                    clearable 
                                    prepend-icon="mdi-tag-text">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>

                </v-form>                
            </v-card>        
        </v-dialog>

        <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
        </Dialog>

        <v-overlay persistent disabled :model-value="showOverlay" class="align-center justify-center">
            <v-progress-circular color="primary" size="48" indeterminate></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';

// Composables
import { useReglas } from "@/composables/reglas";
import { useErrorHandler } from "@/composables/errorHandler";
import { useCategoria } from "@/composables/categorias";
import { useItem } from "@/composables/items";
import { useMenu } from "@/composables/menu";

// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useItemsStore } from "@/stores/items";
import { useEmpresaStore } from "@/stores/empresa";
import { useMenuStore } from "@/stores/menu";

// Assets
import imgUrl from '@/assets/image.png';

// Constants
const emit = defineEmits(['dialogCategoriaCerrar'])
const dialogCategoria = ref(false);
const formCategoria = ref(false);
const DEFAULT_RECORD = ref({id: '', nombre: '', foto:''});
const props = defineProps({
    show: Boolean,
    esNueva:{
        type: Boolean,
        default: false        
    },
    recordCategoria: {
        type: Object,
        default: () => ({ id: '', nombre: '', foto: imgUrl }),
    }
})

const dialogShow = ref(false);
const dialogTitulo = ref("");
const dialogMensaje = ref("");

// const dialog = shallowRef(false)
// const notifications = shallowRef(false)
// const sound = shallowRef(true)
// const widgets = shallowRef(false)

const showOverlay = ref(false);
const loadingMenu = ref(false);

// Composables
const { rules } = useReglas();
const { getCategorias, updateCategoria, insertCategoria, removeCategoria } = useCategoria();
const { getItems, updateItem, insertItem, removeItem } = useItem();
const { getMenu } = useMenu();

// Stores
const categoriasStore = useCategoriasStore();
const itemsStore = useItemsStore();
const empresaStore = useEmpresaStore();
const menuStore = useMenuStore();

onMounted(() => {
    console.log(props.esNueva ?'es nueva':'es edición')
})

function getDialogTitle(nombre) {
    return props.esNueva ? `Nueva ${nombre}` : `Editar ${nombre}`;
}

async function onSubmitCategoria() {
    if (!formCategoria.value) return;

    try {
        showOverlay.value = true;
        await saveCategoria();
        showOverlay.value = false;
        emit('dialogCategoriaCerrar');
    } catch (error) {
        showOverlay.value = false;
        dialogShow.value = true;
        dialogTitulo.value = "Categoría";
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function saveCategoria() {
    try {
        if (!props.esNueva) {
            await updateCategoria(props.recordCategoria);
        } else {
            let newItem = {
                nombre: props.recordCategoria.nombre,
                foto: props.recordCategoria.foto
            };
            await insertCategoria(newItem);
        }       
        categoriasStore.categorias = await getCategorias(empresaStore.empresa.id);
        await getMenuData();
        dialogCategoria.value = false;
        props.recordCategoria.value = { ...DEFAULT_RECORD.value };
    } catch (error) {
        dialogCategoria.value = false;
        throw error;
    }

    async function getMenuData() {
        loadingMenu.value = true;
        menuStore.menu = await getMenu(empresaStore.empresa.id);
        loadingMenu.value = false;
    }
}

function updateAvatar(avatar) {
  props.recordCategoria.foto = avatar;
}

</script>