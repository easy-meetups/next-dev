import Image from "next/image";
export interface CommunityCardProps {
  iconSrc: string; // Caminho/URL para ícone SVG ou PNG
  name: string; // Nome da comunidade (ex.: “GitHub Brasil”)
  members: string; // Texto de quantidade de membros (ex.: “5M+ members”)
  description: string; // Breve descrição (ex.: “Desenvolvedores do Brasil”)
}

/*
  Renderiza um único card de comunidade
  Utilizado na página /communities
*/
export default function CommunityCard(props: CommunityCardProps) {
  const { iconSrc, name, members, description } = props;

  return (
    <button
      className="
      bg-[var(--card-bg)] 
      rounded-lg 
      p-6 
      shadow-md
      shadow-[color:var(--card-bg)]
      duration-250
      ease-in-out
      hover:scale-[1.1]
      hover:bg-[#2E386B]
      cursor-pointer
      "
    >
      <div className="w-18 h-18 rounded-full flex mx-auto mb-4">
        <Image src={iconSrc} alt={`${name} logo`} width={300} height={300} />
      </div>
      <h1 className="text-lg font-medium dark:text-white light:text-purple text-center mb-1">
        {name}
      </h1>
      <p className="text-sm text-gray-500 text-center">{members}</p>
      <p className="text-xs text-gray-400 text-center mt-1">{description}</p>
    </button>
  );
}
