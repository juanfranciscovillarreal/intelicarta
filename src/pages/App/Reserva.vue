<!-- <template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker color="primary" width="400" :min="desde">
      </v-date-picker>
    </v-row>
  </v-container>
</template> -->

<template>
  <!-- <ToolBar titulo="Empresa" ruta="/Administracion" icono="mdi-content-save" @evento_click="onSubmit"></ToolBar> -->
  <ToolBar titulo="Empresa" ruta="/Administracion"></ToolBar>

  <Avatar :avatar="getImage" @onUpdateAvatar="updateAvatar"></Avatar>

  <v-container class="pt-0">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-row no-gutters>
        <!-- nombre -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.nombre" :rules="[rules.required, rules.max50]" label="Nombre"
              variant="underlined" clearable prepend-icon="mdi-account-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- descripcion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.descripcion" :rules="[rules.max50]" label="Descripción"
              variant="underlined" clearable prepend-icon="mdi-information-variant-circle-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- direccion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.direccion" :rules="[rules.max50]" label="Dirección"
              variant="underlined" clearable prepend-icon="mdi-map-marker-outline">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- telefono -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.telefono" :rules="[rules.max50]" label="Teléfono"
              variant="underlined" clearable prepend-icon="mdi-phone-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- celular -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.celular" :rules="[rules.max50]" label="Celular"
              variant="underlined" clearable prepend-icon="mdi-cellphone">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- web -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.web" :rules="[rules.max50]" label="Web" variant="underlined"
              clearable prepend-icon="mdi-web">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- email -->
        <v-col cols="12" md="12">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.email" :rules="[rules.max50]" label="Correo"
              variant="underlined" clearable prepend-icon="mdi-email-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- wifi_usuario -->
        <v-col cols="12" md="6">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.wifi_usuario" :rules="[rules.max50]" label="Wifi usuario"
              variant="underlined" clearable prepend-icon="mdi-wifi">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- wifi_clave -->
        <v-col cols="12" md="6">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.wifi_clave" :rules="[rules.max50]" label="Wifi clave"
              variant="underlined" clearable prepend-icon="mdi-lock-outline">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- aceptar -->
      <v-btn type="submit" block class="mt-4">Aceptar</v-btn>

    </v-form>
  </v-container>

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useDate } from 'vuetify'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
// Components
import ToolBar from '@/components/ToolBar.vue';
import Dialog from '@/components/Dialog.vue';
import Avatar from '@/components/Avatar.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useEmpresa } from '@/composables/empresa';
import { useReglas } from "@/composables/reglas";
// Stores
import { useEmpresaStore } from "@/stores/empresa";

const { updateEmpresa } = useEmpresa();
const router = useRouter()
const route = useRoute()

const empresaStore = useEmpresaStore()
const form = ref(false);
const dialogShow = ref(false);
const dialogTitulo = ref('Empresa');
const dialogMensaje = ref('');

// Composables
const { rules } = useReglas();
const adapter = useDate()

var desde = ref('')
var hasta = ref('')

onMounted(() => {
  let hoy = new Date();
  let desdeISO = hoy.toISOString().slice(0, 10);

  desde.value = adapter.parseISO(desdeISO);
})

const getImage = computed(() => {
  var logo = empresaStore.empresa.logo;
  return logo;
})

function updateAvatar(avatar) {
  empresaStore.empresa.logo = avatar;
}

async function onSubmit() {
  if (!form.value) return;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user == null) {
      //router.push('/');
      throw 'Error';
    }

    let empresa = {
      id: user.id,
      nombre: empresaStore.empresa.nombre,
      descripcion: empresaStore.empresa.descripcion,
      direccion: empresaStore.empresa.direccion,
      telefono: empresaStore.empresa.telefono,
      celular: empresaStore.empresa.celular,
      web: empresaStore.empresa.web,
      email: empresaStore.empresa.email,
      wifi_usuario: empresaStore.empresa.wifi_usuario,
      wifi_clave: empresaStore.empresa.wifi_clave,
      logo: empresaStore.empresa.logo,
    }
    await updateEmpresa(empresa);

    dialogShow.value = true;
    dialogMensaje.value = 'Los datos se actualizaron correctamente';
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

/*
fecha
cant de personas
horario entre
ubicaión/sector

Datos de la persona
Nombre
Apellido
DNI
Teléfono
E-Mail
*/
</script>