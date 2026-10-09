
import AsyncStorage from '@react-native-async-storage/async-storage';

// Substitua pelo IP do computador que roda o backend
const API_URL = 'https://seventh-terrace-recreational-pacific.trycloudflare.com';

export type Role = 'ADOPTER' | 'SHELTER';

export type Usuario = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type Pet = {
  id: string;
  name: string;
  species: string;
  city: string;
  description?: string | null;
  photoUrl?: string | null;
  createdAt: string;
  shelterId: string;
};

export type NovoPet = {
  name: string;
  species: 'dog' | 'cat';
  city: string;
  description?: string;
};

export type NovoUsuario = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

// Comunicação com o backend
async function request<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: object,
  protectedRoute = false
): Promise<T> {
  const token = protectedRoute
    ? await AsyncStorage.getItem('token')
    : null;

  if (protectedRoute && !token) {
    throw new Error('Você precisa fazer login.');
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor. Verifique o IP e a rede.'
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.error || `Erro na requisição (${response.status}).`
    );
  }

  return data as T;
}

// Cadastro de usuário
export function cadastrarUsuario(dados: NovoUsuario) {
  return request<Usuario>('/auth/register', 'POST', dados);
}

// Login
export async function fazerLogin(
  email: string,
  password: string
) {
  const resultado = await request<{
    token: string;
    user: Usuario;
  }>('/auth/login', 'POST', { email, password });

  await AsyncStorage.setItem('token', resultado.token);
  await AsyncStorage.setItem(
    'usuario',
    JSON.stringify(resultado.user)
  );

  return resultado.user;
}

// Listar todos os animais
export function listarAnimais() {
  return request<Pet[]>('/pets');
}

// Buscar um animal pelo ID
export function buscarAnimal(id: string) {
  return request<Pet>(`/pets/${encodeURIComponent(id)}`);
}

// Cadastrar um animal (somente SHELTER)
export function cadastrarAnimal(dados: NovoPet) {
  return request<Pet>('/pets', 'POST', dados, true);
}

// Recuperar usuário logado
export async function obterUsuario() {
  const dados = await AsyncStorage.getItem('usuario');
  return dados ? (JSON.parse(dados) as Usuario) : null;
}

// Sair da conta
export async function sairDaConta() {
  await AsyncStorage.multiRemove(['token', 'usuario']);
}
