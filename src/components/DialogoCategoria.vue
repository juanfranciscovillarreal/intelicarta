<template>
    <div class="text-center pa-4">
        <!-- <v-dialog v-model="props.show" width="auto">
            <v-card max-width="400" :text="props.mensaje" :title="props.titulo">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Aceptar" @click="$emit('dialogCerrar')"></v-btn>
                </template>
</v-card>
</v-dialog> -->

        <!-- Diálogo Categoría -->
        <v-dialog v-model="props.show" transition="dialog-bottom-transition" max-width="800">
            <v-form v-model="formCategoria" @submit.prevent="onSubmitCategoria">
                <v-card>
                    <v-card-title class="bg-surface-light">
                        {{ getDialogTitle("Categoría") }}
                    </v-card-title>

                    <v-card-text>
                        <!-- nombre -->
                        <v-row no-gutters>
                            <!-- nombre -->
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
        </v-dialog>

        <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
        </Dialog>

        <v-overlay persistent disabled :model-value="showOverlay" class="align-center justify-center">
            <v-progress-circular color="primary" size="48" indeterminate></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

// Constants
const emit = defineEmits(['dialogCategoriaCerrar'])
const isEditing = ref(false);
const dialogCategoria = ref(false);
const formCategoria = ref(false);
const DEFAULT_RECORD = ref({
  id: "",
  nombre: "",
});
const recordCategoria = ref({
    id: "",
    nombre: "",
});
const props = defineProps({
    show: Boolean,
    titulo: {
        type: String,
        default: ''
    },
    mensaje: {
        type: String,
        default: ''
    },
})

const dialogShow = ref(false);
const dialogTitulo = ref("");
const dialogMensaje = ref("");

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

})

function getDialogTitle(nombre) {
    return isEditing.value ? `Editar ${nombre}` : `Agregar ${nombre}`;
}

async function onSubmitCategoria() {
    if (!formCategoria.value) return;

    try {
        showOverlay.value = true;
        await saveCategoria();
        showOverlay.value = false;
        emit('dialogCategoriaCerrar');
    } catch (error) {
        dialogShow.value = true;
        dialogTitulo.value = "Categoría";
        dialogMensaje.value = useErrorHandler(error);
    }
}

function addCategoria() {
    isEditing.value = false;
    recordCategoria.value = { ...DEFAULT_RECORD.value };
    dialogCategoria.value = true;
}

async function saveCategoria() {
    try {
        if (isEditing.value) {
            await updateCategoria(recordCategoria);
        } else {
            let newItem = {
                nombre: recordCategoria.value.nombre,
            };
            await insertCategoria(newItem);
        }       
        categoriasStore.categorias = await getCategorias(empresaStore.empresa.id);
        await getMenuData();
        dialogCategoria.value = false;
        recordCategoria.value = { ...DEFAULT_RECORD.value };
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

</script>