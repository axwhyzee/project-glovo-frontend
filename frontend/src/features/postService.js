const API_URL = "https://project-glovo-api.onrender.com";

export const getAllPosts = async () => {
    const data = await fetch(`${API_URL}/news/`).then((r) => r.json());
    return data;
};