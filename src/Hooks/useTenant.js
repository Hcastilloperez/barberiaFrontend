import { fetchService } from "../Config/Axios";

const GetTenantBySlug = async (slug) => {
  console.log("Fetching tenant with slug:", slug);
  try {
    const { data } = await fetchService(`tenants/${slug}`, "get");
    return data;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    throw error;
  }
};

const LoginTenant = async (payload) => {
  console.log("Logging in tenant with payload:", payload);
  try {
    const { data } = await fetchService("tenants/login", "post", payload);
    return data;
  } catch (error) {
    console.error("Error logging in tenant:", error);
    throw error;
  }
};

export { GetTenantBySlug, LoginTenant };