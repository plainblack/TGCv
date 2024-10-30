import { ouch } from "#ving/utils/ouch.mjs";
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("before current user");
  const currentUser = useCurrentUser();
  console.log("after current user");
  if (!currentUser.props?.maintenanceManager && !currentUser.props?.productionManager) {
    console.log("Bad person detected");
    throw ouch(403, "You must be a maintenance or production manager to view this.");
  }
  console.log("You good joe");
});