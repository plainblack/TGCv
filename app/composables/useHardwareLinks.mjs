/**
 * Creates a data structure for the admin naivigation links.
 * @returns {object[]} An array of objects to be used with the PanelNav component.
 * @example
 * useHardwareLinks()
 */

export default () => {
    const links = computed(() => {
        const out = [
            { label: 'Tickets', to: '/hardwaretickets', icon: 'lucide:list-todo' },
            { label: 'Hardware Item Sets', to: '/hardwareitemsets', icon: 'mdi:printer-pos-cog-outline' },
            { label: 'Schedule', to: '/hardwareschedules', icon: 'healthicons:i-schedule-school-date-time' },
        ];
        return out;
    });
    return links;
}