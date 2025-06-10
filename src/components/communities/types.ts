export interface CommunityCardProps {
  iconSrc: string; // Caminho/URL para ícone SVG ou PNG
  name: string; // Nome da comunidade (ex.: “GitHub Brasil”)
  members: string; // Texto de quantidade de membros (ex.: “5M+ members”)
  description: string; // Breve descrição (ex.: “Desenvolvedores do Brasil”)
}

export interface CommunityData extends CommunityCardProps {
  id: string; // ID único da comunidade (ex.: “github-brasil”)
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
