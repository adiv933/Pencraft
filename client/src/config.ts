const NODE_ENV: string = 'prod';
export const BACKEND_URL = NODE_ENV == 'prod' ? "https://server.adityav090304.workers.dev/api/v1" : "http://localhost:8787/api/v1"