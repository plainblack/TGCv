import { ouch } from "#ving/utils/ouch.mjs";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const currentUser = useCurrentUserStore();
  if (!currentUser.props?.maintenanceManager && !currentUser.props?.productionManager) {
    throw ouch(403, "You must be a maintenance or production manager to view this.");
  }
});