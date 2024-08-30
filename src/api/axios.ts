import axios from "axios";
export async function getAPI(apiUrl: string) {
  try {
    const accountInfo = await axios.get(apiUrl);
    console.log("accountInfo", accountInfo);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
}
