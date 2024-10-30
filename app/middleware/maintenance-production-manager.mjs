import { ouch } from "#ving/utils/ouch.mjs";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const currentUser = useCurrentUser();
  if (!currentUser.props?.maintenanceManager && !currentUser.props?.productionManager) {
    return abortNavigation({ statusCode: 403, fatal: true, message: 'You must be a maintenance or production manager to view this.' });
  }
});