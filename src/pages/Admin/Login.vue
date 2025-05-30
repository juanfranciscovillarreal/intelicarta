<template>
    <ToolBar titulo="Iniciar sesión" ruta="/"></ToolBar>

    <v-card class="mx-auto pa-6 mt-2" elevation="0" rounded="0" variant="text" max-width="448" min-width="360">
        <v-form v-model="form" @submit.prevent="onSubmit">
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Correo
            </div>

            <v-text-field v-model="email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined"
                :rules="[rules.required, rules.email]"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Clave
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                :rules="[rules.required, rules.counter]"></v-text-field>

            <v-btn color="blue" size="large" variant="tonal" block type="submit">
                Ingresar
            </v-btn>

            <v-card-text class="text-center">
                <v-btn variant="plain" @click="router.push('/signUp')">
                    Registrarse
                </v-btn>
            </v-card-text>

            <div class="text-center">
                <v-btn size="x-small" variant="plain" @click="router.push('/forgotPass')">
                    ¿Olvidó la clave?
                </v-btn>
            </div>
        </v-form>
    </v-card>

    <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
    </Dialog>

    <v-overlay persistent disabled :model-value="showOverlay" class="align-center justify-center">
        <v-progress-circular color="primary" size="48" indeterminate></v-progress-circular>
    </v-overlay>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

// Assets
import imgUrl from '@/assets/InteliCarta.png'
// Components
import ToolBar from '@/components/ToolBar.vue';
import Dialog from '@/components/Dialog.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useEmpresa } from '@/composables/empresa';
import { useCategoria } from '@/composables/categorias';
import { useItem } from '@/composables/items';
import { useMenu } from '@/composables/menu';
import { useReglas } from "@/composables/reglas";
import { useAuth } from '@/composables/auth';
import { useGaleria } from '@/composables/galeria';
// Stores
import { useEmpresaStore } from "@/stores/empresa";
import { useCategoriasStore } from "@/stores/categorias";
import { useGaleriaStore } from "@/stores/galeria";
import { useItemsStore } from "@/stores/items";
import { useUsuarioStore } from "@/stores/usuario";
import { useMenuStore } from "@/stores/menu";
import { useAuthStore } from "@/stores/auth";

// Constants
const router = useRouter();
const form = ref(false);
const email = ref('juanfranciscovillarreal@hotmail.com');
const password = ref('123456');
const visible = ref(false);
const dialogShow = ref(false);
const dialogTitulo = ref('Inicio de sesión');
const dialogMensaje = ref('');
const showOverlay = ref(false)
// Composables
const { getEmpresa } = useEmpresa();
const { getCategorias } = useCategoria();
const { getItems } = useItem();
const { getMenu } = useMenu();
const { getFotos } = useGaleria();
const { rules } = useReglas();
const { signIn, signOut } = useAuth();
// Stores
const categoriasStore = useCategoriasStore()
const galeriaStore = useGaleriaStore()
const itemsStore = useItemsStore()
const usuarioStore = useUsuarioStore()
const empresaStore = useEmpresaStore()
const menuStore = useMenuStore()
const authStore = useAuthStore();

onMounted(() => {
    signOutSession();
});

async function onSubmit() {
    if (!form.value) return;

    try {
        showOverlay.value = true;
        await signInWithEmail();
        await getEmpresaData();
        await getCategoriasData();
        await getGaleriaData();
        await getItemsData();
        await getMenuData();
        router.push('/Administracion');
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
    finally {
        showOverlay.value = false;
    }
}

async function signInWithEmail() {
    try {
        await signIn(email.value, password.value)
            .then((data) => {
                empresaStore.empresa.id = data.user.id;
                usuarioStore.email = email.value;
            });

    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function getEmpresaData() {
    try {
        empresaStore.empresa = await getEmpresa(empresaStore.empresa.id);
        if (empresaStore.empresa.logo == '' || empresaStore.empresa.logo == null) {
            empresaStore.empresa.logo = imgUrl;
        }
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function getCategoriasData() {
    categoriasStore.categorias = await getCategorias(empresaStore.empresa.id);
}

async function getItemsData() {
    itemsStore.items = await getItems(empresaStore.empresa.id);
}

async function getMenuData() {
    menuStore.menu = await getMenu(empresaStore.empresa.id);
}

async function getGaleriaData() {
    galeriaStore.fotos = await getFotos(empresaStore.empresa.id);
}

async function signOutSession() {
    try {
        signOut();
        authStore.setSession(null);
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}
</script>