import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Suite", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it("exibe botões “Anterior” e “Próximo” e texto da página", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    expect(screen.getByText("Página 2 de 5")).toBeInTheDocument();
    expect(screen.getByText("Anterior")).toBeEnabled();
    expect(screen.getByText("Próximo")).toBeEnabled();
  });

  it("desabilita “Anterior” se estiver na primeira página", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );
    expect(screen.getByText("Anterior")).toBeDisabled();
  });

  it("desabilita “Próximo” se estiver na última página", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );
    expect(screen.getByText("Próximo")).toBeDisabled();
  });

  it("chama onPageChange corretamente ao clicar", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText("Anterior"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Próximo"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
