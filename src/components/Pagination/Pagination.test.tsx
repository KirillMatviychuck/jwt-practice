import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { Pagination } from "./Pagination"

describe('default props', () => {

    const mockProps = {
        changePageSetter: vi.fn(),
        totalPages: 1,
        currentPage: 1
    }
    test('totalPages default should not invoke errors', () => {
        render(
            <Pagination {...mockProps} />
        )

        const pageButton = screen.getByRole('button', { name: '1' })

        expect(pageButton).toBeInTheDocument()
    })
})