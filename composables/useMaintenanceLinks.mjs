/**
 * Creates a data structure for the admin naivigation links.
 * @returns {object[]} An array of objects to be used with the PanelNav component.
 * @example
 * useMaintenanceLinks()
 */

export default () => {
    const links = computed(() => {
        const out = [
            { label: 'Tickets', to: '/maintenanceticket', icon: 'lucide:list-todo' },
            { label: 'Hardware Sets', to: '/maintenanceitemset', icon: 'mdi:printer-pos-cog-outline' },
            { label: 'Schedule', to: '/maintenanceschedule', icon: 'healthicons:i-schedule-school-date-time' },
        ];
        return out;
    });
    return links;
}