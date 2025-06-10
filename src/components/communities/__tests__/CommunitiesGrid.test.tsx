import { render, screen } from "@testing-library/react";
import CommunitiesGrid from "../CommunitiesGrid";
import { CommunityData } from "../types";

describe("CommunitiesGrid Suite", () => {
  const testData: CommunityData[] = [
    {
      id: "test-1",
      iconSrc: "/icons/js.svg",
      name: "JS Community",
      members: "12.4k members",
      description: "JavaScript Enthusiasts",
    },
    {
      id: "test-2",
      iconSrc: "/icons/react.svg",
      name: "React Brasil",
      members: "5.3k members",
      description: "React Developers BR",
    },
  ];

  it("renderiza o número correto de CommunityCard", () => {
    render(<CommunitiesGrid communities={testData} />);
    // Cada card possui um <img> para o ícone
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBe(2);
  });
});
