<template>
  <v-card elevation="0" rounded="0">
    <v-layout>
      <v-app-bar color="primary" extension-height="12">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Intelicarta</v-toolbar-title>

        <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->

        <template v-slot:extension>
            <v-fab class="ms-4" 
                    color="cyan-accent-2" 
                    icon="mdi-plus" 
                    location="bottom right" 
                    size="40" 
                    absolute offset
                    @click="showDialogoCategoria(true)">
          </v-fab>
        </template>

        <v-spacer></v-spacer>

        <Usuario :nombre="empresaStore.empresa.nombre" :email="usuarioStore.email">
        </Usuario>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item :prepend-avatar="getImage()" :subtitle="usuarioStore.email" :title="empresaStore.empresa.nombre"
            to="/Empresa">
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list :lines="false" density="compact" nav>
          <v-list-item v-for="[text, icon, link] in links" :key="icon" :to="link" link>
            <template v-slot:prepend v-if="text != 'Divider'">
              <v-icon :icon="icon"></v-icon>
            </template>

            <v-list-item-title v-text="text" v-if="text != 'Divider'"></v-list-item-title>

            <v-divider v-if="text == 'Divider'"></v-divider>

          </v-list-item>


          <v-list-item link @click="signOutSession()">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>

        </v-list>

        <template v-slot:append>
          <v-divider></v-divider>

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

    </v-layout>

    <DialogoCategoria 
      :show="dialogoCategoriaShow" 
      :esNueva="dialogoCategoriaNueva"
      @dialogCategoriaCerrar="dialogoCategoriaShow = false">
    </DialogoCategoria>

  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Components
import Usuario from "@/components/Usuario.vue";
import DialogoCategoria from "@/components/DialogoCategoria.vue";

// Composables
import { useAuth } from '@/composables/auth';
import { useErrorHandler } from '@/composables/errorHandler'

// Stores
import { useMenuStore } from "@/stores/menu";
import { useUsuarioStore } from "@/stores/usuario";
import { useEmpresaStore } from "@/stores/empresa";
import { useAuthStore } from "@/stores/auth";

// Assets
import imgUrl from '@/assets/InteliCarta.png'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const usuarioStore = useUsuarioStore()
const empresaStore = useEmpresaStore()
const drawer = ref(false)
const links = ref([
  // ["Inicio", "mdi-home", "/Administracion"],
  ["Categorias", "mdi-format-list-text", "/Categoria"],
  ["Items", "mdi-order-bool-descending-variant", "/Item"],
  // ["Menu", "mdi-silverware-variant", "/MenuAbm"],
  ["Galería", "mdi-image-multiple-outline", `/GaleriaAbm`],
  ["Sugerencias", "mdi-message-bulleted", `/SugerenciaAbm`],
  ["Divider", "", ""],
  ["Configuracion", "mdi-cog", "/Configuracion"],
])

const varios = ref([
  ["Acerca de InteliCarta...", "mdi-information", '/Acerca'],
])

// Constants
const dialogoCategoriaShow = ref(false);
const dialogoCategoriaNueva = ref(false);

// Stores
const authStore = useAuthStore();

// Composables
const { signOut } = useAuth();

onMounted(() => {
})

watch(drawer, (newValue, oldValue) => {
  drawer.value = newValue
})

function showDialogoCategoria(esNueva) {
  dialogoCategoriaShow.value = true;
  dialogoCategoriaNueva.value = esNueva;
}

function getImage() {
  if (empresaStore.empresa.logo == '') {
    empresaStore.empresa.logo = imgUrl;
  }

  return empresaStore.empresa.logo;
}

async function signOutSession() {
  try {
    authStore.setSession(null);
    signOut();

    router.push('/');

    if (error) throw error
  } catch (error) {
    console.log(`Error en signOut: ${useErrorHandler(error)}`);
  }
}

</script>