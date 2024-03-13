import { ouch } from "#ving/utils/ouch.mjs";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const currentUser = useCurrentUserStore();
  if (!currentUser.props?.maintenanceManager) {
    throw ouch(403, "You must be a maintenance manager to view this.");
  }
});
