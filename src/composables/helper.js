import { useRouter } from 'vue-router';
// Stores
import { useEmpresaStore } from "@/stores/empresa";
// Composables
import { useAplicacion } from '@/composables/aplicacion';


export function useHelper() {

    const router = useRouter();
    const { nombreApp } = useAplicacion();
    const empresaStore = useEmpresaStore()

    function goTo(opcion) {
        let empresa = empresaStore.empresa.nombre;
        let root = `/${nombreApp.value}/${empresa}`;
        router.push(`${root}/${opcion}`);
        // Ej.: http://localhost/Intelicarta/Suss/Inicio
    }

    return { goTo };
}