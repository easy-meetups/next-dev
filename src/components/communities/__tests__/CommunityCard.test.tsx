import { render, screen } from "@testing-library/react";
import CommunityCard from "../CommunityCard";

describe("CommunityCard Suite", () => {
  const props = {
    iconSrc: "/icons/github-br.svg",
    name: "GitHub Brasil",
    members: "5M+ members",
    description: "Desenvolvedores do Brasil",
  };

  it("renderiza ícone, nome, quantidade de membros e descrição", () => {
    render(<CommunityCard {...props} />);
    expect(screen.getByAltText("GitHub Brasil logo")).toBeInTheDocument();
    expect(screen.getByText("GitHub Brasil")).toBeInTheDocument();
    expect(screen.getByText("5M+ members")).toBeInTheDocument();
    expect(screen.getByText("Desenvolvedores do Brasil")).toBeInTheDocument();
  });
});
