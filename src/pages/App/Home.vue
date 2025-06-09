<template>
  <v-app-bar color="primary" :absolute="false">
    <!-- Botón Menú Principal -->
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- Título App -->
    <v-toolbar-title>{{ empresa }}</v-toolbar-title>

    <!-- Tema -->
    <BtnTheme />

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <!-- Logo -->
    <v-card rounded="0" class="pa-2">
      <v-img aspect-ratio="16/9" :src="getImage" cover>
      </v-img>
    </v-card>

    <v-divider></v-divider>

    <!-- Links -->
    <v-list :lines="false" density="compact" nav>
      <v-list-item v-for="[text, icon, link] in links" :key="icon" :to="link" link>
        <template v-slot:prepend v-if="text != 'Divider'">
          <v-icon :icon="icon"></v-icon>
        </template>

        <v-list-item-title v-text="text" v-if="text != 'Divider'"></v-list-item-title>

        <v-divider v-if="text == 'Divider'"></v-divider>

      </v-list-item>
    </v-list>
    <!-- Fin Links -->

    <template v-slot:append>
      <v-divider></v-divider>
      <!-- Varios -->
      <v-list :lines="false" density="compact" nav>
        <v-list-item v-for="[text, icon, link] in varios" :key="icon" :to="link" link>
          <template v-slot:prepend>
            <v-icon :icon="icon"></v-icon>
          </template>
          <v-list-item-title v-text="text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>

  <v-overlay persistent disabled :model-value="showOverlay" class="align-center justify-center">
    <v-progress-circular color="primary" size="48" indeterminate></v-progress-circular>
  </v-overlay>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Components
import BtnTheme from '@/components/BtnTheme.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useEmpresa } from '@/composables/empresa';
import { useCategoria } from '@/composables/categorias';
import { useItem } from '@/composables/items';
import { useMenu } from '@/composables/menu';
import { useAplicacion } from '@/composables/aplicacion';
import { useContacto } from '@/composables/contacto';
import { useHorario } from '@/composables/horario';
import { useGaleria } from '@/composables/galeria';

// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useItemsStore } from "@/stores/items";
import { useMenuStore } from "@/stores/menu";
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";
import { useHorarioStore } from "@/stores/horario";
import { useGaleriaStore } from "@/stores/galeria";

// Composables
const { getEmpresaPorNombre } = useEmpresa();
const { getCategorias } = useCategoria();
const { getSugeridos } = useItem();
const { getMenu } = useMenu();
const { getContacto } = useContacto();
const { getHorario } = useHorario();
const { nombreApp } = useAplicacion();
const { getFotos } = useGaleria();

const router = useRouter()
const route = useRoute()
const drawer = ref(false)
const empresa = ref('')
const links = ref([])
const varios = ref([])
const showOverlay = ref(false)

// Stores
const categoriasStore = useCategoriasStore()
const itemsStore = useItemsStore()
const menuStore = useMenuStore()
const empresaStore = useEmpresaStore()
const contactoStore = useContactoStore()
const horarioStore = useHorarioStore()
const galeriaStore = useGaleriaStore()

onMounted(async () => {
  showOverlay.value = true;
  empresa.value = route.params.empresa;
  await getEmpresaPorNombreData();
  await getContactoData();
  await getHorarioData();
  await getCategoriasData();
  await getSugeridosData();
  await getGaleriaData();
  await getMenuData();
  showOverlay.value = false;
})

async function getEmpresaPorNombreData() {
  try {
    await getEmpresaPorNombre(empresa.value)
      .then((data) => {
        if (data) {
          empresaStore.empresa = data;
          let root = `/${nombreApp.value}/${empresa.value}`;
          links.value = [
            ["Inicio", "mdi-home", `${root}/Inicio`],
            ["Menu", "mdi-library", `${root}/Principal`],
            ["Contacto", "mdi-map-marker", `${root}/Contacto`],
            ["Reservas", "mdi-account-clock-outline", `${root}/Reserva`],
            ["Galería", "mdi-image-multiple-outline", `${root}/Galeria`],
            ["Delivery", "mdi-moped", `${root}/Delivery`],
            ["Divider", "", ""],
            ["Ajustes", "mdi-cog", `${root}/Ajustes`],
            ["Wi-Fi", "mdi-wifi", `${root}/WiFi`],
          ]

          varios.value = [
            ["Acerca de InteliCarta...", "mdi-information", `${root}/Acerca`],
          ]

          router.push(`${root}/Inicio`);
        } else {
          router.push('/');
        }

      });
  } catch (error) {
    router.push('/PageNotFound');
    console.log(`Error en getEmpresa: ${useErrorHandler(error)}`);
  }
}

async function getCategoriasData() {
  await getCategorias(empresaStore.empresa.id)
    .then((data) => {
      data.unshift({
        id: 0,
        nombre: "Todos"
      });
      categoriasStore.categorias = data;
    });
}

async function getSugeridosData() {
  itemsStore.sugeridos = await getSugeridos(empresaStore.empresa.id);
}

async function getMenuData() {
  await getMenu(empresaStore.empresa.id)
    .then((data) => {
      if (menuStore.pedido.length == 0) {
        // Cargo el menú completo si no hay un pedido hecho
        menuStore.menuCompleto = data;
      }
    });
}

async function getContactoData() {
  await getContacto(empresaStore.empresa.id)
    .then((data) => {
      contactoStore.contactos = data;
    });
}

async function getHorarioData() {
  await getHorario(empresaStore.empresa.id)
    .then((data) => {
      horarioStore.horarios = data;
    });
}

async function getGaleriaData() {
  galeriaStore.fotos = await getFotos(empresaStore.empresa.id);
}

watch(drawer, (newValue, oldValue) => {
  drawer.value = newValue
})

const getImage = computed(() => {
  return empresaStore.empresa.logo != '' ? empresaStore.empresa.logo : '@/assets/Empresa.png';
})

</script>