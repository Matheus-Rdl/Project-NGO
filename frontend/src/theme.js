import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Lendo a variável de ambiente (usando VITE_ENV como já está no seu main.jsx)
const env = import.meta.env.VITE_ENV || 'develop';

// Paleta de cores baseada no ambiente
// Na v3, os tokens de cores devem ser declarados com o formato { value: 'cor' }
const brandColors = {
  production: {
    primary: { value: '#1A365D' },   // Tons de azul para Produção
    secondary: { value: '#2A4365' },
    tertiary: { value: '#2C5282' },
  },
  develop: {
    primary: { value: 'green' },   // Tons de verde para Develop
    secondary: { value: 'greenyellow' },
    tertiary: { value: 'rgb(228, 255, 188)' },
  }
};

// Define qual paleta será carregada
const currentBrand = env === 'production' ? brandColors.production : brandColors.develop;

// Cria a configuração personalizada de estilo
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: currentBrand,
      },
    },
  },
});

// Estende o tema padrão do Chakra (defaultConfig) com a nova paleta
const system = createSystem(defaultConfig, customConfig);

export default system;