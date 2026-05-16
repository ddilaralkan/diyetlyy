import axios from "axios";

const API_URL = "https://localhost:7001/api/auth";

export async function login(data: {
  email: string;
  password: string;
}) {

  const response = await axios.post(
    `${API_URL}/login`,
    data
  );

  return response.data;
}