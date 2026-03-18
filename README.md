#  Proekt-X (Projeto-X)

> **Status do Projeto:** Definindo Arquitetura de Dados (PI - 2026)

O **Proekt-X** é uma plataforma de e-commerce e catálogo de **Custom Rooms** e jogos clássicos. Nosso sistema é focado na curadoria de experiências das gerações de ouro dos videogames, permitindo a navegação por consoles icônicos e detalhes técnicos de cada título.

---

## 📑 Sumário
* [Sobre o Projeto](#-sobre-o-projeto)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Arquitetura de Dados](#-arquitetura-de-dados)
* [Fluxo de Navegação](#-fluxo-de-navegação)
* [Como Contribuir](#-como-contribuir)
* [Equipe](#-equipe)

---

##  Sobre:
O Proekt-X não é apenas uma loja, é uma biblioteca interativa. Utilizamos **TypeScript** para garantir que cada jogo e plataforma cadastrada siga padrões rigorosos de dados, evitando erros de interface e garantindo uma navegação fluida para o usuário.

###  Plataformas Suportadas
Atualmente, o Proekt-X suporta a curadoria para os seguintes sistemas:
* **Nintendo:** NES, SNES, GBA.
* **Sega:** Genesis.
* **Arcade:** Máquinas clássicas de ficha.

---

##  Tecnologias Utilizadas
* **Linguagem:** TypeScript 🟦
* **Frontend:** React 
* **Gerenciamento de Estado:** ?

---

##  Arquitetura de Dados (Core)
O coração do Proekt-X baseia-se na interface `Game`, que padroniza as informações exibidas:

```typescript
export interface Game {
  id: string;
  title: string;
  platform: 'NES' | 'SNES' | 'GENESIS' | 'GBA' | 'ARCADE';
  year: number;
  genre: string;
  description: string;
  coverUrl: string;
  screenshots: string[];
}