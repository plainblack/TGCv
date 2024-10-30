import { ouch } from "#ving/utils/ouch.mjs";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const currentUser = useCurrentUser();
  if (!currentUser.props?.maintenanceManager) {
    return abortNavigation({ statusCode: 403, fatal: true, message: 'You must be a maintenance manager to view this.' });
  }
});
