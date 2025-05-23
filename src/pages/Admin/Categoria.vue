<template>
  <v-card elevation="0" rounded="0">
    <ToolBar titulo="Categorías" ruta="/Administracion" :nuevo="true" @verDialogo="add()"></ToolBar>

    <v-row no-gutters>
      <v-col cols="12">
        <!-- Buscar -->
        <v-text-field v-model="filter" @keyup="filtrar" prepend-inner-icon="mdi-magnify" label="Buscar" single-line
          hide-details clearable @click:clear="listar">
        </v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-list lines="two">
          <v-list-item v-for="categoria in listaCategorias" :key="categoria.id" :title="categoria.nombre">
            <template v-slot:append>
              <div class="d-flex ga-2 justify-end">
                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(categoria)"></v-icon>

                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(categoria)"></v-icon>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>


  <!-- Diálogo  -->
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="800">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-card>
          <v-card-title class="bg-surface-light">
            {{ getDialogTitle('') }}
          </v-card-title>

          <v-card-text>
            <!-- Avatar -->
            <v-row no-gutters>
              <v-col cols="12">
                <Avatar :avatar="record.foto" @onUpdateAvatar="updateAvatar"></Avatar>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <!-- nombre -->
              <v-col cols="12" md="6">
                <v-text-field v-model="record.nombre" :rules="[rules.required, rules.max50]" label="Nombre"
                  variant="underlined" clearable prepend-icon="mdi-tag-text">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="bg-surface-light">
            <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" text="Aceptar" color="primary"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>

  <Confirm :show="confirmarShow" :titulo="confirmarTitulo" :mensaje="confirmarMensaje"
    @confirmarCerrar="confirmarShow = false" @confirmarAceptar="confirmarAceptar">
  </Confirm>

  <v-overlay persistent disabled :model-value="showOverlay" class="align-center justify-center">
    <v-progress-circular color="primary" size="48" indeterminate></v-progress-circular>
  </v-overlay>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Components
import Dialog from '@/components/Dialog.vue';
import ToolBar from '@/components/ToolBar.vue';
import Confirm from '@/components/Confirm.vue';
import Avatar from '@/components/Avatar.vue';
// Composables
import { useCategoria } from '@/composables/categorias';
import { useErrorHandler } from '@/composables/errorHandler';
import { useReglas } from "@/composables/reglas";
import { useMenu } from "@/composables/menu";
// Stores
import { useEmpresaStore } from "@/stores/empresa";
import { useCategoriasStore } from "@/stores/categorias";
import { useMenuStore } from "@/stores/menu";
// Assets
import imgUrl from '@/assets/image.png';

const categoriasStore = useCategoriasStore()
const form = ref(false);
const nombre = ref('');
const filter = ref('');
const listaCategorias = ref([]);
const record = ref({
  id: '',
  nombre: '',
  foto: '',
});
const DEFAULT_RECORD = ref({
  id: '',
  nombre: '',
  foto: imgUrl,
});
const dialog = ref(false);
const isEditing = ref(false);
const dialogShow = ref(false);
const dialogMensaje = ref('');
const dialogTitulo = ref('');
const confirmarShow = ref(false);
const confirmarTitulo = ref('');
const confirmarMensaje = ref('');
const showOverlay = ref(false)

// Composables
const { getCategorias, updateCategoria, insertCategoria, removeCategoria } =
  useCategoria();
const { rules } = useReglas();
const { getMenu } = useMenu();
// Stores
const empresaStore = useEmpresaStore()
const menuStore = useMenuStore();

onMounted(async () => {
  listaCategorias.value = categoriasStore.categorias;
});

watch(() =>
  categoriasStore.categorias,
  async (newData, oldData) => {
    listaCategorias.value = newData;
  },
  { deep: true }
);


function getDialogTitle(nombre) {
  return isEditing.value ? `Editar ${nombre}` : `Agregar ${nombre}`;
}

function listar() {
  listaCategorias.value = categoriasStore.categorias;
}

function filtrar() {
  let filtro = filter.value.toLowerCase();
  listaCategorias.value = categoriasStore.categorias;

  let categoriasFiltradas = listaCategorias.value.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(filtro)
  );

  if (filtro != '') listaCategorias.value = categoriasFiltradas;
}

async function remove(categoria) {
  record.value = { ...categoria };
  confirmarMensaje.value = `¿Elimina la Categoría ${categoria.nombre}?`;
  confirmarTitulo.value = 'Eliminar';
  confirmarShow.value = true;
}

async function confirmarAceptar() {
  try {
    confirmarShow.value = false;
    showOverlay.value = true;
    await removeCategoria(record.value.id);
    categoriasStore.categorias = await getCategorias(empresaStore.empresa.id);
    menuStore.menu = await getMenu(empresaStore.empresa.id);
    showOverlay.value = false;
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

function add() {
  isEditing.value = false;
  record.value = { ...DEFAULT_RECORD.value };
  dialog.value = true;
}

function edit(categoria) {
  isEditing.value = true;
  if (categoria.foto == '' || categoria.foto == null) {
    categoria.foto = imgUrl;
  }
  record.value = { ...categoria };
  dialog.value = true;
}

async function onSubmit() {
  if (!form.value) return;

  try {
    showOverlay.value = true;
    await save();
    categoriasStore.categorias = await getCategorias(empresaStore.empresa.id);
    menuStore.menu = await getMenu(empresaStore.empresa.id);
    showOverlay.value = false;
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function save() {
  try {
    if (isEditing.value) {
      await updateCategoria(record);
    } else {
      let newCategoria = {
        nombre: record.value.nombre,
        foto: record.value.foto
      };
      await insertCategoria(newCategoria);
    }
    dialog.value = false;
  } catch (error) {
    dialog.value = false;
    throw error;
  }
}

function updateAvatar(avatar) {
  record.value.foto = avatar;
}

</script>