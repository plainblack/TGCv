/**
 * Creates a data structure for the current user's settings naivigation links.
 * @returns {object[]} An array of objects to be used with the PanelNav component.
 * @example
 * useUserSettingsLinks()
 */

export default () => {
    const currentUser = useCurrentUser();
    const links = computed(() => {
        const out = [
            { label: 'Profile', to: '/users/settings', icon: 'ph:user' },
            { label: 'Account', to: '/users/settings/account', icon: 'ph:key' },
            { label: 'Preferences', to: '/users/settings/preferences', icon: 'ph:sliders' },
        ];
        if (currentUser?.props?.developer == true)
            out.push({ label: 'API Keys', to: '/users/settings/apikeys', icon: 'ph:lock' });
        return out;
    });
    return links;
}