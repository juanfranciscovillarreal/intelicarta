import { ref } from 'vue';

export function useAplicacion() {
    const nombreApp = ref('Intelicarta')

    function getHourDifference(ingreso, ahora) {
        if (ingreso == '') {
            return 2;
        }

        const diffInMilliseconds = Math.abs(ahora.getTime() - ingreso.getTime());
        const diffInHours = diffInMilliseconds / 3600000;
        return diffInHours;
    }

    return { nombreApp, getHourDifference };
}