const OLLAMA_HOST = 'ollama.host';

export const loadOllamaHost = () => {
  const host = localStorage.getItem(OLLAMA_HOST);
  console.log(host)
  return host;
}

export const saveOllamaHost = (host: string) => {
  localStorage.setItem(OLLAMA_HOST, host);
}
